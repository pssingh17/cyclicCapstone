import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoaderStatus } from '../../../Common/LoaderReducer/LoaderSlice';
import { LoginDetails } from '../../../Login/LoginReducer/LoginSlice';
import { DeliverablesDetails } from '../Deliverables/DeliverablesReducer/Deliverables';
import Cookies from 'universal-cookie'

export const Details = () => {
  
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const cookies = new Cookies()
    const DetailsMain = useSelector((state) => state.Deliverables.value);
    
    useEffect(()=>{
      dispatch(LoaderStatus(true))
      // let project_name = JSON.parse(localStorage.getItem("ProjectName"))
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:8081')
      myHeaders.append('Access-Control-Allow-Credentials', true)
     
        axios({
          method: 'get',
          maxBodyLength: Infinity,
          url: '/project/2897561PF2',
          headers:myHeaders,
          credentials: "include", 
          withCredentials:true,
            params : {
              screenId: 2
            },
          
        })
        .then(function (response) {
          // console.log("Response in details",response.data);
          if(response?.data?.data?.project){
            dispatch(DeliverablesDetails(response?.data?.data))
            dispatch(LoaderStatus(false))
          }
          else{console.log("no projects yet")
          dispatch(LoaderStatus(false))
        }
          
          if(response.data?.isLoggedIn == false){
            alert(response.data?.message)
            dispatch(LoaderStatus(false))
            navigate('/')
          }
        })
        .catch(function (error) {
          console.log("Error block details", error);
          if(error?.response?.status===401){
            dispatch(LoginDetails({}));
                cookies.remove('connect.sid');
                localStorage.setItem("AlertMessage", JSON.stringify("Session Expired...Please Login Again"))
              navigate('/')
          }
         
        });
      
    },[])
  
  return (
   
<div className="main-block">

<div className='Adddocument'>
<button>ADD DOCUMENT</button>   
 </div>
 {DetailsMain?.project ? <>
  <form className='custom-container'>
        <div className='form-container'>
    <div className='custom-noname'>
        <label className="custom-label"><b>Project Name</b></label>
        <input className="custom-input"type="text" placeholder={DetailsMain?.project?.project_name} disabled/><br/>
        
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Description</b></label><input className="custom-input"type="text"  placeholder={DetailsMain?.project?.description} disabled/><br/>
        
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Project Number</b></label><input className="custom-input"type="text" placeholder={DetailsMain?.project?.project_number} disabled /><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Products Covered</b></label><input className="custom-input"type="text" placeholder={DetailsMain?.project?.product_covered
} disabled/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Models</b></label><input className="custom-input"type="text" placeholder={DetailsMain.project?.modals} disabled/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Assigned To</b></label><input className="custom-input"type="text"placeholder={DetailsMain.project?.transacting_customer} disabled/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Customer Name</b></label><input className="custom-input"type="text" placeholder={DetailsMain.project?.receiving_customer} disabled /><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Client Recipient</b></label><input className="custom-input"type="text" placeholder='-------------' disabled/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Start Date</b></label><input className="custom-input"type="text" placeholder={DetailsMain.project?.start_date} disabled/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>End Date</b></label><input className="custom-input"type="text" placeholder={DetailsMain.project?.end_date} disabled/><br/>
        </div>

        <div className='custom-noname'>
        <label className="custom-label"><b>Project Completion Date</b></label><input className="custom-input"type="text"placeholder={DetailsMain.project?.client_ready}  disabled/><br/>
        </div>

        <div className='custom-noname'>
        <label className="custom-label"><b>Reviewer</b></label><input className="custom-input"type="text"placeholder='Reviewer Name' disabled /><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>BU(Business Unit)</b></label><input className="custom-input"type="text"placeholder='-------------' disabled/><br/>
        </div>
        
        <div className='custom-noname'>
        <label className="custom-label"><b>Quote Number</b></label><input className="custom-input"type="text"placeholder='-------------' disabled/><br/>
        </div>

        <div className='custom-noname'>
        <label className="custom-label"><b>PO Number</b></label><input className="custom-input"type="text"placeholder='-------------' disabled/><br/>
        </div>
    </div>
        
        
    
    </form>
 </>:"No projects right now"}
    
    
    </div>
    
  )
}
