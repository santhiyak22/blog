import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import slugify from "slugify";
import Footer from "@/components/Footer";

interface Post {
  id: number;
  title: string;
  category: string;
  created_at: string;
  cover_image: string | null;
  slug: string;
}

interface Category {
  id: number;
  category: string;
  slug: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
      return;
    }

    const fetchCategories = async () => {
      try {
        const categoryRes = await fetch("/api/categories");
        const categoriesData = await categoryRes.json();

        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData.map((cat) => ({
            ...cat,
            slug: cat.slug || slugify(cat.category, { lower: true }),
          })));
        }
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog/list");
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };


  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex">
      <div className="d-flex flex-column p-4 text-white shadow-lg"
        style={{
          width: "260px",
          minHeight: "100vh",
          background: "linear-gradient(135deg, rgb(11, 94, 250), rgb(135, 173, 245))",
        }}
      >
        <h4 className="mb-4 text-center fw-bold" style={{ letterSpacing: "1px" }}>Categories</h4>
        <ul className="nav flex-column">
          {categories.length === 0 ? (
            <p className="text-white text-center">No categories available.</p>
          ) : (
            categories.map((cat) => (
              <li className="nav-item mb-2" key={cat.id}>
                <Link href={`/categories/${cat.slug || slugify(cat.category, { lower: true })}`} passHref>
                  <span className="nav-link text-white fw-semibold d-flex align-items-center p-3 rounded shadow-sm"
                    style={{
                      fontSize: "1.1rem",
                      backgroundColor: "rgba(255, 255, 255, 0.47)",
                      borderLeft: "4px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.46)";
                      e.currentTarget.style.borderLeft = "4px solid #ffd700";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.28)";
                      e.currentTarget.style.borderLeft = "4px solid transparent";
                    }}
                  >
                    {cat.category}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>


      <div className="flex-grow-1">
        <nav className="navbar navbar-expand-lg bg-primary shadow-lg py-3">
          <div className="container">
            <Link href="/" className="navbar-brand fw-bold text-white fs-3" style={{ letterSpacing: "1px" }}>
              Job Alert Now
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link text-white fw-semibold px-3" href="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link text-white fw-semibold px-3" href="/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link text-white fw-semibold px-3" href="/blog">Blog</Link></li>
                <li className="nav-item"><Link className="nav-link text-white fw-semibold px-3" href="/about">About</Link></li>
                <li className="nav-item">
                  <button className="btn btn-warning fw-bold ms-3 px-4 rounded-pill" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>


              <form className="d-flex ms-3">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-center flex-grow-1">Latest Jobs</h1>
            <Link href="/blog/post" className="btn btn-success btn-lg fw-bold px-4 rounded-pill shadow">
              + Create Post
            </Link>
          </div>

          {loading && <p className="text-center text-muted">Loading posts...</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          {!loading && !error && filteredPosts.length === 0 && (
            <p className="text-center text-muted">No blog posts found.</p>
          )}


          {!loading && !error && filteredPosts.length > 0 && (
            <div className="row">
              {filteredPosts.map((post) => (
                <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card shadow-sm border-4 rounded-2 p-3 h-100 d-flex flex-column">
                    {post.cover_image && (
                      <img
                        src={`/uploads/${post.cover_image}`}
                        alt={post.title}
                        className="card-img-top rounded-3 mb-3"
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    )}
                    <h5 className="fw-bold text-dark">{post.title}</h5>
                    <p className="text-muted"><strong>Category:</strong> {post.category || "None"}</p>
                    <div className="mt-auto">
                      <Link href={`/blog/${post.slug}`} className="btn btn-outline-primary w-100 fw-bold">
                        <i className="bi bi-eye me-2"></i> View Post</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>

    </div>
  );
}
