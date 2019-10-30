import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './screens/login/Login'
import Chat from './screens/chat/Chat'
import Home from './screens/home'
import Index from './screens/index/Index'
import Page from './screens/page'
import ISO from './screens/iso'
import Layout from './components/layout'

const Root = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/message" component={Chat} />
                <Route path="/page" component={Page} />
                <Route path="/test" component={Layout} />
                <Route path="/iso" component={ISO} />
            </Switch>
        </div>
    </Router>
)

export default Root;