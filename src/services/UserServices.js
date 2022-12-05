import axios from './Axios';
const fetchAllUser = (pageData) => {
    return axios.get(`/api/users?page=${pageData}`);
};

const postCreateUser = (name, job) => {
    return (
        axios.post("/api/users", {name , job})
    )

}
export { fetchAllUser, postCreateUser };
