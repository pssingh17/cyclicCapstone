import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from '../components/Login/LoginReducer/LoginSlice'

export const store = configureStore({
  reducer: {
    
    Login:LoginReducer,
  },
})