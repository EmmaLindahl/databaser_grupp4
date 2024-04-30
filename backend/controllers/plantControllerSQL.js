const connectionMySQL = require('../connectionMySQL')

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
//Get
exports.getFamilyName = (async (req, res) => {
  let sql = "SELECT * FROM FamilyTable"
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
exports.createFamilyName = (async (req, res) => {
  const { FamilyName } = req.body;

  // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = 'INSERT INTO FamilyTable (FamilyName) VALUES (?)';
  let params = [FamilyName];

  if (!FamilyName || FamilyName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'Du har inte skrivit in något familjnamn',
    });
  }

  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) throw error;
      return res.status(201).json({
        success: true,
        error: '',
        message: 'Du har lagt till en ny familj!'
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
exports.updateFamilyName = (async (req, res) => {
  const { FamilyName, FamilyId } = req.body;
  // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = 'UPDATE FamilyTable SET FamilyName = ? WHERE FamilyId = ?';
  let params = [FamilyName, FamilyId];

  if (!FamilyName || FamilyName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'Du har inte skrivit in något familjNamn',
    });
  }

  if (!FamilyId) {
    return res.status(400).json({
      success: false,
      error: 'Du har inte skrivit in något ID för familjen du ska uppdatera!',
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
exports.deleteFamilyName = (async (req, res) => {
  const { FamilyId } = req.body;

  // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = 'DELETE FROM FamilyTable WHERE FamilyId = ?';

  if (!FamilyId) {
    return res.status(400).json({
      success: false,
      error: 'Du har inte skrivit in något ID för familjen du ska radera!',
    });
  }

  try {
    await connectionMySQL.query(sql, [FamilyId], (error, results, fields) => {
      if (error) throw error;
      return res.status(201).json({
        success: true,
        error: '',
        message: 'familjen är nu raderad!'
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
