const {express} = require('../configuration/server')
const projectMethods = require('../service/projectService')

const projectRoute = express.Router()

projectRoute.use((req,res,next)=>{
        if(!req.isAuthenticated()){
            return res.status(401).json({status:"FAILURE",message:"Please login.",isLoggedIn:false})
        }
        next()
})

projectRoute.post('/save',async (req,res)=>{
      return await projectMethods.saveProject(req.user.userId,req.body,res)
})

module.exports = projectRoute