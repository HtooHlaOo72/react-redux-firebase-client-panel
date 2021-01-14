import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types'

export default class AppNavBar extends Component {
    state = { showNav: false };
    onShow = () => {
        this.setState({ showNav: !this.state.showNav })
    }
    render() {
        return (
            <nav className='navbar navbar-dark bg-primary mb-4'>
                <div className='container'>
                    <Link to='/' className='navbar-brand'>Client Panel</Link>
                    <button className='navbar-toggler'
                        type='button'
                        onClick={this.onShow}
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    {
                        (this.state.showNav) 
                        &&<div className='navbar-collapse' id='navbarmain'>
                            <ul className='navbar-nav mr-auto'>
                                <li className='nav-item'>
                                    <Link to='/' className='nav-link'
                                    >Home</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='/' className='nav-link'
                                    >Dashboard</Link>
                                </li>

                            </ul>
                        </div>
                    }

                </div>

            </nav>
        )
    }
}
