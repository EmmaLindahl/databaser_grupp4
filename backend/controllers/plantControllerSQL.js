const connectionMySQL = require('../connectionMySQL')

exports.getPlants = (async(req, res) => {
    let sql = "SELECT * FROM NameTable"
    try{
        await connectionMySQL.query(sql, (error, results, fields) => {
            if(error){
                if (error) throw error
            }
            res.json(results)
        })
    }catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
    
})





//Filips controllers

//Melas controllers

//Emmas controllers
//Get
exports.getSpecies= (async(req, res) => {
    let sql = "SELECT * FROM speciesTable"
    try{
        await connectionMySQL.query(sql, (error, results, fields) => {
            if(error){
                if (error) throw error
            }
            res.json(results)
        })
    }catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
    
})

//Post
exports.createSpecies = (async(req, res) => {
    const { speciesName } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql ='INSERT INTO speciesTable (speciesName) VALUES (?)';
    let params =[speciesName];

    if (!speciesName || speciesName.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något artnamn',
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
                message: 'Du har lagt till en ny art!'
            });
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

//update
exports.updateSpecies = (async(req, res) => {
    const {speciesName, speciesId } = req.body;
    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql ='UPDATE speciesTable SET speciesName = ? WHERE speciesId = ?';
    let params =[speciesName, speciesId];

    if (!speciesName || speciesName.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något artNamn',
        });
    }

    if (!speciesId) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ID för arten du ska uppdatera!',
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

// Delete
exports.deleteSpecies = (async(req, res) => {
    const { speciesId } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'DELETE FROM speciesTable WHERE speciesId = ?';

    if (!speciesId) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ID för arten du ska radera!',
        });
    }

    try{
        await connectionMySQL.query(sql, [speciesId], (error, results, fields) => {
            if (error) {
                if (error) throw error;
            }
            return res.status(201).json({
                success: true,
                error: '',
                message: 'arten är nu raderad!'
            });
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});
//Charlies controllers