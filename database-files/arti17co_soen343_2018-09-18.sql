# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.185.72.57 (MySQL 5.6.39-83.1)
# Database: arti17co_soen343
# Generation Time: 2018-09-18 23:38:20 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Book
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Book`;

CREATE TABLE `Book` (
  `id` int(11) NOT NULL DEFAULT '0',
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Author` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Format` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Pages` int(11) DEFAULT NULL,
  `Publisher` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ISBN-10` int(13) DEFAULT NULL,
  `ISBN-13` int(13) DEFAULT NULL,
  `Status` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Language` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk1` FOREIGN KEY (`id`) REFERENCES `Item` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table Client
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Client`;

CREATE TABLE `Client` (
  `id` int(13) NOT NULL,
  `FirstName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LastName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Address` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` int(13) DEFAULT NULL,
  `type` char(1) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table Item
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Item`;

CREATE TABLE `Item` (
  `id` int(13) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table Magazine
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Magazine`;

CREATE TABLE `Magazine` (
  `id` int(11) NOT NULL DEFAULT '0',
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Publisher` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ISBN-10` int(13) NOT NULL,
  `ISBN-13` int(13) DEFAULT NULL,
  `Language` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk` FOREIGN KEY (`id`) REFERENCES `Item` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table Movie
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Movie`;

CREATE TABLE `Movie` (
  `id` int(13) NOT NULL,
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Director` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Producers` text COLLATE utf8_unicode_ci,
  `Actors` text COLLATE utf8_unicode_ci,
  `Language` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Subtitles` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Dubbed` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `RunTime` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Status` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk2` FOREIGN KEY (`id`) REFERENCES `Item` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table Music
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Music`;

CREATE TABLE `Music` (
  `id` int(13) NOT NULL,
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Artist` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Label` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Quantity` int(13) DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `ASIN` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Status` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk3` FOREIGN KEY (`id`) REFERENCES `Item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table Rent
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Rent`;

CREATE TABLE `Rent` (
  `clientId` int(13) NOT NULL AUTO_INCREMENT,
  `itemId` int(13) DEFAULT NULL,
  `rentTime` time DEFAULT NULL,
  PRIMARY KEY (`clientId`),
  KEY `fk5` (`itemId`),
  CONSTRAINT `fk4` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk5` FOREIGN KEY (`itemId`) REFERENCES `Item` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
