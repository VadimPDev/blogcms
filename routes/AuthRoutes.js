const {Router} = require('express')
const {check,validationResult} = require('express-validator')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = new Router()

router.post('/register',
[
    check('email','Некоректный email').isEmail(),
    check('password','Минимальная длина 6 символов').isLength({min:6})
],
async(req,res)=>{
    try{
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {email,password} = req.body


        const candidate = await User.findOne({email})

        if(candidate){
            return res.status(400).json({message:"Такой пользователь существует"})
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const user = new User({email,password:hashedPassword})
            await user.save()
            return res.status(201).json({message:"Пользователь создан"})
        }

    }catch(e){
        return res.status(500).json({message:'Некоректные данные'})
    }
})

router.post('/login',
[
    check('email','Введите корректный email').normalizeEmail().isEmail(),
    check('password','Введите пароль').exists()
],
async(req,res)=>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password,user.password) 

        if(!isMatch){
            return res.status(400).json({message:'Пароль не верный'})
        }

        const token = jwt.sign({userId:user._id},config.get('jwtSecret'),{expiresIn:'1h'})

        return res.json({token,userId:user._id})

    }catch(e){
        return res.status(500).json({message:'Некоректные данные'})
    }
})

module.exports = router