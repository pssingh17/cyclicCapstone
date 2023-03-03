// // connect-with-account-name-and-key.js
// const { BlobServiceClient, StorageSharedKeyCredential,ContainerClient } = require('@azure/storage-blob');
// const fs = require('fs')
// const {dirname}  = require('path')
// const path  = require('path')
// const appDir = dirname(require.main.filename)

// const accountName = "capstoned";
// const accountKey = "DRuhoJNVyxh58M+XRCACtAeHmdXqeboWLZs07NGbPxd7LJR50bfSUHYFU7xdmHd16+Ie1JHr8c7/+ASt/8jUNg==";
// if (!accountName) throw Error('Azure Storage accountName not found');
// if (!accountKey) throw Error('Azure Storage accountKey not found');

// const baseUrl = `https://${accountName}.blob.core.windows.net`;

// const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

// const blobServiceClient = new BlobServiceClient(
//   `https://${accountName}.blob.core.windows.net`,
//   sharedKeyCredential
// );

// const containerName = `my-container`;

// async function deleteContainer(containerName){

// const response = await blobServiceClient.deleteContainer(containerName)
// console.log(response)
// }

// //deleteContainer("dummy101")

// async function createContainer(blobServiceClient, containerName){

//             // public access at container level
//             const options = {
//               access: 'container'
//             };

//             // creating client also creates container
//             const containerClient = await blobServiceClient.createContainer(containerName, options);
//             console.log(`container ${containerName} created`);

//             // do something with container
//             // ...

//             return containerClient;
// }

// //createContainer(blobServiceClient,containerName)

// async function main() {

//   const containerName = 'grewal';
//   const blobName = 'grewal';

//   const fileName = 'grewal.txt';

//   // create container client
//   const containerClient = await blobServiceClient.getContainerClient(containerName);

//   // create blob client
//   const blobClient = await containerClient.getBlockBlobClient(blobName);

//   // download file
//   await blobClient.downloadToFile(fileName);

//   console.log(`${fileName} downloaded`);

// }

// // main()
// //   .then(() => console.log(`done`))
// //   .catch((ex) => console.log(" Error : " + ex.message));



//   async function main1() {
//     try {
//       // Create container client
//       const containerClient = await blobServiceClient.getContainerClient(
//         containerName
//       );
  
//       // do something with containerClient...
//       let i = 1;
  
//       // List blobs in container
//       for await (const blob of containerClient.listBlobsFlat()) {
//         console.log(`Blob ${i++}: ${blob.name}`);
//       }
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }
  
//   // main1()
//   //   .then(() => console.log(`done`))
//   //   .catch((ex) => console.log(ex.message));

//   async function main2() {
//     try {
//       // create container from ContainerClient
//       const containerClient = new ContainerClient(
//         `${baseUrl}/${containerName}`,
//         sharedKeyCredential
//       );    
  
//       // do something with containerClient...
//       let i = 1;
  
//       // List blobs in container
//       for await (const blob of containerClient.listBlobsFlat()) {
//           console.log(`Blob ${i++}: ${blob.name}`);
//       }
      
  
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }
  
//   // main2()
//   //   .then(() => console.log(`done`))
//   //   .catch((ex) => console.log(ex.message));


//   async function main3() {
//     const containerClient = blobServiceClient.getContainerClient("dummy102")
//     await containerClient.create()
  
//     const content =  fs.createReadStream('C:/Users/grewa/Downloads/W2023-Capstone Project-revision1-Alchimetis_signed (1).docx','utf-8');
//     const blobName = "newblob1676215838824";
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//     const uploadBlobResponse = await blockBlobClient.uploadStream(content)
//     console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
//   }

//   //main3()


//   async function main4() {
//     const containerClient = blobServiceClient.getContainerClient("dummy102");
//     const blobClient = containerClient.getBlobClient("newblob1676215838824");
  
//     // Get blob content from position 0 to the end
//     // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
//     const downloadBlockBlobResponse = await blobClient.download()
//     const downloaded = (
//       await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
//     ).toString();
    
//     // const writeStream = fs.createReadStream('name.docx')
//     // downloadBlockBlobResponse.readableStreamBody.pipe(writeStream)
//     // writeStream.on('finish', () => console.log('Copying completed'))  
//     // console.log("Downloaded blob content:", downloaded);
  
//     // [Node.js only] A helper method used to read a Node.js readable stream into a Buffer
//     async function streamToBuffer(readableStream) {
//       return new Promise((resolve, reject) => {
//         const chunks = [];
//         readableStream.on("data", (data) => {
//           chunks.push(data instanceof Buffer ? data : Buffer.from(data));
//         });
//         readableStream.on("end", () => {
//           resolve(Buffer.concat(chunks));
//         });
//         readableStream.on("error", reject);
//       });
//     }
//   }

//   main4()
//   //deleteContainer("dummy101")

// const Response = require('./service/customResponse')

// const body = {
//   isReport : true,
//   isCertificate : true
// }

// Object.keys(body).map(key => console.log(key))

// const {isReport=false , isCertificate=false} = body

// console.log("isReport : " + isReport)
// console.log("isCertificate : " + isCertificate)

// function get(){
//   throw new Error({status:400,
//     message:"Missing files report/certificate. Either File size is too large , or incorrect format",
//     name:"FileError"})
// }

// try{
//   throw new Response(200,"SUCCESS","DATA",null)
// }catch(error){
//   console.log(error)
//   console.log(error.status)
// }


const str = "MN32153YQ"
console.log(str.toLowerCase())







