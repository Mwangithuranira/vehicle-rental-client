// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// // import { store, persistedStore } from './app/store';
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistedStore}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode >,
// )

import  ReactDOM from "react-dom/client";
 import App from "./App";
import React from "react";
import "./index.css";
import {Provider} from "react-redux";

import store from "./redux/store";

 ReactDOM.createRoot(document.getElementById("root")!).render(

  <React.StrictMode>
    <Provider store={store}>
     
        <App />
      
    </Provider>
   
  </React.StrictMode>
   
 );