import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

export default class AppNavBar extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <nav className='navbar navbar-expand-md navbar-dark bg-primary mb-4'>
                <Link to='/' className='navbar-brand'>Client Panel</Link>
                <button className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target="#navbarmain"
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarmain'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link to='/'>Dashboard</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
