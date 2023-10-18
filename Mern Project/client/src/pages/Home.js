import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {
    const [data, setdata] = useState([])

    const loadInfo = async () => {
        const response = await axios.get("http://localhost:5000/api/get")
        setdata(response.data);
    }

    const deleteContact=(id)=>{
        if(window.confirm('Are you sure you want to Delete the User?'))
        {
            axios.delete(`http://localhost:5000/api/remove/${id}`)
            toast.success('User Deleted Successfully')
            setTimeout(() => {
                loadInfo(); 
            },500 );
        }
    }

    useEffect(() => {
        loadInfo();
    }, [])

    return (
        <div style={{ marginTop: '200px' }}>
            <Link to='/addContact' >
                <button className="btn btn-contact">Add Contact</button>
            </Link>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>No.</th>
                        <th style={{ textAlign: 'center' }}>Name</th>
                        <th style={{ textAlign: 'center' }}>Email</th>
                        <th style={{ textAlign: 'center' }}>Contact</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>

                                    <button className='btn btn-delete' onClick={()=>deleteContact(item.id)}>Delete</button>

                                    <Link to={`/view/${item.id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default Home