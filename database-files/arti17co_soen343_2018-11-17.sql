# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 192.185.72.57 (MySQL 5.6.41-84.1)
# Database: arti17co_soen343
# Generation Time: 2018-11-17 05:36:34 +0000
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
	(1,'capstone','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(2,'cocacola','kent','hardcopy',342,'Concordia',NULL,NULL,NULL),
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
	(36,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(37,'mikezzzzz','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(38,'mikezzzzz','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(39,'samsung','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(40,'TEST4','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(41,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(42,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(43,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(44,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(45,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(46,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(47,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(48,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(49,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(50,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(51,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(52,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(53,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(54,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(55,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(56,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(57,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(58,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(59,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(60,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(61,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(62,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(63,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(64,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(65,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(66,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(67,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(68,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(69,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(70,'BBBB','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(71,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(72,'BBBB','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(73,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(74,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(75,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(76,'BBBB','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(77,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(78,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(79,'BBBB','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(80,'BBBB','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(81,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(82,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(83,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(84,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(85,'BBBB','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(86,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(87,'BBBB','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(88,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(89,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(90,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(91,'BBBB','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(92,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(93,'BBBB','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(94,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(95,'AAAA','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(96,'BBBB','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(97,'TEST4','Concordia','hardcopy',342,'Concordia',NULL,NULL,'english'),
	(98,'samsung','Shakespear','hardcopy',342,'Concordia',NULL,NULL,'english');

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
	(5,0,5),
	(33,1,41),
	(29,0,42),
	(40,1,43),
	(42,1,56),
	(43,1,57),
	(44,1,58),
	(45,1,59),
	(46,1,60),
	(47,1,61),
	(48,1,62),
	(50,1,63),
	(49,1,64),
	(51,1,65),
	(52,1,66),
	(54,1,67),
	(53,1,68),
	(55,1,69),
	(58,1,71),
	(57,1,72),
	(59,1,73),
	(60,1,74),
	(61,1,75),
	(62,1,76),
	(63,1,77),
	(64,1,78),
	(65,1,79),
	(67,1,80),
	(66,1,81),
	(68,1,82),
	(70,1,83),
	(69,1,84),
	(71,1,85),
	(72,1,86),
	(73,1,87),
	(75,1,88),
	(74,1,89),
	(76,1,90),
	(77,1,91),
	(79,1,92),
	(78,1,93),
	(80,1,94),
	(81,1,95),
	(82,1,96),
	(83,1,97),
	(84,1,98),
	(85,1,99),
	(86,1,100),
	(88,1,101),
	(87,1,102),
	(91,1,103),
	(90,1,104),
	(89,1,105),
	(92,1,106),
	(93,1,107),
	(94,1,108),
	(95,1,109),
	(96,1,110),
	(97,1,111),
	(98,1,129),
	(5,0,135),
	(5,0,136),
	(5,0,137),
	(5,0,138),
	(5,0,139),
	(5,0,140),
	(5,0,141),
	(5,0,142);

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
	(2,1),
	(3,1),
	(4,1),
	(5,0),
	(6,1),
	(7,1),
	(8,1),
	(9,1),
	(10,1),
	(36,1),
	(37,1),
	(38,1),
	(41,1),
	(42,0),
	(43,1),
	(51,1),
	(52,1),
	(53,1),
	(56,1),
	(57,1),
	(58,1),
	(59,1),
	(60,1),
	(61,1),
	(62,1),
	(63,1),
	(64,1),
	(65,1),
	(66,1),
	(67,1),
	(68,1),
	(69,1),
	(71,1),
	(72,1),
	(73,1),
	(74,1),
	(75,1),
	(76,1),
	(77,1),
	(78,1),
	(79,1),
	(80,1),
	(81,1),
	(82,1),
	(83,1),
	(84,1),
	(85,1),
	(86,1),
	(87,1),
	(88,1),
	(89,1),
	(90,1),
	(91,1),
	(92,1),
	(93,1),
	(94,1),
	(95,1),
	(96,1),
	(97,1),
	(98,1),
	(99,1),
	(100,1),
	(101,1),
	(102,1),
	(103,1),
	(104,1),
	(105,1),
	(106,1),
	(107,1),
	(108,1),
	(109,1),
	(110,1),
	(111,1),
	(113,1),
	(114,1),
	(116,0),
	(117,1),
	(118,1),
	(119,1),
	(120,0),
	(122,0),
	(123,1),
	(124,1),
	(125,1),
	(126,1),
	(127,1),
	(128,1),
	(129,1),
	(130,1),
	(131,1),
	(132,0),
	(133,0),
	(134,1),
	(135,0),
	(136,0),
	(137,0),
	(138,0),
	(139,0),
	(140,0),
	(141,0),
	(142,0),
	(143,1),
	(144,1),
	(145,1),
	(146,1),
	(147,1),
	(148,1),
	(149,1),
	(150,1);

/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Loan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Loan`;

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

LOCK TABLES `Loan` WRITE;
/*!40000 ALTER TABLE `Loan` DISABLE KEYS */;

INSERT INTO `Loan` (`UserId`, `itemId`, `loanDate`, `returnDate`)
VALUES
	(7,2,'2018-11-10','0000-00-00'),
	(7,5,'2018-11-10','0000-00-00'),
	(2,2,'2018-11-11','2018-11-12'),
	(887,135,'0000-00-00','0000-00-00'),
	(887,136,'2018-11-15','2018-11-17'),
	(7,139,'2018-11-16','2018-11-23'),
	(7,140,'2018-11-16','2018-11-23'),
	(7,141,'2018-11-16','2018-11-23'),
	(7,142,'2018-11-16','2018-11-23'),
	(7,133,'2018-11-16','2018-11-18'),
	(7,132,'2018-11-16','2018-11-18'),
	(7,122,'2018-11-16','0000-00-00'),
	(7,132,'2018-11-16','2018-11-18');

/*!40000 ALTER TABLE `Loan` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table LogActivity
# ------------------------------------------------------------

DROP TABLE IF EXISTS `LogActivity`;

CREATE TABLE `LogActivity` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `action` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `LogActivity` WRITE;
/*!40000 ALTER TABLE `LogActivity` DISABLE KEYS */;

INSERT INTO `LogActivity` (`id`, `userId`, `timeStamp`, `action`)
VALUES
	(1,1,'2018-11-10 17:19:08',''),
	(2,0,'2018-11-10 17:19:12',''),
	(3,0,'2018-11-10 17:19:16',''),
	(4,0,'2018-11-10 17:24:55',''),
	(5,0,'2018-11-10 17:25:04',''),
	(6,1,'2018-11-10 17:25:22',''),
	(7,1,'2018-11-10 17:25:47',''),
	(8,1,'2018-11-10 17:25:56',''),
	(9,5,'2018-11-10 17:26:15',''),
	(10,5,'2018-11-10 17:28:04',''),
	(11,5,'2018-11-10 17:31:33',''),
	(12,3,'2018-11-11 18:15:22',''),
	(13,3,'2018-11-11 18:16:38',''),
	(14,3,'2018-11-11 18:18:32',''),
	(15,3,'2018-11-11 18:23:37',''),
	(16,3,'2018-11-11 18:25:40',''),
	(17,7,'2018-11-13 10:49:35','login'),
	(18,7,'2018-11-13 10:51:35','login'),
	(19,7,'2018-11-13 10:51:57','logout'),
	(20,7,'2018-11-13 22:48:31','login'),
	(21,894,'2018-11-15 10:07:12','login'),
	(22,894,'2018-11-15 10:07:58','login'),
	(23,894,'2018-11-15 10:11:22','logout'),
	(24,879,'2018-11-15 18:17:22','login'),
	(25,879,'2018-11-15 18:19:49','login'),
	(26,879,'2018-11-15 18:21:13','login'),
	(27,880,'2018-11-15 18:21:55','login'),
	(28,0,'2018-11-15 18:35:03','logout'),
	(29,0,'2018-11-15 18:35:29','logout'),
	(30,880,'2018-11-15 18:36:30','logout'),
	(31,0,'2018-11-15 18:37:49','logout'),
	(32,880,'2018-11-15 18:38:29','login'),
	(33,0,'2018-11-15 18:38:45','logout'),
	(34,0,'2018-11-15 18:40:19','logout'),
	(35,880,'2018-11-15 18:40:57','logout'),
	(36,880,'2018-11-15 18:41:23','logout'),
	(37,899,'2018-11-15 19:07:21','login'),
	(38,899,'2018-11-15 19:35:01','login'),
	(39,899,'2018-11-15 19:36:11','logout'),
	(40,880,'2018-11-15 19:36:44','login'),
	(41,880,'2018-11-15 22:59:03','logout'),
	(42,904,'2018-11-15 23:00:21','login'),
	(43,904,'2018-11-15 23:00:33','logout'),
	(44,880,'2018-11-15 23:02:08','login'),
	(45,899,'2018-11-16 10:16:18','login'),
	(46,899,'2018-11-16 10:17:56','logout'),
	(47,880,'2018-11-16 10:19:51','login'),
	(48,880,'2018-11-16 10:20:41','logout'),
	(49,899,'2018-11-16 10:20:48','login'),
	(50,899,'2018-11-16 11:29:37','logout'),
	(51,906,'2018-11-16 11:30:47','login'),
	(52,906,'2018-11-16 11:31:43','logout'),
	(53,880,'2018-11-16 11:32:07','login'),
	(54,880,'2018-11-16 12:59:31','logout'),
	(55,880,'2018-11-16 12:59:46','login');

/*!40000 ALTER TABLE `LogActivity` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table MagazineDesc
# ------------------------------------------------------------

DROP TABLE IF EXISTS `MagazineDesc`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `MagazineDesc` WRITE;
/*!40000 ALTER TABLE `MagazineDesc` DISABLE KEYS */;

INSERT INTO `MagazineDesc` (`idDesc`, `Title`, `Publisher`, `ISBN-10`, `ISBN-13`, `Language`)
VALUES
	(1,'MyTitle','MyPublihser','1234','5','MyLanguage'),
	(2,'apple','Concordia','8787878','8','english'),
	(7,'apple','Concordia','123456789','2','english'),
	(9,'apple','Concordia','98654886','4','english'),
	(11,'apple','Concordia','738299','3','english'),
	(12,'DD','BB','372','-','CC'),
	(16,'DD','BB','322','0','CC'),
	(17,'DD','BB','982','1','CC'),
	(18,'EEUUPP','GG','94482-03942-823','144212-1421323','CC'),
	(20,'EE','GG','982-0392-89-209','1212-1213','CC'),
	(21,'EE','GG','982-0392-869-20','1212-12163','CC'),
	(23,'EE','GG','982-0392-189-20','1212-12113','CC'),
	(24,'EE','GG','982-032392-189-','1212-1211233','CC'),
	(25,'EE','GG','982-0392342-89-','1212-1422313','CC'),
	(27,'EE','GG','94482-0392342-8','124412-1422313','CC'),
	(28,'EE','GG','982-0392-84469-','124412-1232163','CC'),
	(29,'EE','GG','44982-032392-18','121442-1211233','CC'),
	(42,'TimBits','Concordia','null','null','english'),
	(43,'Postman','undefined','undefined','undefined','Concordia');

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

LOCK TABLES `MagazinePh` WRITE;
/*!40000 ALTER TABLE `MagazinePh` DISABLE KEYS */;

INSERT INTO `MagazinePh` (`idDesc`, `available`, `id`)
VALUES
	(7,1,36),
	(9,1,37),
	(11,1,38),
	(12,1,51),
	(16,1,52),
	(17,1,53),
	(21,0,122),
	(23,1,123),
	(24,1,124),
	(25,1,125),
	(27,1,126),
	(29,1,127),
	(28,1,128),
	(42,1,130),
	(43,1,131);

/*!40000 ALTER TABLE `MagazinePh` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `MovieDesc` WRITE;
/*!40000 ALTER TABLE `MovieDesc` DISABLE KEYS */;

INSERT INTO `MovieDesc` (`idDesc`, `Title`, `Director`, `Producers`, `Actors`, `Language`, `Subtitles`, `Dubbed`, `ReleaseDate`, `RunTime`)
VALUES
	(1,'Nested Queries','Eglen','Yongtang','Team 8','Multilingual','NoSub','Sure','0000-00-00','0'),
	(2,'AA','AA','AA','AA','AA','AA','AA','0000-00-00','120'),
	(7,'AA','AA','AA','AA','AA','AA','AA','2017-04-20','120'),
	(9,'BB','AA','AA','AA','AA','AA','AA','2017-04-20','120'),
	(14,'EEAA','BB','CC','AA','AA','AA','AA','2017-04-20','120'),
	(18,'DD','BB','CC','AA','AA','AA','AA','2017-04-20','120'),
	(19,'DD','BB','CC','AA','AA','AA','AA','2017-05-20','120'),
	(20,'PostmaToModifyMannnnnn','Me','Don','MArvel with all the pips','Concordia','subsYesSubs','NoSir','0000-00-00','300'),
	(21,'Postman','Me','Don','MArvel with all the pips','Concordia','subsYesSubs','NoSir','0000-00-00','300');

/*!40000 ALTER TABLE `MovieDesc` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `MoviePh` WRITE;
/*!40000 ALTER TABLE `MoviePh` DISABLE KEYS */;

INSERT INTO `MoviePh` (`id`, `idDesc`, `available`)
VALUES
	(114,20,1),
	(113,19,1),
	(132,21,0);

/*!40000 ALTER TABLE `MoviePh` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `MusicDesc` WRITE;
/*!40000 ALTER TABLE `MusicDesc` DISABLE KEYS */;

INSERT INTO `MusicDesc` (`idDesc`, `Title`, `Artist`, `Label`, `Type`, `ReleaseDate`, `ASIN`)
VALUES
	(1,'CallbackHell','NodeJs','Asynchronus','TheCrazyKind','0000-00-00','3'),
	(2,'DD','BB','CC','AA','2019-04-14','12346789'),
	(4,'EEII','BB','CC','AA','2020-12-14','126326729'),
	(8,'DD','BB','CC','AA','2020-12-14','12426729'),
	(9,'DD','BB','CC','AA','2020-12-14','112426729'),
	(12,'DD','BB','CC','AA','2020-12-14','162426729'),
	(13,'DD','BB','CC','AA','2020-12-14','1124266729'),
	(14,'DD','BB','CC','AA','2020-12-14','123126729'),
	(15,'DD','BB','CC','AA','2020-12-14','11124266729'),
	(16,'IllModifyU','eglen','India','hip-hop','0000-00-00','678976'),
	(26,'Postman','Eminem','Don','Hip-hop','0000-00-00','4563728');

/*!40000 ALTER TABLE `MusicDesc` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `MusicPh` WRITE;
/*!40000 ALTER TABLE `MusicPh` DISABLE KEYS */;

INSERT INTO `MusicPh` (`idDesc`, `available`, `id`)
VALUES
	(9,0,116),
	(13,1,117),
	(12,1,118),
	(16,1,119),
	(14,0,120),
	(26,0,133);

/*!40000 ALTER TABLE `MusicPh` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table TransactionHistory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TransactionHistory`;

CREATE TABLE `TransactionHistory` (
  `transactionId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `type` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `itemId` int(11) NOT NULL,
  PRIMARY KEY (`transactionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `TransactionHistory` WRITE;
/*!40000 ALTER TABLE `TransactionHistory` DISABLE KEYS */;

INSERT INTO `TransactionHistory` (`transactionId`, `userId`, `type`, `timeStamp`, `itemId`)
VALUES
	(3,3,'loan','2018-11-11 18:02:03',0),
	(4,3,'loan','2018-11-11 18:03:04',0),
	(6,7,'loan','2018-11-13 10:57:44',54),
	(7,7,'return','2018-11-13 10:58:11',54),
	(8,7,'return','2018-11-13 10:58:52',54),
	(9,7,'loan','2018-11-13 22:39:42',34),
	(10,7,'loan','2018-11-13 22:40:25',34),
	(11,7,'loan','2018-11-13 22:41:39',34),
	(12,7,'loan','2018-11-13 22:42:29',34),
	(13,7,'loan','2018-11-13 22:43:49',34),
	(14,NULL,NULL,'2018-11-16 14:19:32',0),
	(17,NULL,NULL,'2018-11-16 14:56:35',0),
	(18,NULL,NULL,'2018-11-16 16:03:49',0),
	(19,NULL,NULL,'2018-11-16 16:04:15',0);

/*!40000 ALTER TABLE `TransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="NO_ENGINE_SUBSTITUTION" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`arti17co_soen343`@`%` */ /*!50003 TRIGGER `timeStampAdd` BEFORE INSERT ON `TransactionHistory` FOR EACH ROW BEGIN
IF NEW.timeStamp = CURRENT_TIMESTAMP THEN
SET NEW.timeStamp = CURRENT_TIMESTAMP + INTERVAL '1' HOUR;
END IF;
END */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;


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
	(1,'Team','Eight','H9, Capstone Room 3','team8fall2018@soen343.co',888888888,1,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(2,'soen','343','0001 Concordia University, Montreal, Quebec','soentest@concordia.ca',2147483647,1,'1'),
	(3,'Marc-Henry','Noon','0003 Concordia University, Montreal, Quebec','sample456@email.com',2147483647,0,''),
	(4,'Erdem','Kepenek','0005 Concordia University, Montreal, Quebec','sample789@email.com',2147483647,0,''),
	(5,'Manpreet','Singh','0007 Concordia University, Montreal, Quebec','Mapreett@concordia.ca',2147483647,0,''),
	(7,'Khang','Zheng','0011 Concordia University, Montreal, Quebec','Khang@concordia.ca',2147483647,0,''),
	(8,'Yongtang','Lu','0013 Concordia University, Montreal, Quebec','Yongtang@concordia.ca',2147483647,0,''),
	(9,'Line','Ghanem','0015 Concordia University, Montreal, Quebec','Line@concordia.ca',2147483647,0,''),
	(10,'David','Bechara','0017 Concordia University, Montreal, Quebec','David@concordia.ca',2147483647,0,''),
	(11,'Anthony','Iatropoulos','00019 Concordia University, Montreal, Quebec','Anthony@concordia.ca',2147483647,0,'9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043'),
	(737,'Eglenbro','Cecaj','00040 Concordia University, Montreal, Quebec','test',2147433649,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),
	(770,'CHANGED','TEST','SOMEWHERE','TEST@11111.COM',2147483647,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(773,'Lisa','Paso','Wonderland','3email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),
	(785,'Lisa','Paso','Wonderland','5email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),
	(871,'Eglenbro','Cecaj','00040 Concordia University, Montreal, Quebec','eglen@concordia.ca',2147433649,1,'14ad5e59d5126028865368d3e463ecc5d23ab333'),
	(879,'TEST','TEST','SOMEWHERE','TT@T.COM',2147483647,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(880,'TEST_AAAA','TEST','SOMEWHERE','TEST@45.COM',2147483647,1,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(886,'TEST_66','TEST','SOMEWHERE','BBBBBB@CCC.COM',2147483647,1,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(887,'TEST','TEST','SOMEWHERE','TEST@189.COM',2147483647,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(889,'TEST','TEST','SOMEWHERE','AAAA@AAA',2147483647,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(891,'TEST','TEST','SOMEWHERE','BBBB@BBB',2147483647,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(893,'TEST_66','TEST','SOMEWHERE','CCCC@CCC.COM',2147483647,1,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(894,'TEST','TEST','SOMEWHERE','BBBB@BBB.COM',2147483647,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(895,'TEST','TEST','SOMEWHERE','TEST@1111.COM',2147483647,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(899,'Erdem ','Kepenek','3342 Rue Sherboroke','erdemkepenek1@gmail.com',514923232,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(902,'erdem','kepenek','erere','hello@email.com',23232323,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(903,'madsa','erfere','dfdf','bye@hello.com',4242424,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(904,'Kaancan','Kucukoglu','3421 Rue Drummond','kacoman@gmail.com',525123525,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4'),
	(906,'Marc','Noon','rrerer','marc@gmail.com',343,0,'3fc5f72e8220106152dcb26e148a3ccf5c5e3824c67672c8dde7589873b621ad16c5268012df530063a2f584a101bb183a0b260a658af7d15e78540b84c666c4');

/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="NO_ENGINE_SUBSTITUTION" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`arti17co_soen343`@`%` */ /*!50003 TRIGGER `master_user_protection` AFTER DELETE ON `User` FOR EACH ROW IF old.`UserId` = 1 THEN
    INSERT INTO User
    VALUES  (old.`UserId`, old.`FirstName`, old.`LastName`, old.`Address`, old.`email`,old.`phone`,old.`type`, old.`password`);
END IF */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;



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

--
-- Dumping routines (FUNCTION) for database 'arti17co_soen343'
--
DELIMITER ;;

# Dump of FUNCTION getIDPh
# ------------------------------------------------------------

/*!50003 DROP FUNCTION IF EXISTS `getIDPh` */;;
/*!50003 SET SESSION SQL_MODE="NO_ENGINE_SUBSTITUTION"*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`arti17co_soen343`@`%`*/ /*!50003 FUNCTION `getIDPh`(id_desc INT(11), item_type varchar(20)) RETURNS int(11)
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
    
END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
DELIMITER ;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
