-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 21, 2021 at 11:05 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gabreel`
--

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `user_id`, `follow_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2021-08-21 02:18:29', '2021-08-21 02:18:29'),
(2, 2, 1, '2021-08-21 02:18:29', '2021-08-21 02:18:29');

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `content`, `type`, `image_url`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'hello', 'image', 'http://img.soradev.tech/inspiration.jpg', 1, '2021-08-20 19:05:14', '2021-08-20 19:05:14'),
(2, 'hello there', 'text', NULL, 2, '2021-08-20 21:59:24', '2021-08-20 21:59:24');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
