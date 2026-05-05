# Garuda Cyber Technical Test - Post Management App

Aplikasi web untuk manajemen artikel (Post) yang mengimplementasikan arsitektur *Headless* dengan Laravel (Backend/REST API) dan Next.js (Frontend). Proyek ini dibuat untuk memenuhi tugas *Technical Test* PT Garuda Cyber Indonesia.

## Fitur Utama
1. Authentication: Sign Up, Sign In, dan Sign Out terintegrasi dengan Laravel Sanctum.
2. Post Management (CRUD):
   - Menampilkan daftar post (dengan Server-side Pagination).
   - Melihat detail post.
   - Membuat post baru.
   - Mengedit post (proteksi otorisasi kepemilikan).
   - Menghapus post (proteksi otorisasi kepemilikan).

## Tech Stack
- Backend: Laravel 13, MySQL, Laravel Sanctum (Token-based Auth).
- Frontend: Next.js 16.2.4 (App Router), React, Tailwind CSS, DaisyUI, Axios.

---

## Cara Menginstal dan Menjalankan Proyek

Pastikan telah menginstal PHP, Composer, Node.js, dan MySQL di sistem.

### Bagian 1: Backend (Laravel)
1. Buka terminal dan masuk ke direktori backend:
cd laravel
2. Instal dependensi PHP menggunakan Composer:
composer install
3. Salin file environment dan atur konfigurasi database:
cp .env.example .env
*Buka file `.env` dan sesuaikan `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` dengan database lokal.*
4. Generate *Application Key*:
php artisan key:generate
5. Jalankan migrasi database untuk membuat tabel-tabel yang dibutuhkan
php artisan migrate
6. Jalankan server backend:
php artisan serve
*Backend akan berjalan di `[http://127.0.0.1:8000](http://127.0.0.1:8000)`.*

### Bagian 2: Frontend (Next.js)
1. Buka terminal baru dan masuk ke direktori frontend:
cd nextjs
2. Instal dependensi Node.js:
npm install
3. Jalankan server *development*:
npm run dev
*Frontend akan berjalan di `http://localhost:3000`.*

---

## Catatan Keputusan Teknis

1. Arsitektur Pemisahan (Headless):
Proyek ini memisahkan frontend (Next.js) dan backend (Laravel) secara penuh. Backend murni bertindak sebagai penyedia REST API yang mengembalikan response berupa JSON, dan tidak merender tampilan web (Blade) sama sekali. Ini menunjukkan pemahaman yang konsisten di berbagai framework modern.

2. Server-Side Pagination:
Sesuai dengan ketentuan tes, pagination dilakukan di sisi server menggunakan metode `paginate()` dari Laravel. Frontend memanipulasi parameter `?page=` pada URL request, sehingga pengiriman data jauh lebih ringan dan optimal.

3. Keamanan & Otorisasi Kepemilikan:
Syarat utama bahwa user hanya dapat mengedit dan menghapus post miliknya sendiri ditangani secara ketat di backend menggunakan:
- Filter Query: Fungsi `index` memfilter data menggunakan relasi `$request->user()->posts()`.
- Laravel Policies: Menggunakan `PostPolicy` dan `Gate::authorize()` untuk melindungi endpoint `update` dan `destroy` agar menolak akses (HTTP 403 Forbidden) jika diakses oleh user yang bukan pembuat post.

4. Pengamanan Cache Router Next.js (Logout):
Fungsi *Logout* melakukan *Hard Redirect* (`window.location.href`) setelah menghapus *cookie*. Keputusan ini diambil secara sadar untuk membersihkan *Router Cache* bawaan Next.js, sehingga user tidak bisa menggunakan tombol *Back* pada *browser* untuk kembali ke halaman *dashboard* setelah keluar.

5. Antarmuka (UI) DaisyUI:
Aplikasi menggunakan komponen default dari DaisyUI (versi terbaru) tanpa memodifikasi desain yang kompleks, dengan pendekatan *Flat Design* (tanpa shadow tebal) untuk menghasilkan tampilan yang bersih, rapi, dan profesional.