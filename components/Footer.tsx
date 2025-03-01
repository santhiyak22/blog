import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <ul className="list-inline mb-0">
          <li className="list-inline-item mx-3">
            <Link href="/" className="text-light text-decoration-none">Home</Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link href="/dashboard" className="text-light text-decoration-none">Dashboard</Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link href="/blog" className="text-light text-decoration-none">Blog</Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link href="/about" className="text-light text-decoration-none">About</Link>
          </li>
        </ul>
      </div>
      <div className="text-center mt-4 border-top pt-3">
          <p className="mb-0">© {new Date().getFullYear()} Job Alert Now. All rights reserved.</p>
        </div>
    </footer>
  );
}
