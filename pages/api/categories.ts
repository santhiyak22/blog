import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";
import pool from "../../lib/db"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const [categories]: any[] = await pool.query("SELECT DISTINCT category FROM posts WHERE category IS NOT NULL");

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(404).json({ error: "No categories found" });
    }
    const data = await Promise.all(
      categories.map(async (cat: { category: string }) => {
        if (!cat.category || typeof cat.category !== "string") {
          console.warn("Skipping invalid category:", cat);
          return null;
        }

        const categorySlug = slugify(cat.category, { lower: true });

  
        const postQuery = "SELECT id, title, slug, cover_image, created_at FROM posts WHERE category = ?";
         const [posts]: any[] = await pool.query(postQuery, [cat.category]);

        return {
          category: cat.category,
          category_slug: categorySlug,
          posts: posts || [],
        };
      })
    );

    const validData = data.filter((item) => item !== null);

    res.status(200).json(validData);
  } catch (error) {
    console.error("Error fetching categories and posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
