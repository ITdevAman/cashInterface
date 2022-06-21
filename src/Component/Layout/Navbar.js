import React from 'react';
import logo from "../../Assets/images/Снимок экрана 2022-05-23 в 16.40.54.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHome
} from "@fortawesome/free-solid-svg-icons";
import exit from "../../Assets/images/exit.png";
import {css} from "@emotion/css";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {REMOVE_PERSON} from "../../Redux/actions";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const cashMenu = css`
  width: 100%;
  height: 120vh;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  .logo {
    width: 100%;
    position: relative;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    & img {
      width: 80%;
      height: 100%;
      object-fit: cover;
    }
  }
  .navbar{
    padding-top: 30px;
    position: relative;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    margin-left: 5px;
    & a{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;
      text-decoration: none;
      margin: 5px 0;
      transition: .4s;
      border-radius:15px;
      padding:14px 4px;
      .navbarIcon{
        color: #C7C7C7;
        font-size: 24px;
      }
      &:hover{
        background: #77402F;
        transform: scale(1.03);
      }
      &:hover .navbarIcon {
        color: white;
      }
      &:hover .span {
        color: white;
      }
      & span {
        margin-top: 7px;
        color: #C7C7C7; 
        font-weight: 700;
        font-size: 12px;
        transition: .4s;
      }
    }
  }
  .logOut{
    position: relative;
    display: flex;
    justify-items: center;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
    & button{
      border:none;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: transparent;
      text-decoration: none;
      margin: 10px 0;
      transition: .4s;
      border-radius:15px;
      padding: 5px;
      & img {
        width: 43%;
        height: 30px;
        object-fit: cover;
      }
      & span {
        margin: 2px 0;
        color: #C7C7C7; 
        font-weight: 600;
        font-size: 14px;
        transition: .4s;
      }
    }
  }
`
const ModalBlock = css`
    width: 500px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & h1 {
    display: flex;
    font-size: 22px;
    margin-bottom: 24px;
  }
  .btn_close{
    border-radius: 5px; 
    border : none ;
    padding: 8px 24px;
    background: red;
    color: white;
    font-size: 18px;
  }
  .btn_click{
    margin: 0 30px;
    border-radius: 5px; 
    border : none ;
    padding: 8px 24px;
    background: green;
    color: white;
    font-size: 19px;
  }
`

const Navbar = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
    const dispatch = useDispatch()
    return (
        <section id={"navbar"}>
            <div className={cashMenu}>
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>
                <aside className="navbar">
                    <NavLink to={"/"}>
                        <FontAwesomeIcon icon={faHome} className="navbarIcon"/>
                        <span className='span'>Главный</span>
                    </NavLink>
                   {/* <div>
                        <NavLink to={'/home'}>
                            <FontAwesomeIcon icon={faConciergeBell} className="navbarIcon"/>
                            <span className='span'>Menu</span>
                        </NavLink>
                        <NavLink to={"/history"}>
                            <FontAwesomeIcon icon={faClock} className="navbarIcon"/>
                            <span className='span'>History</span>
                        </NavLink>
                        <NavLink to={"wallet"}>
                            <FontAwesomeIcon icon={faWallet} className="navbarIcon"/>
                            <span className='span'>Wallet</span>
                        </NavLink>
                        <NavLink to={"promos"}>
                            <FontAwesomeIcon icon={faPercent} className="navbarIcon"/>
                            <span className='span'>Promos</span>
                        </NavLink>
                        <NavLink to={'/setting'}>
                            <FontAwesomeIcon icon={faGear} className="navbarIcon"/>
                            <span  className='span'>Setting</span>
                        </NavLink>
                    </div>*/}
                </aside>
                <div className="logOut">
                    <button  onClick={openModal} >
                        <img src={exit} alt=""/>
                        <span  className='span'>Logout</span>
                    </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                       <div className={ModalBlock}>
                           <h1>Вы хотите выйти из аккаунта?</h1>
                           <form>
                               <button className={"btn_close"} onClick={closeModal}>Отмена</button>
                               <button className={"btn_click"} onClick={()=> dispatch({type : REMOVE_PERSON })}>Выйти</button>
                           </form>
                       </div>
                    </Modal>
                </div>
            </div>
        </section>
    );
};

export default Navbar;