import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { RxCross1 } from "react-icons/rx";
import './SignupModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { sendSignupOTP } from '../services/operations/authApi';
import ButtonLoading from '../components/common/ButtonLoading';
import eye from "../assets/visible.png" ;
import eyeClose from "../assets/no_visibility.png" ;

function SignupModal({ signupModal, setSignupModal, setOtpModal, setSignupData }) {
    
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.loading);
    
    const [showpassword, setshowpassword] = useState(false) ;
    const [signupFormData, setSignupFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    if (!signupModal) return null;

    const signupModalCloseHandler = () => {
        setSignupModal(false);
    };
    const { name, email, password, confirmPassword } = signupFormData;
    const isFormValid = name && email && password && confirmPassword && (password === confirmPassword);

    const signupFormChangeHandler = (e) => {
        setSignupFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };
    const signupFormSubmitHander = (e) => {
        e.preventDefault();
        setSignupData(signupFormData);
        // console.log(signupFormData);
        dispatch(sendSignupOTP(signupFormData, setSignupModal, setOtpModal));
        setSignupFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }
    return ReactDOM.createPortal(
        <div className="signup-modal-overlay">
            <div className="signup-modal-container">
                <button className="close-btn" onClick={signupModalCloseHandler}>
                    <RxCross1 />
                </button>
                <h2 className="signup-title">Create your account</h2>

                <form className="signup-form" onSubmit={signupFormSubmitHander}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="signup-input"
                            placeholder="Name"
                            maxLength="50"
                            value={name}
                            name='name'
                            onChange={signupFormChangeHandler}
                        />
                        <span className="char-counter">{name.length} / 50</span>
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            className="signup-input"
                            placeholder="Email"
                            value={email}
                            name='email'
                            onChange={signupFormChangeHandler}
                        />
                    </div>

                    <div className=" relative signup-input">
                        <input
                            type={showpassword ? "text" : "password"}
                            className="w-[95%] text-gray-[#fff] bg-[#111] focus:outline-none"
                            placeholder="Enter Password"
                            value={password}
                            name='password'
                            onChange={signupFormChangeHandler}
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

                    <div className="input-group">
                        <input
                            type="password"
                            className="signup-input"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            name='confirmPassword'
                            onChange={signupFormChangeHandler}
                        />
                    </div>

                    <button
                        className="signup-next-btn"
                        disabled={!isFormValid}
                    >
                        {loading
                            ?
                            <ButtonLoading />
                            :
                            <p>Register</p>
                        }
                    </button>
                </form>
            </div>
        </div>,
        document.getElementById('modal')
    );
}

export default SignupModal;
