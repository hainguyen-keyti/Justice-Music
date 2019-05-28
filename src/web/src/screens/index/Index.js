import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core//Button'
import './Index.css'

export default class Index extends Component {
    onClickGoTo = () => {
        this.props.history.push('/login')
    }
    
    render() {
        return (
            <div id="background">
                <CssBaseline />
                <Typography variant="h4" style={{color: '#eeeeee'}}>
                    Justice Music
                </Typography>
                <div id="wrapper">
                    <img src="https://cdn.freebiesupply.com/logos/large/2x/strange-music-logo-logo-png-transparent.png" alt="Justice Music" style={{height: '100px', width: '100px', marginBottom: '50px'}}/>
                    <Typography variant="h4" style={{ marginBottom: '50px', color: '#e0e0e0'}}>
                        A safe place for all your Intellectual
                    </Typography>
                    <Button variant="contained" color="secondary" style={{opacity: '0.7'}} onClick={this.onClickGoTo}>
                        <Typography style={{color: 'white'}}>
                            Go to Justice Music
                        </Typography>
                    </Button>
                </div>
            </div>
        )
    }
}
