import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import Head from "next/head";
import Footer from "@/components/Footer";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (coverImage) {
      formData.append("cover_image", coverImage);
    }
    try {
      const response = await axios.post("/api/blog/add", {
        title,
        content,
        category,
        cover_image: coverImage ? coverImage.name : null,
      });
      setMessage(response.data.message);
      setTitle("");
      setContent("");
      setCategory("");
      setCoverImage(null);
    } catch {
      setMessage("Failed to add blog post.");
    }
    router.push("/blog");
  };

  return (
    <div className="container mt-5">
      <Head>
        <title>Add Blog Post</title>
        <meta name="description" content="Create a new blog post on our platform." />
        <meta name="keywords" content="blog, post, create, new, article" />
      </Head>
      <h2>Add Blog Post</h2>
      {message && <p className="alert alert-info">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Government Job">Government Job</option>
            <option value="State Job">State Job</option>
            <option value="Current Affair">Current Affair</option>
            <option value="Railway Job">Railway Job</option>
            <option value="Banking Job">Banking Job</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Cover Image (Optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <br></br>
      <Footer/>
    </div>
  );
}