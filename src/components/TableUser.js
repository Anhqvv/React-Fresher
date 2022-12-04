

import { useEffect, useState } from 'react';
import {Table, Container}  from 'react-bootstrap'
import { fetchAllUser } from '../services/UserServices';



const TableUser = (props) => {
   const [listUser, setListUser] = useState([])

   useEffect( () => {
      //Call API
      getUsers()

   },[])

   const getUsers = async () => {
      let res = await fetchAllUser()
      if(res && res.data && res.data.data) {
         setListUser(res.data.data)

      
      }
   }
   console.log("Checking res data", listUser)

   return <>
   <Container>
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
         {listUser && listUser.length > 0  &&
         listUser.map( (item, index) => {
            return (
               <tr key={item.id}>
               <td>{item.id}</td>
               <td>{item.email}</td>
               <td>{item.first_name}</td>
               <td>{item.last_name}</td>         
               </tr>
            )

         })
         }
        <tr>
        </tr>
      </tbody>
    </Table>
    </Container>
   
   </>
}

export default TableUser;
