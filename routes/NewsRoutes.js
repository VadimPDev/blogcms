const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const News = require('../models/News')


const router = new Router()

router.post('/add',auth,async(req,res)=>{
    try{
        const {content,title,category,len} = req.body
        const images = []
        for(let i=0; i<= len-1;i++){
            images.push(req.files[i].path)
        }
        
        const news = new News({title,text:content,category,preview:req.files.preview.path,images:images})
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

module.exports = router