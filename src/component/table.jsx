import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import tempImage from "../component/img.png"
import { NavLink } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/index.css";
import Add from '../component/add';
import { BASE_URL } from '../services/helper';
const Tab = () => {
  const [userData, setUserData] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/crud/read`);
      setUserData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/crud/delete/${id}`);
      fetchAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // const getImg = (imagePath) => {
  //   return `${BASE_URL}/uploads/${imagePath || 'default.jpg'}`; 
  // };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="cont">
      <Add fetchAllUsers={fetchAllUsers} />

      <Table responsive bordered size='md' className='table'>
        <thead>
          <tr className='table_row'>
            <th>Sr No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {userData.map((item, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{item?.name}</td>
    <td>{item?.email}</td>
    <td>{item?.age}</td>
    <td>
      {item.imagePath && (
        <img
          src={tempImage}
          alt={tempImage}
          style={{ maxWidth: '100px' }}
        />
      )}
    </td>
    <td>
      <div className="button-div d-flex m-2 justify-content-center">
        <NavLink className="link fw-bold font-medium m-2" to={`/update/${item._id}`}>Edit</NavLink>
        <button className="link fw-bold font-medium m-2" onClick={() => handleDelete(item._id)}>Delete</button>
      </div>
    </td>
  </tr>
))}

        </tbody>
      </Table>
    </div>
  );
};

export default Tab;
