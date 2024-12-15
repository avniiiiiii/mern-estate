import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { OAuth } from "../components/OAuth";
const Signup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //React Hook that allows you to add state to functional components. It provides a way to manage and update the state in a React component.
  //  const [state, setState] = useState(initialValue);state: The current state value.
  //setState: A function to update the state.
  //initialValue: The initial value of the state//
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //The handleSubmit function prevents the default form submission behavior using e.preventDefault().

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      {" "}
      <h1 className="text-3xl text-center font-semibold my-7  text-gray-800 ">
        Sign up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-700  p-3 rounded-lg "
          id="username"
          onChange={handleChange}
        />{" "}
        <input
          type="email"
          placeholder="Email Id"
          className="border border-gray-700 p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />{" "}
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-700 p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-red-300 text-gray-600 font-semibold uppercase hover:opacity-95 disabled:opacity-80 p-3 rounded-lg">
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className=" text-gray-800">Have an account?</p>{" "}
        <Link to={"/sign-in"}>
          <span className="text-red-400">Sign In </span>
        </Link>
      </div>
      {error && <p className="text-red-500 m">{error}</p>}
    </div>
  );
};

export default Signup;
