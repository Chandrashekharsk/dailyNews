// import logo from './logo.svg';
import './App.css';

import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ()=> {
  const pageSize = 6;
  const [progress,setProgress] = useState(0);

    return (
      <div>
        <Router>

        <Navbar/>
        <LoadingBar color='#f11946' height={3} progress={progress}/>

        <Routes>

          <Route exact strict path="/" element={<News setProgress = {setProgress} key="top" pageSize = {pageSize} country="in" category= "top"/>} />

          <Route exact strict path="/food" element={<News setProgress = {setProgress} key="food" pageSize = {pageSize} country="in" category= "food"/>} />

          <Route exact strict path="/politics" element={<News setProgress = {setProgress} key="politics" pageSize = {pageSize} country="in" category= "politics"/>} />

          <Route exact strict path="/world" element={<News setProgress = {setProgress} key="world" pageSize = {pageSize} country="in" category= "world"/>} />

          <Route exact strict path="/environment" element={<News setProgress = {setProgress} key="environment" pageSize = {pageSize} country="in" category= "environment"/>} />

          <Route exact strict path="/entertainment" element={<News setProgress = {setProgress} key="entertainment" pageSize = {pageSize} country= "in" category= "entertainment"/>}/>

          <Route exact strict path="/business" element={<News setProgress = {setProgress} key="business" pageSize = {pageSize} country= "in" category= "business"/>} />

          <Route exact strict path="/technology" element={<News setProgress = {setProgress}  key="technology" pageSize = {pageSize} country= "in" category= "technology"/>} />

          <Route exact strict path="/health" element={<News setProgress = {setProgress} key="health" pageSize = {pageSize} country= "in" category= "health"/>} />

          <Route exact strict path="/sports" element={<News setProgress = {setProgress} key="sports" pageSize = {pageSize} country= "in" category= "sports"/>} />

          <Route exact strict path="/science" element={<News setProgress = {setProgress} key="science" pageSize = {pageSize} country= "in" category= "science"/>} />


        </Routes>
        <ToastContainer/>
        </Router>
      </div>
    )
}
export default App;