-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2026 at 04:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `garuda_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_04_075016_create_personal_access_tokens_table', 1),
(5, '2026_05_04_075424_create_posts_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` char(36) NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', '019df23c-d85c-734e-88c0-91c590adc4b3', 'auth_token', '4c73c35d0fb819c76760d7e86b9f71a03d0da28f7b18bb1aafd41432c11717e2', '[\"*\"]', '2026-05-04 02:24:18', NULL, '2026-05-04 02:11:03', '2026-05-04 02:24:18'),
(2, 'App\\Models\\User', '019df23c-d85c-734e-88c0-91c590adc4b3', 'auth_token', 'a548317acf3f270f32b8f8b4b1187e38bd37884fd1ae6396d24486fc9d0f8341', '[\"*\"]', '2026-05-04 02:27:37', NULL, '2026-05-04 02:24:25', '2026-05-04 02:27:37'),
(3, 'App\\Models\\User', '019df23c-d85c-734e-88c0-91c590adc4b3', 'auth_token', 'ae9a258682b6afc37db145a2b2aa19da6cf44e2df77adbab09ebaa22ac462000', '[\"*\"]', '2026-05-04 02:34:51', NULL, '2026-05-04 02:27:54', '2026-05-04 02:34:51'),
(4, 'App\\Models\\User', '019df23c-d85c-734e-88c0-91c590adc4b3', 'auth_token', '746eb9eb6cbe96cba76fabdfcf88b6e004bb95c77b12286bbc637929b4308d71', '[\"*\"]', '2026-05-05 08:17:23', NULL, '2026-05-05 08:05:43', '2026-05-05 08:17:23'),
(7, 'App\\Models\\User', '019df8ea-49b6-701c-a559-398a6388053a', 'auth_token', '3ed239d16a46925de8d5cd460ad01ff795a00fcc19fd42fc9155a42a29ee7164', '[\"*\"]', '2026-05-05 09:23:04', NULL, '2026-05-05 09:13:44', '2026-05-05 09:23:04');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `content`, `created_at`, `updated_at`) VALUES
('019df8e9-0da1-72f0-b41a-0fa1de20b08b', '019df23c-d85c-734e-88c0-91c590adc4b3', 'Testing 45', 'Lorem Ipsum Dolor sit amet', '2026-05-05 09:11:56', '2026-05-05 09:12:09'),
('019df8f0-abdd-70ed-8529-0a4c154c076e', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 1', 'Lorem ipsum 1', '2026-05-05 09:20:15', '2026-05-05 09:20:15'),
('019df8f0-ddf4-714d-bfde-660bcd03809a', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 2', 'Lorem ipsum 2', '2026-05-05 09:20:28', '2026-05-05 09:20:28'),
('019df8f1-1e8e-73dc-82a7-e170f7158d19', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 3', 'Lorem ipsum 3', '2026-05-05 09:20:44', '2026-05-05 09:20:44'),
('019df8f1-be9a-7388-87cf-ab1e778ba9e1', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 4', 'Lorem ipsum 4', '2026-05-05 09:21:25', '2026-05-05 09:21:25'),
('019df8f2-1937-718b-82b8-bb857fcd30d6', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 5', 'Lorem ipsum 5', '2026-05-05 09:21:48', '2026-05-05 09:21:48'),
('019df8f2-451a-734d-a488-58ea22eaba01', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 6', 'Lorem ipsum 6', '2026-05-05 09:22:00', '2026-05-05 09:22:00'),
('019df8f2-7b8b-72e3-ae5d-f7bd9cf1a202', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 7', 'Lorem ipsum 7', '2026-05-05 09:22:14', '2026-05-05 09:22:14'),
('019df8f2-9d01-73ad-a40e-685611b0febb', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 8', 'Lorem ipsum 8', '2026-05-05 09:22:22', '2026-05-05 09:22:22'),
('019df8f2-c911-730c-969e-22413e417807', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 9', 'Lorem ipsum 9', '2026-05-05 09:22:34', '2026-05-05 09:22:34'),
('019df8f2-ee48-70e9-9c84-ff7ae769cd3d', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 10', 'Lorem ipsum 10', '2026-05-05 09:22:43', '2026-05-05 09:22:43'),
('019df8f3-19a1-7152-8d40-a0b8feaff4fe', '019df8ea-49b6-701c-a559-398a6388053a', 'Testing 11', 'Lorem ipsum 11', '2026-05-05 09:22:54', '2026-05-05 09:22:54');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
('019df23c-d85c-734e-88c0-91c590adc4b3', 'Jati', 'abynngaming@gmail.com', NULL, '$2y$12$QivRbco0gtjGpZ3aRoMbbe8C/F2Q0m9hzlbVHKzxHNX.7aEXLoR9q', NULL, '2026-05-04 02:06:07', '2026-05-04 02:06:07'),
('019df8ea-49b6-701c-a559-398a6388053a', 'Testing', 'testing@gmail.com', NULL, '$2y$12$FLseLoAja1vmFl6vNAs6hO3SziXeU6ET4grHLAhUgv7BwHj/u1DJ2', NULL, '2026-05-05 09:13:17', '2026-05-05 09:13:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_user_id_foreign` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
