import React from 'react'
import './Search.css';

export const Search = ({ setUsername }) => {

    const onSubmit = (e) => {
        e.preventDefault();
        setUsername(e.currentTarget.children[0].value);
    }
    return (
        <div className='Search'>
            <h2>GitHub User Finder</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <input type="text" name="username" placeholder='Enter github username here' required />
                <input type="submit" value='Search' />
            </form>
        </div>
    )
}
