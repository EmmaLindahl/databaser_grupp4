const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Ta emot Parse JSON bodies, hämta info från URL:en, hindra problem med CORS (?)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

    //Routes:
    const plantsRoutesSQL = require('./routes/plantsRoutesSQL')
    app.use(plantsRoutesSQL)
    const plantRoutesMongoDBRoutes = require('./routes/plantRoutesMongoDB')
    app.use(plantRoutesMongoDBRoutes);

//Vi kallar på vår MongoDB (Vi får tillgång till uppkopplingen)
const connectionMongoDB = require('./connectionMongoDB')
connectionMongoDB()

//Lyssnar efter uppkopplingar, om det blir en uppkoppling så skickas en console.log.
app.listen(port, () => console.log(`Example app listening on port ${port}!`));