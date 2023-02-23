import React, { useEffect } from "react";
import { Header } from "../Common/Header/Header";
import ComplianceLogos from "../../images/complianceLogosImage.png";
import './Login.css'
import { useDispatch, useSelector } from "react-redux";
import { LoginDetails } from "./LoginReducer/LoginSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useCookies } from 'react-cookie';

// import {REACT_APP_URL_BACKEND} from process.env;

export const Login = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const [cookie, setCookie, removeCookie] = useCookies(['accessToken']);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const ULogged = useSelector((state)=>state.Login.value)

  const onSubmit = data => {
    console.log("Login clicked")
   
 
    
    // console.log(data)
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:8081')
  myHeaders.append('Access-Control-Allow-Credentials', true)
 
    
    // console.log(data)
    
    axios({
  
        method: 'post',
        
        url: `/user/login`,
        
        data:data, 
        credentials: "include", 
        withCredentials:true,
         headers: myHeaders,
       
      }).then(res=>{
        let cookieCheck = cookie?.accessToken
        console.log(res.headers)
        console.log(res.config)
      // console.log("res check:",res)
      if(res?.data?.data?.isLoggedIn){

        dispatch(LoginDetails(res.data?.data))
        navigate('/engineerView/landingPage')
        // console.log("login respose :", res.data)
      
      }
      
      }
        ).catch(err=>{console.log(err)})
      
};

 useEffect(()=>{
  
  if(ULogged?.is_engineer===true){
    navigate('/engineerView/landingPage')
  }
 },[])

  return (
    <div className="MainLoginHeader">
      <div className="genInfo">
        <p className="text-center my-0" style={{ fontSize: "2rem" }}>
          Welcome to Compliance Centre
        </p>
        <p className="text-center my-0">
          Access your testing and certification reports whenever you need them.
        </p>
        <div className="text-center">
          <img src={ComplianceLogos} />
        </div>
      </div>
      <div className="LoginFormContainer">
        <form style={{backgroundColor:"#C1C1C1"}} onSubmit={handleSubmit(onSubmit)}>
          <p className="display-5 text-center py-3"  style={{fontWeight:"500"}}>Login</p>
          <div className="FieldsContainer">
          <div className="mb-3">
            
            <input
              type="text"
              className="form-control"
              placeholder="Enter User ID"
              aria-describedby="emailHelp"
              {...register("userId",{
                required: true})}
            />
             {errors.userId && <p style={{color:"red"}}>UserId is required</p>}
           
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              {...register("password",{
                required: true})}
            />
             {errors.password && <p style={{color:"red"}}>Password is required</p>}
          </div>
          <div className="LoginForgot text-center pb-3">
          <button type="submit" className="btn customBtn mx-3" >
            Login
          </button>
          <a style={{color:"black"}} href="#">Forgot Your Password</a>

          </div>
          </div>
        </form>
      <p className="text-center"><a href="#" className=" text-dark">Not a member? Register today.</a></p>
      <div className="LoginFooter">
        <div className="fomore">Find Out More</div>
        <div className="otherDetails">
          <div><a href="#">Why Compliance Central</a></div>
          <hr />
          <div>
          <p>Have comments or questions about Compliance Central</p>
          <p>Call +1-123-123-1234 or email insupport.dc@dailycompliance.com</p>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
};
