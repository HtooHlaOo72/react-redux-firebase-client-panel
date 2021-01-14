import React from 'react'

function BalanceUpdateForm(props) {// props = name,value,onChange,submitBalance
    return (
        <form className="input-group m-1" onSubmit={(e)=>props.onSubmit(e)}>
            <input 
            type="text" 
            className="form-control" 
            placeholder="Enter New Balance" 
            name={props.name} 
            value={props.value}
            onChange={props.onChange}
            />
            <button className="btn btn-outline-dark" type="submit" >Update</button>
        </form>
    )
}

export default BalanceUpdateForm
