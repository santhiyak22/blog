import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/Footer";
interface Post {
  id: number;
  title: string;
  slug: string;
  cover_image?: string;
  created_at: string;
}

interface Category {
  id: number;
  category: string;
  category_slug: string;
  posts: Post[];
}

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading categories...</p>;

  // Filter categories based on the selected category
  const filteredCategories = category
    ? categories.filter((cat) => cat.category_slug === category)
    : categories;

  return (
    <div className="container mt-5">
      <Head>
        <title>{category ? `${category} | My Blog` : "Blog Categories"}</title>
        <meta name="description" content="Browse blog posts in various categories" />
      </Head>

      <h2 className="text-primary fw-bold mb-4 text-center">
        {category ? ` ${category}` : "All Blog Categories"}
      </h2>

      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat) => (
          <div key={cat.id} className="mb-5">
            <h3 className="text-secondary fw-bold"></h3>
            {cat.posts.length > 0 ? (
              <ul className="list-group mt-3 shadow-sm rounded-4">
                {cat.posts.map((post) => (
                  <li
                    key={post.id}
                    className="list-group-item d-flex justify-content-between align-items-center p-4 border-0 rounded-3 shadow-sm mb-3 bg-white"
                  >
                    <span className="fw-bold text-dark">{post.title}</span>
                    <Link href={`/blog/${post.slug}`} className="btn btn-outline-primary fw-bold px-3">
                      <i className="bi bi-eye me-2"></i> View
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No posts in this category.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-muted">No categories found.</p>
      )}
      <br></br>
      <Footer />
    </div>
  );
}
