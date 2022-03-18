import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()

export const Error = () => {

    toast.error('Error: Please try again',{theme: "colored"})
}

export const Nologin = () => {

    toast.error("Email or Password are incorrect",{theme: "colored"})
}
export const Yeslogin = () => {

    toast.success("Logged In",{theme: "colored"})
}
export const YesRegister = () => {

    toast.success("Registred",{theme: "colored"})
}
export const Logout = () => {

    toast.warn("Logged Out",{theme: "colored"})
}
export const Success = () => {

    toast.success('Message Sent!', { theme: "colored" })
}
