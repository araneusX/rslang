import React, {useState} from 'react';
import style from './form.module.scss';


const Form = () => {
    
        const [state, setState] = useState ('input your e-mail and password');

        return (
            <form className={style.form}>
                <input type="email" name="email" placeholder="Enter your E-mail"/>
                <input type="text" name="password" placeholder="Password"/>
                <div className="output">{state}</div>
                <button>Sign In</button>
                <button>Sign Up</button>
            </form>
        )
    }
 

export default Form;