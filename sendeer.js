const Store = require('./models/Store');
const Product = require('./models/Product');
const dotenv = require('dotenv');
const fs = require('fs');
const colors = require('colors');
const mongoose = require('mongoose');

dotenv.config({path : './config/config.env'});

  mongoose.connect(
        process.env.MONGO_URI, 
        {
        useNewUrlParser: true,
        useCreateIndex : true,
        useFindAndModify : true,
        useUnifiedTopology: true 
    });

    // Read JSON files
const stores = JSON.parse(
    fs.readFileSync(`${__dirname}/faqe_data/stores.json`,'utf-8')
);

const products = JSON.parse(
    fs.readFileSync(`${__dirname}/faqe_data/products.json`,'utf-8')
)

// Import into DB
const importData = async()=>{
    try {

        await Store.create(stores);
 
        console.log('Data Imported....'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete into DB
const deleteData = async()=>{
    try {
       await Store.deleteMany();
 
        console.log('Data Deleted....'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] ==='-i'){
    importData();
}else if(process.argv[[2]]=== '-D'){
    deleteData();
}

