import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import BACKEND_URL from '../../../backendUrl';
import { LoaderStatus } from '../../Common/LoaderReducer/LoaderSlice';
import { Reports } from '../EngineerMain/EngineerReducers/ReportDetails';

export const HoldModal = (props) => {
  const { register, handleSubmit,getValues , trigger, formState: { errors }} = useForm();
  const ReportsDetailsRedux = useSelector((state) => state.ReportDetails.value);

  
  const dispatch = useDispatch()

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8081");
  myHeaders.append("Access-Control-Allow-Credentials", true);

  const onSubmit= ((data) => {
    // console.log(data)
    axios({
      method: 'post',
      maxBodyLength: Infinity,
        url: `${BACKEND_URL}/report/decision`,
        headers:myHeaders,
        data : {
          ...data,
          status_id:"1",
          report_id: ReportsDetailsRedux?.report?.report_number
        },
        credentials: "include", 
        withCredentials:true,
    })
    .then(function (response) {
      // console.log(response.data);
      if(response?.data?.statusCode === 200){
        props.hideHoldModal(false)
        axios({
          method: "get",
          maxBodyLength: Infinity,
          url: `${BACKEND_URL}/report/${ReportsDetailsRedux?.report?.report_number}`,
        
          credentials: "include",
          withCredentials: true,
          headers: myHeaders,
        })
          .then((res) => {
            dispatch(LoaderStatus(false))
            //  console.log("response ", res.data.data)
            if (res?.data?.data) {
             
              dispatch(Reports(res?.data?.data));
              
            }
          })
          .catch((err) => {
            console.log("error view report box  ", err);
          });
      }
     
    })
    .catch(function (error) {
      console.log(error);
      
    });
    
  });
  return (
    <div id="myCustomModal" className="customModal">
    <div className="custom-modal-content bg-warning">
      <div className="custom-modal-header bg-warning">
        <h4 className="text-center">Hold</h4>
      </div>
      <div className="custom-modal-body" style={{ background: "white" }}>
        <div
          className="customContent d-flex align-items-center"
          style={{ border: "1px solid black", background: "white" }}
        >
           <div className="custom-modal-body">
                <textarea
                  className="w-100 m-1 "
                  {...register("comment")}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #007bff",
                    borderRadius: "6.7px",
                    height: "6.7rem",
                  }}
                />
                *Comments
              </div>
        </div>
      </div>
      <div className="custom-modal-footer d-flex justify-content-end ">
      <button className="btn m-2 btn-warning" onClick={()=>onSubmit(handleSubmit)}>
                  Put On Hold
                </button>
            
        <button
          className="btn m-2 btn-dark"
          onClick={() => {
           props.hideHoldModal(false)
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}
