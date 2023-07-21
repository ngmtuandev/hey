import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { follow } from '../redux/authSlice'
const ProposeUser = () => {

  const dispatch = useDispatch()

  const [proposeUser, setProposeUser] = useState([])

  const {token, newUser} = useSelector(state => state.user)
  // console.log(newUser)
  // console.log(token)

  useEffect(() => {
    const dataApiPropose = async () => {
      const dataApi = await fetch('http://localhost:8080/nguoidung/nguoi-dung-de-xuat', {
        headers: {"authorization": `Bearer ${token}`},
        method: 'GET',
      })

      const dataProposeUser = await dataApi.json()
      setProposeUser(dataProposeUser.data)
      // console.log(dataProposeUser)
    }
   dataApiPropose()

  }, [])

  // console.log(proposeUser.data)

  const hanldeFollowProposeUser = async (id) => {
    await fetch(`http://localhost:8080/nguoidung/theo-doi/${id}`,
    {headers: {
      "authorization" : `Bearer ${token}`
    },
    method: 'PUT',
    }
    )
    setProposeUser((pre) => {
      return [...pre].filter((user) => user?._id !== id)
    })

    dispatch(follow(id))
    window.location.reload()

  }


  return (
    <div>
      <div>
        {
          proposeUser?.length > 0 ? (
            <div>
            {
              proposeUser?.map((user, index) => (
                <div key={index}>
                  <Link className='flex items-center mt-5' 
                  to={`/profile-detail/${user?._id}`}>
                    <div>
                      <img className='w-[70px] rounded-full mr-4'
                      src={user?.profileimg ? `http://localhost:8080/images/${user?.profileimg}` 
                      : 'https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png'} alt=''></img>
                    </div>
                    <div>
                      <p>{user?.username}</p>
                      <p>Đề xuất cho bạn</p>
                    </div>
                  </Link>
                  
                  <div><button className='my-3'
                  onClick={() => hanldeFollowProposeUser(user?._id)}>Theo dõi ngay</button></div>
                </div>
              ))
            }
          </div>
          ) : (
            <h2>Bạn không có người dùng đề xuất nào</h2>
          )
        }
      </div>
    </div>
  )
}

export default ProposeUser