import { useDispatch, useSelector } from "react-redux"
import React,{useState} from "react";
import { RxCross1 } from "react-icons/rx";
import ButtonLoading from '../components/common/ButtonLoading';
import ReactDOM from 'react-dom';
import { loginUser } from "../services/operations/authApi";
import './LoginModal.css';
import { useNavigate } from "react-router-dom";

function LoginModal({ loginModal, setLoginModal, setResetModal }) {
    
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const {loading } = useSelector( store => store.loading ) ;

    const [loginFormData, setLoginFormData] = useState({
        identifier:'' ,
        password:''
    }) ;

    if( !loginModal ) return null ;

    // reset password invoked
    const forgetPasswordHandler = () => {
        setResetModal(true) ;
        setLoginModal(false) ;
    }
    
    // to close login modal
    const loginModalCloseHandler = () => {
        setLoginModal(false) ;
    }
    
    const { identifier, password } = loginFormData ;
    // validation
    const isFormValid = identifier && password ;
    
    //saved data
    const loginFormChangeHandler = (e) => {
        setLoginFormData ((prev) => {
            return {
                ...prev ,
                [e.target.name]: e.target.value
            }
        })
    }

    // handling form events
    const loginFormSubmitHandler = (e) => {
        e.preventDefault() ;
        
        console.log( loginFormData ) ;

        // calling utlity function to call login api
        dispatch( loginUser( loginFormData, navigate )) ;
        setLoginFormData({
           identifier:'', 
           password:''

        })
    }
    
    return ReactDOM.createPortal(

        <div className="login-modal-overlay">
            <div className="login-modal-container">

                <button className="close-btn" onClick={loginModalCloseHandler}>
                    <RxCross1 />
                </button>
                
                <h2 className="login-title">Login</h2>

                <form className="login-form" onSubmit={loginFormSubmitHandler}>
                    <div className="input-group">
                        <input
                            type="email"
                            className="login-input"
                            placeholder="email"
                            maxLength="50"
                            value={identifier}
                            name='identifier'
                            onChange={loginFormChangeHandler}
                        />
                        
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            className="login-input"
                            placeholder="password"
                            value={password}
                            name='password'
                            onChange={loginFormChangeHandler}
                        />
                    </div>
                    
                    <p className="forget-password" onClick={forgetPasswordHandler}>forget password ?</p>

                    <button
                        className="login-next-btn"
                        disabled={!isFormValid}
                    >
                        {loading
                            ?
                            <ButtonLoading />
                            :
                            <p>Submit</p>
                        }
                    </button>
                </form>
            </div>
        </div>
        
        ,
        document.getElementById('modal')
    );
}

export default LoginModal;