-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2024 at 06:20 PM
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
('Adidas', '[\"Stan Smith\",\"Superstar\",\"Utra Boost\",\"Yeezy\",\"XPLR\",\"NMD\",\"Falcon\",\"Human Race\",\"Các dòng Adidas khác\"]', '2024-04-08 23:26:40'),
('Converse', '[\"Converse Run Star\",\"Converse Chuck 1970s\",\"Converse All Star\",\"Converse One Star\",\"Converse Chuck Taylor\"]', '2024-04-08 23:26:40'),
('Jordan', '[\"Air Jordan 3\",\"Air Jordan 4\",\"Air Jordan 5\",\"Air Jordan 6\",\"Air Jordan 1\",\"Air Jordan 34\",\"Air Jordan 35\",\"Các dòng Jordan khác\"]', '2024-04-08 23:26:40'),
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
('Air Jordan 1', '2024-04-08 23:25:54'),
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
('Yeezy', '2024-04-08 23:23:19');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` char(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` char(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `delivery` varchar(15) NOT NULL,
  `paymentMethod` varchar(25) NOT NULL,
  `address` varchar(255) NOT NULL,
  `products` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `dateOrder` char(15) NOT NULL,
  `status` varchar(20) NOT NULL,
  `total` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `name`, `email`, `phone`, `delivery`, `paymentMethod`, `address`, `products`, `dateOrder`, `status`, `total`, `user_id`, `create_at`) VALUES
