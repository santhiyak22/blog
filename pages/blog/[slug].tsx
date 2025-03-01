import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<{ title: string; description: string; cover_image: string; category: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady || !slug) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/api/blog/${slug}`);
        setPost(res.data);
      } catch {
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, router.isReady]);

  // Function to handle post deletion
  const handleDelete = async () => {
    if (!slug) return;
    
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/blog/${slug}`);
      alert("Post deleted successfully!");
      router.push("/dashboard"); // Redirect to dashboard after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post.");
    }
  };

  if (loading)
    return <p className="container mt-5 text-center">Loading post...</p>;
  if (error)
    return <p className="container mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <Head>
        <title>{post?.title || "Blog Post"} - My Blog</title>
        <meta name="description" content={post?.description || "Read this amazing blog post."} />
        <meta property="og:title" content={post?.title || "Blog Post"} />
        <meta property="og:description" content={post?.description || "Check out this post!"} />
        <meta property="og:url" content={`http://localhost:3000/blog/${slug}`} />
        <meta property="og:image" content={post?.cover_image ? `/uploads/${post.cover_image}` : "/default-cover.jpg"} />
      </Head>

      {post && (
        <div className="card shadow-lg border-0 rounded-4 p-4 bg-white">
          <h2 className="mb-3 text-primary fw-bold">{post.title || "No Title"}</h2>
          <p className="text-muted">
            <i className="bi bi-tag-fill me-2 text-warning"></i>
            <strong>Category:</strong> {post.category || "None"}
          </p>

          {post.cover_image ? (
            <div className="position-relative overflow-hidden rounded-3 shadow-sm mb-3">
              <Image
                src={`/uploads/${post.cover_image}`}
                alt={post.title}
                width={660}
                height={660}
                className="img-fluid w-100 rounded-3"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="text-center py-3 border rounded bg-light">
              <p className="text-muted">No cover image available.</p>
            </div>
          )}

          <div className="border p-4 rounded bg-light shadow-sm" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
            <div dangerouslySetInnerHTML={{ __html: post.content || "<p>No content available</p>" }}></div>
          </div>

          {/* Edit & Delete Buttons */}
          <div className="mt-4 d-flex gap-3">
            <Link href={`/blog/edit/${slug}`} className="btn btn-primary fw-bold">
              <i className="bi bi-pencil-square me-2"></i> Edit
            </Link>

            <button onClick={handleDelete} className="btn btn-danger fw-bold">
              <i className="bi bi-trash me-2"></i> Delete
            </button>
          </div>
        </div>
      )}<br></br>
      <Footer/>
    </div>
  );
}
