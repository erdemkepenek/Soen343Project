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
-- Dumping data for table `Book`
--

LOCK TABLES `Book` WRITE;
/*!40000 ALTER TABLE `Book` DISABLE KEYS */;
/*!40000 ALTER TABLE `Book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Client`
--

LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
INSERT INTO `Client` VALUES (1,'soen','343','0001 Concordia University, Montreal, Quebec','soentest@concordia.ca',2147483647,1,'1'),(3,'Marc-Henry','Noon','0003 Concordia University, Montreal, Quebec','Marc@concordia.ca',2147483647,0,''),(4,'Erdem','Kepenek','0005 Concordia University, Montreal, Quebec','Erdem@concordia.ca',2147483647,0,''),(5,'Manpreet','Singh','0007 Concordia University, Montreal, Quebec','Mapreett@concordia.ca',2147483647,0,''),(6,'Mike','Salib','0009 Concordia University, Montreal, Quebec','Mike@concordia.ca',2147483647,0,''),(7,'Khang','Zheng','0011 Concordia University, Montreal, Quebec','Khang@concordia.ca',2147483647,0,''),(8,'Yongtang','Lu','0013 Concordia University, Montreal, Quebec','Yongtang@concordia.ca',2147483647,0,''),(9,'Line','Ghanem','0015 Concordia University, Montreal, Quebec','Line@concordia.ca',2147483647,0,''),(10,'David','Bechara','0017 Concordia University, Montreal, Quebec','David@concordia.ca',2147483647,0,''),(11,'Anthony','Iatropoulos','00019 Concordia University, Montreal, Quebec','Anthony@concordia.ca',2147483647,0,'9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043'),(737,'Eglenbro','Cecaj','00040 Concordia University, Montreal, Quebec','test',2147433649,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),(738,'Lisa','Paso','Wonderland','email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),(769,'Lisa','Paso','Wonderland','1email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),(770,'Lisa','Paso','Wonderland','2email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),(773,'Lisa','Paso','Wonderland','3email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),(783,'Lisa','Paso','Wonderland','4email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40'),(785,'Lisa','Paso','Wonderland','5email@email.com',12349,1,'0f7d0d088b6ea936fb25b477722d734706fe8b40');
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Magazine`
--

LOCK TABLES `Magazine` WRITE;
/*!40000 ALTER TABLE `Magazine` DISABLE KEYS */;
INSERT INTO `Magazine` VALUES (1,'MyTitle','MyPublihser',1234,56789,'MyLanguage');
/*!40000 ALTER TABLE `Magazine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Movie`
--

LOCK TABLES `Movie` WRITE;
/*!40000 ALTER TABLE `Movie` DISABLE KEYS */;
/*!40000 ALTER TABLE `Movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Music`
--

LOCK TABLES `Music` WRITE;
/*!40000 ALTER TABLE `Music` DISABLE KEYS */;
/*!40000 ALTER TABLE `Music` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Rent`
--

LOCK TABLES `Rent` WRITE;
/*!40000 ALTER TABLE `Rent` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cartActivity`
--

LOCK TABLES `cartActivity` WRITE;
/*!40000 ALTER TABLE `cartActivity` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartActivity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `logActivity`
--

LOCK TABLES `logActivity` WRITE;
/*!40000 ALTER TABLE `logActivity` DISABLE KEYS */;
/*!40000 ALTER TABLE `logActivity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-19 14:14:41
