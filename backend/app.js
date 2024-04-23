const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Ta emot Parse JSON bodies, hämta info från URL:en, hindra problem med CORS (?)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Kan tas bort för vi ska använda vite.
// app.use(express.static('public'));

//Ta bort dessa & sätt upp egna routes till våra databaser
    const bookRoutes = require('./routes/bookRoutes');
    const categoryRoutes = require('./routes/categoryRoutes');

    app.use(bookRoutes);
    app.use(categoryRoutes);
//till hit

//Vi kallar på vår MongoDB (Vi får tillgång till uppkopplingen)
const connectionMongoDB = require('./connectionMongoDB')
connectionMongoDB()

//Lyssnar efter uppkopplingar, om det blir en uppkoppling så skickas en console.log.
app.listen(port, () => console.log(`Example app listening on port ${port}!`));