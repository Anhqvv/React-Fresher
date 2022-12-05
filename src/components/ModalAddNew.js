import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserServices';
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const { show, handleClose, handleUpdateUser } = props;
    const handleClickConfirm = async () => {
        const res = await postCreateUser(name, job);
        // console.log('Checking res postCreateUser: ', res);
        if (res && res.id) {
            handleClose();
            setName('');
            setJob('');
            toast.success('Congratulation!!!');
            handleUpdateUser({
                id: res.id,
                first_name: name,
            });
        }
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
                    <Modal.Title>Modal Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                value={name}
                                type="text"
                                className="form-control"
                                placeholder="Enter your name..."
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Job</label>
                            <input
                                value={job}
                                type="text"
                                className="form-control"
                                placeholder="Enter your job..."
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClickConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalAddNew;
