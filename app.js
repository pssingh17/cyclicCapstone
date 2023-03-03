const {app,express} = require('./configuration/server')
const userRoutes = require('./routes/login')
const projectRoutes = require('./routes/projectRoutes')
const reportRoute = require('./routes/reportRoutes')
const path = require('path')

app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

app.use('/user',userRoutes)
app.use('/project',projectRoutes)
app.use('/report',reportRoute)

async function createStaticFolders(){
  try{
   const staticFiles = fs.readdirSync(path.join(appDir,'/static'),{withFileTypes:true})
   staticFiles.forEach((file)=>fs.unlinkSync(path.join(appDir,'/static',`/${file.name}`)))
   const downloadedFiles=fs.readdirSync(path.join(appDir,'/downloads'),{withFileTypes:true})
   downloadedFiles.forEach((file)=>fs.unlinkSync(path.join(appDir,'/downloads',`/${file.name}`)))
  }catch(error){
         fs.mkdirSync(path.join(appDir,'/static'),{mode:0777})
         fs.mkdirSync(path.join(appDir,'/downloads'),{mode:0777})
  }
}

createStaticFolders()

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(8081,()=>{
    console.log("Server up and running at port 8081.")
})