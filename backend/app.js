const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Parse JSON bodies
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//Kan tas bort för vi ska använda vite.
// app.use(express.static('public'));

//Vad är detta för Routes? -Behövs dom? -Nej, skapa egna, ta bort detta sen!
    const bookRoutes = require('./routes/bookRoutes');
    const categoryRoutes = require('./routes/categoryRoutes');

    app.use(bookRoutes);
    app.use(categoryRoutes);
// till hit?

//Sätt upp egna routes till våra databaser.

//Vi kallar på vår MongoDB (Vi får tillgång till uppkopplingen)
const connectionMongoDB = require('./connectionMongoDB')
connectionMongoDB()

app.listen(port, () => console.log(`Example app listening on port ${port}!`));