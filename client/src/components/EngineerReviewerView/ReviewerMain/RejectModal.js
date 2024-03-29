import React from 'react'
import BACKEND_URL from '../../../backendUrl';
import { LoaderStatus } from '../../Common/LoaderReducer/LoaderSlice';
import { Reports } from '../EngineerMain/EngineerReducers/ReportDetails';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


export const RejectModal = (props) => {
  const ReportsDetailsRedux = useSelector((state) => state.ReportDetails.value);
  const { register, handleSubmit,getValues , trigger, formState: { errors }} = useForm();

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
          status_id:"8",
          report_id: ReportsDetailsRedux?.report?.report_number
        },
        credentials: "include", 
        withCredentials:true,
    })
    .then(function (response) {
      // console.log(response.data);
      if(response?.data?.statusCode === 200){
        props.hideRejectModal(false)
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
            <div className="custom-modal-content">
              <div className="custom-modal-header bg-danger">
                <h4 className="text-start">Reject Review</h4>
              </div>
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
              <div className="custom-modal-footer d-flex justify-content-end ">
                <button className="btn m-2 btn-danger" onClick={()=>onSubmit(handleSubmit)}>
                  Reject Review
                </button>
                <button
                  className="btn m-2 btn-dark"
                  onClick={() => {
                    props.hideRejectModal(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
  )
}
