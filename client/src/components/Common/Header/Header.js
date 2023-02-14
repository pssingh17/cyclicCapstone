import React from 'react'
import dailyComplianceLogo from '../../../images/dailyComplianceLogo.png'
import './Header.css'

export const Header = () => {
  return (
    <>
    <div className='header'>
    <img style={{width:"169px", height:"79px"}} src={dailyComplianceLogo} />
    </div>
    </>
  )
}
