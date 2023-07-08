const iniexpress = require('express');
const app = iniexpress();
const Database = require('./db/configdb');
const productModel = require('./model/product');

//TO READ JSON
app.use(iniexpress.json());

//TO CAN USE FORM IN POSTMAN
app.use(iniexpress.urlencoded({extended:false}))

//HOME
app.get('/', (req, res)=>{
    res.send("Halo disana");
})

//CONNECT TO LOCALHOST
app.listen(3000, (req,res)=>{
    try {
        console.log('http://localhost:3000/');
    } catch (error) {
        console.log(error)
    }
})

//TO GET ALL DATA
app.get('/products', async(req,res)=>{
    try {
        const products = await productModel.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({massage: error.massage});
    }
})

//TO GET DATA BASED ON ID
app.get('/products/:id', async(req,res)=>{
    try {
        //GET ID FROM PARAMETER OR URL
        const {id} = req.params;
        const product = await productModel.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({massage: error.massage});
    }
})

//TO CREATE DATA
app.post("/products", async(req, res) => {
    try{
        const product = await productModel.create(req.body);
        res.status(200).json({product, massage: "Data berhasil ditambahkan"});
    }
    catch{
        console.log(error.massage);
        res.status(500).json({massage: error.massage});
    }
})

//TO UPDATE DATA
app.put('/products/:id', async(req,res)=>{
    try {
        //GET ID FROM PARAMETER OR URL
        const {id} = req.params;
        const product = await productModel.findByIdAndUpdate(id,req.body)
        //IF PRODUCT IS NOT THERE
        if(!product){
            res.status(404).json({massage: `Data yang anda cari tidak ada`})
        }
        const productUpdated = await productModel.findById(id);
        res.status(200).json({UpdatedProduct: productUpdated, massage: "Data berhasil di update"})
    } catch (error) {
        res.status(500).json({massage: error.massage});
    }
})

//TO DELETE DATA
app.delete('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await productModel.findByIdAndDelete(id)
        if(!product){
            res.status(404).json({massage: "Data yang anda cari tidak ditemukan"})
        }
        res.status(200).json({massage: "Data berhasil dihapus"})
    } catch (error) {
        res.status(500).json({massage: error.massage})
    }
})

//CONNECT TO DATABASE
Database.ConnectDB();

