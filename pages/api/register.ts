import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [
        email,
        hashedPassword,
      ]);

      return res.status(201).json({ message: "User registered successfully!" });
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already exists." });
      }
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
