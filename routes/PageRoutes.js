const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const Page = require('../models/Page')

const router = new Router()

router.post('/create',auth,async(req,res)=>{
    try{
        const {title,url,content} = req.body
        const candidate = await Page.findOne({url})
        if(candidate){
            return res.status(400).json({message:"Такая страница уже есть"})
        }
        const page = new Page({title,url,content})
        await page.save()
        return res.status(201).json({message:'Страница создана'})
    }catch(e){
        return res.status(500).json({message:"Неверные данные"})
    }
})

router.get('/get/:url',async(req,res)=>{
    const url = req.params.url
    const page = await Page.findOne({url})
    res.json(page)
})


module.exports = router