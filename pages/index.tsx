import React from "react";
import Link from "next/link";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Job Alert Now - Find Your Dream Job</title>
        <meta name="description" content="Your trusted source for the latest job alerts, career opportunities, and professional tips." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Job Alert Now" />
        <meta property="og:description" content="Helping you find your government job - one alert at a time." />
        <meta property="og:image" content="https://picsum.photos/1920/1080" />
        <meta property="og:type" content="website" />
      </Head>

      <div
        className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100"
        style={{
          backgroundImage: `url("/Web-design.jpg")`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
        }}
      >

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
            zIndex: 1,
          }}
        ></div>

        <div
          className="text-center"
          style={{
            zIndex: 2,
            maxWidth: "600px",
            color: "#ffffff",
            // textShadow: "0px 0px 10px rgba(255, 253, 253, 0.8)",
          }}
        >
          <h1 className="mb-4"><strong>Job Alert Now</strong></h1>
          <p className="mb-4">
            Your trusted source for the latest job alerts, career opportunities, and professional tips. Helping you find your government job - one alert at a time.
          </p>
          <Link href="/auth" className="btn btn-primary btn-lg">
            Login / Signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
