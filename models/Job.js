const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company : {type:String,required:[true,"please provide company"],maxlength:50},
    position : {type:String,required:[true,"please provide position"],maxlength:150},
    status : {type:String,enum:['interview','declined','pending'],default:"pending"},
    createby:{type:mongoose.Types.ObjectId,ref:'User',required:[true,'Please provide user']}

},{timestamps:true})

module.exports = mongoose.model('Job',JobSchema)

