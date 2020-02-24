const {Schema,model} = require('mongoose')

const schema = new Schema({
    title:{type:String,required:true},
    url:{type:String,required:true},
    content:{type:String,required:true}
},{timestamps:true})

module.exports = model('Page',schema)