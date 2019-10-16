import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './screens/login/Login'
import Chat from './screens/chat/Chat'
import Home from './components/layout/header'
import FileManager from './screens/fileManager/FileManager'
import Index from './screens/index/Index'
import Page from './screens/page'
import MusicPlayer from './screens/musicPlayer'
import Layout from './components/layout'

const Root = () => (
    <Router>
        <div>
            <Route exact path="/" component={Index} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/message" component={Chat} />
            <Route path="/fileManager" component={FileManager} />
            <Route path="/page" component={Page} />
            <Route path="/musicPlayer" component={MusicPlayer} />
            <Route path="/test" component={Layout} />
        </div>
    </Router>
)

export default Root;