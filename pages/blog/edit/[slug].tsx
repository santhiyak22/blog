import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function EditPost() {
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/blog/${slug}`);
        const data = res.data;

        setTitle(data.title);
        setContent(data.content);
        setCoverImage(data.cover_image);
        setCreatedAt(new Date(data.created_at).toLocaleDateString());
        setCategory(data.category);
      } catch {
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`/api/blog/${slug}`, {
        title,
        content,
        cover_image: coverImage,
        category,
      });

      alert("Post updated successfully!");
      router.push(`/blog/${slug}`);
    } catch {
      alert("Error updating post.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`/api/blog/${slug}`);
      alert("Post deleted successfully!");
      router.push("/dashboard");
    } catch {
      alert("Failed to delete post.");
    }
  };

  if (loading) return <p className="container mt-5 text-center">Loading post...</p>;
  if (error) return <p className="container mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <Head>
        <title>Edit Post - {title}</title>
        <meta name="description" content={`Edit the blog post titled "${title}"`} />
        <meta name="keywords" content={`edit, blog, post, ${title}, ${category}`} />
      </Head>
      <h2>Edit Blog Post</h2>
      <p className="text-muted">Created on: {createdAt}</p>

      <form onSubmit={handleUpdate}>
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
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Image (URL)</label>
          <input
            type="text"
            className="form-control"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-warning px-4">
            Update
          </button>
          <button type="button" onClick={handleDelete} className="btn btn-danger px-4">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}