"use client";

import { useState, useEffect } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import axiosInstance from "@/lib/axios";

export default function Navbar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userName, setUserName] = useState("Loading...");

  // Ambil data user saat komponen pertama kali di-render
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getCookie("auth_token");
        if (token) {
          const response = await axiosInstance.get("/user", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserName(response.data.name);
        }
      } catch (error) {
        setUserName("Guest");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = getCookie("auth_token");
      if (token) {
        await axiosInstance.post("/logout", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Gagal logout di sisi server", error);
    } finally {
      deleteCookie("auth_token");
      window.location.href = "/login";
    }
  };

  const openLogoutModal = () => {
    const modal = document.getElementById("logout_modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  return (
    <>
      <nav className="navbar w-full bg-base-100 border-b border-base-300 px-4">
        <div className="flex-none">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5">
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
        </div>
        
        {/* Bagian Kiri: Nama User diletakkan di sini */}
        <div className="flex-1 text-lg ml-2">
          <span className="font-medium hidden sm:inline">Halo, </span>
          <span className="font-bold text-primary">{userName}</span>
        </div>
        
        {/* Bagian Kanan: Tombol Logout Berwarna Solid */}
        <div className="flex-none items-center">
          <button onClick={openLogoutModal} className="btn btn-error">
            Logout
          </button>
        </div>
      </nav>

      {/* MODAL KONFIRMASI LOGOUT */}
      <dialog id="logout_modal" className="modal">
        <div className="modal-box border-t-4 border-error">
          <h3 className="font-bold text-lg text-error flex items-center gap-2">
            Konfirmasi Keluar
          </h3>
          <p className="py-4 font-medium">
            Apakah Anda yakin ingin keluar dari aplikasi? Anda harus login kembali untuk mengakses dashboard.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline" disabled={isLoggingOut}>Batal</button>
            </form>
            {/* Tombol Logout di dalam modal juga disesuaikan warnanya */}
            <button 
              className="btn btn-error" 
              onClick={handleLogout} 
              disabled={isLoggingOut}
            >
              {isLoggingOut ? <span className="loading loading-spinner"></span> : "Ya, Logout"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button disabled={isLoggingOut}>close</button>
        </form>
      </dialog>
    </>
  );
}