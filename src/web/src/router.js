import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './screens/login/Login'
import Chat from './screens/chat/Chat'
import Home from './screens/home/Home'
import FileManager from './screens/fileManager/FileManager'

const Root = () => (
    <Router>
        <div>
            <Route exact path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/message" component={Chat} />
            <Route path="/fileManager" component={FileManager} />
        </div>
    </Router>
)

export default Root;