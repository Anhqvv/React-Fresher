import axios from "./Axios"
const fetchAllUser = (pageData) => {
    console.log('pageData', pageData)
    return (
        axios.get(`/api/users?page=${pageData}`)

    )
}

export {fetchAllUser}

