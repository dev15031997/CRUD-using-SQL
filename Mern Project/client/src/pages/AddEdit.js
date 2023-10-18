import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './AddEdit.css'
import axios from 'axios'
import { toast } from 'react-toastify';

const AddEdit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: ''
  })

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((response) => setUser({ ...response.data[0] }))
  }, [id])


  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser(() => {
      return {
        ...user,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.contact) {
      toast.error('Please Fill all the Input Fields')
    }
    else {
      if (!id) {
        axios.post('http://localhost:5000/api/post', {
          name: user.name,
          email: user.email,
          contact: user.contact
        }).then(() => {
          setUser({
            name: '',
            email: '',
            contact: ''
          })
        }).catch((err) => {
          toast.error(err.response.data)
        })

        toast.success('User Added Successfully')
      }
      else{
        axios.put(`http://localhost:5000/api/update/${id}`, {
        name: user.name,
        email: user.email,
        contact: user.contact
      }).then(() => {
        setUser({
          name: '',
          email: '',
          contact: ''
        })
      }).catch((err) => {
        toast.error(err.response.data)
      })

      toast.success('User Updated Successfully')
      }


      setTimeout(() => {
        navigate('/')
      }, 500);
    }
  }

  return (
    <div style={{ marginTop: '100px' }}>

      <form style={{ margin: 'auto', padding: '15px', maxWidth: '400px', alignContent: 'center' }} onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' placeholder='Enter your Name' value={user.name || ""} onChange={handleInput} />
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' placeholder='Enter your Email' value={user.email || ""} onChange={handleInput} />
        <label htmlFor='contact'>Contact</label>
        <input type='number' id='contact' name='contact' placeholder='Enter your Contact' value={user.contact || ""} onChange={handleInput} />

        <input type="submit" value={id ? 'Update' : 'Save'} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  )
}

export default AddEdit