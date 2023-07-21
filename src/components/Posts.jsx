import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Post} from '../components/index'
const Posts = () => {

  const {token} = useSelector(state => state.user)
  const [listPost, setListPost] = useState([])

  useEffect(() => {
    const dataPost = async () => {
      const dataApiPost = await fetch('http://localhost:8080/bai-dang/', {
        headers: {
          "authorization": `Bearer ${token}`
        },
        method: 'GET'
      })
      const data = await dataApiPost.json()
      // console.log('dataaaaa: ', data)
      setListPost(data?.dataTimeLinePost)
    }
    dataPost()
  }, []) 

  // console.log('data post', listPost)

  return (
    <div>
      {
        listPost?.map((data, index) => (
          <div key={index}>
            <Post post = {data}></Post>
          </div>
        ))
      }
    </div>
  )
}

export default Posts