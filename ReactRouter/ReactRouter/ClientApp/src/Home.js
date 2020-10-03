


import React, { Component } from 'react';
import { Switch, Router } from 'react-router-dom';
import history from './history';
import Events from './components/EventInfo/Events';

class Home extends Component {

    render() {
        return ( 
            <Events/>
        )
    }
}
export default Home;
