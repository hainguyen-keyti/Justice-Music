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
import MusicDetail from './screens/musicDetail'
import MusicPlayer from './components/musicPlayer'

const Root = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/message" component={Chat} />
                <Route path="/iso" component={ISO} />
                <Route path="/setting" component={Setting} />
                <Route path="/test" component={MusicDetail} />
                <Route path="/page/:userName" component={Page} />
                <Route path="/song/:idMongo" component={Song} />
            </Switch>
            <MusicPlayer/>
        </div>
    </Router>
)

export default Root;