const connectionMySQL = require('./../connectionMySQL')

exports.getBooks = (async(req, res) => {
    let sql = "SELECT * FROM bok";
    try{
        await connectionMySQL.query(sql, (error, results, fields) => {
            if (error) {
                if (error) throw error;
            }
            res.json(results);
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});

exports.getBook = (async(req, res) => {
    const { id } = req.params;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = "SELECT * FROM bok WHERE bokId = ?";
    try{
        await connectionMySQL.query(sql,[id], (error, results, fields) => {
            if (error) {
                if (error) throw error;
            }
            res.json(results);
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});

exports.createBook = (async(req, res) => {
    const { bokForfattare, bokTitel, bokIsbn, bokPris, bokKategoriId } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql ='INSERT INTO bok (bokForfattare, bokTitel, bokIsbn, bokPris, bokKategoriId) VALUES (?,?,?,?,?)';
    let params =[bokForfattare, bokTitel, bokIsbn, bokPris, bokKategoriId];

    if (!bokIsbn || bokIsbn.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ISBN för boken',
        });
    }

    try{
        await connectionMySQL.query(sql, params, (error, results, fields) => {
            if (error) {
                if (error) throw error;
            }
            return res.status(201).json({
                success: true,
                error: '',
                message: 'Du har lagt till en ny bok!'
            });
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

exports.updateBook = (async(req, res) => {
    const { bokForfattare, bokTitel, bokIsbn, bokPris, bokKategoriId, bokId } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql ='UPDATE bok SET bokForfattare = ?, bokTitel = ?, bokIsbn = ?, bokPris = ?, bokKategoriId = ? WHERE bokId = ?';
    let params =[bokForfattare, bokTitel, bokIsbn, bokPris, bokKategoriId, bokId];

    if (!bokIsbn || bokIsbn.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ISBN för boken',
        });
    }

    if (!bokId) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ID för boken du ska uppdatera!',
        });
    }

    try{
        await connectionMySQL.query(sql, params, (error, results, fields) => {
            if (error) {
                if (error) throw error;
            }
            return res.status(201).json({
                success: true,
                error: ''
            });
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

exports.deleteBook = (async(req, res) => {
    const { bokId } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'DELETE FROM bok WHERE bokId = ?';

    if (!bokId) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ID för boken du ska radera!',
        });
    }

    try{
        await connectionMySQL.query(sql, [bokId], (error, results, fields) => {
            if (error) {
                if (error) throw error;
            }
            return res.status(201).json({
                success: true,
                error: '',
                message: 'Boken är nu raderad!'
            });
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

exports.getBooksCategories = (async(req, res) => {
    let sql = "SELECT * FROM kategori INNER JOIN bok ON kategori.kategoriId = bok.bokKategoriId";

    try{
        await connectionMySQL.query(sql, (error, results, fields) => {
            if (error) {
                if (error) throw error;
            }
            res.json(results)
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});