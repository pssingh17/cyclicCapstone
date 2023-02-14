const {app,express} = require('./configuration/server')
const userRoutes = require('./routes/login')
const projectRoutes = require('./routes/projectRoutes')
const reportRoute = require('./routes/reportRoutes')
const path = require('path')

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.use('/user',userRoutes)
app.use('/project',projectRoutes)
app.use('/report',reportRoute)

app.listen(8081,()=>{
    console.log("Server up and running at port 8081.")
})