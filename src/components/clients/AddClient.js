import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import { firestoreConnect } from 'react-redux-firebase';
//import Spinner from '../layout/Spinner';
import SingleInputGroup from './SingleInputGroup';
class AddClient extends Component {
    constructor(props){
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            balance:'',
    
        }
        this.onInputChange=this.onInputChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    
    onInputChange(e){
        
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const {firestore,history}=this.props;
        const newClient=this.state;
        if(newClient.balance<0 || newClient.balance===''){
            newClient.balance=0;
        }
        firestore.add({collection:'clients'},newClient)
            .then(history.push('/'));

    }
    render() {
        const {firstName,lastName,email,phone,balance}=this.state;

        return (
            <div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <Link className='btn btn-link ' to='/'>
                            <i className='fas fa-arrow-circle-left'></i>
                            {' '} Back to homepage</Link>
                    </div>
                    <div className='col-sm-12'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                                <h3>Add Client</h3>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.onSubmit}>
                                    <SingleInputGroup 
                                        label='First Name'
                                        type='text'
                                        value={firstName}
                                        name={'firstName'}
                                        onChange={this.onInputChange}
                                        minLength={'2'}
                                    />
                                    <SingleInputGroup 
                                        label='Last Name'
                                        type='text'
                                        value={lastName}
                                        name={'lastName'}
                                        onChange={this.onInputChange}
                                        minLength={'2'}
                                    />
                                    <SingleInputGroup 
                                        label='Email'
                                        type='email'
                                        value={email}
                                        name={'email'}
                                        onChange={this.onInputChange}
                                        minLength={'8'}
                                    />
                                    <SingleInputGroup 
                                        label='Phone'
                                        type='text'
                                        value={phone}
                                        name={'phone'}
                                        onChange={this.onInputChange}
                                        minLength={'6'}
                                    />
                                    <SingleInputGroup 
                                        label='Balance'
                                        type='text'
                                        value={balance}
                                        name={'balance'}
                                        onChange={this.onInputChange}
                                        minLength={'1'}
                                    />
                                    
                                    <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
AddClient.propTypes={
    firestore:PropTypes.object.isRequired
}


export default firestoreConnect()(AddClient);