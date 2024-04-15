import React from "react";
import "./modal.css";

const Modal = ({ trigger, setTrigger, content }) => {
  return trigger ? (
    <div className="modal">
      <div className="modal-inner">
        <p> {content} </p>
        <button onClick={() => setTrigger({ isOpen: false })} className="close-btn">
          <i className="fa-regular fa-circle-xmark fa-lg"></i>
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
