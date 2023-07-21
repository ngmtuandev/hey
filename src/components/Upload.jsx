import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Upload = () => {
  const {token, newUser} = useSelector(state => state.user)
  const [photoPost, setPhotoPost] = useState([])
  const [stateUpload, setStateUpload] = useState({})

  const navigate = useNavigate()

  const handleSetState = (e) => {
    setStateUpload(prev => { return {...prev, [e.target.name] : e.target.value}})
  }

  const handleSubmitUpload = async (e) => {
    e.preventDefault()

    if (photoPost && photoPost.name) {
      const formData = new FormData()
      // console.log('photoPost.name: ',photoPost)
      const filename = Date.now() + photoPost.name
      formData.append("filename", filename)
      formData.append("file", photoPost)

      await fetch('http://localhost:8080/dang-tai-anh/', {
        headers: {
          "authorization" : `Bearer ${token}`
        },
        method: 'POST',
        body: formData
      })

      const resDataApi = await fetch('http://localhost:8080/bai-dang/tao-bai-dang', {
        headers: {
          "Content-Type": "application/json",
          "authorization" : `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({...stateUpload, photo: filename})
      })

      const dataApi = await resDataApi.json()
      console.log('upload', dataApi)
      navigate('/')
    }
    
  }

  return (
    <div>
      <div>
        <h3>Cập Nhập Trạng Thái</h3>
        <form onSubmit={handleSubmitUpload}>
          <input type="text" name='title' onChange={handleSetState}/>
          <input type='text' name='content' onChange={handleSetState}></input>
          <input type="file" name='photo' onChange={(e) => setPhotoPost(e.target.files[0])} />
          <input type="text" name='location' onChange={handleSetState} />
          <button>Đăng</button>
        </form>
      </div>
    </div>
  )
}

export default Upload