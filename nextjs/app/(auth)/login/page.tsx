"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { setCookie } from "cookies-next";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axiosInstance.post("/login", { email, password });
      setCookie("auth_token", response.data.access_token);
      router.push("/posts");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Kredensial tidak valid atau terjadi kesalahan server."
      );
      const modal = document.getElementById("error_modal") as HTMLDialogElement;
      if (modal) modal.showModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 h-screen w-full overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-5xl justify-between gap-10">
        
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-5xl font-bold">Sign In Now!</h1>
          <p className="py-6 text-base-content/80 text-lg">
            Selamat datang di portal manajemen Garuda Cyber Test. Silakan masuk menggunakan kredensial yang valid untuk mulai mengelola, membuat, dan mempublikasikan post Anda.
          </p>
        </div>

        {/* Hapus shadow-2xl, ganti dengan border yang rapi agar terlihat flat */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 border border-base-300 rounded-box">
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset">
              
              <label className="label font-medium pb-1">Email</label>
              <label className="input validator w-full">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input 
                  type="email" 
                  placeholder="mail@site.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </label>
              <div className="validator-hint hidden text-xs">Enter valid email address</div>

              <label className="label font-medium pb-1 mt-2">Password</label>
              <label className="input validator w-full">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </label>

              <div className="mt-2 text-sm">
                <span className="opacity-70">Belum punya akun? </span>
                <Link href="/register" className="link link-hover text-primary font-semibold">Sign Up</Link>
              </div>

              {/* Tombol menggunakan class btn-outline */}
              <button type="submit" className="btn btn-outline btn-primary mt-4 w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : "Login"}
              </button>
            </fieldset>
          </form>
        </div>

      </div>

      <dialog id="error_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error">Login Gagal!</h3>
          <p className="py-4">{errorMessage}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}