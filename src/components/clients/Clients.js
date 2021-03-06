import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';



class Clients extends Component {
    state = {
        totalOwed: null
    }
    static getDerivedStateFromProps(props, state) {
        const { clients } = props;
        if (clients) {
            const total = clients.reduce((total, clients) => {
                return total + parseFloat(clients.balance.toString())
            }, 0)

            return { totalOwed: total }
        }
        return null;
    }
    render() {
        const clients = this.props.clients;
        const { totalOwed } = this.state;
        return (
            (clients) ?
                <div className='container'>
                <div className='row'>
                    <div className='col-sm-12 col-xs-12'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h1>
                                    <i className='fas fa-users'></i>
                                    {' '}Clients
                            </h1>
                            </div>
                            <div className='col-md-6'>
                                <h5 className='text-right text-secondary'>
                                    Total Owed {' '}
                                    <span className={classnames({ 'text-success': totalOwed === 0 }, { 'text-danger': totalOwed > 0 })}>${parseFloat(totalOwed).toFixed(2)}</span>
                                </h5>
                            </div>
                        </div>

                    </div>
                    
                </div>
                <div className='table-responsive-sm'>
                        <table className='table table-striped'>
                            <thead className='thead-inverse'>
                                <tr>
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col">Name</th>
                                    {/* <th scope="col">Email</th> */}
                                    <th scope="col">Balance</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '0.6rem' }}>
                                {
                                    clients.map((client, i) => (
                                        <tr key={i}>
                                            {/* <th scope="row">{i}</th> */}
                                            <td>{`${client.firstName} ${client.lastName}`}</td>
                                            {/* <td><p style={{ overflow: 'auto' }}>{client.email}</p></td> */}
                                            <td>${parseFloat(client.balance).toFixed(2)}</td>
                                            <td><Link to={`/client/${client.id}`} className='btn btn-secondary btn-sm'>
                                                <i className='fas fa-arrow-circle-right'></i>
                                        Details
                                    </Link></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
                : <Spinner />
        )

    }


}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: 'clients' }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);