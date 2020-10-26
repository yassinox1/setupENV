import React from 'react'

function InputTemplate(
    name,
    value,
    className,
    placeholder,
    onchange,

) {
    return (
        <input
        name = {name}
        value ={value}
        className= {className}
        placeholder ={placeholder}
        onchange={onchange}
        />
    )
}
export default  InputTemplate;