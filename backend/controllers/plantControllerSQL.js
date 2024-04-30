const connectionMySQL = require('../connectionMySQL')

//Get
exports.getPlants = (async (req, res) => {
    let sql = "SELECT PlantName, PlantBinomialName, PlantFamilyName FROM NameTable"
    try {
        await connectionMySQL.query(sql, (error, results, fields) => {
            if (error) throw error
            res.json(results)
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }

})

//Post
exports.createPlants = (async (req, res) => {
    const { PlantName } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'INSERT INTO NameTable (PlantName) VALUES (?)';
    let params = [PlantName];

    if (!PlantName || PlantName.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något växtnamn',
        });
    }

    try {
        await connectionMySQL.query(sql, params, (error, results, fields) => {
            if (error) throw error;
            return res.status(201).json({
                success: true,
                error: '',
                message: 'Du har lagt till ett nytt växtnamn!'
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

//update
exports.updatePlants = (async (req, res) => {
    const { PlantName, NameId } = req.body;
    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'UPDATE NameTable SET PlantName = ? WHERE NameId = ?';
    let params = [PlantName, NameId];

    if (!PlantName || PlantName.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något växtnamn',
        });
    }

    if (!NameId) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ID för växtnamnet du ska uppdatera!',
        });
    }

    try {
        await connectionMySQL.query(sql, params, (error, results, fields) => {
            if (error) throw error;
            return res.status(201).json({
                success: true,
                error: ''
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// Delete
exports.deletePlants = (async (req, res) => {
    const { PlantName } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'DELETE FROM NameTable WHERE PlantName = ?';

    if (!PlantName) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ID för växtnamnet du ska radera!',
        });
    }

    try {
        await connectionMySQL.query(sql, [PlantName], (error, results, fields) => {
            if (error) throw error;
            return res.status(201).json({
                success: true,
                error: '',
                message: 'växtnamnet är nu raderat!'
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

//Filips controllers

//Melas controllers
//Get
exports.getBinomialName = (async (req, res) => {
    let sql = "SELECT * FROM speciesTable"
    try {
        await connectionMySQL.query(sql, (error, results, fields) => {
            if (error) throw error
            res.json(results)
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }

})


//Post
exports.createBinomialName = (async (req, res) => {
    const { binomialNameName } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'INSERT INTO BinomialNameTable (binomialNameName) VALUES (?)';
    let params = [binomialNameName];

    if (!binomialNameName || binomialNameName.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något latinskt namn',
        });
    }

    try {
        await connectionMySQL.query(sql, params, (error, results, fields) => {
            if (error) throw error;
            return res.status(201).json({
                success: true,
                error: '',
                message: 'Du har lagt till ett nytt latinskt namn!'
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

//update
exports.updateBinomialName = (async (req, res) => {
    const { binomialNameName, BinomialNameId } = req.body;
    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'UPDATE BinomialNameTable SET binomialNameName = ? WHERE BinomialNameId = ?';
    let params = [binomialNameName, BinomialNameId];

    if (!binomialNameName || binomialNameName.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något latinskt namn',
        });
    }

    if (!BinomialNameId) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ID för det latinska namnet du ska uppdatera!',
        });
    }

    try {
        await connectionMySQL.query(sql, params, (error, results, fields) => {
            if (error) throw error;
            return res.status(201).json({
                success: true,
                error: ''
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// Delete
exports.deleteBinomialName = (async (req, res) => {
    const { BinomialNameId } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'DELETE FROM BinomialNameTable WHERE BinomialNameId = ?';

    if (!BinomialNameId) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ID för det latinska namnet du ska radera!',
        });
    }

    try {
        await connectionMySQL.query(sql, [BinomialNameId], (error, results, fields) => {
            if (error) throw error;
            return res.status(201).json({
                success: true,
                error: '',
                message: 'det latinska namnet är nu raderad!'
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});


//Emmas controllers
//Get
exports.getSpecies = (async (req, res) => {
    let sql = "SELECT * FROM speciesTable"
    try {
        await connectionMySQL.query(sql, (error, results, fields) => {
            if (error) throw error
            res.json(results)
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }

})

//Post
exports.createSpecies = (async (req, res) => {
    const { speciesName } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'INSERT INTO speciesTable (speciesName) VALUES (?)';
    let params = [speciesName];

    if (!speciesName || speciesName.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något artnamn',
        });
    }

    try {
        await connectionMySQL.query(sql, params, (error, results, fields) => {
            if (error) throw error;
            return res.status(201).json({
                success: true,
                error: '',
                message: 'Du har lagt till en ny art!'
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

//update
exports.updateSpecies = (async (req, res) => {
    const { speciesName, speciesId } = req.body;
    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'UPDATE speciesTable SET speciesName = ? WHERE speciesId = ?';
    let params = [speciesName, speciesId];

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

    try {
        await connectionMySQL.query(sql, params, (error, results, fields) => {
            if (error) throw error;
            return res.status(201).json({
                success: true,
                error: ''
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// Delete
exports.deleteSpecies = (async (req, res) => {
    const { speciesId } = req.body;

    // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
    let sql = 'DELETE FROM speciesTable WHERE speciesId = ?';

    if (!speciesId) {
        return res.status(400).json({
            success: false,
            error: 'Du har inte skrivit in något ID för arten du ska radera!',
        });
    }

    try {
        await connectionMySQL.query(sql, [speciesId], (error, results, fields) => {
            if (error) throw error;
            return res.status(201).json({
                success: true,
                error: '',
                message: 'arten är nu raderad!'
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});
//Charlies controllers