('OD08052400001', 'ABCD', 'a@gmail.com', '0123151851', 'in-shop', 'Chuyển khoản ngân hàng', 'Tại cửa hàng: Số 206 Đường Cổ Loa, Xã Cổ Loa, Huyện Đông Anh, Hà Nội', '[{\"name\":\"Giày adidas Yeezy Boost 700 ‘Enflame Amber’ GW0297\",\"price\":2400000,\"size\":\"39\",\"color\":\"Lửa (Hổ phách)\",\"quantity\":2},{\"name\":\"New Balance 550 White Shadow Grey\",\"price\":1050000,\"size\":\"37\",\"color\":\"Trắng Xám\",\"quantity\":1}]', '08/05/2024', 'Đợi thanh toán', 5850000, NULL, '2024-05-08 13:41:03'),
('OD15052400001', 'Trương Quang Việt', 'test@gmail.com', '0123456789', 'ship', 'Chuyển khoản ngân hàng', '..., Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội', '[{\"name\":\"Giày adidas Yeezy Boost 700 ‘Enflame Amber’ GW0297\",\"price\":2400000,\"size\":\"41\",\"color\":\"Lửa (Hổ phách)\",\"quantity\":2},{\"name\":\"New Balance 550 White Shadow Grey\",\"price\":1050000,\"size\":\"38\",\"color\":\"Trắng Xám\",\"quantity\":2},{\"name\":\"Nike Air Jordan 1 Retro High OG Black White 2.0\",\"price\":1200000,\"size\":\"41\",\"color\":\"Trắng đen\",\"quantity\":1}]', '15/05/2024', 'Đợi thanh toán', 8130000, NULL, '2024-05-15 16:25:08'),
('OD15052400002', 'Trương Quang Việt', 'abc@gmail.com', '0123456789', 'in-shop', 'Chuyển khoản ngân hàng', 'Tại cửa hàng: Số 206 Đường Cổ Loa, Xã Cổ Loa, Huyện Đông Anh, Hà Nội', '[{\"name\":\"Giày Nike Air Force 1 Shadow ‘Triple White’\",\"price\":600000,\"size\":\"39\",\"color\":\"Trắng\",\"quantity\":1},{\"name\":\"Nike Dunk Low Next Nature Beige Sail\",\"price\":960000,\"size\":\"37\",\"color\":\"Màu be\",\"quantity\":1}]', '15/05/2024', 'Thành công', 1560000, NULL, '2024-05-15 16:43:47'),
('OD15052400003', 'Trương Quang Việt', 'test@gmail.com', '0123591691', 'ship', 'Chuyển khoản ngân hàng', ' , Thị trấn Lương Sơn, Huyện Bắc Bình, Bình Thuận', '[{\"name\":\"Giày adidas Yeezy Boost 700 ‘Enflame Amber’ GW0297\",\"price\":2400000,\"size\":\"41\",\"color\":\"Lửa (Hổ phách)\",\"quantity\":2},{\"name\":\"New Balance 550 White Shadow Grey\",\"price\":1050000,\"size\":\"38\",\"color\":\"Trắng Xám\",\"quantity\":2},{\"name\":\"Nike Air Jordan 1 Retro High OG Black White 2.0\",\"price\":1200000,\"size\":\"41\",\"color\":\"Trắng đen\",\"quantity\":1},{\"name\":\"Giày Nike Air Force 1 Shadow ‘Triple White’\",\"price\":600000,\"size\":\"37\",\"color\":\"Trắng\",\"quantity\":1}]', '15/05/2024', 'Thành công', 8730000, NULL, '2024-05-15 16:59:15'),
('OD15052400004', 'Trương Quang Việt', 'test@gmail.com', '0123456789', 'ship', 'Chuyển khoản ngân hàng', ' , Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội', '[{\"name\":\"Giày adidas Yeezy Boost 700 ‘Enflame Amber’ GW0297\",\"price\":2400000,\"size\":\"41\",\"color\":\"Lửa (Hổ phách)\",\"quantity\":2},{\"name\":\"New Balance 550 White Shadow Grey\",\"price\":1050000,\"size\":\"38\",\"color\":\"Trắng Xám\",\"quantity\":2},{\"name\":\"Nike Air Jordan 1 Retro High OG Black White 2.0\",\"price\":1200000,\"size\":\"41\",\"color\":\"Trắng đen\",\"quantity\":1}]', '15/05/2024', 'Đang giao hàng', 8130000, NULL, '2024-05-15 17:46:11'),
('OD21042400001', 'Trương Quang Việt', 'test@gmail.com', '0125919168', 'in-shop', 'Chuyển khoản ngân hàng', 'Tại cửa hàng: Số 206 Đường Cổ Loa, Xã Cổ Loa, Huyện Đông Anh, Hà Nội', '[{\"name\":\"New Balance 550 White Shadow Grey\",\"price\":1050000,\"size\":\"37\",\"color\":\"Trắng Xám\",\"quantity\":1},{\"name\":\"Nike Air Jordan 1 Retro High OG Black White 2.0\",\"price\":1200000,\"size\":\"44\",\"color\":\"Trắng đen\",\"quantity\":2}]', '21/04/2024', 'Thành công', 3450000, NULL, '2024-04-21 14:40:22'),
('OD22042400001', 'Trương Quang Việt', 'truongviet2k3@gmail.com', '0347039022', 'ship', 'Chuyển khoản ngân hàng', 'Số 1000, Đường Nguyễn Văn Cừ, Phường Thượng Thanh, Quận Long Biên, Hà Nội', '[{\"name\":\"New Balance 550 White Shadow Grey\",\"price\":1050000,\"size\":\"37\",\"color\":\"Trắng Xám\",\"quantity\":1}]', '22/04/2024', 'Đã hủy', 1080000, NULL, '2024-04-22 10:44:17'),
('OD23042400001', 'Trương Quang Việt', 'viettruongxyx@gmail.com', '0135916861', 'ship', 'Chuyển khoản ngân hàng', 'Xóm Hương, Xã Cổ Loa, Huyện Đông Anh, Hà Nội', '[{\"name\":\"Nike Dunk Low Next Nature Beige Sail\",\"price\":960000,\"size\":\"40\",\"color\":\"Màu be\",\"quantity\":2}]', '23/04/2024', 'Thành công', 1950000, NULL, '2024-04-23 13:00:04'),
('OD24042400001', 'Trương Quang Việt', 'viettruongxxy@gmail.com', '0158185181', 'ship', 'Chuyển khoản ngân hàng', 'Cà Mau, Phường 8, Thành phố Cà Mau, Cà Mau', '[{\"name\":\"Giày Nike Air Force 1 Shadow ‘Triple White’\",\"price\":510000,\"size\":\"40.5\",\"color\":\"Trắng\",\"quantity\":1}]', '24/04/2024', 'Thành công', 540000, NULL, '2024-04-24 01:27:40'),
('OD24042400002', 'Trương Việt', 'abc@gmail.com', '0319513682', 'in-shop', 'Chuyển khoản ngân hàng', 'Tại cửa hàng: Số 206 Đường Cổ Loa, Xã Cổ Loa, Huyện Đông Anh, Hà Nội', '[{\"name\":\"Giày Nike Air Force 1 Shadow ‘Triple White’\",\"price\":510000,\"size\":\"40.5\",\"color\":\"Trắng\",\"quantity\":3}]', '24/04/2024', 'Thành công', 1530000, NULL, '2024-04-24 01:48:09'),
('OD24042400003', 'Việt', 'abcd@gmail.com', '035818518', 'in-shop', 'Chuyển khoản ngân hàng', 'Tại cửa hàng: Số 206 Đường Cổ Loa, Xã Cổ Loa, Huyện Đông Anh, Hà Nội', '[{\"name\":\"Giày Nike Air Force 1 Shadow ‘Triple White’\",\"price\":510000,\"size\":\"40.5\",\"color\":\"Trắng\",\"quantity\":5}]', '24/04/2024', 'Thành công', 2550000, NULL, '2024-04-24 01:52:09'),
('OD24042400004', 'afajfaj', 'aaaj', '91518581', 'ship', 'Chuyển khoản ngân hàng', 'aaiidai, Xã Đông Thới, Huyện Cái Nước, Cà Mau', '[{\"name\":\"Nike Dunk Low Next Nature Beige Sail\",\"price\":960000,\"size\":\"38\",\"color\":\"Màu be\",\"quantity\":2}]', '24/04/2024', 'Đợi thanh toán', 1950000, NULL, '2024-04-24 13:25:55');

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
  `tag` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `model3d` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`model3d`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`code`, `name`, `brand_name`, `ctg_name`, `gender`, `color`, `price`, `discount`, `visibility`, `tag`, `images`, `model3d`) VALUES
