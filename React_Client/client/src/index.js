import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Activation from './routes/activation';
import Datos from './routes/datos';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Index';
import Who from './pages/Who';
import How from './pages/How';
import Community from './pages/Community';
import Lookfor from './pages/Lookfor';
import CreatePublication from './pages/CreatePublication';
import Header from './components/Header';
import Footer from './components/Footer';


ReactDOM.render(
    <BrowserRouter>   
        <Header />
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/activacion" element={<Activation/>} />
        <Route path="/datos/:email" element={<Datos />}/>       
        {/* <Route path="/inicio"element={<Inicio />}/> */}
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/who' element={<Who />}/>
        <Route exact path='/how' element={<How />}/>
        <Route exact path='/community' element={<Community />}/>
        <Route exact path='/lookfor' element={<Lookfor />}/>
        <Route exact path='/createpublication' element={<CreatePublication />}/>
        </Routes>
        {/*<Footer />*/}
    </BrowserRouter>,
    document.getElementById('root')
)



/*

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Activation from './routes/activation';
import Datos from './routes/datos';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>   
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/activacion" element={<Activation/>} />
        <Route path="/datos/:email" element={<Datos />}/>       
        {/* <Route path="/inicio"element={<Inicio />}/> */  /*}
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)

*/





