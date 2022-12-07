import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../services/UserServices';

const ModalEditUser = (props) => {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job)
        console.log('Checking res handleEditUser', res);
        handleEditUserFromModal({
            first_name: name,
            id: dataUserEdit.id
        })

        handleClose()

    };
    useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name);

        }
    }, [dataUserEdit]);

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
                    <Modal.Title>Modal Edit User</Modal.Title>
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
                    <Button variant="primary" onClick={handleEditUser}>
                        Save Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalEditUser;
