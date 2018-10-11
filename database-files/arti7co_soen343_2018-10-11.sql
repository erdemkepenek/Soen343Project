-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 192.185.72.57    Database: arti17co_soen343
-- ------------------------------------------------------
-- Server version	5.6.41-84.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Book`
--

DROP TABLE IF EXISTS `Book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Client` (
  `id` int(13) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LastName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Address` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` int(13) DEFAULT NULL,
  `type` tinyint(1) NOT NULL,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=658 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Magazine`
--

DROP TABLE IF EXISTS `Magazine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Magazine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Publisher` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ISBN-10` int(13) NOT NULL,
  `ISBN-13` int(13) DEFAULT NULL,
  `Language` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Movie`
--

DROP TABLE IF EXISTS `Movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Movie` (
  `id` int(13) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Music`
--

DROP TABLE IF EXISTS `Music`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Music` (
  `id` int(13) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Artist` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Label` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Quantity` int(13) DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `ASIN` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Status` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Rent`
--

DROP TABLE IF EXISTS `Rent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Rent` (
  `clientId` int(13) NOT NULL,
  `itemId` int(13) DEFAULT NULL,
  `rentTime` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-11 15:56:21