('SSV001040524', 'Giày adidas Yeezy Boost 700 ‘Enflame Amber’ GW0297', 'Adidas', 'Yeezy', 'Unisex', '{\"name\":\"Lửa (Hổ phách)\",\"size_quan\":[{\"size\":\"38\",\"quantity\":\"5\"},{\"size\":\"39\",\"quantity\":\"10\"},{\"size\":\"40\",\"quantity\":\"9\"},{\"size\":\"41\",\"quantity\":\"12\"},{\"size\":\"42\",\"quantity\":\"11\"},{\"size\":\"43\",\"quantity\":\"5\"}]}', 3000000, 20, 'public', '[\"Siêu hot\"]', '[\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1714790969233.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1714790969235.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1714790969242.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1714790969245.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1714790969247.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1714790969249.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1714790969252.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1714790969256.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1714790969259.jpg\"]', '\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\model3D\\\\upload\\\\1714790969261.glb\"'),
('SSV001220524', 'Air Jordan 1 Retro High ‘MILITARY BLUE’ DH3227-105', 'Jordan', 'Air Jordan 1', 'Unisex', '{\"name\":\"MILITARY BLUE\",\"size_quan\":[{\"size\":\"39\",\"quantity\":\"5\"},{\"size\":\"40\",\"quantity\":\"5\"},{\"size\":\"41\",\"quantity\":\"4\"}]}', 3500000, 10, 'public', '[]', '[\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1716317893048.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1716317893049.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1716317893051.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1716317893055.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1716317893056.png\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1716317893068.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1716317893070.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1716317893072.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1716317893075.jpg\"]', '\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\model3D\\\\upload\\\\1716317893076.glb\"'),
('SSV002090424', 'Giày Nike Air Force 1 Shadow ‘Triple White’', 'Nike', 'Air Force 1', 'Unisex', '{\"name\":\"Trắng\",\"size_quan\":[{\"size\":\"37\",\"quantity\":\"10\"},{\"size\":\"38\",\"quantity\":\"5\"},{\"size\":\"39\",\"quantity\":\"10\"},{\"size\":\"39.5\",\"quantity\":\"5\"},{\"size\":\"40\",\"quantity\":\"7\"},{\"size\":\"40.5\",\"quantity\":\"11\"},{\"size\":\"41\",\"quantity\":\"12\"},{\"size\":\"42\",\"quantity\":\"5\"},{\"size\":\"43\",\"quantity\":\"5\"}]}', 800000, 25, 'public', '[\"Giày sinh viên\",\"Giày học sinh\",\"Hot\"]', '[\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764763.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764764.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764770.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764772.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764775.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712680764777.jpg\"]', '\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\model3D\\\\upload\\\\1714790969262.glb\"'),
('SSV003090424', 'Nike Dunk Low Next Nature Beige Sail', 'Nike', 'Nike Dunk', 'Unisex', '{\"name\":\"Màu be\",\"size_quan\":[{\"size\":\"36\",\"quantity\":\"5\"},{\"size\":\"37\",\"quantity\":\"10\"},{\"size\":\"38\",\"quantity\":\"8\"},{\"size\":\"39\",\"quantity\":\"7\"},{\"size\":\"39.5\",\"quantity\":\"5\"},{\"size\":\"40\",\"quantity\":\"10\"},{\"size\":\"40.5\",\"quantity\":\"9\"},{\"size\":\"41\",\"quantity\":\"12\"},{\"size\":\"42\",\"quantity\":\"9\"}]}', 1200000, 20, 'hidden', '[\"Giày học sinh\",\"Giày sinh viên\"]', '[\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163977.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163981.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163986.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163990.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163994.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681163998.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681164003.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681164005.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681164006.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681164007.jpg\"]', '\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\model3D\\\\upload\\\\1714790969265.glb\"'),
('SSV004090424', 'New Balance 550 White Shadow Grey', 'New Balance', 'New Balance 550', 'Unisex', '{\"name\":\"Trắng Xám\",\"size_quan\":[{\"size\":\"36\",\"quantity\":11},{\"size\":\"37\",\"quantity\":10},{\"size\":\"38\",\"quantity\":15},{\"size\":\"38.5\",\"quantity\":9},{\"size\":\"39.5\",\"quantity\":12},{\"size\":\"40\",\"quantity\":13},{\"size\":\"41\",\"quantity\":20},{\"size\":\"42\",\"quantity\":22},{\"size\":\"43\",\"quantity\":16},{\"size\":\"44\",\"quantity\":\"11\"}]}', 1500000, 30, 'public', '[\"Giày thời trang\",\"hot 2023\"]', '[\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681972985.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681972986.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681972992.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681972997.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973001.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973004.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973008.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973011.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973015.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712681973018.jpg\"]', '\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\model3D\\\\upload\\\\1714790969264.glb\"'),
('SSV005090424', 'Nike Air Jordan 1 Retro High OG Black White 2.0', 'Jordan', 'Các dòng Jordan khác', 'Unisex', '{\"name\":\"Trắng đen\",\"size_quan\":[{\"size\":\"40\",\"quantity\":\"31\"},{\"size\":\"40.5\",\"quantity\":\"16\"},{\"size\":\"41\",\"quantity\":\"29\"},{\"size\":\"42\",\"quantity\":\"25\"},{\"size\":\"43\",\"quantity\":\"17\"},{\"size\":\"44\",\"quantity\":\"10\"}]}', 1500000, 20, 'public', '[\"hot search\"]', '[\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866381.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866383.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866387.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866390.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866393.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866408.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866417.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866421.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866428.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866432.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866434.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866436.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866439.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866442.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866444.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866446.jpg\",\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\images\\\\upload\\\\1712682866449.jpg\"]', '\"E:\\\\Web-ban-giay\\\\wbg-backend\\\\src\\\\public\\\\model3D\\\\upload\\\\1714790969263.glb\"');

