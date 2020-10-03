

// https://www.youtube.com/watch?v=WG7NBJQzHmc

import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Upload from './Upload';
import AdminEventsPage from './AdminEventsPage';
import Admin from './Admin';
import { NavMenu } from './components/NavMenu';
import { BrowserRouter as Router } from 'react-router-dom';
import './custom.css'
import "./components/NavMenu.css"
import Nav from './Nav';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Nav/>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/upload' component={Upload} />
                    <Route exact path='/admin-log-in' component={Admin} />
                    <Route exact path='/admin-events' component={AdminEventsPage} />
                </Switch>   
                
            </div>
            )
    }
}
export default App;