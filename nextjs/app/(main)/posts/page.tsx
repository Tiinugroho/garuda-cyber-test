"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { getCookie } from "cookies-next";

interface Post {
  id: number;
  title: string;
  content: string;
  user_id: string; // Menyesuaikan UUID jika menggunakan UUID
  created_at: string;
}

interface PaginationData {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // State khusus untuk Modal Hapus
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Menggunakan useCallback agar tidak terjadi infinite loop di useEffect
  const fetchPosts = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const token = getCookie("auth_token");
      
      const response = await axiosInstance.get(`/posts?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPosts(response.data.data);
      setPagination({
        current_page: response.data.meta.current_page,
        last_page: response.data.meta.last_page,
        total: response.data.meta.total,
        per_page: response.data.meta.per_page,
      });
    } catch (error) {
      console.error("Gagal mengambil data posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.last_page) {
      setCurrentPage(newPage);
    }
  };

  // --- LOGIKA DELETE ---
  // 1. Fungsi membuka modal & menyimpan ID
  const openDeleteModal = (id: number) => {
    setPostToDelete(id);
    const modal = document.getElementById("delete_modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  // 2. Fungsi eksekusi hapus API
  const confirmDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    
    try {
      const token = getCookie("auth_token");
      // Menembak endpoint DELETE /api/posts/{id}
      await axiosInstance.delete(`/posts/${postToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Jika sukses, tutup modal dan refresh tabel
      const modal = document.getElementById("delete_modal") as HTMLDialogElement;
      if (modal) modal.close();
      
      // Refresh tabel di halaman saat ini
      fetchPosts(currentPage);
      
    } catch (error: any) {
      // Tangkap Error Policy (403 Forbidden) dari Laravel
      if (error.response?.status === 403) {
        alert("Akses Ditolak: Anda hanya dapat menghapus post milik Anda sendiri.");
      } else {
        alert("Terjadi kesalahan saat menghapus post.");
      }
    } finally {
      setIsDeleting(false);
      setPostToDelete(null); // Reset state
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header */}
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

      {/* Tabel */}
      <div className="border border-base-300 rounded-box bg-base-100">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200 text-base-content text-sm">
                <th className="w-16 text-center">No</th>
                <th>Judul Post</th>
                <th>Tanggal Dibuat</th>
                <th className="text-center w-48">Aksi</th>
              </tr>
            </thead>
            
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
                posts.map((post, index) => {
                  const rowNumber = pagination 
                    ? (pagination.current_page - 1) * pagination.per_page + index + 1
                    : index + 1;

                  return (
                    <tr key={post.id}>
                      <td className="text-center font-medium">{rowNumber}</td>
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
                          {/* Tombol Hapus Sekarang Membuka Modal */}
                          <button 
                            onClick={() => openDeleteModal(post.id)}
                            className="btn btn-sm btn-outline btn-error"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
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

      {/* MODAL KONFIRMASI HAPUS */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box border-t-4 border-error">
          <h3 className="font-bold text-lg text-error flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Konfirmasi Hapus
          </h3>
          <p className="py-4 font-medium text-base-content/80">
            Apakah Anda yakin ingin menghapus post ini secara permanen? Data yang telah dihapus tidak dapat dikembalikan.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline" disabled={isDeleting}>Batal</button>
            </form>
            <button 
              className="btn btn-error btn-outline" 
              onClick={confirmDelete} 
              disabled={isDeleting}
            >
              {isDeleting ? <span className="loading loading-spinner"></span> : "Ya, Hapus Post"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button disabled={isDeleting}>close</button>
        </form>
      </dialog>

    </div>
  );
}