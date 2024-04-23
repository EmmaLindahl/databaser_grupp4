//orginalkod
// exports.createCategory = ((req, res) => {
//     res.send('Här lägger vi till en kategori.');
// });

// exports.getCategories = ((req, res) => {
//     res.send('Här visar vi kategorier.')
// });
//orginalkod STOP



//För MongoDB
//vi hämtar vår category-model och lägger den som en constant i denna filen. (aktuella model)
const Category = require ('../models/categories')


//vid en post-req
exports.createCategory = ( async (req, res) => {
    try {
        //Hur får jag in en req i den nya categories?? -->Kolla rad 39 i filen: bookControllers
        //När någon gör en post så hamnar den nya infon i vår databas
       const newCategory = new Category({ }) 
       await newCategory.save()
        
    } catch (error) {
        
    }
});

//vid en get-req
//Letar den efter en liknande struktur som modellen i vår MongoDB databas? Eller varför används modellen i get-request?
exports.getCategory = ( async (req, res) => {
    try {
        const allCategories = await Category.find()
        return res.status(200).json(allCategories)
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

