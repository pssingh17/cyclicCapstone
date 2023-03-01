import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux';

export const userLoginCheck = async () => {

    var config = {
        method: 'get',
      maxBodyLength: Infinity,
        url: '/user',
        credentials: "include", 
        withCredentials:true,
      };
      
     return await axios(config)
      .then(function (response) {
        // console.log("response in userLogin check functiom",response.data);
        
        return response.data
      })
      .catch(function (error) {
        // console.log("Error cin userLoginCheck function:",error);
        
        return error.response
      });
}
