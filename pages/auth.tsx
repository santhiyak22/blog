import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isLogin ? "/api/login" : "/api/register";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok && isLogin) {
      localStorage.setItem("token", data.token);
      router.push("/Dashboard");
    }
  };

  return (
    <>
      <Head>
        <title>{isLogin ? "Login" : "Register"} - Job Alert Now</title>
        <meta name="description" content="Login or register to access job alerts and career opportunities on Job Alert Now." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={isLogin ? "Login" : "Register"} />
        <meta property="og:description" content="Secure access to job alerts and career resources." />
        <meta property="og:type" content="website" />
      </Head>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4">
              <h2 className="text-center">{isLogin ? "Login" : "Register"}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {isLogin ? "Login" : "Register"}
                </button>
              </form>
              <p className="text-center mt-3">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
              {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}