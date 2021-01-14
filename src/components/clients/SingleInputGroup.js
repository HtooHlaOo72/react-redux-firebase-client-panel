import React from 'react'

function SingleInputGroup({name,type,label,onChange,minLength,defaultValue}) {
    return (
        <div className="mb-3">
            <label htmlFor={`${name}`} className="form-label">{label}</label>
            <input 
            type={`${type}`} 
            className="form-control" 
            defaultValue={defaultValue}
            name={`${name}`}
            id={`${name}`} 
            onChange={(e)=>onChange(e)}
            minLength={minLength}
            required
            />
        </div>
    )
}

export default SingleInputGroup
