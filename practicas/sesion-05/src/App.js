import React, { Component } from 'react';
import './App.css';

import Logo from './Logo.js';

export default class App extends Component {

    constructor ( ...args ) {
        super( ...args )
        this.state = {}
    }

    render () {
        return (
            <div className='container' >
               <Logo isCentered />
            </div>
        );
    }
}





















