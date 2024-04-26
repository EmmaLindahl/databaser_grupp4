// function (orginalkod){
    //orginalkod
// exports.createCategory = ((req, res) => {
//     res.send('Här lägger vi till en kategori.');
// });

// exports.getCategories = ((req, res) => {
//     res.send('Här visar vi kategorier.')
// });
//orginalkod STOP
// }
const Category = require ('../models/categories')
//vi hämtar vår Category-model som vi kommer använda för POST och GET.

//vid en post-req
//När någon gör en post så hamnar den nya infon i vår databas. Det nya objektet följer modellen som finns i categories.js
exports.createCategory = ( async (req, res) => {
    try {
        //Hur får jag in en req i den nya categories?? -->Kolla rad 39 i filen: bookController.js
       const newCategory = new Category({ }) 
       await newCategory.save()
        
    } catch (error) {
        
    }
});

//vid en get-req
// Express hämtar all info från databasen men presenterar bara infon från modellen. i categories.js
exports.getCategory = ( async (req, res) => {
    try {
        const allCategories = await Category.find()
        return res.status(200).json(allCategories)
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

