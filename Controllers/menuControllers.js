const Menu = require("../Models/menuModel")

exports.create = async(req,res)=>{
    try {
     await Menu.create(req.body)
        res.status(200).json({message: "menu is created"});
    } catch (e) {
        res.status(404).json({message: "error"});
    }
    
}

exports.edit = async(req,res)=>{
    try {
        await Menu.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message: "menu is edited"});
    } catch (e) {
        res.status(404).json({message: "error"});
    }
    
}

exports.delete = async(req,res)=>{
    try {
        await Menu.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "menu is deleted"})
    } catch (e) {
        res.status(404).json({message: "error"});
    }
    
}
