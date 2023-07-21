import React from 'react'
import {Posts, ProfileCard, RightSide, ProposeUser} from '../components/index'
import {useSelector} from 'react-redux'
const Home = () => {

  const {token, newUser} = useSelector(state => state.user)

  console.log(newUser)
  // console.log('token', token)
  // console.log('newUser', newUser)
  return (
    <div className='bg-blue-100 bg-opacity-50 px-5 py-6'>
      <div className='flex'>
        <div className='w-[30%]'>
          <div><ProfileCard></ProfileCard></div>
          <div><ProposeUser></ProposeUser></div>
        </div>
        <div className='w-[40%]'><Posts></Posts></div>
        <div className='w-[30%]'><RightSide></RightSide></div>
      </div>
    </div>
  )
}

export default Home