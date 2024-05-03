const connectionMySQL = require('../connectionMySQL')

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
