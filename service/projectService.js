const projectDao = require('../database/projectDao')


async function saveProject(userId,body,res){

    const response = await projectDao.saveProject(userId,body)

    if(response.getStatusCode===200){
        res.json(response.getSuccessObject())
    }
    res.status(response.getStatusCode()).json(response.getErrorObject())
}

module.exports = {saveProject}