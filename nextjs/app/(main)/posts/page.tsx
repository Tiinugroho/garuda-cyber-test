// Lokasi: app/(main)/posts/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { getCookie } from "cookies-next";

// Sesuaikan interface ini dengan struktur JSON dari API Laravel kamu
interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
}

interface PaginationData {
  current_page: number;
  last_page: number;
  total: number;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Fungsi untuk mengambil data dengan parameter halaman
  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const token = getCookie("auth_token");
      
      const response = await axiosInstance.get(`/posts?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Asumsi response Laravel menggunakan format resource standard: response.data.data
      setPosts(response.data.data);
      setPagination({
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        total: response.data.total,
      });
    } catch (error) {
      console.error("Gagal mengambil data posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.last_page) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-base-300 pb-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Posts</h1>
          <p className="text-base-content/70 mt-1">Lihat, tambah, edit, dan hapus artikel kamu.</p>
        </div>
        <Link href="/posts/create" className="btn btn-primary btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Buat Post Baru
        </Link>
      </div>

      {/* Data Table Section */}
      <div className="border border-base-300 rounded-box bg-base-100">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-base-200 text-base-content text-sm">
                <th className="w-16 text-center">ID</th>
                <th>Judul Post</th>
                <th>Tanggal Dibuat</th>
                <th className="text-center w-48">Aksi</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-10">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-base-content/60">
                    Belum ada post yang ditambahkan.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td className="text-center font-medium">{post.id}</td>
                    <td className="font-semibold">{post.title}</td>
                    <td>{new Date(post.created_at).toLocaleDateString('id-ID')}</td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <Link href={`/posts/${post.id}`} className="btn btn-sm btn-outline btn-info">
                          Detail
                        </Link>
                        <Link href={`/posts/${post.id}/edit`} className="btn btn-sm btn-outline btn-warning">
                          Edit
                        </Link>
                        {/* Tombol Hapus: idealnya memanggil fungsi onClick konfirmasi delete */}
                        <button className="btn btn-sm btn-outline btn-error">
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls Server-Side */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex justify-center mt-4">
          <div className="join border border-base-300">
            <button 
              className="join-item btn btn-outline bg-base-100" 
              disabled={pagination.current_page === 1}
              onClick={() => handlePageChange(pagination.current_page - 1)}
            >
              «
            </button>
            <button className="join-item btn btn-outline bg-base-100 pointer-events-none">
              Hal {pagination.current_page} dari {pagination.last_page}
            </button>
            <button 
              className="join-item btn btn-outline bg-base-100" 
              disabled={pagination.current_page === pagination.last_page}
              onClick={() => handlePageChange(pagination.current_page + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}

    </div>
  );
}