import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";
import slugify from "slugify";

const VALID_CATEGORIES = ["Government Job", "State Job", "Current Affair", "Railway Job", "Banking job"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { title, content, category, cover_image } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required." });
        }

        if (!VALID_CATEGORIES.includes(category)) {
            return res.status(400).json({ error: "Invalid category selected." });
        }

        const slug = slugify(title, { lower: true, strict: true });

        const query = `INSERT INTO posts (title, slug, content, category, cover_image) VALUES (?, ?, ?, ?, ?)`;
        await pool.query(query, [title, slug, content, category, cover_image]);

        return res.status(201).json({ message: "Blog post added successfully.", slug });
    } catch (error) {
        console.error("Error inserting blog post:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
