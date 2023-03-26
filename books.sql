-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2023 at 01:46 AM
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
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `TITLE` text NOT NULL,
  `AUTHOR` text NOT NULL,
  `PRICE` text NOT NULL,
  `DESCRIPTION` text DEFAULT NULL,
  `IMAGE` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`ID`, `TITLE`, `AUTHOR`, `PRICE`, `DESCRIPTION`, `IMAGE`) VALUES
(1, 'Eloquent JavaScript, Third Edition', 'Marijn Haverbeke', '30', 'JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.', 'https://img.thriftbooks.com/api/images/i/m/BEE6DA6519216B92890860C4F68BF9248093AE02.jpg'),
(2, 'Practical Modern JavaScript', 'Nicolás Bevacqua', '15', 'JTo get the most out of modern JavaScript, you need learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details.', 'https://img.thriftbooks.com/api/images/i/m/BEE6DA6519216B92890860C4F68BF9248093AE02.jpg'),
(3, 'Understanding ECMAScript 6', 'Nicholas C. Zakas', '17', 'ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.', 'https://img.thriftbooks.com/api/images/i/m/BEE6DA6519216B92890860C4F68BF9248093AE02.jpg'),
(4, 'Speaking JavaScript', 'Axel Rauschmayer', '28', 'Like it or not, JavaScript is everywhere these days -from browser to server to mobile- and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.', 'https://img.thriftbooks.com/api/images/i/m/BEE6DA6519216B92890860C4F68BF9248093AE02.jpg'),
(5, 'Learning JavaScript Design Patterns', 'Addy Osmani', '36', 'With Learning JavaScript Design Patterns, you\'ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.', 'https://img.thriftbooks.com/api/images/i/m/BEE6DA6519216B92890860C4F68BF9248093AE02.jpg'),
(9, 'nghin le mot dem', 'tad', '100', 'con cac', 'https://newshop.vn/public/uploads/products/3424/nang-sheherazade.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD UNIQUE KEY `ID` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
