import axios from 'axios'
import React from 'react'

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
        console.log(response.data);
        return response.data
      })
      .catch(function (error) {
        console.log(error);
        return error
      });
}
