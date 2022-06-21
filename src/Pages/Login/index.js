import React, {useEffect, useState} from 'react';
import {css} from "@emotion/css"

const login = css`
    
`

const Index = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [emailDirty , setEmailDirty] = useState(false)
    const [passwordDirty , setPasswordDirty] = useState(false)
    const [emailError , setEmailError] = useState('!E-mail.lenght == 0')
    const [passwordError , setPasswordError] = useState('!Password.lenght == 0')
    const [formValid , setFormValid] = useState(false)

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError("email,Don't")
        }else {
            setEmailError('')
        }
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value < 3 || e.target.value > 8){
            setPasswordError("dont password working")
            if(!e.target.value ){
                setPasswordError("password.lenght == 0")
            }else {
                setPasswordError("")
            }
        }
    }
    const blurHandler = (e) => {
        switch (e.target.value) {
            case 'email' :
                setEmailDirty(true)
                break
            case 'password' :
                setPasswordDirty(true)
                break
        }
    }

    useEffect(()=>{
        if (emailError || passwordError){
            setFormValid(false)
        }else {
            setFormValid(true)
        }
    } , [emailError , passwordError])

    return (
        <section id={"login"}>
            <div className="container">
                <div className={login}>
                    <h1>registration</h1>
                    <form action="" className="form">
                        <div>{(emailDirty && emailError) && <div style={{color :"red"}}>{emailError}</div>}</div>
                        <input onChange={e => emailHandler(e)} value={email}  onBlur={e => blurHandler(e)} type="text" name='name' placeholder={"Enter your E-mail"}/>
                        <div>{(passwordDirty && passwordError) && <div style={{color :"red"}}>{passwordError}</div>}</div>
                        <input onChange={e => passwordHandler(e)} onBlur={e=>blurHandler(e)} type="password" name='password' placeholder={"Enter your password"}/>
                        <button disabled={!formValid} type="submit">Registration</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Index;