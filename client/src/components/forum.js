import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import Cookies from 'universal-cookie';
import { Form, InputGroup, Button } from 'react-bootstrap'

const cookies = new Cookies();

function Forum() {
  const [state, setState] = useState({ message: "", name: cookies.get("username") })
  const [chat, setChat] = useState([])

  const socketRef = useRef()
  console.log("state", state)
  useEffect(
    () => {
      socketRef.current = io.connect("http://localhost:5000")
      socketRef.current.on("message", ({ name, message }) => {
        setChat([...chat, { name, message }])
      })
      return () => socketRef.current.disconnect()
    },
    [chat]
  )

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    const { name, message } = state
    socketRef.current.emit("message", { name, message})
    e.preventDefault()
    setState({ message: "", name })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div>
        <div key={index} >

          <h3>
            {name}: <span>{message}</span>
          </h3>
        </div>
      </div>
    ))
  }

  return (
    <div className="container d-flex flex-column flex-grow-1" >
      <h1>Forum</h1>
      <h2>Here We Talk Cinema</h2>
      <div className="flex-grow-1 overflow-auto" style={{ background: "#8cdbd6",
        width: "100%", borderRadius: "5px", padding: "20px", boxShadow: "0px 3px 24px -8px rgba(0, 0, 0, 0.75)"
      }}>
        <div className="d-flex flex-column px-3" style={{ height: "60%" }}>

          {renderChat()}
        </div>
      </div>
      <Form onSubmit={onMessageSubmit}>
        <h1>Message</h1>
        <Form.Group className="m-2">



          <InputGroup>
            <Form.Control
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            ></Form.Control>
          </InputGroup>
          <InputGroup>
          <Button type="submit">Send</Button>
        </InputGroup>
        </Form.Group>
   

      </Form>

    </div>
  )
}

export default Forum