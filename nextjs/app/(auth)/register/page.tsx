"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axiosInstance.post("/register", { name, email, password });
      router.push("/login");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Gagal melakukan registrasi. Pastikan email belum digunakan."
      );
      const modal = document.getElementById("error_modal") as HTMLDialogElement;
      if (modal) modal.showModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 h-screen w-full overflow-hidden">
      <div className="hero-content flex-col lg:flex-row w-full max-w-5xl justify-between gap-10">
        
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-5xl font-bold">Join Us!</h1>
          <p className="py-6 text-base-content/80 text-lg">
            Daftarkan diri Anda untuk mendapatkan akses penuh. Bergabunglah sekarang untuk mulai mempublikasikan dan mengelola post Anda secara mandiri di platform ini.
          </p>
        </div>

        {/* Hapus shadow-2xl, ganti dengan border */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 border border-base-300 rounded-box">
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              
              <label className="label font-medium pb-1">Nama Lengkap</label>
              <label className="input w-full">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input 
                  type="text" 
                  placeholder="Nama Anda" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              </label>

              <label className="label font-medium pb-1 mt-2">Email</label>
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
                <span className="opacity-70">Sudah punya akun? </span>
                <Link href="/login" className="link link-hover text-primary font-semibold">Sign In</Link>
              </div>

              {/* Tombol menggunakan class btn-outline */}
              <button type="submit" className="btn btn-outline btn-primary mt-4 w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : "Register"}
              </button>
            </fieldset>
          </form>
        </div>

      </div>

      <dialog id="error_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error">Registrasi Gagal!</h3>
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