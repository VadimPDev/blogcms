const {model,Schema} = require('mongoose')

const schema = new Schema({
    title:{type:String,required:true},
    url:{type:String,required:true}
})

module.exports = model('Category',schema)