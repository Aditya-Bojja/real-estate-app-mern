import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null); //needed?
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-2xl font-semibold text-center my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="p-2 border rounded-lg"
          onChange={handleFormChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-2 border rounded-lg"
          onChange={handleFormChange}
        />
        <button
          className="p-2 text-white uppercase rounded-lg bg-slate-700 hover:opacity-90 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 mt-4">
        {/* Remove ' in Don't incase of any error */}
        <p>{`Don't have an account?`}</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>

      <p className="mt-2 text-red-600">{error}</p>
    </div>
  );
}

export default SignIn;
