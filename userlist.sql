-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2023 at 01:45 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `userlist`
--

CREATE TABLE `userlist` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `USERNAME` text NOT NULL,
  `PASSWORD` text NOT NULL,
  `FULLNAME` text NOT NULL,
  `EMAIL` text NOT NULL,
  `AVATAR` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userlist`
--

INSERT INTO `userlist` (`ID`, `USERNAME`, `PASSWORD`, `FULLNAME`, `EMAIL`, `AVATAR`) VALUES
(1, 'tad', '$2y$10$5QMeOV9TJHO6d03feQ50AekHl2PoDthDb2UuSzuQ0ikpj89KfQF26', 'Dau Cong Tuan Anh', 'tad@gmail.com', 'https://www.tradeinn.com/f/13888/138888569/toei-animation-one-piece-monkey-d-luffy-3d-35-cm.jpg'),
(5, 'ha', '$2y$10$pnuz3F22zDjGTMMnOpSlWOaHN0CAnJlt49adookFNjAiKGr/AL.c6', 'ba', 'aa', 'aa'),
(6, 'helo', '$2y$10$n0CiF26GcKmeSfMEY3aMpehc/m0Ou5a91JZ12I21Gd3YMXzGQ.IJm', 'ta', '4@gmail.com', ''),
(7, 'Dau Cong Tuan Anh', '$2y$10$XsaSQkSEe7Q6fVbHOms8Uu9AnjjoBdIrRRdE5pzHU6/6Ss0JVMPpW', '', 'Nevergiveup552001@gmail.com', NULL),
(8, 'Конг Туан Ань', '$2y$10$WkthS2uMVwK74aphBSp6ReA7IB1C3oP./MVRZwHW8yEGAxaHrcjMS', '', 'Nevergiveup552001@gmail.com', NULL),
(12, 'a', '$2y$10$AuFnTCjh/2bipEuXOiwVZejfbq2HP7hiAJNlUk1.k.n8wh4dySaMS', 'b', 'b', 'https://www.tradeinn.com/f/13888/138888569/toei-animation-one-piece-monkey-d-luffy-3d-35-cm.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userlist`
--
ALTER TABLE `userlist`
  ADD UNIQUE KEY `ID` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userlist`
--
ALTER TABLE `userlist`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
