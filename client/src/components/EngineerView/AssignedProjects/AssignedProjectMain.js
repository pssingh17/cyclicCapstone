import React, { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import FolderClosedIcon from '../../../images/folderClosed.gif.png'
import FolderOpenIcon from '../../../images/folderOpen.gif.png'
import PlusIcon from '../../../images/plus3.gif.png'
import MinusIcon from '../../../images/minus5.gif.png'
import { LoginDetails } from "../../Login/LoginReducer/LoginSlice";
import { useDispatch } from 'react-redux'
import { userLoginCheck } from '../../../helpers/userLoginCheck'
import { useEffect } from 'react'


export const AssignedProjectMain = () => {
    const [folderOpen, setFolderOpen] = useState(false)
  
    let activeStyle = {
      textDecoration: "underline",
    };
    let activeClassName = "underline";
    let passiveClassame = "text-dark"
    let navigate = useNavigate()
    let dispatch = useDispatch()
    useEffect(()=>{
      userLoginCheck().then(res=>{
      //  console.log(res)
       if(res?.userId?.user?.is_engineer===true || res?.userId?.user?.is_reviewer===true){
         dispatch(LoginDetails(res.userId.user))
       }
       if(res.isLoggedIn === false){
         alert(res?.message)
         navigate('/')
       }
     }).catch(err=>{console.log(err)})
     },[])
  return (
    <>
     <div className="homeBar">
       
       <NavLink className="leftHBar" to="">
         <svg
           width="25"
           height="23"
           viewBox="0 0 25 23"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             d="M1.5625 21C1.5625 21.8789 2.24609 22.5625 3.125 22.5625H21.875C22.7051 22.5625 23.4375 21.8789 23.4375 21V6.9375H1.5625V21ZM9.375 10.6484C9.375 10.3555 9.61914 10.0625 9.96094 10.0625H15.0391C15.332 10.0625 15.625 10.3555 15.625 10.6484V11.0391C15.625 11.3809 15.332 11.625 15.0391 11.625H9.96094C9.61914 11.625 9.375 11.3809 9.375 11.0391V10.6484ZM23.4375 0.6875H1.5625C0.683594 0.6875 0 1.41992 0 2.25V4.59375C0 5.0332 0.341797 5.375 0.78125 5.375H24.2188C24.6094 5.375 25 5.0332 25 4.59375V2.25C25 1.41992 24.2676 0.6875 23.4375 0.6875Z"
             fill="white"
           />
         </svg>
       
       <div className="textHome mx-2 text-white">Assigned Projects</div>
       </NavLink>

    
   </div>
   <div className='assProjectContainer'>
    <div className='leftNavAssigned'>
        <div className='sideNavContainer' style={{cursor:"pointer"}} onClick={()=>{setFolderOpen(!folderOpen)}}>
            {folderOpen?<>
            <img src = {MinusIcon} />
            <img src={FolderOpenIcon}></img>
            </>:<>
            <img src={PlusIcon} />
            <img src={FolderClosedIcon} />
            </>}
           
            <div className='Projects'><b>Projects</b>

            </div>
           
           
        </div>
    </div>
    <div className='rightAssigned'>
        <div className='navbarAssignedRight'>
            <NavLink to="details"  className={({ isActive }) =>
              isActive ? activeClassName : passiveClassame
            }>Details</NavLink>
            <NavLink to="financials"  className={({ isActive }) =>
              isActive ? activeClassName : passiveClassame
            }>Financials</NavLink>
            <NavLink to="deliverables"  className={({ isActive }) =>
              isActive ? activeClassName : passiveClassame
            }>Deliverables</NavLink>
            <NavLink to="supportingDocuments"  className={({ isActive }) =>
              isActive ? activeClassName : passiveClassame
            }>Supporting Documents</NavLink>
            <NavLink to="correspondence"  className={({ isActive }) =>
              isActive ? activeClassName : passiveClassame
            }>Correspondence</NavLink>
            <NavLink to="equipmentLog"  className={({ isActive }) =>
              isActive ? activeClassName : passiveClassame
            }>Equipment Log</NavLink>
            <NavLink to="sample"  className={({ isActive }) =>
              isActive ? activeClassName : passiveClassame
            }>Sample</NavLink>
           
        </div>
       
   
    <Outlet />
    </div>
   </div>
    </>
  )
}
