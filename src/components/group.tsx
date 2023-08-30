/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useContext,
  useState,
  useRef,
  type ReactElement,
  useEffect,
} from 'react'
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
// import CustomScroller from 'react-custom-scroller'
import { type TacoObj } from '../../types/types'
import { GlobalContext } from './Context'
import Navbar from './Navbar'
// import * as defaultTaco from '../../taco.json'

const tempArr = [
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
  'i love tacos',
]
// TODO: store groupId as context?
const groupId = 3
const posterId = 1

function Group(): ReactElement {
  const [message, setMessage] = useState<string>('')
  const [newMessage, setNewMessage] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [newImg, setNewImg] = useState<boolean>(false)
  const [taco, setTaco] = useState<TacoObj>()
  const [msgArr, setMsgArr] = useState<string[]>(tempArr)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const socket = io('http://127.0.0.1:3030', { transports: ['websocket'] })
  const { currentGroup, globalButton, setGlobalButton } =
    useContext(GlobalContext)
  // & pull messages from global state
  socket.on('chat message', msg => {
    setNewMessage(msg)
  })
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {}, [])

  async function getTaco(): Promise<void> {
    try {
      const result = await fetch('api/taco/new/3') // TODO dynamically pull group id
      const data = await result.json()
      // const data = defaultTaco
      setTaco(data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getURL(): Promise<void> {
    try {
      let img
      const localImg = localStorage.getItem('imageURL')
      if (localImg !== null) img = await JSON.parse(localImg)
      if (url !== '' && url !== img) {
        socket.emit('chat message', img)
      }
      setUrl(img)
      setNewImg(false)
    } catch (error) {
      console.log(error)
    }
  }
  async function getMessages(): Promise<void> {
    try {
      // TODO: insert groupId into fetch param
      const response = await fetch(`/api/group/messages/${groupId}`)
      const data: string[] = await response.json()
      setMsgArr(data)
    } catch (err) {
      console.log(err)
    }
  }

  async function postMessage(): Promise<void> {
    try {
      await fetch('/api/group/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // TODO: hard coded posterId & groupId
        body: JSON.stringify({ posterId, groupId, message }),
      })
    } catch (err) {
      console.log(err)
    }
  }

  function fixButton(): void {
    const button =
      globalButton ??
      document.getElementById('upload_widget') ??
      document.createElement('button')
    button.removeAttribute('style')
    button.setAttribute('class', 'widget')
    button.addEventListener('click', () => {
      setTimeout(() => {
        setNewImg(true)
      }, 10000)
    })
    if (globalButton === undefined && setGlobalButton !== undefined)
      setGlobalButton(button)
    const buttonDiv = document.getElementById('buttonDiv')
    buttonDiv?.appendChild(button)
  }
  useEffect(() => {
    if (taco === undefined) void getTaco()
    fixButton()
    void getMessages()
  }, [])
  useEffect(() => {
    const arr: string[] = [...msgArr]
    if (message !== '' || newMessage !== '') arr.push(newMessage)
    setMsgArr(arr)
    void getURL()
  }, [newMessage, newImg])
  useEffect(() => {
    scrollToBottom()
  }, [msgArr])
  return (
    <>
      <Navbar />
      {taco !== undefined && (
        <div className="tacoBox">
          <h3 style={{ textAlign: 'center' }}>{taco.label}</h3>
          <img className="logo" src={taco.imageurl} alt="main dish" />
          <div
            style={{
              fontSize: 'small',
              padding: '10px',
            }}>{`Taco Description: ${taco.description}`}</div>
          <div className="infoBox">
            <div className="infoSmall">
              <p
                style={{ fontSize: 'small' }}>{`Servings: ${taco.servings}`}</p>
              <p
                style={{
                  fontSize: 'small',
                }}>{`Time to Cook: ${taco.totalTime} minutes`}</p>
              <p style={{ fontSize: 'small' }}>
                Check out the recipe{' '}
                <a
                  style={{ textDecoration: 'underline' }}
                  className="recipeLink"
                  href={taco.url}
                  target="_blank"
                  rel="noreferrer">
                  here
                </a>
              </p>
            </div>
            <div className="infoSmall">
              <p style={{ fontSize: 'small' }}>{`Calories: ${Math.round(
                taco.calories,
              )}`}</p>
              {Object.entries(taco.totalNutrients).map(
                ([nutrient, obj]): ReactElement => (
                  <p
                    key={uuidv4()}
                    style={{ fontSize: 'small' }}>{`${nutrient}: ${Math.round(
                    obj.quantity,
                  )}${obj.unit}`}</p>
                ),
              )}
            </div>
          </div>
        </div>
      )}
      <div className="groupBox">
        <h3 style={{ textAlign: 'center' }}>
          Taco bout it <br />
          {localStorage.getItem('currGroup') ?? currentGroup}
        </h3>
        <div className="messageBox">
          {msgArr.map(
            (msg: string): ReactElement => (
              <div className="msg" key={uuidv4()}>
                {msg.substring(0, 5) === 'https' ? (
                  <img className="logo" src={msg} alt="msgImg" />
                ) : (
                  msg
                )}
              </div>
            ),
          )}
          <div ref={messagesEndRef} />
        </div>
        <div id="buttonDiv">
          <input
            style={{ width: '80%', borderRadius: '5px', border: 'none' }}
            type="text"
            value={message}
            onChange={e => {
              setMessage(e.currentTarget.value)
            }}
          />
          <button
            style={{ border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            aria-label="Send Message"
            type="submit"
            onClick={() => {
              socket.emit('chat message', message)
              void postMessage()
            }}>
            Submit
          </button>
        </div>
      </div>
    </>
  )
}
export default Group
