import React, {useEffect, useRef, useState} from 'react' ;
import ReactDOM from 'react-dom' ;
import { RxCross2 } from 'react-icons/rx';

import { useDispatch, useSelector } from 'react-redux'; 
import ButtonLoading from '../components/common/ButtonLoading';
// import { useNavigate } from 'react-router-dom';

import { updatePassword } from '../services/operations/authApi';
import './OTPModals.css';

function UpdatePasswordModal({ email, updatePasswordModal, setUpdatePasswordModal, setLoginModal }) {
    
    const otpInputRefs = useRef([]);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { loading } = useSelector((store) => store.loading);
    const [isOtpComplete, setIsOtpComplete] = useState(false);
    
    console.log("your email id",email) ;
    const [userData, setUserData] = useState({
        email:email,
        otp: '',
        newPassword:'', 
        confirmNewPassword:'' ,
    })
    
    useEffect(() => {
        setUserData(prevState => ({
            ...prevState,
            email: email // Update email whenever it changes
        }));
    }, [email]); // Dependency on email prop

    console.log("your email id", email);
    console.log("userData", userData.email);
    

    const { newPassword, confirmNewPassword } = userData;

    useEffect(() => {
        if (updatePasswordModal) {
            otpInputRefs.current[0]?.focus();
        }
    }, [updatePasswordModal]);

    if (!updatePasswordModal) return null;

    const closeModal = () => {
        setUpdatePasswordModal(false);
    };

    const handleInputChange = (e, index) => {
        const { value } = e.target;

        if (value.length > 1) {
            otpInputRefs.current[index].value = value[value.length - 1];
        }

        const currentValue = otpInputRefs.current[index].value;
        if (currentValue.length > 0 && /^[0-9]$/.test(currentValue)) {
            if (index < 5) {
                otpInputRefs.current[index + 1]?.focus();
            }
        }

        const otpValues = otpInputRefs.current.map(ref => ref.value).join('');
        setIsOtpComplete(otpValues.length === 6);
    };
    
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (!otpInputRefs.current[index].value && index > 0) {
                otpInputRefs.current[index - 1]?.focus();
            } else {
                otpInputRefs.current[index].value = '';
            }
        }
    };

    const handleInputBlur = (e, index) => {
        const { value } = e.target;
        otpInputRefs.current[index].value = value.length > 1 ? value[value.length - 1] : value;
    };

    const loginFormChangeHandler = (e) => {
        setUserData( (prev) => {
            return{
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    const otpSubmitHandler = (e) => {
        e.preventDefault();
        console.log("userData", userData) ;
        const otpValues = otpInputRefs.current.map(ref => ref.value).join('');
        const userRegisterData = {
            ...userData,
            otp: otpValues
        };

        console.log("ActualData",userRegisterData) ;
        dispatch( updatePassword(userRegisterData, setUpdatePasswordModal, setLoginModal) );
    };

    return ReactDOM.createPortal(
        <div className='otp-modal-overlay'>
            <form className='otp-modal-container' onSubmit={otpSubmitHandler}>
                <div className='otp-modal-header'>
                    <h3>Email Verification</h3>
                    <RxCross2 className='close-icon' onClick={closeModal} />
                </div>
                <p className='otp-modal-description'>A six-digit OTP has been sent to your Email. Please enter it below to verify your Email.</p>
                <div className='otp-input-container'>
                    {[...Array(6)].map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            className='otp-input'
                            maxLength="1"
                            ref={el => otpInputRefs.current[index] = el}
                            onChange={e => handleInputChange(e, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            onBlur={e => handleInputBlur(e, index)} // Ensure value is updated on blur
                        />
                    ))}
                </div>

                <div className="input-group">
                        <input
                            type="password"
                            className="signup-input"
                            placeholder="password"
                            value={newPassword}
                            name='newPassword'
                            onChange={loginFormChangeHandler}
                        />
                </div> 

                <div className="input-group">
                        <input
                            type="password"
                            className="signup-input"
                            placeholder="confirmpassword"
                            value={confirmNewPassword}
                            name='confirmNewPassword'
                            onChange={loginFormChangeHandler}
                        />
                </div> 

                <button className={` ${loading ? 'spinner':'otp-submit-btn'}`} disabled={!isOtpComplete}>
                    {loading ? <ButtonLoading /> : <p>Submit</p>}
                </button>
            </form>
        </div>,
        document.getElementById('modal')
    );
}

export default UpdatePasswordModal ;