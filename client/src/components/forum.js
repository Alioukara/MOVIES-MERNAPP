import React, { useEffect, useRef, useState, useCallback } from "react"
import io from "socket.io-client"
import Cookies from 'universal-cookie';
import { Form, InputGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import '../styles/forum.css'

const cookies = new Cookies();

function Forum({ id }) {
  const currentTime = new Date();
  const [messageDate, setMessageDate] = useState("")
  const username = cookies.get("username")

  const [state, setState] = useState({ message: "", name: cookies.get("username"), userId: cookies.get("userID") })
  const [chat, setChat] = useState([])
  const [allmessages, setAllmessages] = useState()

 

  const socketRef = useRef()
  



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
        setMessageDate(`${currentTime.getDate()}/${currentTime.getMonth()+1}/${currentTime.getFullYear()} <${currentTime.getHours() + ":" + currentTime.getMinutes()}>`)
        setChat([...chat, { name, message, userId, messageDate }])
      })
      return () => socketRef.current.disconnect()
    },
    [chat, id]

  )

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  // const ScrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" })

  //   useEffect(() => {
  //     if(messagesEndRef) {
  //       ScrollToBottom()
  //     }
  //   }, [chat, allmessages])
    
  //   if(!messagesEndRef) {
  //         return null
  //   }
   
  // }
 
 


  const onMessageSubmit = (e) => {
    const { name, message, userId } = state
    socketRef.current.emit("message", { name, message, userId })
    e.preventDefault()
    setState({ message: "", name, userId })
  }

  const renderChat = () => {
  
    return chat.map(({ name, message }, index ) => ( 
  
      <div className="flex-grow-1" >
        
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          <div key={index} className={`my-1 d-flex flex-column ${name === username ? 'align-self-end align-items-end' : 'align-items-start'}`} >

            <div  
             
              className={`rounded px-2 py-1 ${name === username ? 'bg-primary text-white' : 'border bg-info'}`}>
              {message}
              
            
              
            </div>

            <div className={` {text-muted small ${name === username ? 'text-right' : ''}  my-1 d-flex flex-column ${name === username ? 'align-self-end align-items-end' : 'align-items-start'}`}>
              <p>{name === username ? 'you' : name} ({messageDate})</p>
            </div>
          </div>
        </div>
        
      </div>
    ))

  }



  return (
    <div>
      <div className="border bg-dark rounded shadow-lg p-3 mb-2  rounded  " style={{ textAlign: "center", width: "40%", margin: "auto auto "}}>

      <h1 className="forum-title">Forum</h1>
      <h2 className="forum-title">Here We Talk Cinema</h2> 
      </div>
    <div id="chat" className="border bg-light rounded shadow-lg p-3 mb-2 rounded " style={{ textAlign: "center", width: "40%", margin: "auto auto ", maxHeight: '60vh'}} >
      
      <div className="d-flex flex-column flex-grow-1">
     
        {allmessages && allmessages.map(({ name, message, messageTime }, id) => (
          <div className="flex-grow-1"  >
            
            <div className="d-flex flex-column align-items-start justify-content-end px-3">
              <div key={id} className={`my-1 d-flex flex-column ${name === username ? 'align-self-end align-items-end' : 'align-items-start'}`} >

                <div  
                  className={`rounded px-2 py-1 ${name === username ? 'bg-primary text-white' : 'border bg-info'}`}>
                  {message}
                 
                </div>

                <div className={` {text-muted small ${name === username ? 'text-right' : ''}  my-1 d-flex flex-column ${name === username ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                <p>{name === username ? 'you' : name} ({messageTime})</p>
                </div>
              </div>
            </div>
        
          </div>
        ))}
        {renderChat()}
      

      </div>
    </div>
    <Form onSubmit={onMessageSubmit} className="align-items-end">
         
          <Form.Group className="m-2 ">
            <InputGroup style={{ width: "30%", margin: "auto auto ", height: "50px" }}>
              <Form.Control
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

    </div>
  )


}


export default Forum


