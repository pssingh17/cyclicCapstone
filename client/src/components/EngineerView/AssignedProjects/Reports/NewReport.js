import './NewReport.css'
import { useForm} from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoaderStatus } from '../../../Common/LoaderReducer/LoaderSlice';
import { useEffect } from 'react';
import { LoginDetails } from '../../../Login/LoginReducer/LoginSlice';
import Cookies from "universal-cookie"
import debounce from 'debounce'


export const NewReport=()=>{
  const { register, handleSubmit , formState: { errors }} = useForm();
  const[searchResults, setSearchResults] = useState([])
  const[searchResults1, setSearchResults1] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showGreen, setShowGreen] = useState(false);
  const [showRed, setShowRed] = useState(false)
  const [alertValue, setAlertValue] = useState()
  const cookies = new Cookies()
  
  const onSubmit = ((data) => {
    let formData = new FormData()
    dispatch(LoaderStatus(true))
    formData.append('issued_at', data.issued_at);
    formData.append('tags', data.tags);
    formData.append('comments', data.comments);
    formData.append('products_covered', data.products_covered);
    formData.append('models', data.models);
    formData.append('receiving_customer', data.receiving_customer);
    formData.append('reviewer_id', data.reviewer_id);
    formData.append('project_number', data.project_number);;
    formData.append('report_type', '2');
    formData.append('certificate_type', '12');
    formData.append('report_name', data.report_name);
    formData.append('is_saved', 'true');
    formData.append("report",data.report[0])
    formData.append('hasReport', 'true');
    formData.append("certificate",data.certificate[0])
    formData.append('hasCertificate', 'true');
    console.log("form data",data, formData)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:8081')
    myHeaders.append('Access-Control-Allow-Credentials', true)
    
    
    axios({

      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/report',
      
      headers:myHeaders,
        data : formData,
        credentials: "include", 
        withCredentials:true,
     
    }).then(res=>{
      console.log(res)
      dispatch(LoaderStatus(false))
      if(res?.data?.statusCode===200){
        setShowGreen(true)
        setAlertValue(res?.message)
      }
      else{
        setShowRed(true)
        setAlertValue(res?.data?.message)
      }
       
      })
      .catch(error=>{
        console.log("Error block equipment log", error);
        if(error?.response?.status===401){
          dispatch(LoginDetails({}));
              cookies.remove('connect.sid');
              localStorage.setItem("AlertMessage", JSON.stringify("Session Expired...Please Login Again"))
            navigate('/')
        }
      })
    
  });
  useEffect(()=>{
    dispatch(LoaderStatus(false))
  },[])
return(
  <>
  <div className='d-flex justify-content-center' style={{position:"sticky", top:"0"}}>
   {showGreen?<>
      <Alert className="col-12 col-md-8 col-lg-6 p-1 d-flex align-items-center justify-content-between" show={showGreen} variant="success" >
        <p style={{marginBottom:"0"}}>{alertValue}</p>
        <Button style={{fontSize:"80%"}} onClick={() => 
          navigate('/engineerView/assignedProjects')
          } variant="outline-success">
            Close
            </Button>
      </Alert>
    </>:<>
    <Alert className="col-12 col-md-8 col-lg-6 p-1 d-flex align-items-center justify-content-between mx-2" show={showRed} variant="danger" >
        <p style={{marginBottom:"0"}}>{alertValue}</p>
        <Button style={{fontSize:"80%"}} onClick={() => setShowRed(false)} variant="outline-danger">
            Close
            </Button>
      </Alert>
      </>
    
    }
    </div>
  <div className='custom-nrep-container'>
<div className="custom">
<div className='"leftSideNRep'>
<form className='custom_form' style={{
  display: "flex",
  flexDirection: "column"
}}
    >

<div className="mb-3 customColor">
  <label htmlFor="reportNumber" className="form-label"> *Report Name</label>
  <input type="reportNumber" className="form-control custom_txtbox" id="reportNumber" {...register("name",{ required: true})}/>
</div>
<div className="mb-3 customColor">
  <label htmlFor="dateIssued" className="form-label"> *Date Issued</label>
  <input type="date" className="form-control custom_txtbox" id="dateIssued" placeholder="MM/YY/XXXX"  {...register("issued_at",{ required: true})} />
</div>
<div className="mb-3 customColor">
  <label htmlFor="tags" className="form-label">Tags</label>
  <input type="tags" className="form-control custom_txtbox" id="tags" placeholder="Select Report Tags"{...register("tags")}/>
</div>
<div className="mb-3 customColor">
  <label htmlFor="receivingContacts" className="form-label"> *Receiving Customer</label>
  <div className='parentSearchResult'>
  <input type="receivingContacts" className="form-control custom_txtbox" id="receiving_customer" placeholder="Choose a receiving contact" {...register("receiving_customer",{ required: true})} 
  onChange={debounce(async (e) => {
    let str = e.target.value
    console.log("str check", str)
    let data={
      name: str
    }
    axios({
      method: 'get',
      maxBodyLength: Infinity,
        url: 'http://localhost:8081/user/search',
        params : data,
      
        credentials: "include", 
        withCredentials:true,
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data?.data.length>0){

        setSearchResults1(response.data?.data)
      }
      else{
        setSearchResults1([])
      }
     
    })
    .catch(function (error) {
      console.log("Error block", error);
     
    });
  }, 800)}
  />
  <div className='searchResultsContainer'>
            {searchResults1?.length>0? 
              <div className='searchResults'>
            {searchResults1?.length>0? searchResults1.map((result)=>{
             
                
                return <div key={result?.id} className='searchItem' onClick={()=>{
                  document.getElementById("receiving_customer").value = result.id;
                  document.getElementById("receiving_customer").focus();
                  setSearchResults1([])
                }}>{result?.id}- {result?.name}</div>
                
              
            }):""
          }</div>:""}
          </div>

