import React, { useContext, useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({children}) {

  const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])

  const socketRef = useRef()

	useEffect(
		() => {
			socketRef.current = io.connect("https://weloveallmovies.herokuapp.com")
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}


  return (
    <SocketContext.Provider>
      {children}
    </SocketContext.Provider>
  )
}