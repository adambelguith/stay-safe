import React, { Component } from 'react';
import "./Modal.css";

class Dialog extends Component {
   
    render() {
        const handledelete =this.props.delete
        let dialog = (
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button onClick={this.props.onClose}>x</button>
                    </div>
                    <div className="title">
                        <h1>Are You Sure You Want to delete this user?</h1>
                    </div>
                    <div className="footer">
                        <button
                            onClick={this.props.onClose}
                            id="cancelBtn"
                        >Cancel
                        </button>
                        <button onClick={()=>handledelete(this.props.id)}>Continue</button>
                    </div>
                </div>
            </div>
        );

        if (!this.props.isOpen) {
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>
        );
    }
}

export default Dialog;
