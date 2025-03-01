import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/Footer";

type BlogPost = {
    id: number;
    title: string;
    category: string | null;
    created_at: string;
    slug: string;
};

export default function BlogList() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pageSize = 5; // Matches API pageSize

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`/api/blog/list?page=${page}`);
                console.log("API Response:", response.data); // ✅ Debugging
                setPosts(response.data.posts || []);
                setTotal(response.data.total || 0);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load blog posts.");
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-start">
                <Link href="/blog/post" className="btn btn-primary btn-lg fw-bold shadow-sm px-4">
                    <i className="bi bi-plus-circle me-2"></i> Create Post
                </Link>
            </div>

            <div className="container mt-5">
                <h2 className="text-primary fw-bold mb-4 text-center"> Blog Posts</h2>
                {loading && <p className="text-center text-muted">Loading posts...</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                {!loading && !error && posts.length === 0 && (
                    <p className="text-center text-muted">No blog posts available.</p>
                )}
                {!loading && !error && posts.length > 0 && (
                    <ul className="list-group shadow-sm rounded-4">
                        {posts.map((post) => (
                            <li
                                key={post.id}
                                className="list-group-item d-flex justify-content-between align-items-center p-4 border-0 rounded-3 shadow-sm mb-3 bg-white"
                                style={{ transition: "0.3s", cursor: "pointer" }}
                            >
                                <div>
                                    <h5 className="fw-bold mb-2 text-dark">{post.title}</h5>
                                    <p className="mb-1 text-muted">
                                        <i className="bi bi-tag-fill text-warning me-1"></i>
                                        <strong>Category:</strong> {post.category || "None"}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <i className="bi bi-calendar-event-fill text-secondary me-1"></i>
                                        <strong>Published:</strong> {new Date(post.created_at).toDateString()}
                                    </p>
                                </div>
                                <Link href={`/blog/${post.slug}`} className="btn btn-outline-primary fw-bold px-3">
                                    <i className="bi bi-eye me-2"></i> View
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                <button className="page-link shadow-sm" onClick={() => setPage(page - 1)}>
                                    <i className="bi bi-chevron-left"></i> Previous
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i + 1} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                                    <button className="page-link shadow-sm fw-bold" onClick={() => setPage(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                <button className="page-link shadow-sm" onClick={() => setPage(page + 1)}>
                                    Next <i className="bi bi-chevron-right"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
            <Footer />
        </div>
    );
}
