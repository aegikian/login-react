import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './login_1.css'
import { redirect } from "react-router-dom"


const Login_1 = () => {
    const [type, setType] = useState('password');
    const value = [];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Errors, setErrors] = useState('');
    const [EmailCheck, setEmailCheck] = useState('');
    const [disable, setDisable] = useState(true);
    const [PasswordCheck, setPasswordCheck] = useState('');
    const [showPassImg, setShowPassImg] = useState(<label>&#128272;</label>);
    const [scale, setScale] = useState('scale(1)');
    const [submit, setSubmit] = useState("SUBMIT");
    const [user, setUser] = useState({
        "response": ""
    });
    var response;

    const typeChanger = () => {
        if (type === 'password') {
            setType('text');
            setShowPassImg(<i>&#128064;</i>);
        } else {
            setType('password');
            setShowPassImg(<label>&#128272;</label>);
        }
    }

    useEffect(() => {
        response = (Object.values(user.response)).join("");
        console.log(response)
        if (response == "true") {
            alert('ok');
            response = ""
            return redirect('/profile')
        } if (response == "") {
            setPasswordCheck(<h6 className='Errors'>
                Server error
            </h6>);
        } if (response == null || undefined) {
            setPasswordCheck(<h6 className='Errors'>
                Server error
            </h6>);
        }
        if (response == "false") {
            setPasswordCheck(<h6 className='Errors'>
                Incorrect login or password
            </h6>);
            setPassword('')
            response = ""
        }
    }, [user])

    const handleSubmit = () => {
        if (password.length > 1 && email.length > 1) {
            value.push(email, password);
            fetch('http://localhost:3002/user', {
                method: 'POST',
                body: JSON.stringify(value, null, 2)
            })
            value.length = 0;
            const fetchData = async () => {
                const result = await axios(
                    'http://localhost:3002/user',
                );
                setUser(result.data);
            };
            fetchData();
        } else {
            setPasswordCheck(<h6 className='Errors'>Incorrect</h6>);
        }
    }

    const handleChange_email = (event) => {
        setEmail(event.target.value);
    }

    const handleChange_password = (event) => {
        setPassword(event.target.value);
    }



    const PasswordBlur = (event) => {
        const valid = event.target.value;
        if (valid.length < 1) {
            setPasswordCheck(<h6 className='Errors'>Check your password</h6>);
            setDisable(true);
        } else {
            setPasswordCheck('');
            setDisable(false);
            setSubmit('SUBMIT');
            setScale('scale(1)');
        }
    }



    const EmailBlur = (event) => {
        const valid = event.target.value;
        const regexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (valid.length < 1 || regexp.test(valid) === false) {
            setEmailCheck(<h6 className='Errors'>Check your email</h6>);
            setDisable(true);
        }
        else {
            setPasswordCheck('');
            setEmailCheck('');
            setDisable(false);
            setSubmit('SUBMIT');
            setScale('scale(1)');
        }
    }

    const mouseEnter = () => {
        if (disable) {
            setSubmit("You won't make it.");
            setScale('scale(1.3)');
            setTimeout(() => {
                setScale('scale(-1)')
            }, 350);

        }
    }

    const mouseOver = () => {
        if (disable) {
            if (scale === 'scale(-1)')
                setScale('scale(1)')
        }
    }

    return (
        <div className='login_1_all'>
            <h2 className='h2_login_1'>Do not enter!!!</h2>
            <form onSubmit={handleSubmit}>
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
                <div onMouseEnter={mouseEnter} onMouseLeave={mouseOver}>
                    <button disabled={disable} style={{ transform: scale }} className='submit_button' type='submit' onClick={handleSubmit}>{submit}</button>
                </div>
            </form>
            <hr className='hr_login_1' />
            <a href='#' className='Button_no_account'>No account? <br />
                Sign up now! </a>
        </div>
    )
}

export default Login_1;