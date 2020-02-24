const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const News = require('../models/News')
const Category = require('../models/Category')
const {check,validationResult} = require('express-validator')


const router = new Router()

router.post('/add',[
    check('content','Минимальная длина 50 символов').isLength({min:50}),
    check('category','Выберите категорию').notEmpty(),
],auth,async(req,res)=>{
    try{

        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {content,title,category,len} = req.body
        const categoryId = await Category.findOne({title:category})
        const images = []
        for(let i=0; i<= len-1;i++){
            images.push({path:req.files[i].path})
        }
        if(!req.files.preview) {
            return res.status(400).json({message:"Выберите првеью"})
        }
        
        const news = new News({title,text:content,category:categoryId._id,preview:req.files.preview.path,images:images})
        await news.save()
        return res.status(201).json({message:'Новость создана'})
    }catch(e){
        return res.status(500).json({message:'Некоректные данные'})
    }
})

router.get('/load',async(req,res)=>{
    try{
        const news = await News.find({}).sort({createdAt:-1})
        return res.status(200).json(news)
    }catch(e){
        return res.status(500).json({message:'Некоректные данные'})
    }
})

router.get('/get/:id',async(req,res)=>{
    try{
        const newsid = req.params.id
        const news = await News.findById(newsid)
        return res.status(200).json(news)
    }catch(e){
        return res.status(500).json({message:'Некоректные данные'})
    }
})

router.get('/category/:url',async(req,res)=>{
    try{
        const categoryUrl = req.params.url
        const categoryId = await Category.findOne({url:categoryUrl})
        const news = await News.find({category:categoryId._id})
        res.json(news)
    }catch(e){
        return res.status(500).json({message:'Некоректные данные'})
    }
})

module.exports = router