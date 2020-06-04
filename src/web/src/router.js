import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './screens/login'
import Register from './screens/login/Register'
import upload from './screens/login/upload'
import Chat from './screens/chat'
import Home from './screens/home'
import Index from './screens/index/Index'
import Page from './screens/page'
import Song from './screens/song'
import ISO from './screens/iso'
import Setting from './screens/setting'
import MusicPlayer from './components/musicPlayer'
import Component404 from './components/404'
import PrivateRoute from './components/PrivateRoute'
import ContractContent from './screens/contract'
import UseContractContent from './screens/useContract'
import MainContract from './screens/mainContract'
import UserContractInfo from './screens/userContractInfo'

const Root = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/upload" component={upload} />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/message" component={Chat} />
                <PrivateRoute path="/iso" component={ISO} />
                <PrivateRoute path="/setting" component={Setting} />
                <PrivateRoute path="/contractFormManager"component={ContractContent}/>
                <PrivateRoute path="/contract"component={UserContractInfo}/>
                <PrivateRoute path="/tempContract/:idTempContract"component={UseContractContent}/>
                <PrivateRoute path="/mainContract/:idContract"component={MainContract}/>
                <PrivateRoute path="/page/:userName" component={Page} />
                <PrivateRoute path="/song/:idMongo" component={Song} />
                <PrivateRoute component={Component404} />
            </Switch>
            <MusicPlayer/>
        </div>
    </Router>
)

export default Root;