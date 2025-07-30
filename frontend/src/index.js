import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, crateRoutesFromElements, Route, RouterProvider, createRoutesFromElements} from 'react-router-dom'
import Home from './pages/Home';
import PDP from './pages/PDP'
import store from './store.js'
import {Provider} from 'react-redux'


const routes = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="/product/:id" element={<PDP/>}/>
  </Route>
))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
