import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './screens/login'
import Register from './screens/login/Register'
import Chat from './screens/chat/Chat'
import Home from './screens/home'
import Index from './screens/index/Index'
import Page from './screens/page'
import Song from './screens/song'
import ISO from './screens/iso'
import Setting from './screens/setting'
import MusicPlayer from './components/musicPlayer'
import Component404 from './components/404'
import PrivateRoute from './components/PrivateRoute'

const Root = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Index} />
                <PrivateRoute path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/message" component={Chat} />
                <PrivateRoute path="/iso" component={ISO} />
                <PrivateRoute path="/setting" component={Setting} />
                <PrivateRoute path="/page/:userName" component={Page} />
                <PrivateRoute path="/song/:idMongo" component={Song} />
                <PrivateRoute component={Component404} />
            </Switch>
            <MusicPlayer/>
        </div>
    </Router>
)

export default Root;