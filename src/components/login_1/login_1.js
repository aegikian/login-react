import React, { useState } from 'react'
import './login_1.css'


const Login_1 = () => {
    const [type, setType] = useState('password')
    const value = [];
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Errors, setErrors] = useState('');

    const [showPassImg, setShowPassImg] = useState(<label>&#128272;</label>)

    const typeChanger = () => {
        if (type === 'password') {
            setType('text')
            setShowPassImg(<i>&#128064;</i>)
        } else {
            setType('password')
            setShowPassImg(<label>&#128272;</label>)
        }
    }

    const handleSubmit = () => {
        if (password.length > 1 && email.length > 1) {
            value.push(email, password);
            alert(JSON.stringify(value, null, 2));
            value.splice(0, 2);
            setEmail('')
            setPassword('')
        } else {
            setPasswordCheck(<h6 className='Errors'>Incorrect</h6>)
        }
    }

    const handleChange_email = (event) => {
        setEmail(event.target.value)
    }

    const handleChange_password = (event) => {
        setPassword(event.target.value)
    }

    const [PasswordCheck, setPasswordCheck] = useState('')

    const PasswordBlur = (event) => {
        const valid = event.target.value;
        const regexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
        if (valid.length < 1) {
            setPasswordCheck(<h6 className='Errors'>Check your password</h6>)
            setDisable(true)
        } if (regexp.test(valid) === false) {
            setPasswordCheck(<h6 className='Errors'>
                Password must consist of lowercase and uppercase characters, as well as at least one special character
            </h6>)
        }
        else {
            setPasswordCheck('')
            setDisable(false)
        }
    }

    const [EmailCheck, setEmailCheck] = useState('')

    const EmailBlur = (event) => {
        const valid = event.target.value;
        const regexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (valid.length < 1 || regexp.test(valid) === false) {
            setEmailCheck(<h6 className='Errors'>Check your email</h6>)
            setDisable(true)
        }
        else {
            setPasswordCheck('')
            setEmailCheck('')
            setDisable(false)
        }
    }

    const [disable, setDisable] = useState(true)

    return (
        <div className='login_1_all'>
            <h2 className='h2_login_1'>Login_1</h2>
            <div className='login_enter_field'>
                <input type='email'
                    id='email'
                    className='input_email'
                    placeholder='email'
                    value={email}
                    onChange={handleChange_email}
                    onBlur={EmailBlur}
                />
            </div>
            <div className='errors_div'>
                {EmailCheck}
            </div>
            <div className='login_enter_field'>
                <input type={type}
                    id='password'
                    className='input_password'
                    placeholder='password'
                    value={password}
                    onChange={handleChange_password}
                    onBlur={PasswordBlur}
                />
                <button className='show_password_button' onClick={typeChanger}>{showPassImg}</button>
            </div>
            <div className='errors_div'>{PasswordCheck}</div>
            <button disabled={disable} className='submit_button' type='submit' onClick={handleSubmit}>SUBMIT</button>
            <hr className='hr_login_1' />
            <a href='#' className='Button_no_account'>No account? <br />
                Sign up now! </a>
        </div>
    )
}

export default Login_1;