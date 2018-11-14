SELECT *
FROM BookDesc
WHERE idDesc 
IN (
SELECT idDesc 
FROM BookPh
INNER JOIN Loan ON BookPh.id = Loan.itemId
)

let sqlMagazine = 'SELECT * FROM MagazineDesc INNER JOIN (SELECT * FROM MagazinePh INNER JOIN Loan ON MagazinePh.id = Loan.itemId) AS T ON MagazineDesc.idDesc = T.idDesc';
let sqlMovie = 'SELECT * FROM MovieDesc INNER JOIN (SELECT * FROM MoviePh INNER JOIN Loan ON MoviePh.id = Loan.itemId) AS T ON MovieDesc.idDesc = T.idDesc';
let sqlMusic = 'SELECT * FROM MusicDesc INNER JOIN (SELECT * FROM MusicPh INNER JOIN Loan ON MusicPh.id = Loan.itemId) AS T ON MusicDesc.idDesc = T.idDesc';
    