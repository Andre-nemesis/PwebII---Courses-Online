import React from 'react';

export const Hello = () => {
    const logout = () =>{
        localStorage.removeItem('token');
    }
    return (
        <div className="App">
        <h1>Hello World React</h1>
        <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Hello; 
