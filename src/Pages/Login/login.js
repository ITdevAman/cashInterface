import React, {useState} from 'react';
import axios from "axios"
import {useDispatch} from "react-redux";
import {GET_PERSON} from "../../Redux/actions";
import {css} from "@emotion/css";
import logo from "../../Assets/images/Снимок экрана 2022-05-23 в 16.40.54.png"


const Form = css`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    width: 600px;
    height: 700px;
    background: rgb(252, 252, 252);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: .6;
    }

    &_block {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .form_input {
        width: 70%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 10px;
        font-size: 18px;
        font-weight: 400;
        border: 1px solid #77402F;
        background: transparent;
        outline: none;
        &:focus {
          background: rgba(119, 64, 47, 0.93);
          backdrop-filter: blur(5px);
          color: white;
        }
      }

      .form_btn {
        width: 50%;
        padding: 10px;
        margin: 10px 0;
        background: transparent;
        font-size: 18px;
        font-weight: 500;
        border-radius: 10px;
        border: 1px solid #77402F;
        transition: .3s;

        &:hover {
          background: #77402F;
          color: white;
        }
      }
    }
  }
`

const Login = () => {
    const [data ,setData]= useState(
        {
            email:"" , password : ""
        }
    )
    const handle = (e) => {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    const dispatch = useDispatch()

    function submit (e){
        e.preventDefault()
        return  axios.post("https://s225912.hostiman.com/api/token/",
            {
                email : data.email,
                password : data.password
            })
            .then((res)=> {
                dispatch({type : GET_PERSON , payload : res.data})
                localStorage.setItem('token', JSON.stringify(res.data))
                document.location.reload()
            })
            .catch(err=> {console.log(err)})
    }
    return (
        <div className={Form}>
            <div className="form">
                <img src={logo} alt=""/>
                <form className={"form_block"}>
                    <input className={"form_input"} onChange={(e) => handle(e)} id={"email"} value={data.email} type="text" placeholder={"Enter your E-mail"}/>
                    <input className={"form_input"}  onChange={(e) => handle(e)} id={"password"} value={data.password} type="password" placeholder={"Enter your password"}/>
                    <button className={"form_btn"}  onClick={submit}>login</button>
                </form>
            </div>
        </div>
    );
};
export default Login;


