import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { RxCross1 } from "react-icons/rx";
import './SignupModal.css'; // Link to your CSS file

function SignupModal({ signupModal, setSignupModal }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    if (!signupModal) return null;

    const signupModalCloseHandler = () => {
        setSignupModal(false);
    };

    const isFormValid = name && email && password && confirmPassword && (password === confirmPassword);

    return ReactDOM.createPortal(
        <div className="signup-modal-overlay">
            <div className="signup-modal-container">
                <button className="close-btn" onClick={signupModalCloseHandler}>
                    <RxCross1 />
                </button>
                <h2 className="signup-title">Create your account</h2>

                <div className="signup-form">
                    <div className="input-group">
                        <input
                            type="text"
                            className="signup-input"
                            placeholder="Name"
                            maxLength="50"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <span className="char-counter">{name.length} / 50</span>
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            className="signup-input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            className="signup-input"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            className="signup-input"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="signup-next-btn"
                        disabled={!isFormValid}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
}

export default SignupModal;
