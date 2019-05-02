import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './screens/login/Login'
import Chat from './screens/chat/Chat'

const Root = () => (
    <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/app" component={Chat} />
        </div>
    </Router>
)

export default Root;