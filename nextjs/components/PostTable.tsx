// components/PostTable.tsx
"use client";

import { useState, useEffect } from "react";

export default function PostTable({ posts, onDelete }: any) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(posts);

  useEffect(() => {
    const result = posts.filter(
      (p: any) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, posts]);

  return (
    <>
      {/* SEARCH */}
      <input
        placeholder="Search..."
        className="input input-bordered mb-4 w-full max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center opacity-60">
                  No data
                </td>
              </tr>
            ) : (
              filtered.map((post: any) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td className="max-w-xs truncate">{post.content}</td>
                  <td>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => onDelete(post.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}