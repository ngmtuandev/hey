import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import CollectionChat from './CollectionChat'
import ChatBox from './ChatBox'

const Conversation = () => {

    const {newUser} = useSelector(state => state.user)
    // console.log(newUser?._id) 
    const [chatBox, setChatBox] = useState(null)
    const [chats, setChats] = useState([])
    // console.log(chatBox)

    useEffect(() => {
        const getChatApi = async () => {
            const dataChat = await fetch(`http://localhost:8080/tro-chuyen/${newUser?._id}`,{
                headers: {'Content-Type': 'application/json'},
                method: 'GET',
            })
            const data = await dataChat.json()
            // console.log(data)
            setChats(data)
        }
        getChatApi()
    }, [])

    // console.log('setChat: ', chats)

  return (
    <div className='flex p-5'>
        <div className='w-[30%]'>
            <div>
                <h3 className='my-6'>Chat Conservation</h3>
                {
                    chats?.userChat?.length > 0 && chats?.userChat?.map((chat, index) => (
                        <div key={index} onClick={() => setChatBox(chat)}>
                            <CollectionChat chat={chat} userCurrent= {newUser?._id}></CollectionChat>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='w-[40%]'>
            <ChatBox chat={chatBox} userCurrent = {newUser?._id}></ChatBox>
        </div>
        <div className='w-[30%]'>
            Right
        </div>
    </div>
  )
}

export default Conversation