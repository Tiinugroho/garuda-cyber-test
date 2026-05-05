// Lokasi: app/(main)/posts/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { getCookie } from "cookies-next";

// Interface disesuaikan dengan PostResource dari Laravel
interface PostDetail {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user?: {
    id: number;
    name: string;
  };
}

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const token = getCookie("auth_token");
        
        // Memanggil API GET /posts/{id}[cite: 2]
        const response = await axiosInstance.get(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Menyesuaikan dengan response JSON dari PostResource Laravel
        setPost(response.data.data);
      } catch (error: any) {
        console.error("Gagal mengambil detail post", error);
        if (error.response?.status === 404) {
          alert("Post tidak ditemukan!");
          router.push("/posts");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostDetail();
    }
  }, [id, router]);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-base-300 pb-4">
        <div>
          <h1 className="text-3xl font-bold">Detail Post</h1>
          <p className="text-base-content/70 mt-1">Melihat konten artikel secara penuh.</p>
        </div>
        <Link href="/posts" className="btn btn-outline">
          Kembali
        </Link>
      </div>

      {/* Konten Card (Flat Design) */}
      <div className="border border-base-300 rounded-box bg-base-100 p-6 md:p-10">
        {loading ? (
          // State Loading
          <div className="flex flex-col gap-4 py-10">
            <div className="skeleton h-10 w-3/4"></div>
            <div className="skeleton h-4 w-1/4 mb-4"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
          </div>
        ) : !post ? (
          // State Jika Data Kosong
          <div className="text-center py-20 text-base-content/60">
            Data tidak ditemukan.
          </div>
        ) : (
          // State Jika Data Berhasil Dimuat
          <article className="flex flex-col gap-6">
            
            {/* Judul & Meta Info */}
            <header className="border-b border-base-200 pb-6">
              <h2 className="text-4xl font-extrabold text-base-content leading-tight">
                {post.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-base-content/60 font-medium">
                <div className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                  </svg>
                  {/* Menampilkan nama relasi user jika ada */}
                  {post.user?.name || "Penulis Tidak Diketahui"}
                </div>
                <div className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                  </svg>
                  {new Date(post.created_at).toLocaleDateString('id-ID', {
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  })}
                </div>
              </div>
            </header>

            {/* Isi Konten */}
            <div className="text-lg leading-relaxed text-base-content/90 whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Footer / Aksi Tambahan */}
            <div className="mt-8 pt-6 border-t border-base-200 flex justify-end gap-3">
              <Link href={`/posts/${post.id}/edit`} className="btn btn-warning btn-outline">
                Edit Post
              </Link>
            </div>

          </article>
        )}
      </div>

    </div>
  );
}