import axios from './Axios';

const fetchAllUser = (pageData) => {
    return axios.get(`/api/users?page=${pageData}`);
};

const postCreateUser = (name, job) => {
    return axios.post('/api/users', { name, job });
};

const putUpdateUser = (name, job) => {
    return axios.put('/api/users/', { name, job });
};

const deleteUserAPI = (id) => {
    return axios.delete(`/api/users/${id}`);
};
export { fetchAllUser, postCreateUser, putUpdateUser, deleteUserAPI };
