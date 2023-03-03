const { BlobServiceClient, StorageSharedKeyCredential,ContainerClient
} = require("@azure/storage-blob");
const fs = require('fs')
const { dirname } = require('path')
const appDir = dirname(require.main.filename)
const path = require('path')

console.log(appDir)

const accountName = "capstoned";
const accountKey = "DRuhoJNVyxh58M+XRCACtAeHmdXqeboWLZs07NGbPxd7LJR50bfSUHYFU7xdmHd16+Ie1JHr8c7/+ASt/8jUNg==";

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

async function getExistingContainer(containerName){
  try{
        const client = new ContainerClient(
          `https://${accountName}.blob.core.windows.net/${containerName}`,
          sharedKeyCredential
         )
         return client;

  }catch(error){
    console.log("Error in connecting to existing container with name " + containerName + " and error is " + error)
  }  
}

async function uploadBlob(filePath,containerName,blobName,containerClient){
    console.log( "FILE " + filePath + " Uploading file with container Name " + containerName + " and blob name " + blobName) 
 
     try{
       const blobOptions = {
             blobHTTPHeaders:{
                 blobContentType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
             }
         }
 
       const blockBlobClient = containerClient.getBlockBlobClient(blobName)
       const blockBobResponse = await blockBlobClient.uploadFile(filePath)
       console.log("Uploaded File : " + JSON.stringify(blockBobResponse) + " in container " + containerName + " with name " + blobName)
 
    }catch(error){
         console.log("Azure Storage || File Creation error " + error)
         throw error
    }
 }

async function main(){
   try{
        const filePath = path.join(appDir,'/RelevantJobPosting.docx') 
        console.log(filePath)
        const containerClient = await getExistingContainer("y0g1859531ujc")
        const containerName = "y0g1859531ujc"
        const blobName = "y0g1859531ujc_certificate"
        
        const response = await uploadBlob(filePath,containerName,blobName,containerClient)

   }catch(error){
      console.error(error)
   }

}

const results = [2,3,4,5,6,7,8]
const id=8

const isValid = results.find((doc)=>doc===id)
console.log("Valid",isValid)

if(!isValid){
  console.log("Validation failed...")
}



