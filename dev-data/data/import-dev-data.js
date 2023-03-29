const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const Dish = require('./../../models/dishModel');


const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB connection successfull'))

//READ JSON FILE
const dishes = JSON.parse(fs.readFileSync(`${__dirname}/area.json`, 'utf-8'));

//IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Dish.create(dishes);
        console.log('Data successfully loaded!');
    }
    catch (err) {
        console.log(err);
    }
    process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Dish.deleteMany();
        console.log('Data successfully deleted!');
    }
    catch (err) {
        console.log(err);
    }
    process.exit();
};


if(process.argv[2] === '--import'){
    importData();
}
else if(process.argv[2] === '--delete'){
    deleteData();
}
console.log(process.argv);