-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2018 at 08:09 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `theshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartcontents`
--

CREATE TABLE `cartcontents` (
  `id` int(11) NOT NULL,
  `cartId` int(5) NOT NULL,
  `products` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cartcontents`
--

INSERT INTO `cartcontents` (`id`, `cartId`, `products`) VALUES
(2, 2, '[{\"id\":12,\"name\":\"Dragon horn\",\"price\":15,\"img\":\"../../../../assets/products/dragonhorn.jpg\",\"category\":\"potions\",\"quantity\":3}]'),
(4, 8, '[{\"id\":16,\"name\":\"Rosemary\",\"price\":7,\"img\":\"../../../../assets/products/rosemary.jpg\",\"category\":\"potions\",\"quantity\":1},{\"id\":13,\"name\":\"Eel eyes\",\"price\":4,\"img\":\"../../../../assets/products/eeleyes.jpg\",\"category\":\"potions\",\"quantity\":1},{\"id\":4,\"name\":\"Holly & phoenix feather wand\",\"price\":200,\"img\":\"../../../../assets/products/wand1.jpg\",\"category\":\"wands\",\"quantity\":3}]');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `done` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user`, `date`, `done`) VALUES
(1, 'Kate', '2018-10-18', 1),
(2, 'Kate', '2018-10-18', 0),
(3, 'Dan', '2018-10-21', 1),
(4, 'Dan', '2018-10-21', 1),
(5, 'Rex', '2018-10-23', 1),
(6, 'Dan', '2018-10-23', 0),
(7, 'Tom', '2018-10-29', 1),
(8, 'Tom', '2018-10-29', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `user` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street` varchar(100) NOT NULL,
  `total` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `date`, `user`, `city`, `street`, `total`) VALUES
(1, '0000-00-00', 'Kate', 'Hogwarts', 'Ben Yehuda', 504),
(2, '0000-00-00', 'Kate', 'Hogwarts', 'Ben Yehuda', 250),
(3, '2018-10-24', 'Kate', 'Hogwarts', 'Klausner Street', 250),
(4, '2018-11-01', 'Kate', 'Hogwarts', 'Ben Yehuda', 300);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `img` text NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `img`, `category`) VALUES
(1, 'Nimbus 2000', 2000, '../../../../assets/products/Nimbus2000.jpg', 'brooms'),
(2, 'Firebolt', 4500, '../../../../assets/products/Firebolt.jpg', 'brooms'),
(3, 'Cleansweep 7', 900, '../../../../assets/products/Cleansweep.jpg', 'brooms'),
(4, 'Holly & phoenix feather wand', 200, '../../../../assets/products/wand1.jpg', 'wands'),
(5, 'Vine & dragon heartstring wand', 250, '../../../../assets/products/wand2.jpg', 'wands'),
(6, 'Hornbeam & dragon heartstring wand', 210, '../../../../assets/products/wand3.jpg', 'wands'),
(7, 'Hawthorn & unicorn hair wand', 260, '../../../../assets/products/wand4.png', 'wands'),
(8, 'Tabby cat', 150, '../../../../assets/products/tabbycat.jpg', 'pets'),
(9, 'Barn owl', 350, '../../../../assets/products/barnowl.jpg', 'pets'),
(10, 'Toad', 50, '../../../../assets/products/toad.jpg', 'pets'),
(11, 'Snowy owl', 400, '../../../../assets/products/snowyowl.jpg', 'pets'),
(12, 'Dragon horn', 15, '../../../../assets/products/dragonhorn.jpg', 'potions'),
(13, 'Eel eyes', 4, '../../../../assets/products/eeleyes.jpg', 'potions'),
(14, 'Fairy wings', 24, '../../../../assets/products/fairywings.jpg', 'potions'),
(15, 'Gurdyroot', 12, '../../../../assets/products/gurdyroot.jpg', 'potions'),
(16, 'Rosemary', 7, '../../../../assets/products/rosemary.jpg', 'potions'),
(17, 'Frog', 80, '../../../../assets/products/frog.jpg', 'pets'),
(18, 'Snake', 200, '../../../../assets/products/snake.jpg', 'pets'),
(19, 'Dandelion', 9, 'assets/products/dandelion.jpg', 'potions');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `tz` int(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street` varchar(200) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `tz`, `name`, `city`, `street`, `role`) VALUES
(1, 'admin', '123', 'admin@theshop.io', 123456789, 'Dan', 'London', 'Allenby', 'admin'),
(2, 'user', '123', 'firstuser@theshop.io', 987654321, 'Kate', 'Hogwarts', 'Ben Yehuda', 'user'),
(3, 'cat', 'hhh', 'cat@me.ow', 1234, 'Tom', 'The Burrow', 'Fluff Street', 'user'),
(4, 'dog', '123', 'dog@bark.co', 555, 'Rex', 'Little Hangleton', 'Queen Street', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartcontents`
--
ALTER TABLE `cartcontents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartcontents`
--
ALTER TABLE `cartcontents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartcontents`
--
ALTER TABLE `cartcontents`
  ADD CONSTRAINT `cartId` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
