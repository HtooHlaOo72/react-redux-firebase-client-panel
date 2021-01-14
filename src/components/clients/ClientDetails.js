import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import BalanceUpdateForm from './BalanceUpdateForm';

import classnames from 'classnames';

class ClientDetails extends Component {
    constructor(props) {
        super(props);
    
        this.state = {showUpdateForm : false,updatedBalanceAmount:''};
    
        this.updateFormControl=this.updateFormControl.bind(this);
        this.onChangeAmount=this.onChangeAmount.bind(this);
        this.updateBalance=this.updateBalance.bind(this);
        this.deleteClick=this.deleteClick.bind(this);
    }

    //update balance from firestore
    updateBalance(e){
        e.preventDefault();
        const {client,firestore} = this.props;
        const {updatedBalanceAmount} =this.state;

        const updatedClient={
            balance:updatedBalanceAmount
        }
        firestore.update({collection:'clients',doc:client.id},updatedClient)
            .then(this.updateFormControl());
            
    }
    // delete client from firestore
    deleteClick(){
        const {client,firestore,history} = this.props;
        firestore.delete({collection:'clients',doc:client.id})
            .then(history.push('/'))
    }
    onChangeAmount(e){
        this.setState({updatedBalanceAmount:e.target.value})
    }
    updateFormControl(){
        this.setState({showUpdateForm:!this.state.showUpdateForm})
    }
    
    render() {
        const {client}=this.props;
        
        return (
            (client)?
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4 col-xs-12'>
                        <Link className='btn btn-link ' to='/'>
                        <span className='fas fa-arrow-circle-left'></span>
                        {' '} Back to homepage</Link>
                    </div>
                    <div className='col-sm-8 col-xs-12'>
                        <div className='btn-group float-right'>
                            <Link className='btn btn-dark ' to={`/client/edit/${client.id}`}>Edit</Link>
                            <button className='btn btn-danger' onClick={this.deleteClick}>Delete</button>
                        </div>
                    </div>
                    
                </div>
                <hr/>
                <div className='card my-3'>
                    <div className='card-header'>
                        <h3>{ `${client.firstName} ${client.lastName}` } </h3>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-8 col-sm-6 text-primary'>
                                Client-Id{' '}<span className='text-secondary'>{client.id}</span>
                            </div>
                            <div className='col-md-4 col-sm-6 '>
                                <h4>
                                    Balance{' '}<span className={classnames({'text-success':client.balance==='0'},{'text-danger':client.balance>0})}>${parseFloat(client.balance).toFixed(2)}</span>
                                    <button className='btn text-warning border-dark mx-2' onClick={this.updateFormControl} ><i className='fas fa-pencil-alt'></i></button>
                                </h4>
                                {
                                    (this.state.showUpdateForm)
                                    &&
                                    <BalanceUpdateForm 
                                        name={'updatedBalanceAmount'}
                                        value={this.state.updatedBalanceAmount}
                                        onChange={this.onChangeAmount}
                                        onSubmit={this.updateBalance}
                                    />
                                }
                                <hr/>

                            </div>
                        </div>
                        <hr/>
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                Email{' '}{client.email}
                            </li>
                            <li className='list-group-item'>
                                Phone{' '}{client.phone}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            :<Spinner />
        )
    }
}

ClientDetails.propTypes={
    firestore:PropTypes.object.isRequired,
    client:PropTypes.object
}

export default compose(
    firestoreConnect(props=>[{ collection: 'clients',storeAs:'client',doc:props.match.params.id }]),
    connect(({firestore:{ordered}}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);
