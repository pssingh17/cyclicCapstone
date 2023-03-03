import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { DeliverablesDetails } from './DeliverablesReducer/Deliverables'
import {LoaderStatus} from '../../../Common/LoaderReducer/LoaderSlice'
import Cookies from 'universal-cookie'
import { LoginDetails } from '../../../Login/LoginReducer/LoginSlice'

export const Deliverables = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const [DeliverableDataState, setDeliverablesDataState]= useState()
  const [arrayPageState, setArrayPageState] = useState(1)

  const DeliverableMain = useSelector((state) => state.Deliverables.value);
  const nextPage = ()=>{
    let max = Math.ceil(DeliverableDataState?.length/4)
    // console.log("Max", max)
    if(arrayPageState<max){

      setArrayPageState(arrayPageState+1)
    }
  }
  const prevPage = ()=>{
    if(arrayPageState>1){

      setArrayPageState(arrayPageState-1)
    }
  }
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
        // console.log("Response in deliverables",response.data);
        if(response?.data?.data?.project){
          dispatch(DeliverablesDetails(response?.data?.data))
          setDeliverablesDataState(response?.data?.data?.reports)
          dispatch(LoaderStatus(false))
        }
        else{console.log("no projects yet")
        dispatch(LoaderStatus(false))
      }
        
      
      })
      .catch(function (error) {
        console.log("Error block deliverables", error);
        if(error?.response?.status===401){
          dispatch(LoginDetails({}));
              cookies.remove('connect.sid');
              localStorage.setItem("AlertMessage", JSON.stringify("Session Expired...Please Login Again"))
            navigate('/')
        }
        
       
      });
    
  },[])

  
  return (
    <div>

<div className='Adddocument'>

<div className='Adddocument'>
<button onClick={()=>{navigate("/engineerView/assignedProjects/newReport")}}>New Report</button>   
<button>ADD DOCUMENT</button> 
</div>

</div>


<table className="table customTableMArgin" style={{fontSize:"74%"}}>
  <thead>
    <tr>
      <th scope="col">Date created</th>
      <th scope="col">Report</th>
      <th scope="col">Type</th>
      <th scope="col">Project Number</th>
      <th scope="col">Project Name</th>
      <th scope="col">Report Receiving Customer</th>
      <th scope="col">Engineer</th>
      <th scope="col">Reviewer</th>
      <th scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>

  
  
    {DeliverableMain?.project && DeliverableDataState?.length>0 ? <>
      <tbody>
        
    {DeliverableDataState.slice((arrayPageState-1)*4,arrayPageState* 4).map((report)=>{
      return(
        <tr key={report?.file_id}>
      <td>{report?.report_created_at.slice(0,10)}</td>
      <td>{report?.report_number}</td>
      <td>{report?.file_type}</td>
      <td>{report?.project_number}</td>
      <td>{DeliverableMain?.project?.project_name}</td>
      <td>{report?.receiving_customer}</td>
      <td>{DeliverableMain?.project?.transacting_customer}</td>
      <td>DC</td>
      {report?.report_status==="SENT TO REVIEWER"? <>
      <td><span className="badge badge-pill badge-primary">IN PROGRESS</span></td>
      </>:""}
      {report?.report_status==="VALIDATION FAILED" ? <><td><span className="badge badge-pill badge-danger">REJECTED</span>
</td></>:""}
      
      <td>
        
      
      <svg className='m-1' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_106_9042)">
<path d="M9.16699 3.3335H3.33366C2.89163 3.3335 2.46771 3.50909 2.15515 3.82165C1.84259 4.13421 1.66699 4.55814 1.66699 5.00016V16.6668C1.66699 17.1089 1.84259 17.5328 2.15515 17.8453C2.46771 18.1579 2.89163 18.3335 3.33366 18.3335H15.0003C15.4424 18.3335 15.8663 18.1579 16.1788 17.8453C16.4914 17.5328 16.667 17.1089 16.667 16.6668V10.8335" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.417 2.0832C15.7485 1.75168 16.1982 1.56543 16.667 1.56543C17.1358 1.56543 17.5855 1.75168 17.917 2.0832C18.2485 2.41472 18.4348 2.86436 18.4348 3.3332C18.4348 3.80204 18.2485 4.25168 17.917 4.5832L10.0003 12.4999L6.66699 13.3332L7.50033 9.99986L15.417 2.0832Z" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_106_9042">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

<svg className='m-1' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 5H17.5" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.8337 5V16.6667C15.8337 17.5 15.0003 18.3333 14.167 18.3333H5.83366C5.00033 18.3333 4.16699 17.5 4.16699 16.6667V5" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.66699 4.99984V3.33317C6.66699 2.49984 7.50033 1.6665 8.33366 1.6665H11.667C12.5003 1.6665 13.3337 2.49984 13.3337 3.33317V4.99984" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.33301 9.1665V14.1665" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.667 9.1665V14.1665" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

<svg onClick={()=>{navigate('/engineerView/reviewReport')}}  className='m-1'width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.25 10.9583V15.9583C15.25 16.4004 15.0744 16.8243 14.7618 17.1368C14.4493 17.4494 14.0254 17.625 13.5833 17.625H4.41667C3.97464 17.625 3.55072 17.4494 3.23816 17.1368C2.92559 16.8243 2.75 16.4004 2.75 15.9583V6.79167C2.75 6.34964 2.92559 5.92572 3.23816 5.61316C3.55072 5.30059 3.97464 5.125 4.41667 5.125H9.41667" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.75 2.625H17.75V7.625" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.58301 11.7917L17.7497 2.625" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</td>
    
    </tr>

      )

    })}
      </tbody>
    </>:<h2 className='text-center'>No Assigned Projects</h2>}
   


