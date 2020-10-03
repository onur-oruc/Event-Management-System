


import React, { Component } from 'react';
import { Switch, Router } from 'react-router-dom';
import history from './history';

class Upload extends Component {
    handleClick() {
        history.push('/');
    }

    render() {
        return (
            <div>
                Upload page
                <button onClick={(e) => this.handleClick(e)}> Start </button>
            </div>
        )
    }
}
export default Upload;