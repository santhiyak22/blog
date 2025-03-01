import Link from "next/link";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
  
      <Head>
        <title>About Us - Job Alert Now</title>
        <meta name="description" content="Learn more about Job Alert Now, your trusted source for career opportunities in government and state sectors." />
        <meta name="keywords" content="job alert, government jobs, state jobs, career opportunities" />
        <meta name="author" content="Job Alert Now Team" />
        <meta property="og:title" content="About Us - Job Alert Now" />
        <meta property="og:description" content="We connect talents with the right roles and help build a brighter future in government and state sectors." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/about" />
        <meta property="og:image" content="/about-cover.jpg" />
      </Head>

      <div className="container mt-5">
        <div className="card shadow-lg border-0 rounded-4 p-5 bg-light">
          <h1 className="text-center text-primary fw-bold mb-4">About</h1>
          <p className="text-center">
            Welcome to <strong>Job Alert Now</strong>, your trusted source for career opportunities in public service.
            We connect talents with the right roles and help build a brighter future in government and state sectors.
          </p>
          <hr className="my-4" />

          <div className="mt-5">
            <h3 className="fw-bold">🎯 Our Mission</h3>
            <p>
              At <strong>Job Alert Now</strong>, we are committed to uniting professionals with the best career opportunities
              in government and state roles. Our goal is to empower individuals with reliable job updates and career resources.
            </p>
          </div>

          <div className="mt-5">
            <h3 className="fw-bold">🤝 Meet Our Team</h3>
            <p>
              Our dedicated team of career experts and HR professionals work tirelessly to bring you the latest job openings,
              ensuring that you never miss an opportunity to grow in your field.
            </p>
          </div>
          <hr className="my-4" />

          <div className="mt-5">
            <h3 className="fw-bold">📞 Get in Touch</h3>
            <p>Have questions or suggestions? We’d love to hear from you!</p>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-envelope text-primary me-2"></i>
                Email: <a href="mailto:jobalertnow@gmail.com" className="text-decoration-none fw-bold">jobalertnow@gmail.com</a>
              </li>
              <li>
                <i className="bi bi-instagram text-danger me-2"></i>
                Instagram: <a href="https://instagram.com/jobalertnow" target="_blank" className="text-decoration-none fw-bold">@jobalertnow</a>
              </li>
              <li>
                <i className="bi bi-telephone text-success me-2"></i>
                Phone: <a href="tel:+1234567890" className="text-decoration-none fw-bold">+1 234 567 890</a>
              </li>
            </ul>
          </div>

          <div className="text-center mt-4">
            <Link href="/" className="btn btn-primary fw-bold px-4 shadow">
              <i className="bi bi-house-door me-2"></i> Back to Home
            </Link>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
}
