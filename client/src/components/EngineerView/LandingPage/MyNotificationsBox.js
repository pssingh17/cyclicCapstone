import React from 'react'

export const MyNotificationsBox = () => {
  return (
    <div className="py-3 px-2 customHeight">
    <div className="myContainer">
        <div className="customHeader py-3 px-5 ">
          <div style={{fontSize:"15px",fontWeight:"Bold"}}>My Notifications</div>
          <div><a href="#">View All</a></div>
        </div>
        <div className="customBody">
          <div className="customItems">
            <div>Review Placed on Hold</div>
            <div className="custominfo">
              <div className=''><a href='#'>updates@dc.i</a></div>
              <div className=''>Date</div>
            </div>
          </div>
         
        </div>
      </div>
      </div>
    
  )
}
