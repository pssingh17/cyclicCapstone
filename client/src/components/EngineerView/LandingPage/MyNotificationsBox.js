import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const MyNotificationsBox = () => {
  const [notificationData, setNotificationData] = useState()
  const dispatch = useDispatch()

  useEffect(()=>{
    // dispatch(LoaderStatus(true))
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:8081')
    myHeaders.append('Access-Control-Allow-Credentials', true)
    axios({
     method:'get',
     maxBodyLength: Infinity,
     url: 'http://localhost:8081/project/notifications',
     headers:myHeaders
    }).then(res=>{
    //  dispatch(LoaderStatus(false))
     console.log("response form MyNotifications Box", res.data)
    if(res?.data?.data.length>0){
       setNotificationData(res?.data?.data)
    }
   })
    .catch(err=>{
     console.log("error mynotification box  ",err)
    })
  },[])
  return (
    <div className="py-3 px-2 customHeight">
    <div className="myContainer">
        <div className="customHeader py-3 px-5 ">
          <div style={{fontSize:"15px",fontWeight:"Bold"}}>My Notifications</div>
          <div><a href="#">View All</a></div>
        </div>
        <div className="customBody">
          <div className="customItems">
            {notificationData?.length>0 ? <>
            {notificationData.map((data)=>{
              return(<>
                <div>Review {notificationData?.report_status} - {notificationData?.report_number}</div>
            <div className="custominfo">
              <div className=''><a href='#'>updates@dc.i</a></div>
              <div className=''>{notificationData?.report_created_at.slice(0,10)}</div>
            </div>
            </>  )
            })}
            </>:""}
            
          </div>
         
        </div>
      </div>
      </div>
    
  )
}
