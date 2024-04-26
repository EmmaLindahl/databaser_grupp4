const connectionMySQL = require('./../connectionMySQL')

exports.getPlants = (async(req, res) => {
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