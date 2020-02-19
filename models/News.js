const {Schema,model} = require('mongoose')

const schema = new Schema({
    title:{type:String,required:true},
    text:{type:String,required:true},
    category:{type:String,required:true},
    preview:{type:String,required:true},
    images:{type:Array,required:true}
},{timestamps:true})

module.exports = model('News',schema)