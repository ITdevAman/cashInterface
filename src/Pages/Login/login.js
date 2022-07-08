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
      & p{
        font-weight: 300;
        font-size: 16px;
        color: red;
        left: 17%;
        top: -13%;
        position: absolute;
      }

      .form_input {
        width: 70%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 10px;
        font-size: 18px;
        font-weight: 400;
        background: #FFFFFF;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        border: none;
        outline: none;
        &:focus {
          color: black;
          border: 1px solid #282F3A;
        }
      }

      .form_btn {
        width: 40%;
        padding: 10px;
        margin: 10px 0;
        font-size: 20px;
        font-weight: 500;
        border-radius: 10px;
        border: none;
        transition: .3s;
        background: #86B9F4;
        color: white;
        
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
    const [err , setErr] = useState("")
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
            .catch(res=> {
                setErr("Введите правильный email или пароль.")
                console.log(res)
            })
    }

    return (
        <div className={Form}>
            <div className="form">
                <img src={logo} alt=""/>
                <form className={"form_block"}>
                    <p>{err}</p>
                    <input className={"form_input"} onChange={(e) => handle(e)} id={"email"} value={data.email} type="text" placeholder={"Enter your E-mail"}/>
                    <input className={"form_input"}  onChange={(e) => handle(e)} id={"password"} value={data.password} type="password" placeholder={"Enter your password"}/>
                    <button className={"form_btn"}  onClick={submit}>login</button>
                </form>
            </div>
        </div>
    );
};
export default Login;


