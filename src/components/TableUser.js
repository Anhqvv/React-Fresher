import { useEffect, useState } from 'react';
import { Table, Container, ListGroupItem } from 'react-bootstrap';
import { fetchAllUser } from '../services/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash';

const TableUser = (props) => {
    //Modal
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const handleClose = () => {
        setIsShowModal(false);
        setIsShowModalEdit(false);
    };

    const [listUser, setListUser] = useState([]);
    const [page, setPage] = useState('1');
    const [perPage, setPerPage] = useState('');
    // const [totalUsers, setTotalUsers] = useState('')
    const [totalPages, setTotalPages] = useState('');

    useEffect(() => {
        //Call API
        getUsers(page);
    }, []);

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setListUser(res.data);
            setPage(res.page);
            setPerPage(res.per_page);
            // setTotalUsers(res.total)
            setTotalPages(res.total_pages);
            console.log('Checking res', res);
        }
    };

    const handlePageClick = (event) => {
        getUsers(event.selected + 1);
        // console.log('handlePageClick',event.selected + 1 )
    };

    const handleUpdateUser = (user) => {
        setListUser([user, ...listUser]);
    };

    const handleEditUser = (user) => {
        setIsShowModalEdit(true);
        setDataUserEdit(user);
    };

    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser)
        let index = listUser.findIndex((item) => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        // console.log('Checking list:', listUser, cloneListUser);
        setListUser(cloneListUser)
    };

    return (
        <>
            <Container>
                <div className="my-3 add-new">
                    <h3>List Users</h3>
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsShowModal(true)}
                    >
                        Add new user
                    </button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser &&
                            listUser.length > 0 &&
                            listUser.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td className="btn-action">
                                            <button
                                                className="btn btn-warning"
                                                onClick={() =>
                                                    handleEditUser(item)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button className="btn btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        <tr></tr>
                    </tbody>
                </Table>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={perPage}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    //css paginate
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </Container>
            <ModalAddNew
                show={isShowModal}
                handleClose={handleClose}
                handleUpdateUser={handleUpdateUser}
            />
            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
        </>
    );
};

export default TableUser;
