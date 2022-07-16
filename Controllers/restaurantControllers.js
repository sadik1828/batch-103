const Restaurant = require("../Models/restaurantModel");

exports.getOne = async(req, res) =>{
try {
   const restaurant= await Restaurant.findById(req.params.id);
    res.status(200).json({message: restaurant});

} catch (e) {
    res.status(200).json({message: "error occurred"});
}

}

exports.getAll = async(req, res) =>{
   try {
    const restaurant = await Restaurant.find({})
    
    res.status(200).json({results: restaurant.length, data: restaurant});

   } catch (e) {
    res.status(400).json({message: "error occured"});
   } 
    
  
}

exports.create = async(req, res) =>{
try {
    await Restaurant.create(req.body);
    res.status(200).json({message: "created"});
} catch (e) {
    res.status(400).json({message: "error"});
}

}

exports.edit = async(req, res) =>{
try {
await Restaurant.findByIdAndUpdate(req.params.id,req.body)

    res.status(200).json({message: "update"});
} catch (e) {
    res.status(200).json({message: "error"});
}

    
}

exports.delete = async(req, res) =>{
    try {

        await Restaurant.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "deleted"})
    } catch (e) {
        res.status(200).json({message: "error occurred"});
    }
    
}