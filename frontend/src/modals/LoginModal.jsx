import { useDispatch, useSelector } from "react-redux"
import React,{useState} from "react";
import { RxCross1 } from "react-icons/rx";
import ButtonLoading from '../components/common/ButtonLoading';
import ReactDOM from 'react-dom';
import { loginUser } from "../services/operations/authApi";
import './LoginModal.css';
import { useNavigate } from "react-router-dom";
import eye from "../assets/visible.png" ;
import eyeClose from "../assets/no_visibility.png" ;

function LoginModal({ loginModal, setLoginModal, setResetModal }) {
    
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const {loading } = useSelector( store => store.loading ) ;
    
    const [showpassword, setshowpassword] = useState(false) ;
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
        dispatch( loginUser( loginFormData, resetFormHandler )) ;
        
    }

    //reset form 
    const resetFormHandler = () => {
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
                    <div className="login-input">
                        <input
                            type="email"
                            className="w-[100%] text-gray-[#fff] bg-[#111] focus:outline-none"
                            placeholder="email"
                            maxLength="50"
                            value={identifier}
                            name='identifier'
                            onChange={loginFormChangeHandler}
                        />
                        
                    </div>

                    <div className="relative login-input">
                        <input
                            type={showpassword ? "text" : "password"}
                            className="w-[95%] text-gray-[#fff] bg-[#111] focus:outline-none"
                            placeholder="password"
                            value={password}
                            name='password'
                            onChange={loginFormChangeHandler}
                        /> 
                        <span onClick={() => setshowpassword(!showpassword)} className="absolute right-2 top-3 w-4">
                            { showpassword ? 
                              (<>
                                <img src={eye} alt="not found" className="w-4 h-5"/>
                               </>) 
                              : 
                              (<>
                                <img src={eyeClose} alt="not found" className="w-4 h-5"/>
                               </>) } 
                        </span>
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