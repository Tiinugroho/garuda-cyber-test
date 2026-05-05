"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { getCookie } from "cookies-next";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const [loading, setLoading] = useState(false); 
  const [fetching, setFetching] = useState(true);
  
  const [errors, setErrors] = useState<{ title?: string[]; content?: string[] }>({});

  // Mengambil data post berdasarkan ID saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = getCookie("auth_token");
        
        // GET /api/posts/{id}
        const response = await axiosInstance.get(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const postData = response.data.data || response.data;
        setTitle(postData.title);
        setContent(postData.content);
      } catch (error: any) {
        console.error("Gagal mengambil data post", error);
        
        if (error.response?.status === 403 || error.response?.status === 404) {
          alert("Anda tidak memiliki akses untuk mengedit post ini atau post tidak ditemukan.");
          router.push("/posts");
        }
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      const token = getCookie("auth_token");
      
      await axiosInstance.put(
        `/posts/${id}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      router.push("/posts");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert("Terjadi kesalahan saat memperbarui post. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      
      <div className="flex justify-between items-center border-b border-base-300 pb-4">
        <div>
          <h1 className="text-3xl font-bold">Edit Post</h1>
          <p className="text-base-content/70 mt-1">Perbarui judul atau konten artikel Anda.</p>
        </div>
        <Link href="/posts" className="btn btn-outline">
          Kembali
        </Link>
      </div>

      <div className="border border-base-300 rounded-box bg-base-100 p-6">
        {fetching ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
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
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : "Perbarui Post"}
              </button>
            </div>

          </form>
        )}
      </div>

    </div>
  );
}