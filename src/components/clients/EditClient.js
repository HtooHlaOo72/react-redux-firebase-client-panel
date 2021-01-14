import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import SingleInputGroup from './SingleInputGroup';
class EditClient extends Component {
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
    async componentDidMount(){
        const {client}=await this.props;
        this.setState(client);
    }
    onInputChange(e){
        
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const {firestore,history}=this.props;
        const updateContact=this.state;

        firestore.update({collection:'clients',doc:this.props.match.params.id},updateContact)
            .then(history.push('/'));

    }
    render() {
        
        const {firstName,lastName,email,phone,balance}=this.state;
        
        return (
            (this.state)
            ?
            <div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <Link className='btn btn-link ' to='/'>
                            <i className='fas fa-arrow-circle-left'></i>
                            {' '} Back to homepage</Link>
                    </div>
                    <div className='col-sm-12'>
                        <div className='card'>
                            <div className='card-header bg-warning'>
                                <h3>Edit Client</h3>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.onSubmit}>
                                    <SingleInputGroup 
                                        label='First Name'
                                        type='text'
                                        defaultValue={firstName}
                                        name={'firstName'}
                                        onChange={this.onInputChange}
                                        minLength={'2'}
                                    />
                                    <SingleInputGroup 
                                        label='Last Name'
                                        type='text'
                                        defaultValue={lastName}
                                        name={'lastName'}
                                        onChange={this.onInputChange}
                                        minLength={'2'}
                                    />
                                    <SingleInputGroup 
                                        label='Email'
                                        type='email'
                                        defaultValue={email}
                                        name={'email'}
                                        onChange={this.onInputChange}
                                        minLength={'8'}
                                    />
                                    <SingleInputGroup 
                                        label='Phone'
                                        type='text'
                                        defaultValue={phone}
                                        name={'phone'}
                                        onChange={this.onInputChange}
                                        minLength={'6'}
                                    />
                                    <SingleInputGroup 
                                        label='Balance'
                                        type='text'
                                        defaultValue={balance}
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
            :<Spinner />
        )
    }
}
EditClient.propTypes={
    firestore:PropTypes.object.isRequired,
    client:PropTypes.object

}


export default compose(
    firestoreConnect(props=>[{ collection: 'clients',storeAs:'client',doc:props.match.params.id }]),
    connect(({firestore:{ordered}}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(EditClient);