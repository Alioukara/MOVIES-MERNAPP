import React, { useEffect, useRef, useState, useCallback } from "react"
import io from "socket.io-client"
import Cookies from 'universal-cookie';
import { Form, InputGroup, Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import '../styles/forum.css'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import AcessDenied from './modals/acessDenied'

const cookies = new Cookies();


function Forum({ id }) {


  const currentTime = new Date();
  const [messageDate, setMessageDate] = useState("")
  const username = cookies.get("username")
  const logged = cookies.get("accesstoken")

  const [state, setState] = useState({ message: "", name: cookies.get("username"), userId: cookies.get("userID") })
  const [urlAudio, setUrlAudio] = useState('')
  const [chat, setChat] = useState([])
  const [allmessages, setAllmessages] = useState()
  const [connectionCounter, setConnectionCounter] = useState()
  const messagesEndRef = useRef()
  const socketRef = useRef()
  
  const [showPicker, setShowPicker] = useState(false);
  const [recorder, setRecorder] = useState(false);
  const [recorderData, setRecorderData] = useState({
    audioDetails: {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    }
  })
  const handleAudioStop = (data) => {

    setUrlAudio(data.url)

    setRecorderData({ audioDetails: data });

  }
  const handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    };
    setRecorderData({ audioDetails: reset });
  }
  useEffect(
    () => {

      axios.get("http://localhost:5000/conversations/allmessages").then(res => {

        setAllmessages(res.data)

      })
        .catch((err) => {
          console.log(err)
        });

    }, [])

  useEffect(
    () => {

      socketRef.current = io.connect("http://localhost:5000", { query: { id } })
      socketRef.current.on("message", ({ name, message, userId }) => {
        setMessageDate(`${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours() + ":" + currentTime.getMinutes()}`)
        setChat([...chat, { name, message, userId, messageDate }])
      })
      socketRef.current.on("audio", ({ name, message, userId, url }) => {


        setMessageDate(`${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours() + ":" + currentTime.getMinutes()}`)
        setChat([...chat, { name, message, userId, messageDate, url }])
      })

      return () => socketRef.current.disconnect()
    },
    [chat, id]

  )

  const onTextChange = (e) => {

    setState({ ...state, [e.target.name]: e.target.value })

  }
  const addEmoji = e => {
    let emoji = e.native;
    setState({ ...state, message: state.message + emoji })
    setShowPicker(false)
  };
  useEffect(() => {
    (async function callScrollfunction() {
      await ScrollToBottom(messagesEndRef);
    })();
  }, [chat, allmessages]);

  const ScrollToBottom = (ref) => {
    ref.current.scrollIntoView({})
  }

  useEffect(
    () => {

      socketRef.current.emit('connections-counter', function (cb) {
        setConnectionCounter(cb)
      })

    }, [chat])


  const onMessageSubmit = (e) => {
    const { name, message, userId } = state
    socketRef.current.emit("message", { name, message, userId })
    e.preventDefault()
    setState({ message: "", name, userId })
  }
  const onAudioMessageSubmit = (e) => {
    const { name, message, userId } = state

    if (recorderData.audioDetails.url != null) socketRef.current.emit("audio", { name, message, userId, recorderData })

    e.preventDefault()
    setRecorder(false)

  }
  const renderChat = () => {

    return chat.map(({ name, message, url }, index) => (

      <div className="flex-grow-1" >

        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          <div key={index} className={`my-1 d-flex flex-column ${name === username ? 'align-self-end align-items-end' : 'align-items-start'}`} >
            {message &&
              <div className="talk-bubble">
                <p className={`${name === username ? ' tri-right right-in talktext from-me' : 'talktext tri-right left-in from-them'}`} ref={messagesEndRef}>{message}</p>
              </div>

            }

            {url &&
              <div className="talk-bubble">
                <audio className={`${name === username ? ' tri-right right-in talktext from-me' : 'talktext tri-right left-in from-them'}`} ref={messagesEndRef} src={`${url}`} controls />
              </div>
            }
            <div className={` {text-muted small ${name === username ? 'text-right' : ''}  my-1 d-flex flex-column ${name === username ? 'align-self-end align-items-end' : 'align-items-start'}`}>
              <p>{name === username ? 'you' : name} {messageDate} </p>
            </div>
          </div>
        </div>

      </div>
    ))

  }


  const disconnect = () => {
    socketRef.current.emit('disconnect')
  }
  window.onbeforeunload = function () {
    disconnect();
    localStorage.setItem('socketio', 'disconnected');
  };

  return (logged != undefined ?
    <div>

      <div className="border bg-dark rounded shadow-lg p-3 mb-2  rounded  " style={{ textAlign: "center", width: "40%", maxWidth: "40%", margin: "auto auto", minWidth: "400px" }}>
        <span className="text-white small float-right  align-self-start border border-success bg-info rounded px-2 ">Online <p className="border bg-success rounded-circle">{connectionCounter && connectionCounter > 1 ? Math.round(connectionCounter / 2) : 1}</p></span>
        <h1 className="forum-title">Forum</h1>

        <h2 className="forum-title">Here We Talk Cinema</h2>


      </div>


      <div id="chat" className="border bg-light rounded shadow-lg p-3 mb-2 rounded " style={{ width: "40%", maxWidth: "40%", margin: "auto auto", maxHeight: "80vh" }} >


        <div className="d-flex flex-column flex-grow-1">

          {allmessages && allmessages.map(({ name, message, messageTime, url }, id) => (
            <div className="flex-grow-1"  >

              <div className="d-flex flex-column align-items-start justify-content-end px-3">
                <div key={id} className={`my-1 d-flex flex-column ${name === username ? 'align-self-end align-items-end' : 'align-items-start'}`} >

                  {message &&
                    <div className="talk-bubble">
                      <p className={`${name === username ? ' tri-right right-in talktext from-me' : 'talktext tri-right left-in from-them'}`} ref={messagesEndRef}>{message}</p>
                    </div>
                  }
                  {/* we can't retreive the audio here because we have to stock the file in a cloud for exemple */}
                  {url &&
                    <div className="talk-bubble">
                      <audio className={`${name === username ? ' tri-right right-in talktext from-me' : 'talktext tri-right left-in from-them'}`} ref={messagesEndRef} src={`${url}`} controls />
                    </div>
                  }

                  <div className={` {text-muted small ${name === username ? 'text-right' : ''}  my-1 d-flex flex-column ${name === username ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                    <p>{name === username ? 'you' : name} {messageTime}</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
          {renderChat()}
          {

            recorder &&
            <div className="d-flex flex-column align-items-start justify-content-end px-3">
              <Recorder
                record={false}
                title={"Audio Message"}
                audioURL={recorderData.audioDetails.url}
                showUIAudio

                handleAudioStop={data => handleAudioStop(data)}

                handleReset={() => handleReset()}
                mimeTypeToUseWhenRecording={`audio/webm`}
              />
              <button className="btn btn-success" onClick={onAudioMessageSubmit}>Send Audio</button>
            </div>
          }
          <div>
            <button onClick={() => setRecorder(val => !val)}>
              <img src="https://img.icons8.com/fluency/50/000000/voice-recorder.png" />
            </button>
          </div>



        </div>

        {showPicker && <Picker

          onSelect={addEmoji}

          pickerStyle={{ height: '400px ' }}
        />}

      </div>

      <Form onSubmit={onMessageSubmit} className="align-items-end">

        <Form.Group className="m-2 ">

          <InputGroup style={{ width: "30%", margin: "auto auto ", height: "50px" }}>

            <div id="emoji-div" className="bg-secondary rounded-left" onClick={() => setShowPicker(val => !val)}>

              <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/44/000000/external-emoji-emoji-justicon-lineal-color-justicon-2.png" />

            </div>

            <Form.Control
              required
              name="message"
              placeholder="Message"
              onChange={(e) => onTextChange(e)}
              value={state.message}

            ></Form.Control>

          </InputGroup>
          <InputGroup>
            <Button type="submit" style={{ margin: "auto auto" }}>Send</Button>
          </InputGroup>
        </Form.Group>

      </Form>
    </div> : (<div style={{ display: 'grid', placeItems: "center", fontSize: '3rem' }}>
      <AcessDenied />
    </div>))



}


export default Forum


