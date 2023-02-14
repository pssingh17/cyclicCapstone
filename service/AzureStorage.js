const { BlobServiceClient, StorageSharedKeyCredential
     } = require("@azure/storage-blob");
     const fs = require('fs')


const accountName = "capstoned";
const accountKey = "DRuhoJNVyxh58M+XRCACtAeHmdXqeboWLZs07NGbPxd7LJR50bfSUHYFU7xdmHd16+Ie1JHr8c7/+ASt/8jUNg==";

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);


function getBlobServiceClient(){
    return new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        sharedKeyCredential
      );
}

async function createContainer(containerName){
 // Create a container
   try{
       const containerClient = getBlobServiceClient().getContainerClient(containerName);
       const createContainerResponse = await containerClient.create();
       console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
       return containerClient;
   }catch(error){
    throw new Error(error)
   }
}

async function getAllBlobs(containerName){
     
    try{
        const containerClient = getBlobServiceClient().getContainerClient(containerName)
        let i = 1;
        let blobs = containerClient.listBlobsFlat();
        for await (const blob of blobs) {
          console.log(`Blob ${i++}: ${blob.name}`);
        }

    }catch(error){}
}

async function uploadBlob(file,containerName,blobName){
   
    try{
      const blobOptions = {
            blobHTTPHeaders:{
                blobContentType:file.mimetype
            }
        }
      const containerClient = await createContainer(containerName)
      const blockBlobClient = containerClient.getBlockBlobClient(blobName)
      const fileReadStream = fs.createReadStream(file.path,{encoding:"utf8"})
      const blockBobResponse = await blockBlobClient.uploadFile(file.path)
      console.log("Uploaded File : " + JSON.stringify(blockBobResponse))

   }catch(error){
        console.log("File Creation error " + error)
   }
   
}

async function downloadBlob(path,containerName,blobName){
   try{
     const containerClient = getBlobServiceClient().getContainerClient(containerName)
     const blobClient = containerClient.getBlobClient(blobName)
     const downloadBlockBlobResponse = await blobClient.download();
     const downloaded = (
        await streamToBuffer(downloadBlockBlobResponse.readableStreamBody,path)
    ).toString();
    // const downloadResponse = await blobClient.downloadToFile(path)
     console.log("Downloaded blob.");

     const write = fs.writeFileSync('name.docx',downloaded,{encoding:"utf8"})

     await blobClient.downloadToFile('tile.docx')

   
   
    


     async function streamToBuffer(readableStream) {
        readableStream.setEncoding('utf-8')
        return new Promise((resolve, reject) => {
          const chunks = [];
          readableStream.on("data", (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
           
          });
          readableStream.on("end", () => {
            console.log("Ending stream.")
            resolve(Buffer.concat(chunks));
          });
          readableStream.on("error", reject);
        });
      }
      
   }catch(error){
        console.log("Download error : " + error)
   }
}

async function deleteContainer(containerName){
       
    try{
        const response = await getBlobServiceClient().deleteContainer(containerName)
        console.log("Delete container" + JSON.stringify(response))
    }catch(error){
        console.log("Error in deleting blob container ==> " + error)
    }


}


module.exports = {getAllBlobs,uploadBlob,downloadBlob,deleteContainer}



// const blobOptions = {
//     blobHTTPHeaders:{
//         blobContentType:file.mimetype+"; charset=utf-8",
//     }
// }
// const containerClient = await createContainer(containerName)
// const blockBlobClient = containerClient.getBlockBlobClient(blobName)
// const blobCreationResponse = await blockBlobClient.uploadFile(file.path,blobOptions)
// console.log("File Response is : " + JSON.stringify(blobCreationResponse))


// const containerClient = getBlobServiceClient().getContainerClient(containerName)
// const blobClient = containerClient.getBlobClient(blobName)
// const downloadResponse = await blobClient.downloadToFile(path)
// console.log(downloadResponse)