import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import './App.css'
import { PeopleData } from './PeopleData';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={< PeopleData />}></Route>
                <Route exact path='/people/:name' element={< PeopleData />}></Route>
                {/* <Route exact path='/:planetURL' element={< PeopleData />}></Route> */}
            </Routes>
        </Router>
    )
}

export default App
