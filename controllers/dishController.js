
const Dish = require('../models/dishModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}



exports.getAllDish = async (req, res) => {
    try {

        // ECEXUTE QUERY
        const features = new APIFeatures(Dish.find(), req.query)
            .filter()
            .sort()
            .limitFields();

        const dishes = await features.query;

        // const query = Tours.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy')


        //SEND RESPONSE
        res.status(200).json({
            meals: [...dishes]
        });
        // res.status(200).json({
        //     status: 'success',
        //     results: dishes.length,
        //     data: {
        //         dishes
        //     }
        // });

    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
}

exports.getDish = async (req, res) => {
    try {
        // const dish = await Dish.findById(req.params.id)
        const dish = await Dish.findOne({ strMeal: req.params.id })

        res.status(200).json({
            status: 'success',
            data: {
                dish
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}



exports.createDish = async (req, res) => {
    try {

        // const newTour = new Tour({})
        // newTour.save()

        const newDish = await Dish.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                dish: newDish
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data send..'
        })
    }
}

exports.updateDish = async (req, res) => {
    try {
        // const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })

        const filter = { strMeal: req.params.id };
        const update = req.body ;

        const dish = await Dish.findOneAndUpdate(filter , update , {
            new: true,
            runValidators: true
        })

        res.status(204).json({
            status: "success",
            data: {
                dish
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.deleteDish = async (req, res) => {

    try {
        // await Dish.findByIdAndDelete(req.params.id);

        Dish.findOneAndDelete({strMeal: req.params.id }, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted User : ", docs);
            }
        });
        
        res.status(200).json({
            status: "success",
            data: null
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}