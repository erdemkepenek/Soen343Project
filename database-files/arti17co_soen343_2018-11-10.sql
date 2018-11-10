# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.185.72.57 (MySQL 5.6.41-84.1)
# Database: arti17co_soen343
# Generation Time: 2018-11-10 21:46:58 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table BookDesc
# ------------------------------------------------------------

DROP TABLE IF EXISTS `BookDesc`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `BookDesc` WRITE;
/*!40000 ALTER TABLE `BookDesc` DISABLE KEYS */;

INSERT INTO `BookDesc` (`idDesc`, `Title`, `Author`, `Format`, `Pages`, `Publisher`, `ISBN-10`, `ISBN-13`, `Language`)
VALUES
	(1,'Manpreet','Concordia','hardcopy',1000,'Montreal',NULL,NULL,NULL),
	(2,'undefined','undefined','undefined',342,'Concordia',NULL,NULL,NULL),
	(3,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(4,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(5,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(6,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(7,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(8,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(9,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(10,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(11,'Romeo','Elizabeth','hardcopy',546,'Start Publisher',NULL,NULL,NULL),
	(12,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(13,'Hamlet2','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(14,'Hamlet2','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(15,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(16,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(17,'Hamlet','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(18,'HamletLu','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(19,'HamletLu','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(20,'HamletLu','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(21,'HamletLu','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(22,'HamletLu','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(23,'HamletLu','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(24,'HamletLu','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(25,'HamletLu','Shakespear','hardcopy',342,'Concordia',NULL,NULL,NULL),
	(26,'samsung','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(27,'HamletLu','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(28,'successEG','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(29,'ManpreetSuccess','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(30,'ManpreetSuccess','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(31,'ManpreetSuccess','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(32,'successEG','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(33,'successEG','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(34,'successEG','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(35,'successEG','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(36,'successEG','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(37,'mikezzzzz','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(38,'mikezzzzz','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(39,'samsung','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english');

/*!40000 ALTER TABLE `BookDesc` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table BookPh
# ------------------------------------------------------------

DROP TABLE IF EXISTS `BookPh`;

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

LOCK TABLES `BookPh` WRITE;
/*!40000 ALTER TABLE `BookPh` DISABLE KEYS */;

INSERT INTO `BookPh` (`idDesc`, `available`, `id`)
VALUES
	(5,0,5);

/*!40000 ALTER TABLE `BookPh` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Items`;

CREATE TABLE `Items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`available`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;

INSERT INTO `Items` (`id`, `available`)
VALUES
	(1,0),
	(2,1),
	(3,1),
	(4,1),
	(5,0),
	(6,1),
	(7,1),
	(8,1),
	(9,1),
	(10,1);

/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Loan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Loan`;

CREATE TABLE `Loan` (
  `UserId` int(13) NOT NULL,
  `itemId` int(13) NOT NULL,
  `loanDate` date NOT NULL,
  `returnDate` date NOT NULL,
  KEY `userIdRent` (`UserId`),
  KEY `itemId_Items` (`itemId`),
  CONSTRAINT `itemId_Items` FOREIGN KEY (`itemId`) REFERENCES `Items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userIdRent` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `Loan` WRITE;
/*!40000 ALTER TABLE `Loan` DISABLE KEYS */;

INSERT INTO `Loan` (`UserId`, `itemId`, `loanDate`, `returnDate`)
VALUES
	(7,2,'2018-11-10','0000-00-00'),
	(7,5,'2018-11-10','0000-00-00');

/*!40000 ALTER TABLE `Loan` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table LogActivity
# ------------------------------------------------------------

DROP TABLE IF EXISTS `LogActivity`;

CREATE TABLE `LogActivity` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table MagazineDesc
# ------------------------------------------------------------

DROP TABLE IF EXISTS `MagazineDesc`;

CREATE TABLE `MagazineDesc` (
  `idDesc` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `Publisher` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ISBN-10` int(13) NOT NULL,
  `ISBN-13` int(13) DEFAULT NULL,
  `Language` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idDesc`),
  UNIQUE KEY `ISBN-10_UNIQUE` (`ISBN-10`),
  UNIQUE KEY `ISBN-13_UNIQUE` (`ISBN-13`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `MagazineDesc` WRITE;
/*!40000 ALTER TABLE `MagazineDesc` DISABLE KEYS */;

INSERT INTO `MagazineDesc` (`idDesc`, `Title`, `Publisher`, `ISBN-10`, `ISBN-13`, `Language`)
VALUES
	(1,'MyTitle','MyPublihser',1234,56789,'MyLanguage');

/*!40000 ALTER TABLE `MagazineDesc` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table MagazinePh
# ------------------------------------------------------------

DROP TABLE IF EXISTS `MagazinePh`;

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



# Dump of table MovieDesc
# ------------------------------------------------------------

DROP TABLE IF EXISTS `MovieDesc`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table MoviePh
# ------------------------------------------------------------

DROP TABLE IF EXISTS `MoviePh`;

CREATE TABLE `MoviePh` (
  `id` int(11) NOT NULL,
  `idDesc` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  KEY `MovieDesc` (`idDesc`),
  KEY `FK_Id_avaliable_Movie` (`id`,`available`),
  CONSTRAINT `FK_Id_avaliable_Movie` FOREIGN KEY (`id`, `available`) REFERENCES `Items` (`id`, `available`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MovieDesc` FOREIGN KEY (`idDesc`) REFERENCES `MovieDesc` (`idDesc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table MusicDesc
# ------------------------------------------------------------

DROP TABLE IF EXISTS `MusicDesc`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table MusicPh
# ------------------------------------------------------------

DROP TABLE IF EXISTS `MusicPh`;

CREATE TABLE `MusicPh` (
  `idDesc` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `id` int(11) NOT NULL,
  KEY `MusicDesc` (`idDesc`),
  KEY `FK_Id_avaliable_Music` (`id`,`available`),
  CONSTRAINT `FK_Id_avaliable_Music` FOREIGN KEY (`id`, `available`) REFERENCES `Items` (`id`, `available`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MusicDesc` FOREIGN KEY (`idDesc`) REFERENCES `MusicDesc` (`idDesc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table TransactionHistory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TransactionHistory`;

CREATE TABLE `TransactionHistory` (
  `transactionId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `type` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timeStamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transactionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;

INSERT INTO `User` (`UserId`, `FirstName`, `LastName`, `Address`, `email`, `phone`, `type`, `password`)
VALUES
	(1,'soen','343','0001 Concordia University, Montreal, Quebec','soentest@concordia.ca',2147483647,1,'1'),
	(3,'Marc-Henry','Noon','0003 Concordia University, Montreal, Quebec','sample456@email.com',2147483647,0,''),
	(4,'Erdem','Kepenek','0005 Concordia University, Montreal, Quebec','sample789@email.com',2147483647,0,''),
	(5,'Manpreet','Singh','0007 Concordia University, Montreal, Quebec','Mapreett@concordia.ca',2147483647,0,''),
	(7,'Khang','Zheng','0011 Concordia University, Montreal, Quebec','Khang@concordia.ca',2147483647,0,''),
	(8,'Yongtang','Lu','0013 Concordia University, Montreal, Quebec','Yongtang@concordia.ca',2147483647,0,''),
	(9,'Line','Ghanem','0015 Concordia University, Montreal, Quebec','Line@concordia.ca',2147483647,0,''),
	(10,'David','Bechara','0017 Concordia University, Montreal, Quebec','David@concordia.ca',2147483647,0,''),
	(11,'Anthony','Iatropoulos','00019 Concordia University, Montreal, Quebec','Anthony@concordia.ca',2147483647,0,'9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043'),
	(737,'Eglenbro','Cecaj','00040 Concordia University, Montreal, Quebec','test',2147433649,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),
	(738,'Lisa','Paso','Wonderland','email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),
	(769,'Lisa','Paso','Wonderland','1email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),
	(770,'Lisa','Paso','Wonderland','2email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),
	(773,'Lisa','Paso','Wonderland','3email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),
	(783,'Lisa','Paso','Wonderland','4email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),
	(785,'Lisa','Paso','Wonderland','5email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),
	(871,'Eglenbro','Cecaj','00040 Concordia University, Montreal, Quebec','eglen@concordia.ca',2147433649,1,'14ad5e59d5126028865368d3e463ecc5d23ab333'),
	(879,'TEST','TEST','SOMEWHERE','TT@T.COM',2147483647,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(880,'TEST','TEST','SOMEWHERE','TEST@T9.COM',2147483647,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(881,'TEST','TEST','SOMEWHERE','TEST@9.COM',2147483647,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4');

/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping routines (PROCEDURE) for database 'arti17co_soen343'
--
DELIMITER ;;

# Dump of PROCEDURE autoGenerate
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `autoGenerate` */;;
/*!50003 SET SESSION SQL_MODE="NO_ENGINE_SUBSTITUTION"*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`arti17co_soen343`@`%`*/ /*!50003 PROCEDURE `autoGenerate`()
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
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
DELIMITER ;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
