import React from 'react';


class Form extends React.Component {
    render () {
        return (
            <form>
                <input type="email" name="email" placeholder="Enter your E-mail"/>
                <input type="text" name="password" placeholder="Password"/>
                <div className="output"></div>
                <button>Sign In</button>
                <button>Sign Up</button>
            </form>
        )
    }
}  

export default Form;