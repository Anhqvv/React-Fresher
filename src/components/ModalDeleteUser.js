import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUserAPI } from '../services/UserServices';

const ModalDeleteUser = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } =
        props;
    const handleDeleteUser = async () => {
        let res = await deleteUserAPI(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success('Delete user is succeed');
            handleDeleteUserFromModal(dataUserDelete);
        }
        // console.log('handleDeleteUser',res);

        handleClose();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete this user?
                    <br />
                    <b>Email = {dataUserDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteUser;
