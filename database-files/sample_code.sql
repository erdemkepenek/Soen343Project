//CASE 1:

INSERT INTO `BookDesc` (`Title`, `Author`, `Format`, `Pages`, `Publisher`, `ISBN-10`, `ISBN-13`, `Language`)
VALUES
	('Hamlet', 'Shakespear', 'hardcopy', 342, 'Concordia', NULL, NULL, NULL);
SET @last_id_book = LAST_INSERT_ID();
INSERT INTO `Items` (id) 
VALUES 
	(null);
SET @last_id_item = LAST_INSERT_ID();
INSERT INTO `BookPh` (idDesc, available, id) 
VALUES 
	(@last_id_book, 1, @last_id_item);