-- --------------------------------------------------------

--
-- Table structure for table `sold`
--

CREATE TABLE `sold` (
  `pCode` varchar(25) NOT NULL,
  `size_quantity` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`size_quantity`)),
  `revenue` int(11) NOT NULL,
  `orderID` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sold`
--

INSERT INTO `sold` (`pCode`, `size_quantity`, `revenue`, `orderID`) VALUES
('SSV001040524', '{\"price\":2400000,\"size\":\"41\",\"quantity\":2,\"color\":\"Lửa (Hổ phách)\"}', 4800000, 'OD15052400003'),
('SSV002090424', '{\"price\":600000,\"size\":\"37\",\"quantity\":1,\"color\":\"Trắng\"}', 600000, 'OD15052400003'),
('SSV002090424', '{\"price\":510000,\"size\":\"40.5\",\"color\":\"Trắng\",\"quantity\":1}', 510000, 'OD24042400001'),
('SSV002090424', '{\"price\":510000,\"size\":\"40.5\",\"color\":\"Trắng\",\"quantity\":\"3\"}', 1530000, 'OD24042400002'),
('SSV002090424', '{\"price\":510000,\"size\":\"40.5\",\"color\":\"Trắng\",\"quantity\":5}', 2550000, 'OD24042400003'),
('SSV003090424', '{\"price\":960000,\"size\":\"40\",\"color\":\"Màu be\",\"quantity\":2}', 1920000, 'OD23042400001'),
('SSV003090424', '{\"price\":960000,\"size\":\"38\",\"color\":\"Màu be\",\"quantity\":2}', 1920000, 'OD24042400004'),
('SSV004090424', '{\"price\":1050000,\"size\":\"38\",\"quantity\":2,\"color\":\"Trắng Xám\"}', 2100000, 'OD15052400003'),
('SSV004090424', '{\"price\":1050000,\"size\":\"37\",\"color\":\"Trắng Xám\",\"quantity\":1}', 1050000, 'OD21042400001'),
('SSV005090424', '{\"price\":1200000,\"size\":\"41\",\"quantity\":1,\"color\":\"Trắng đen\"}', 1200000, 'OD15052400003'),
('SSV005090424', '{\"price\":1200000,\"size\":\"44\",\"color\":\"Trắng đen\",\"quantity\":2}', 2400000, 'OD21042400001');

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
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_ibfk_1` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`code`),
  ADD KEY `brand_name` (`brand_name`),
  ADD KEY `ctg_name` (`ctg_name`);

--
-- Indexes for table `sold`
--
ALTER TABLE `sold`
  ADD PRIMARY KEY (`pCode`,`orderID`),
  ADD KEY `orderID` (`orderID`);

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
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`brand_name`) REFERENCES `brand` (`name`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`ctg_name`) REFERENCES `category` (`name`);

--
-- Constraints for table `sold`
--
ALTER TABLE `sold`
  ADD CONSTRAINT `sold_ibfk_1` FOREIGN KEY (`pCode`) REFERENCES `product` (`code`),
  ADD CONSTRAINT `sold_ibfk_2` FOREIGN KEY (`orderID`) REFERENCES `orders` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`email`) REFERENCES `account` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
