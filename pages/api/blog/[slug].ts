import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query;

    if (!slug || typeof slug !== "string") {
      return res.status(400).json({ error: "Invalid slug" });
    }

    if (req.method === "GET") {
    
      const [rows]: any[] = await pool.query("SELECT * FROM posts WHERE slug = ?", [slug]);

      if (!rows.length) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.status(200).json(rows[0]);
    }

    if (req.method === "PUT") {
      // ✅ Update post by slug
      const { title, content, category, cover_image } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
      }

      const [result]: any = await pool.query(
        "UPDATE posts SET title = ?, content = ?, category = ?, cover_image = ? WHERE slug = ?",
        [title, content, category, cover_image, slug]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Post not found or no changes made" });
      }

      return res.status(200).json({ message: "Post updated successfully" });
    }

    if (req.method === "DELETE") {
      const [existing]: any = await pool.query("SELECT id FROM posts WHERE slug = ?", [slug]);

      if (!existing.length) {
        return res.status(404).json({ error: "Post not found" });
      }

      await pool.query("DELETE FROM posts WHERE slug = ?", [slug]);
      return res.status(200).json({ message: "Post deleted successfully" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
