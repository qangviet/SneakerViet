-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2024 at 09:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web-ban-giay`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` int(5) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`email`, `password`, `role`, `create_at`) VALUES
('daica@gmail.com', 'quangviet22', 1, '2024-03-27 10:09:03'),
('truongviet@gmail.com', 'vietdz', 1, '2024-03-27 09:55:48'),
('viet1@gmail.com', 'vietdz', 1, '2024-03-27 10:05:51'),
('viet@gmail.com', 'viet', 1, '2024-03-27 09:58:40');

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `name` varchar(50) NOT NULL,
  `categories` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`name`, `categories`, `create_at`) VALUES
('Adidas', '[\"Stan Smith\",\"Superstar\",\"Utra Boost\",\"Yeazy\",\"XPLR\",\"NMD\",\"Falcon\",\"Human Race\",\"Các dòng Adidas khác\"]', '2024-04-08 23:26:40'),
('Converse', '[\"Converse Run Star\",\"Converse Chuck 1970s\",\"Converse All Star\",\"Converse One Star\",\"Converse Chuck Taylor\"]', '2024-04-08 23:26:40'),
('Jordan', '[\"Air Jordan 3\",\"Air Jordan 4\",\"Air Jordan 5\",\"Air Jordan 6\",\"Air Jordan 11\",\"Air Jordan 34\",\"Air Jordan 35\",\"Các dòng Jordan khác\"]', '2024-04-08 23:26:40'),
('MLB', '[\"MLB Chunky\",\"MLB Liner\",\"MLB Playball\",\"MLB Mule\"]', '2024-04-08 23:26:40'),
('New Balance', '[\"New Balance 372\",\"New Balance 550\",\"New Balance 574\",\"Các dòng New Balance khác\"]', '2024-04-08 23:26:40'),
('Nike', '[\"Air Force 1\",\"Air Max\",\"Air Zoom\",\"Nike Cortez\",\"Nike Blazer\",\"Nike Dunk\",\"Nike LeBron\",\"Nike Kyrie\",\"Các dòng Nike khác\"]', '2024-04-08 23:26:40');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `name` varchar(50) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`name`, `create_at`) VALUES
('Air Force 1', '2024-04-08 23:25:54'),
('Air Jordan 11', '2024-04-08 23:25:54'),
('Air Jordan 3', '2024-04-08 23:25:54'),
('Air Jordan 34', '2024-04-08 23:25:54'),
('Air Jordan 35', '2024-04-08 23:25:54'),
('Air Jordan 4', '2024-04-08 23:25:54'),
('Air Jordan 5', '2024-04-08 23:25:54'),
('Air Jordan 6', '2024-04-08 23:25:54'),
('Air Max', '2024-04-08 23:25:54'),
('Air Zoom', '2024-04-08 23:25:54'),
('Các dòng Adidas khác', '2024-04-08 23:23:19'),
('Các dòng Jordan khác', '2024-04-08 23:25:54'),
('Các dòng New Balance khác', '2024-04-08 23:25:54'),
('Các dòng Nike khác', '2024-04-08 23:25:54'),
('Converse All Star', '2024-04-08 23:25:54'),
('Converse Chuck 1970s', '2024-04-08 23:25:54'),
('Converse Chuck Taylor', '2024-04-08 23:25:54'),
('Converse One Star', '2024-04-08 23:25:54'),
('Converse Run Star', '2024-04-08 23:25:54'),
('Falcon', '2024-04-08 23:23:19'),
('Human Race', '2024-04-08 23:23:19'),
('MLB Chunky', '2024-04-08 23:25:54'),
('MLB Liner', '2024-04-08 23:25:54'),
('MLB Mule', '2024-04-08 23:25:54'),
('MLB Playball', '2024-04-08 23:25:54'),
('New Balance 372', '2024-04-08 23:25:54'),
('New Balance 550', '2024-04-08 23:25:54'),
('New Balance 574', '2024-04-08 23:25:54'),
('Nike Blazer', '2024-04-08 23:25:54'),
('Nike Cortez', '2024-04-08 23:25:54'),
('Nike Dunk', '2024-04-08 23:25:54'),
('Nike Kyrie', '2024-04-08 23:25:54'),
('Nike LeBron', '2024-04-08 23:25:54'),
('NMD', '2024-04-08 23:23:19'),
('Stan Smith', '2024-04-08 23:23:19'),
('Superstar', '2024-04-08 23:23:19'),
('Utra Boost', '2024-04-08 23:23:19'),
('XPLR', '2024-04-08 23:23:19'),
('Yeazy', '2024-04-08 23:23:19');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `code` varchar(25) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand_name` varchar(50) NOT NULL,
  `ctg_name` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `color` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(5) NOT NULL,
  `visibility` varchar(10) NOT NULL,
  `tag` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`code`, `name`, `brand_name`, `ctg_name`, `gender`, `color`, `price`, `discount`, `visibility`, `tag`, `images`) VALUES
('SSV002090424', 'Giày Nike Air Force 1 Shadow ‘Triple White’', 'Nike', 'Air Force 1', 'Unisex', '{\"name\":\"Trắng\",\"size_quan\":[{\"size\":\"37\",\"quantity\":\"10\"},{\"size\":\"38\",\"quantity\":\"5\"},{\"size\":\"39\",\"quantity\":\"10\"},{\"size\":\"39.5\",\"quantity\":\"5\"},{\"size\":\"40\",\"quantity\":\"7\"},{\"size\":\"40.5\",\"quantity\":\"11\"},{\"size\":\"41\",\"quantity\":\"12\"},{\"size\":\"42\",\"quantity\":\"5\"},{\"size\":\"43\",\"quantity\":\"5\"}]}', 600000, 15, 'public', '[\"Giày sinh viên\",\"Giày học sinh\",\"Hot\"]', '[\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764763.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764764.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764770.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764772.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764775.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764777.jpg\"]'),
('SSV003090424', 'Nike Dunk Low Next Nature Beige Sail', 'Nike', 'Nike Dunk', 'Unisex', '{\"name\":\"Màu be\",\"size_quan\":[{\"size\":\"36\",\"quantity\":\"5\"},{\"size\":\"37\",\"quantity\":\"10\"},{\"size\":\"38\",\"quantity\":\"8\"},{\"size\":\"39\",\"quantity\":\"7\"},{\"size\":\"39.5\",\"quantity\":\"5\"},{\"size\":\"40\",\"quantity\":\"10\"},{\"size\":\"40.5\",\"quantity\":\"9\"},{\"size\":\"41\",\"quantity\":\"12\"},{\"size\":\"42\",\"quantity\":\"9\"}]}', 1200000, 20, 'public', '[\"Giày học sinh\",\"Giày sinh viên\"]', '[\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163977.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163981.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163986.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163990.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163994.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163998.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681164003.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681164005.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681164006.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681164007.jpg\"]'),
('SSV004090424', 'New Balance 550 White Shadow Grey', 'New Balance', 'New Balance 550', 'Unisex', '{\"name\":\"Trắng Xám\",\"size_quan\":[{\"size\":\"36\",\"quantity\":\"11\"},{\"size\":\"37\",\"quantity\":\"10\"},{\"size\":\"38\",\"quantity\":\"15\"},{\"size\":\"38.5\",\"quantity\":\"9\"},{\"size\":\"39.5\",\"quantity\":\"12\"},{\"size\":\"40\",\"quantity\":\"13\"},{\"size\":\"41\",\"quantity\":\"20\"},{\"size\":\"42\",\"quantity\":\"22\"},{\"size\":\"43\",\"quantity\":\"16\"},{\"size\":\"44\",\"quantity\":\"8\"}]}', 1500000, 30, 'public', '[\"Giày thời trang\",\"hot 2023\"]', '[\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681972985.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681972986.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681972992.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681972997.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973001.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973004.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973008.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973011.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973015.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973018.jpg\"]'),
('SSV005090424', 'Nike Air Jordan 1 Retro High OG Black White 2.0', 'Jordan', 'Các dòng Jordan khác', 'Unisex', '{\"name\":\"Trắng đen\",\"size_quan\":[{\"size\":\"40\",\"quantity\":\"31\"},{\"size\":\"40.5\",\"quantity\":\"16\"},{\"size\":\"41\",\"quantity\":\"29\"},{\"size\":\"42\",\"quantity\":\"25\"},{\"size\":\"43\",\"quantity\":\"17\"},{\"size\":\"44\",\"quantity\":\"10\"}]}', 1500000, 20, 'public', '[\"hot search\"]', '[\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866381.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866383.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866387.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866390.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866393.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866408.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866417.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866421.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866428.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866432.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866434.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866436.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866439.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866442.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866444.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866446.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866449.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `avatar` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `gender` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `avatar`, `address`, `phone`, `email`, `gender`) VALUES
(1, 'Quang Viet', NULL, NULL, '0347039022', 'truongviet@gmail.com', 'Male'),
(2, 'Truong Viet', NULL, NULL, '0345973106', 'viet@gmail.com', 'Female'),
(3, 'Truong Viet', NULL, NULL, '0123456789', 'viet1@gmail.com', 'Male'),
(4, 'Dai ca', NULL, NULL, '0321456789', 'daica@gmail.com', 'Male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`code`),
  ADD KEY `brand_name` (`brand_name`),
  ADD KEY `ctg_name` (`ctg_name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`brand_name`) REFERENCES `brand` (`name`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`ctg_name`) REFERENCES `category` (`name`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`email`) REFERENCES `account` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
