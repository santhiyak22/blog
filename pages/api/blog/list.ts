import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : null;
        const pageSize = 5; 

        if (page) {
            const offset = (page - 1) * pageSize;

            // Fetch paginated posts
            const [rows]: any[] = await pool.query(
                "SELECT slug, title, category, created_at, cover_image FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?",
                [pageSize, offset]
            );

            
            const [countResult]: any[] = await pool.query("SELECT COUNT(*) AS total FROM posts");
            const total = countResult[0]?.total || 0;

            return res.status(200).json({ posts: rows, total });
        } else {
         
            const [rows]: any[] = await pool.query(
                "SELECT slug, title, category, created_at, cover_image FROM posts ORDER BY created_at DESC"
            );

            return res.status(200).json(rows || []);
        }
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
