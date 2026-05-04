"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });

    // 🔥 hapus error saat user mulai ngetik
    setErrors({ ...errors, [field]: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      router.push("/login");

    } catch (err: any) {
      console.log(err);

      if (err.errors) {
        setErrors(err.errors); // 🔥 ambil semua error field
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {/* NAME */}
          <div>
            <input
              placeholder="Name"
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">
                {errors.name[0]}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">
                {errors.email[0]}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password[0]}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
}