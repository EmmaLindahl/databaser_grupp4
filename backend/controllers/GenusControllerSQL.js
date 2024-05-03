const connectionMySQL = require('../connectionMySQL')

//Filips controllers släkt
//Get
exports.getGenus = (async (req, res) => {
  let sql = "SELECT * FROM GenusTable"
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
exports.createGenus = (async (req, res) => {
  const { GenusName } = req.body;

  // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = 'INSERT INTO GenusTable (GenusName) VALUES (?)';
  let params = [GenusName];

  if (!GenusName || GenusName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'Du har inte skrivit in något släkt namn',
    });
  }

  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) throw error;
      return res.status(201).json({
        success: true,
        error: '',
        message: 'Du har lagt till ett nytt släkte!'
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
exports.updateGenus = (async (req, res) => {
  const { GenusName, GenusId } = req.body;
  // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = 'UPDATE GenusTable SET GenusName = ? WHERE GenusId = ?';
  let params = [GenusName, GenusId];

  if (!GenusName || GenusName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'Du har inte skrivit in något släktNamn',
    });
  }

  if (!GenusId) {
    return res.status(400).json({
      success: false,
      error: 'Du har inte skrivit in något ID för släkten du ska uppdatera!',
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
exports.deleteGenus = (async (req, res) => {
  const { GenusId } = req.body;

  // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = 'DELETE FROM GenusTable WHERE GenusId = ?';

  if (!GenusId) {
    return res.status(400).json({
      success: false,
      error: 'Du har inte skrivit in något ID för släkten du ska radera!',
    });
  }

  try {
    await connectionMySQL.query(sql, [GenusId], (error, results, fields) => {
      if (error) throw error;
      return res.status(201).json({
        success: true,
        error: '',
        message: 'släkten är nu raderad!'
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