</div>
</div>
 
<div>
    <label className="custom_label">Report Standards</label><br></br>
    <label className="custom_label1">*Click(+) to add some Standards</label>
</div>


<div className="mb-3 customColor">
  <label htmlFor="availableReviewers" className="form-label">*Available Reviewers</label>
  <input type="availableReviewers" className="form-control custom_txtbox" id="availableReviewers" {...register("reviewer_id",{ required: true})}/>
</div>
<div className="mb-3 customColor">
  <textarea className="form-control custom_txtbox" id="exampleFormControlTextarea1" placeholder="Review Comments" rows="3" {...register("comments")}></textarea>
</div>
</form>
 </div>
 <div className='rightsifeNrep'>
<form className='custom_form'>
<div className="mb-3 customColor">
  <label htmlFor="availableReviewers" className="form-label">*Project Number</label>
  <input type="availableReviewers" className="form-control custom_txtbox" id="availableReviewers" {...register("project_number",{ required: true})}/>
</div>
<div className="mb-3 customColor">
  <label htmlFor="productsCovered" className="form-label"> *Products Covered</label> 
  <textarea className="form-control custom_txtbox" id="productsCovered" rows="2"  {...register("products_covered",{ required: true})} ></textarea>
</div>
<div className="mb-3 customColor">
  <label htmlFor="models" className="form-label">Models</label>
  <textarea className="form-control custom_txtbox" id="models" rows="2" {...register("models")} ></textarea>
</div>


<div className="container">
    <input type="file" className ="upload_hide" id="uploadReport"/>
    <label htmlFor="uploadReport" className="upload_label">
      <p className='mb-0'>Report</p>
      <input className='choose_file'  type="file" {...register("report",{required: true})} />
        <i className="fas fa-cloud-upload-alt"/>
        <p className="drag_text">Max File Size: 25MB: Max Files: 1/Type: .doc,.docx,.xls,.xlsx,.xlsm,.xlsb</p>
    </label>

</div>
<div className="container">
    
    <label htmlFor="uploadReport" className="upload_label">
    <p className='mb-0'>Certificate</p>
    <input  type="file" className='choose_file' {...register("certificate",{required: true})} />
        <i className="fas fa-cloud-upload-alt"/>
        <p className="drag_text">Max File Size: 25MB: Max Files: 1/Type: .doc,.docx,.xls,.xlsx,.xlsm,.xlsb</p>
    </label>

</div>

<div className='custom3btn'>
<button className="btn btn-primary btn_custom " type="submit">SAVE AS DRAFTS</button>
<button className="btn btn-primary btn_custom1 mx-2" type="submit" onClick={
        handleSubmit(onSubmit)}>SUBMIT REVIEW</button>
<button className="btn btn-primary btn_custom2" onClick={()=>{navigate('/engineerView/assignedProjects')}}>CANCEL</button>
</div>
</form>
</div>
</div>
</div>

 </>   )
}