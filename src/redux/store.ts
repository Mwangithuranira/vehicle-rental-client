// src/app/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";



import vehicleReducer from "../features/vehicleslice";




const rootReducer = combineReducers({
  
  vehicles: vehicleReducer,


  

  // Add other reducers here if any
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      
      
      
     
    ),
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;