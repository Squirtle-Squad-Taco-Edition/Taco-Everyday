/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState, useRef, type ReactElement, useEffect } from 'react'
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
// import CustomScroller from 'react-custom-scroller'
import { type TacoObj } from '../../types/types'
import { GlobalContext } from './Context'
import Navbar from './Navbar'

const tempArr = ['i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos', 'i love tacos']
function Group (): ReactElement {
  const [message, setMessage] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [taco, setTaco] = useState<TacoObj>()
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
  async function getTaco (): Promise<void> {
    try {
      const result = await fetch('api/taco/new/3') // TODO dynamically pull group id
      const data = await result.json()
      setTaco(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (taco === undefined) void getTaco()
  }, [])
  useEffect(() => {
    const arr: string[] = [...msgArr]
    if (message !== '' || newMessage !== '') arr.push(newMessage)
    setMsgArr(arr)
    // console.log(newMessage)
  }, [newMessage])
  useEffect(() => {
    scrollToBottom()
  }, [msgArr])
  // ${Math.round(taco.totalNutrients[nutrient].quantity)}${taco.totalNutrients[nutrient].unit}
  return (
    <>
      <Navbar />
      {taco !== undefined &&
      (
      <div className="tacoBox">
        <h3>{taco.label}</h3>
        <img className="logo" src={taco.imageurl} alt="main dish" />
        <div className="desc" style={{ fontSize: 'small' }}>{taco.description}</div>
        <div className="infoBox">
          <div className="infoSmall">
            <a className="recipeLink" href={taco.url}>Recipe Post</a>
            <p style={{ fontSize: 'small' }}>{`Servings: ${taco.servings}`}</p>
            <p style={{ fontSize: 'small' }}>{`Time to Cook: ${taco.totalTime} minutes`}</p>
          </div>
          <div className="infoSmall">
            <p style={{ fontSize: 'small' }}>{`Calories: ${Math.round(taco.calories)}`}</p>
            {Object.entries(taco.totalNutrients).map(([nutrient, obj]): ReactElement => (
              <p key={uuidv4()} style={{ fontSize: 'small' }}>{`${nutrient}: ${Math.round(obj.quantity)}${obj.unit}`}</p>
            ))}
          </div>
        </div>
      </div>
      )}
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
