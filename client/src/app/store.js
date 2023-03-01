import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from '../components/Login/LoginReducer/LoginSlice'
import DeliverablesReducer from '../components/EngineerView/AssignedProjects/Deliverables/DeliverablesReducer/Deliverables'
import LoaderSliceReducer from '../components/Common/LoaderReducer/LoaderSlice'


export const store = configureStore({
  reducer: {
    
    Login:LoginReducer,
    Deliverables: DeliverablesReducer,
    LoaderSlice: LoaderSliceReducer,
  
  },
})