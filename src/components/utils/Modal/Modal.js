import React from 'react';

import { Modal, Fade, Backdrop } from '@material-ui/core';
import './modal.css'


const UtilModal = ({ state, text, type }) => {


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={state}
                className="modal"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={state}>
                    <div>
                        <div className="nofication">
                            {
                                type ?
                                    <>
                                        <i className="success-icon far fa-check-circle"></i>
                                        <span className="success">{text}!</span>
                                    </>
                                    :
                                    <>
                                        <i className="delete-icon fas fa-trash-alt"></i>
                                        <span className="delete">{text}!</span>
                                    </>

                            }
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
export default UtilModal
