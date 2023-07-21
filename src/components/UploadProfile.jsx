import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
const UploadProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {token, newUser} = useSelector(state => state.user)

    const [photo, setPhoto] = useState([])
    const [dataUpdate, setDataUpdate] = useState({})

    const handleSetValueUpdate = (e) => {
        setDataUpdate(data => {return  {...data, [e.target.name] : e.target.value}})
    }

    // console.log('test tokenn' , token)
    // console.log('test id user', newUser?._id)

    // console.log(dataUpdate)

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        if (photo && setPhoto.name) {
            const formData = new FormData()
      // console.log('photoPost.name: ',photoPost)
            const filename = Date.now() + photo.name
            formData.append("filename", filename)
            formData.append("file", photo)
            await fetch('http://localhost:8080/dang-tai-anh/', {
                headers: {
                  "authorization" : `Bearer ${token}`
                },
                method: 'POST',
                body: formData
              })

                const dataUpdateUser = await fetch(`http://localhost:8080/nguoidung/cap-nhap-thong-tin/${newUser?._id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`,                        
                    },
                    method: 'PUT',
                    body: JSON.stringify(
                        {
                            ...dataUpdate,
                            profileimg: filename
                        }
                    )
                })
                const dataUserNew = await dataUpdateUser.json()
                // console.log('dataUserNew', dataUserNew)
                dispatch(updateUser(dataUserNew?.data))     
                navigate('/')       
        }

        else {
            const dataUpdateUser = await fetch(`http://localhost:8080/nguoidung/cap-nhap-thong-tin/${newUser?._id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`,                        
                    },
                    method: 'PUT',
                    body: JSON.stringify(
                        {
                            dataUpdate,
                        }
                    )
                })
                const dataUserNew = await dataUpdateUser.json()
                console.log(dataUserNew)
                dispatch(updateUser(dataUserNew?.data))     
                navigate('/')       
        }
     
    }

  return (
    <div>
        <div className='flex flex-col justify-center items-center'>
            <h3>Cập nhập thông tin của bạn</h3>
            <form onSubmit={handleUpdateUser} className='flex flex-col items-center justify-center'>
                <input onChange={handleSetValueUpdate} className='outline-none flex items-center my-5 w-[300px]' 
                type='text' name='email' placeholder='nhập email của bạn'></input>
                <input onChange={handleSetValueUpdate} className='outline-none flex items-center my-5 w-[300px]' 
                type='text' name='username' placeholder='nhập tên của bạn'></input>
                <input onChange={handleSetValueUpdate} className='outline-none flex items-center my-5 w-[300px]' 
                type='password' name='password' placeholder='nhập mật khẩu'></input>
                <input onChange={handleSetValueUpdate} className='outline-none flex items-center my-5 w-[300px]' 
                type='text' name='info' placeholder='thông tin của bạn'></input>
                <div>
                    <label htmlFor="profileimg">Cập nhập ảnh</label>
                    <input className='hidden' onChange={(e) => setPhoto(e.target.files[0])}
                     type="file" id='profileimg' placeholder='ảnh đại diện' />
                </div>
                <button>Cập nhập thông tin</button>
            </form>
        </div>
    </div>
  )
}

export default UploadProfile