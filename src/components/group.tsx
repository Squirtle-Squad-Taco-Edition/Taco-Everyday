/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState, useRef, type ReactElement, useEffect } from 'react'
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import CustomScroller from 'react-custom-scroller'
import { GlobalContext } from './Context'
import Navbar from './Navbar'

const tempArr = ['i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos']
function Group (): ReactElement {
  const [message, setMessage] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [msgArr, setMsgArr] = useState<string[]>(tempArr)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const socket = io('http://127.0.0.1:3030', { transports: ['websocket'] })
  const { currentGroup } = useContext(GlobalContext)
  // & pull messages from global state
  socket.on('chat message', (msg) => {
    setNewMessage(msg)
  })
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  useEffect(() => {
    const arr: string[] = [...msgArr]
    if (message !== '' || newMessage !== '') arr.push(newMessage)
    setMsgArr(arr)
    // console.log(newMessage)
  }, [newMessage])
  useEffect(() => {
    scrollToBottom()
  }, [msgArr])
  return (
    <>
      <Navbar />
      <div className="groupBox">
        <h3>
          Taco bout it
        </h3>
        {localStorage.getItem('currGroup') ?? currentGroup}
        <div className="messageBox">
          {msgArr.map((msg: string): ReactElement => (
            <div className="msg" key={uuidv4()}>
              {msg}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <input type="text" value={message} onChange={(e) => { setMessage(e.currentTarget.value) }} />
        <button aria-label="Send Message" type="submit" onClick={() => { socket.emit('chat message', message) }}>
          Submit
        </button>
      </div>
    </>
  )
}
export default Group
