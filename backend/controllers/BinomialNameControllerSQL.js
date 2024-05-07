const connectionMySQL = require('../connectionMySQL')

//Melas controllers
//Get
exports.getBinomialName = (async (req, res) => {
  let sql = "SELECT * FROM BinomialNameTable"
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
  const { BinomialName } = req.body;

  // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = 'INSERT INTO BinomialNameTable (BinomialName) VALUES (?)';
  let params = [BinomialName];

  if (!BinomialName || BinomialName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'Ett latinskt namn saknas.',
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
  const { BinomialName, BinomialNameId } = req.body;
  // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = 'UPDATE BinomialNameTable SET BinomialName = ? WHERE BinomialNameId = ?';
  let params = [BinomialName, BinomialNameId];

  if (!BinomialName || BinomialName.trim().length < 1) {
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
        message: 'Det latinska namnet är nu raderad!'
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});