CREATE DATABASE  IF NOT EXISTS `arti17co_soen343` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `arti17co_soen343`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
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
-- Table structure for table `BookDesc`
--

DROP TABLE IF EXISTS `BookDesc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BookDesc` (
  `idDesc` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Author` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Format` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Pages` int(11) DEFAULT NULL,
  `Publisher` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ISBN-10` int(13) DEFAULT NULL,
  `ISBN-13` int(13) DEFAULT NULL,
  `Language` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idDesc`),
  UNIQUE KEY `ISBN-10_UNIQUE` (`ISBN-10`),
  UNIQUE KEY `ISBN-13_UNIQUE` (`ISBN-13`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BookPh`
--

DROP TABLE IF EXISTS `BookPh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BookPh` (
  `idDesc` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BookDesc` (`idDesc`),
  KEY `FK_Id_avaliable_Book` (`id`,`available`),
  CONSTRAINT `BookDesc` FOREIGN KEY (`idDesc`) REFERENCES `BookDesc` (`idDesc`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Id_avaliable_Book` FOREIGN KEY (`id`, `available`) REFERENCES `Items` (`id`, `available`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Items`
--

DROP TABLE IF EXISTS `Items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`available`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Loan`
--

DROP TABLE IF EXISTS `Loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Loan` (
  `UserId` int(13) NOT NULL,
  `itemId` int(13) NOT NULL,
  `loanDate` date NOT NULL,
  `returnDate` date DEFAULT NULL,
  KEY `userIdRent` (`UserId`),
  KEY `itemId_Items` (`itemId`),
  CONSTRAINT `itemId_Items` FOREIGN KEY (`itemId`) REFERENCES `Items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userIdRent` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LogActivity`
--

DROP TABLE IF EXISTS `LogActivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LogActivity` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `action` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MagazineDesc`
--

DROP TABLE IF EXISTS `MagazineDesc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MagazineDesc` (
  `idDesc` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Publisher` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ISBN-10` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `ISBN-13` varchar(18) COLLATE utf8_unicode_ci NOT NULL,
  `Language` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idDesc`),
  UNIQUE KEY `ISBN-10_UNIQUE` (`ISBN-10`),
  UNIQUE KEY `ISBN-13_UNIQUE` (`ISBN-13`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MagazinePh`
--

DROP TABLE IF EXISTS `MagazinePh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MagazinePh` (
  `idDesc` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `MagazineDesc` (`idDesc`),
  KEY `FK_Id_avaliable_Magazine` (`id`,`available`),
  CONSTRAINT `FK_Id_avaliable_Magazine` FOREIGN KEY (`id`, `available`) REFERENCES `Items` (`id`, `available`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MagazineDesc` FOREIGN KEY (`idDesc`) REFERENCES `MagazineDesc` (`idDesc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MovieDesc`
--

DROP TABLE IF EXISTS `MovieDesc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MovieDesc` (
  `idDesc` int(13) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Director` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Producers` text COLLATE utf8_unicode_ci,
  `Actors` text COLLATE utf8_unicode_ci,
  `Language` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Subtitles` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Dubbed` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `RunTime` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idDesc`),
  UNIQUE KEY `idx_Movie_Title_ReleaseDate` (`Title`,`ReleaseDate`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MoviePh`
--

DROP TABLE IF EXISTS `MoviePh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MoviePh` (
  `id` int(11) NOT NULL,
  `idDesc` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  KEY `MovieDesc` (`idDesc`),
  KEY `FK_Id_avaliable_Movie` (`id`,`available`),
  CONSTRAINT `FK_Id_avaliable_Movie` FOREIGN KEY (`id`, `available`) REFERENCES `Items` (`id`, `available`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MovieDesc` FOREIGN KEY (`idDesc`) REFERENCES `MovieDesc` (`idDesc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MusicDesc`
--

DROP TABLE IF EXISTS `MusicDesc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MusicDesc` (
  `idDesc` int(13) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Artist` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Label` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `ASIN` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  PRIMARY KEY (`idDesc`),
  UNIQUE KEY `ASIN_UNIQUE` (`ASIN`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MusicPh`
--

DROP TABLE IF EXISTS `MusicPh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MusicPh` (
  `idDesc` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `id` int(11) NOT NULL,
  KEY `MusicDesc` (`idDesc`),
  KEY `FK_Id_avaliable_Music` (`id`,`available`),
  CONSTRAINT `FK_Id_avaliable_Music` FOREIGN KEY (`id`, `available`) REFERENCES `Items` (`id`, `available`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MusicDesc` FOREIGN KEY (`idDesc`) REFERENCES `MusicDesc` (`idDesc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TransactionHistory`
--

DROP TABLE IF EXISTS `TransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TransactionHistory` (
  `transactionId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `type` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `itemId` int(11) NOT NULL,
  PRIMARY KEY (`transactionId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `UserId` int(13) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LastName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Address` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `phone` int(13) DEFAULT NULL,
  `type` tinyint(1) NOT NULL,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=906 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'arti17co_soen343'
--
/*!50003 DROP FUNCTION IF EXISTS `getIDPh` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`arti17co_soen343`@`%` FUNCTION `getIDPh`(id_desc INT(11), item_type varchar(20)) RETURNS int(11)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE idItem INT DEFAULT FALSE;
	DECLARE c1 CURSOR FOR select id from arti17co_soen343.BookPh where idDesc = id_desc and available = 1 limit 1;
	DECLARE c2 CURSOR FOR select id from arti17co_soen343.MusicPh where idDesc = id_desc and available = 1 limit 1;
	DECLARE c3 CURSOR FOR select id from arti17co_soen343.MoviePh where idDesc = id_desc and available = 1 limit 1;
    DECLARE c4 CURSOR FOR select id from arti17co_soen343.MagazinePh where idDesc = id_desc and available = 1 limit 1;
    
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    if item_type="book" then
		OPEN c1;
		FETCH c1 INTO idItem;
		
		CLOSE c1;
        Return idItem;
    elseif item_type="music" then
		OPEN c2;
		FETCH c2 INTO idItem;
		
		CLOSE c2;
        Return idItem;
	elseif item_type="movie" then
		OPEN c3;
		FETCH c3 INTO idItem;
		
		CLOSE c3;
        Return idItem;
	elseif item_type="magazine" then
		OPEN c4;
		FETCH c4 INTO idItem;
		
		CLOSE c4;
        Return idItem;
    end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `autoGenerate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`arti17co_soen343`@`%` PROCEDURE `autoGenerate`()
BEGIN
  DECLARE i INT DEFAULT 0 ;
  SET autocommit = 0; 
  -- Start
  WHILE
    (i < 100) DO -- Terminate
    
    REPLACE INTO Items (id) VALUE (i) ;

    SET i = i + 1 ;
    
    IF i%1000=0 THEN 
        COMMIT; 
    END IF;
  END WHILE ;
  SET autocommit =1;
  COMMIT; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-16  7:09:16
