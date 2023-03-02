import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'

export const Details = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
      
        console.log(data)
        axios({
      
            method: 'post',
            
            url: 'http://our api',
            
            data:data, 
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }).then(res=>{
            console.log("hostsignup respose:", res.data)

          }
            ).catch(err=>{console.log(err)})
          
    };
  
  return (
   
<div className="main-block">

<div className='Adddocument'>
<button>ADD DOCUMENT</button>   
 </div>
    <form type="submit"onSubmit={handleSubmit(onSubmit)} className='custom-container'>
        <div className='form-container'>
    <div className='custom-noname'>
        <label className="custom-label"><b>Project Name</b></label>
        <input className="custom-input"type="text" placeholder='Daily Compliance'  {...register("ProjectName")}/><br/>
        
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Project Description</b></label><input className="custom-input"type="text"  placeholder='----------' {...register("ProjectDescription")}/><br/>
        
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Project Number</b></label><input className="custom-input"type="text" placeholder='Daily Compliance' {...register("ProjectNumber")}/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Products Covered</b></label><input className="custom-input"type="text" placeholder='Equipment' {...register("Equipment")}/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Models</b></label><input className="custom-input"type="text" placeholder='Daily Compliance'{...register("Models")} /><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Assigned To</b></label><input className="custom-input"type="text"placeholder='Engineer Name' {...register("AssignedTo")}/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Customer Name</b></label><input className="custom-input"type="text" placeholder='Mr. XYZ' {...register("CustomerName")} /><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Client Recipient</b></label><input className="custom-input"type="text" placeholder='-------------' {...register("ClientRecipient")}/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Start Date</b></label><input className="custom-input"type="text" placeholder='MM/DD/YYYY' {...register("StartDate")}/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>End Date</b></label><input className="custom-input"type="text" placeholder='MM/DD/YYYY' {...register("EndDate")}/><br/>
        </div>

        <div className='custom-noname'>
        <label className="custom-label"><b>Project Completion Date</b></label><input className="custom-input"type="text"placeholder='MM/DD/YYYY' {...register("ProjectCompletionDate")} /><br/>
        </div>

        <div className='custom-noname'>
        <label className="custom-label"><b>Reviewer</b></label><input className="custom-input"type="text"placeholder='Reviewer Name' {...register("Reviewer")}/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>BU(Business Unit)</b></label><input className="custom-input"type="text"placeholder='-------------' {...register("BusinessUnit")} /><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Quote Number</b></label><input className="custom-input"type="text"placeholder='-------------' {...register("QuoteNumber")}/><br/>
        </div>

        <div className='custom-noname'>
        <label className="custom-label"><b>PO Number</b></label><input className="custom-input"type="text"placeholder='-------------' {...register("PONumber")}/><br/>
        </div>
    </div>
        
        <button className='formBtn' type="submit">Submit</button>
    
    </form>
    
    </div>
    
  )
}
