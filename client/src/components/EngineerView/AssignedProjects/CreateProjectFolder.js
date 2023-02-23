import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form";
import "./AssignedProjects.css"
import { NavLink, useNavigate } from 'react-router-dom';
import debounce from 'debounce'

const CreateProjectFolder = () => {
  const { register, handleSubmit,getValues , trigger, formState: { errors }} = useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const watchFields = watch(["showAge", "number"])
  const onSubmit= ((data) => {
    console.log(data)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:8081')
    myHeaders.append('Access-Control-Allow-Credentials', true)
    
   
    
    axios({
      method: 'post',
      maxBodyLength: Infinity,
        url: '/project/save',
        headers:myHeaders,
        data : data,
        credentials: "include", 
        withCredentials:true,
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if(response.data.statusCode===200){
        alert("success")
        navigate('/engineerView/assignedProjects')
      }
      else if (response.data.isLoggedIn==="false"){
        alert(response.data.message)
        navigate('/')
      }
     
    })
    .catch(function (error) {
      console.log(error);
      alert(error.response.data.message)
    });
    
  });
  const handleClose = (e)=>{
    e.preventDefault()
    console.log("Close CLicked")
    navigate('/engineerView/landingPage')
  }
  return (

    <>
     <div className="homeBar">
       
       <NavLink className="leftHBar" to="">
         <svg
           width="25"
           height="23"
           viewBox="0 0 25 23"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             d="M1.5625 21C1.5625 21.8789 2.24609 22.5625 3.125 22.5625H21.875C22.7051 22.5625 23.4375 21.8789 23.4375 21V6.9375H1.5625V21ZM9.375 10.6484C9.375 10.3555 9.61914 10.0625 9.96094 10.0625H15.0391C15.332 10.0625 15.625 10.3555 15.625 10.6484V11.0391C15.625 11.3809 15.332 11.625 15.0391 11.625H9.96094C9.61914 11.625 9.375 11.3809 9.375 11.0391V10.6484ZM23.4375 0.6875H1.5625C0.683594 0.6875 0 1.41992 0 2.25V4.59375C0 5.0332 0.341797 5.375 0.78125 5.375H24.2188C24.6094 5.375 25 5.0332 25 4.59375V2.25C25 1.41992 24.2676 0.6875 23.4375 0.6875Z"
             fill="white"
           />
         </svg>
       
       <div className="textHome mx-2 text-white">Create Project</div>
       </NavLink>

    
   </div>
    <div>
<form >
<div className='CustomFormComtainer'>
<div className='formDetailsParent'>
      <div className='FormDetails'>

        <div className="FormLeft">

    
          <div className="lefttb1">
            <section>*The Lab Performing the work</section>
            <div className="w1">
            <input className='createProjectFolderBoxBorder' type="Text" placeholder="Lab Name " {...register("lab_name",{ minLength:2, maxLength: 20 }) }></input>
          </div></div>



          <div className="lefttb2"> 
          <section>*Project Type</section>
          <div className='moveright'>
          <section > *Project Number</section></div></div>
          
          <div className="w3">
          <input className='createProjectFolderBoxBorder'  type="Text" placeholder="Enter Project Type" {...register("project_type")}></input>
          <div className='w4'>
          <input className='createProjectFolderBoxBorder' type="Text"  placeholder="Enter Project Number"  {...register("project_number",{ minLength:2, maxLength: 20 })}></input></div></div>
          
        
         

          <div className="lefttb3">
            <section>*Transacting Customer</section>
            <div className="w5 custom-debounce-container">
              <div>
            <input  className='createProjectFolderBoxBorder' type="Text" placeholder="Transacting Customer"  {...register("transacting_customer",{ minLength:2, maxLength: 20 })}
            onChange={debounce(async (e) => {
              let str = e.target.value
              console.log("str check", str)
              let data={
                name: str
              }
              axios({
                method: 'get',
                maxBodyLength: Infinity,
                  url: '/user/merchant',
                  params : data,
                
                  credentials: "include", 
                  withCredentials:true,
              })
              .then(function (response) {
                console.log(response.data);
               
              })
              .catch(function (error) {
                console.log("Error block", error);
               
              });
            }, 800)}
            ></input>
            <div className='createProjectFolderBoxBorder'>results</div>
            </div>
            <button className="btn btn-dark createProjectFolderBoxBorder align-self-start" onClick={(e)=>{e.preventDefault()
            console.log("Find custmer clcik")
            }}>Find Customer</button>
          </div></div>


          <div className="lefttb4">
            <section>*Report Recieving Customer</section>
            <div className="w6 custom-debounce-container">
              <div>
            <input type="Text" className='createProjectFolderBoxBorder' placeholder="Report Receiving Customer"  {...register("receiving_customer",{ minLength:2, maxLength: 20 })} ></input>
            </div>
            <button className="btn btn-dark createProjectFolderBoxBorder" onClick={(e)=>{e.preventDefault()
            console.log("Find custmer clcik")
            }}>Find Customer</button>
            </div> </div>          
          


          <div className="lefttb5">
            <section>*Project Name</section>
            <div className="w1">
            <input className='createProjectFolderBoxBorder' type="Text" placeholder="Enter Project Name"  {...register("project_name",{ minLength:2, maxLength: 20 })}></input>
          </div></div>

          <div classsname="lefttb6">
            <section> *Description</section>
           <div >
            <textarea className='w-100' type= "text"  {...register("description",{ minLength:2 })}/> 
          </div></div>


          <div classanme="lefttb7">
            <section>*Purchase Order Number</section>
            <div className='w1'>
            <input className='createProjectFolderBoxBorder' type="Text" placeholder="Enter Purchase order number"  {...register("purchase_order_number",{ minLength:2 })}></input>
          </div></div>

        
        </div>
      <div style={{height:"100%",border:"1px solid #D9D9D9"}}></div>


            <div className='FormRight'>

          <div className="righttb1">
            <section>*Product Covered</section> </div>
            <div className='productcovered'>
            <textarea className='createProjectFolderBoxBorder' type="Text"  {...register("product_covered",{ minLength:2 })}  ></textarea>
          </div>

          <div className="righttb2">
            <section>*Models</section></div>
            <div className='models'>
            <textarea className='createProjectFolderBoxBorder' type="Text"  {...register("modals",)}></textarea>
          </div>


          <div className="righttb3">
          <section>*Project Type</section>
          <div className='moveright1'>
          <section> *Project Number</section></div></div>
          
          
          
        

     

          <div className="w3">
            <input className='createProjectFolderBoxBorder' type="Text" placeholder="Enter Purchase Type"  {...register("projectType2",)}></input>
            <div className="w4">
            <input className='createProjectFolderBoxBorder' type="Text" placeholder="Enter Purchase Number" {...register("projectNumber2",)} ></input>
          </div></div>


        
          <div className="righttb4">
          <section>*Date Client Ready</section>
          <div className='moveright2'>
          <section>*Date Promised Complete</section></div></div>



          <div className="w3">
            <input className='createProjectFolderBoxBorder' type="date" {...register("client_ready",)} ></input>
            <div className="w4">
            <input className='createProjectFolderBoxBorder' type="date" {...register("completion",)}  ></input>
          </div></div>


          
          <div className="righttb5"> 
            <section>*Date Project Starts</section>
            <div className='moveright3'>
            <section>*Date Project Ends</section></div></div>

            
          <div className="w3">
          <input className='createProjectFolderBoxBorder' type="Date" {...register("start_date",)} ></input>
            <div className="w4">
            <input className='createProjectFolderBoxBorder' type="Date" {...register("end_date",)} ></input>
          </div></div>




        </div>
           
             
        

        </div>
         </div>
</div>
<div className='customRandomID d-flex justify-content-end'>
      <button className='btn btn-success m-2' onClick={
        handleSubmit(onSubmit)} >Create Project Folder</button>
      
      <div className=' w-auto'> 
      <button className='btn m-2 btn-dark' onClick={handleClose}>Cancel</button></div>
  </div>  
     
</form >
    
  
    </div>
 </> )
}

export default CreateProjectFolder

