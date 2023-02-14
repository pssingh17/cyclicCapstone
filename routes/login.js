const LocalStrategy = require('passport-local').Strategy
const {passport} = require('../configuration/server')
const db = require('../database/userDao')
const bcrypt = require('bcrypt')
const {express} = require('../configuration/server')
const jwt = require('jsonwebtoken');
const key = "478269814c199935d534702359a6330baf1113940da72d4b996e29062df1c2c5c04ccaf930329df14667afcb833acebd2a390836d6590311e56640e964f6ca4c"


const loginApp = express.Router()


passport.use(new LocalStrategy({usernameField:'userId',passwordField:'password'},async function(username,password,cb){
        
    const user = await db.getUserById(username)

    if(!user){
        return cb(null,false)
    }   
    
    const comparePassword = bcrypt.compareSync(password,user.password)

    if(!comparePassword){
        return cb(null,false)
    }

    cb(null,user)
}
))


passport.serializeUser(function(user,cb){
    process.nextTick(function(){
        var date = new Date()
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
        return cb(null,{
            userId:user.id,
            created_at:date,
            is_engineer:user.is_engineer,
            is_reviewer:user.is_reviewer
        })
    })
})

passport.deserializeUser(function(user,cb){
    process.nextTick(async function(){
        console.log("IN deserialize and user is : " + JSON.stringify(user))
         const existingUser = await db.getUserById(user.userId)
         if(!existingUser){
            console.log("In deserializing no user with id " + user.userId)
            return cb(null,false)
         }
         console.log("In deserilizing user authenticated....")
         return cb(null,user)
    })
})


function authenticate(req,res,next){
    return req.isAuthenticated() ?
    next() :  
    res.json({status:"FAILURE",message:"Please LogIn.",isLoggedIn:false})
}


loginApp.post('/signUp',async (req,res)=>{
   
    const newUser = await db.saveUser(req.body)
    if(!newUser){
      return res.status(500).json({status:"FAILURE",message:"User creation failed."})
    }
    return res.json({status:"SUCCESS",message:`User created with userId ${newUser}.`})
})




loginApp.post('/login',passport.authenticate('local'),(req,res)=>{  
     req.session.save()
      res.header('Access-Control-Allow-Credentials', 'true');
     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
     console.log("Cookie",req.cookies)
     res.json({status:"SUCCESS",message:"User is Logged in.",data:{...req.session.passport.user,isLoggedIn:true}})
})


// async function verifyJWT(req,res,next){

//     const accessToken = req.header('Authorization')

//     try{
//           const payload = jwt.verify(accessToken,key)
//           const user = await db.getUserById(payload.userId)
//           if(!user){
//             return res.status(401).json({status:"FAILURE",message:"Invalid Token."})
//           }
//           req.userId = user.id
//           req.user = user
//     }catch{
//       return res.status(401).json({status:"FAILURE",message:"Please LogIn/Invalid Token."})
//     }
//         next()
// }




// loginApp.post('/login',async (req,res)=>{

//       const {userId,password} = req.body
//       const user = await db.getUserById(userId)
//       if(!user){
//          res.status(400).json({status:"FAILURE",message:"User Does not Exist."})
//       }

//       const comparePassword = bcrypt.compareSync(password,user.password)
//       if(!comparePassword){
//          res.status(400).json({status:"FAILURE",message:"Password Mismatch."})
//       }

//       const data = {
//         userId : user.id,
//         is_engineer : user.is_engineer,
//         is_reviewer : user.is_reviewer,
//         name:user.name,
//         accessToken : createJWTToken(user.id)

//       }
//       req.login(user,function(err){
//         if(err){
//             console.log(err)
//         }
//       })

//       res.json({status:"SUCCESS",...data})
// })

//  function createJWTToken(userId){    
//     const payload = {
//         userId:userId
//     }

//     const token =  jwt.sign(payload,key,{expiresIn:3600})
//     return token
// }



loginApp.post('/logout',(req,res)=>{    
     req.session.destroy(function(err){
        res.clearCookie("connect.sid")
        if(err){
            console.log(err)
        }
        return res.json({status:"SUCCESS",message:"User logout successfully."})
     })
})


loginApp.get('/',authenticate,(req,res)=>{
  res.json({status:"SUCCESS",userId:req.session.passport})  
})


loginApp.post('/merchant',async (req,res)=>{
    const response =  await db.saveManufacturer(req.body)

    if(response.getStatusCode() === 200){
        return res.json(response.getSuccessObject())
    }
    res.json(response.getErrorObject())
})

   

module.exports = loginApp






