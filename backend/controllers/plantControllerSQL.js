const connectionMySQL = require('../connectionMySQL')

//Get
exports.getPlants = (async (req, res) => {
  let sql = "SELECT PlantName, PlantBinomialName, PlantGenusName, PlantFamilyName, PlantSpeciesName FROM NameTable"
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
  const { PlantName, PlantBinomialName, PlantGenusName, PlantFamilyName, PlantSpeciesName } = req.body;

  // Vi använder Prepared Statements genom ? i SQL-nokoden och att ange paramatern i query-funktionen
  let sql = 'INSERT INTO NameTable (PlantName, PlantBinomialName, PlantGenusName, PlantFamilyName, PlantSpeciesName) VALUES (?,?,?,?,?)';
  let params = [PlantName, PlantBinomialName, PlantGenusName, PlantFamilyName, PlantSpeciesName];

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
