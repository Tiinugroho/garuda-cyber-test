"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { getCookie } from "cookies-next";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State khusus untuk menangkap error validasi (422) dari Laravel
  const [errors, setErrors] = useState<{ title?: string[]; content?: string[] }>({});
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      const token = getCookie("auth_token");
      
      // Tembak endpoint POST /api/posts[cite: 2]
      await axiosInstance.post(
        "/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      router.push("/posts");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert("Terjadi kesalahan saat menyimpan post. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      
      <div className="flex justify-between items-center border-b border-base-300 pb-4">
        <div>
          <h1 className="text-3xl font-bold">Buat Post Baru</h1>
          <p className="text-base-content/70 mt-1">Tulis artikel atau konten baru Anda di sini.</p>
        </div>
        <Link href="/posts" className="btn btn-outline">
          Kembali
        </Link>
      </div>

      <div className="border border-base-300 rounded-box bg-base-100 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <fieldset className="fieldset w-full">
            <label className="label font-medium pb-1">Judul Post</label>
            <input 
              type="text" 
              placeholder="Masukkan judul artikel" 
              className={`input w-full border-base-300 ${errors.title ? "input-error" : ""}`} 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors.title && (
              <span className="text-error text-sm mt-1">{errors.title[0]}</span>
            )}
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label font-medium pb-1 mt-2">Konten</label>
            <textarea 
              placeholder="Tulis isi post Anda di sini..." 
              className={`textarea w-full h-48 border-base-300 text-base ${errors.content ? "textarea-error" : ""}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            {errors.content && (
              <span className="text-error text-sm mt-1">{errors.content[0]}</span>
            )}
          </fieldset>

          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-base-200">
            <Link href="/posts" className="btn btn-outline">
              Batal
            </Link>
            <button type="submit" className="btn btn-primary btn-outline" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Simpan Post"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}