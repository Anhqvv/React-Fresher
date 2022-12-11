import { useEffect, useState } from 'react';
import { Table, Container, ListGroupItem } from 'react-bootstrap';
import { fetchAllUser } from '../services/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import _ from 'lodash';

const TableUser = (props) => {
    //Modal
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const handleClose = () => {
        setIsShowModal(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    };

    const [listUser, setListUser] = useState([]);
    const [page, setPage] = useState('1');
    const [perPage, setPerPage] = useState('');
    // const [totalUsers, setTotalUsers] = useState('')
    const [totalPages, setTotalPages] = useState('');

    //DeleteUser
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    //filter sort
    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setsortField] = useState('id');
    const [keyWord, setKeyWord] = useState();

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
        let cloneListUser = _.cloneDeep(listUser);
        let index = listUser.findIndex((item) => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        // console.log('Checking list:', listUser, cloneListUser);
        setListUser(cloneListUser);
    };
    const handleDeleteUser = (user) => {
        console.log('User', user);
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    };
    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
        setListUser(cloneListUser);
    };

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setsortField(sortField);
        let cloneListUser = _.cloneDeep(listUser);

        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);
    };

    const handleSearch =_.debounce( (event) => {
        let term = event.target.value;
        console.log('Checking term',term);
        if (term) {
            let cloneListUser = _.cloneDeep(listUser);
            cloneListUser = cloneListUser.filter( (item) => item.email.includes(term)) 
            setListUser(cloneListUser)
        } else {
            getUsers()
        }
    },500)
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
                <div className="col-4 my-3">
                    <input
                        className="form-control"
                        placeholder="Search user by email ..."
                        onChange={(event) => handleSearch(event)}
                    />
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className="header-sort">
                                    <span>ID</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-down-long"
                                            onClick={() =>
                                                handleSort('asc', 'id')
                                            }
                                        ></i>
                                        <i
                                            className="fa-solid fa-up-long"
                                            onClick={() =>
                                                handleSort('desc', 'id')
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </th>
                            <th>Email</th>
                            <th>
                                <div className="header-sort">
                                    <span>First Name</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-down-long"
                                            onClick={() =>
                                                handleSort('asc', 'first_name')
                                            }
                                        ></i>
                                        <i
                                            className="fa-solid fa-up-long"
                                            onClick={() =>
                                                handleSort('desc', 'first_name')
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </th>
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
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDeleteUser(item)
                                                }
                                            >
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
            <ModalDeleteUser
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    );
};

export default TableUser;
