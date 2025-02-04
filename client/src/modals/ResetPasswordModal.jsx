import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";

import ButtonLoading from "../components/Button/ButtonLoading";
import { resetPassword } from "../services/operations/authApi";

function ResetPasswordModal({
  setEmail,
  resetModal,
  setResetModal,
  setUpdatePasswordModal,
}) {
  // useDispatch
  const dispatch = useDispatch();

  // useState
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState({
    email: "",
  });

  const isFormValid = userEmail ? true : false;

  if (!resetModal) return null;

  const resetPasswordCloseHandler = () => {
    setResetModal(false);
  };

  const resetPasswordChangeHandler = (e) => {
    setUserEmail({ email: e.target.value });
  };

  // handling form event
  const resetPasswordSubmitHandler = (e) => {
    e.preventDefault();

    // to uplift the state to the auth so that can be used while updating
    const { email } = userEmail;
    console.log("reset", email);
    setEmail(email);

    // calling utlity function to call reset api
    dispatch(resetPassword(userEmail, setResetModal, setUpdatePasswordModal));
    setUserEmail({
      email: "",
    });
  };

  return ReactDOM.createPortal(
    <div className="reset-modal-overlay">
      <div className="reset-modal-container">
        <button className="close-btn" onClick={resetPasswordCloseHandler}>
          <RxCross1 />
        </button>

        <h2 className="reset-title">Reset Password</h2>

        <form className="reset-form" onSubmit={resetPasswordSubmitHandler}>
          <div className="input-group">
            <input
              type="email"
              className="reset-input"
              placeholder="email"
              maxLength="50"
              value={userEmail.email}
              name="email"
              onChange={resetPasswordChangeHandler}
            />
          </div>

          <button className="reset-next-btn" disabled={!isFormValid}>
            {loading ? <ButtonLoading /> : <p>Submit</p>}
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default ResetPasswordModal;
