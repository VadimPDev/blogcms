const {Router} = require('express')
const Category = require('../models/Category')
const auth = require('../middleware/auth.middleware')

const router = new Router()


router.post('/create',auth,async(req,res)=>{
    try{
        const {title,url} = req.body

        const candidate = await Category.findOne({title})

        if(candidate) {
            return res.status(400).json({message:'Уже существует'})
        }
        const category = new Category({title,url})
        await category.save()
        return res.status(201).json({message:"Категория создана"})
    }catch(e){
        return res.status(500).json({message:"Неверные данные"})
    }
})

router.get('/get',async(req,res)=>{
    try{
        const category = await Category.find()
        return res.json(category)
    }catch(e){
        return res.status(500).json({message:"Неверные данные"})
    }
})


module.exports = router