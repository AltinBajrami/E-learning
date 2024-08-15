import React from 'react'

const SinglePartner = ({ logo, name }) => {
    return (
        <div className='single-partner'>
            {logo}<span className='name'> {name}</span>
        </div>
    )
}

export default SinglePartner