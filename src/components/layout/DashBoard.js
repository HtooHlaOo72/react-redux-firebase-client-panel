import React from 'react'
import SideBar from './SideBar';
import Clients from '../clients/Clients';


function DashBoard(props) {
    return (
        <div className='container'>
            <div className='row'>
            <div className='col-sm-10 col-xs-12'>
                <Clients />
            </div>
            <div className='col-sm-2 col-xs-12'>
                <SideBar />
            </div>

        </div>
        </div>
        
    )
}

export default DashBoard;
