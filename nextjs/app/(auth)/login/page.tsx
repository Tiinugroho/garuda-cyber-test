"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      const res = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      localStorage.setItem("token", res.access_token);
      router.push("/dashboard");

    } catch (err: any) {
      console.log(err);

      if (err.errors) {
        setErrors(err.errors);
      } else {
        setErrors({ general: err.message });
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* GENERAL ERROR */}
        {errors.general && (
          <div className="alert alert-error">
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <div>
            <input
              type="email"
              placeholder="Email"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}