{/* 
  <tbody>
    <tr>
      <th scope="row"></th>
      <td>Report 02</td>
      <td>CB Scheme Report</td>
      <td>123456</td>
      <td>Project 1</td>
      <td>DC (214117)</td>
      <td>Engineer Name</td>
      <td>DC</td>
      <td><span className="badge badge-pill badge-secondary">PENDING</span>
</td>
      <td>
        
      
      <svg className='m-1' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_106_9042)">
<path d="M9.16699 3.3335H3.33366C2.89163 3.3335 2.46771 3.50909 2.15515 3.82165C1.84259 4.13421 1.66699 4.55814 1.66699 5.00016V16.6668C1.66699 17.1089 1.84259 17.5328 2.15515 17.8453C2.46771 18.1579 2.89163 18.3335 3.33366 18.3335H15.0003C15.4424 18.3335 15.8663 18.1579 16.1788 17.8453C16.4914 17.5328 16.667 17.1089 16.667 16.6668V10.8335" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.417 2.0832C15.7485 1.75168 16.1982 1.56543 16.667 1.56543C17.1358 1.56543 17.5855 1.75168 17.917 2.0832C18.2485 2.41472 18.4348 2.86436 18.4348 3.3332C18.4348 3.80204 18.2485 4.25168 17.917 4.5832L10.0003 12.4999L6.66699 13.3332L7.50033 9.99986L15.417 2.0832Z" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_106_9042">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

<svg className='m-1' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 5H17.5" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.8337 5V16.6667C15.8337 17.5 15.0003 18.3333 14.167 18.3333H5.83366C5.00033 18.3333 4.16699 17.5 4.16699 16.6667V5" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.66699 4.99984V3.33317C6.66699 2.49984 7.50033 1.6665 8.33366 1.6665H11.667C12.5003 1.6665 13.3337 2.49984 13.3337 3.33317V4.99984" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.33301 9.1665V14.1665" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.667 9.1665V14.1665" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

<svg onClick={()=>{navigate('/engineerView/reviewReport')}}  className='m-1'width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.25 10.9583V15.9583C15.25 16.4004 15.0744 16.8243 14.7618 17.1368C14.4493 17.4494 14.0254 17.625 13.5833 17.625H4.41667C3.97464 17.625 3.55072 17.4494 3.23816 17.1368C2.92559 16.8243 2.75 16.4004 2.75 15.9583V6.79167C2.75 6.34964 2.92559 5.92572 3.23816 5.61316C3.55072 5.30059 3.97464 5.125 4.41667 5.125H9.41667" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.75 2.625H17.75V7.625" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.58301 11.7917L17.7497 2.625" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</td>
    
    </tr>
  </tbody>

  <tbody>
    <tr>
      <th scope="row"></th>
      <td>Report 03</td>
      <td>Test Report</td>
      <td>1234567</td>
      <td>Project 1</td>
      <td>DC (214117)</td>
      <td>Engineer Name</td>
      <td>DC</td>
      <td><span className="badge badge-pill badge-primary">IN PROGRESS</span></td>
      <td>
        
      <svg className='m-1' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_106_9042)">
<path d="M9.16699 3.3335H3.33366C2.89163 3.3335 2.46771 3.50909 2.15515 3.82165C1.84259 4.13421 1.66699 4.55814 1.66699 5.00016V16.6668C1.66699 17.1089 1.84259 17.5328 2.15515 17.8453C2.46771 18.1579 2.89163 18.3335 3.33366 18.3335H15.0003C15.4424 18.3335 15.8663 18.1579 16.1788 17.8453C16.4914 17.5328 16.667 17.1089 16.667 16.6668V10.8335" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.417 2.0832C15.7485 1.75168 16.1982 1.56543 16.667 1.56543C17.1358 1.56543 17.5855 1.75168 17.917 2.0832C18.2485 2.41472 18.4348 2.86436 18.4348 3.3332C18.4348 3.80204 18.2485 4.25168 17.917 4.5832L10.0003 12.4999L6.66699 13.3332L7.50033 9.99986L15.417 2.0832Z" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_106_9042">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

<svg className='m-1' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 5H17.5" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.8337 5V16.6667C15.8337 17.5 15.0003 18.3333 14.167 18.3333H5.83366C5.00033 18.3333 4.16699 17.5 4.16699 16.6667V5" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.66699 4.99984V3.33317C6.66699 2.49984 7.50033 1.6665 8.33366 1.6665H11.667C12.5003 1.6665 13.3337 2.49984 13.3337 3.33317V4.99984" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.33301 9.1665V14.1665" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.667 9.1665V14.1665" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

<svg onClick={()=>{navigate('/engineerView/reviewReport')}}  className='m-1'width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.25 10.9583V15.9583C15.25 16.4004 15.0744 16.8243 14.7618 17.1368C14.4493 17.4494 14.0254 17.625 13.5833 17.625H4.41667C3.97464 17.625 3.55072 17.4494 3.23816 17.1368C2.92559 16.8243 2.75 16.4004 2.75 15.9583V6.79167C2.75 6.34964 2.92559 5.92572 3.23816 5.61316C3.55072 5.30059 3.97464 5.125 4.41667 5.125H9.41667" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.75 2.625H17.75V7.625" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.58301 11.7917L17.7497 2.625" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</td>
    
    </tr>
  </tbody>

  <tbody>
    <tr>
      <th scope="row"></th>
      <td>Report 04</td>
      <td>Finding Report</td>
      <td>12345678</td>
      <td>Project 1</td>
      <td>DC (214117)</td>
      <td>Engineer Name</td>
      <td>Reviewer</td>
      <td><span className="badge badge-pill badge-success">OFFICIAL</span></td>
      <td>
        
      
      
      <svg className='m-1' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_106_9042)">
<path d="M9.16699 3.3335H3.33366C2.89163 3.3335 2.46771 3.50909 2.15515 3.82165C1.84259 4.13421 1.66699 4.55814 1.66699 5.00016V16.6668C1.66699 17.1089 1.84259 17.5328 2.15515 17.8453C2.46771 18.1579 2.89163 18.3335 3.33366 18.3335H15.0003C15.4424 18.3335 15.8663 18.1579 16.1788 17.8453C16.4914 17.5328 16.667 17.1089 16.667 16.6668V10.8335" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.417 2.0832C15.7485 1.75168 16.1982 1.56543 16.667 1.56543C17.1358 1.56543 17.5855 1.75168 17.917 2.0832C18.2485 2.41472 18.4348 2.86436 18.4348 3.3332C18.4348 3.80204 18.2485 4.25168 17.917 4.5832L10.0003 12.4999L6.66699 13.3332L7.50033 9.99986L15.417 2.0832Z" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_106_9042">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

<svg className='m-1' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 5H17.5" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.8337 5V16.6667C15.8337 17.5 15.0003 18.3333 14.167 18.3333H5.83366C5.00033 18.3333 4.16699 17.5 4.16699 16.6667V5" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.66699 4.99984V3.33317C6.66699 2.49984 7.50033 1.6665 8.33366 1.6665H11.667C12.5003 1.6665 13.3337 2.49984 13.3337 3.33317V4.99984" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.33301 9.1665V14.1665" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.667 9.1665V14.1665" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

<svg onClick={()=>{navigate('/engineerView/reviewReport')}}  className='m-1'width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.25 10.9583V15.9583C15.25 16.4004 15.0744 16.8243 14.7618 17.1368C14.4493 17.4494 14.0254 17.625 13.5833 17.625H4.41667C3.97464 17.625 3.55072 17.4494 3.23816 17.1368C2.92559 16.8243 2.75 16.4004 2.75 15.9583V6.79167C2.75 6.34964 2.92559 5.92572 3.23816 5.61316C3.55072 5.30059 3.97464 5.125 4.41667 5.125H9.41667" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.75 2.625H17.75V7.625" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.58301 11.7917L17.7497 2.625" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</td>
    
    </tr>
  </tbody> */}






</table>
 {DeliverableMain?.reports?.length>4 ? <div className='d-flex justify-content-center'>
      <button className='btn customDC-color m-2' onClick={prevPage}>Previous Page</button>
      <button className='btn customDC-color m-2' onClick={nextPage}>Next Page</button>
      </div>:""}  
    
</div>

  )
}






