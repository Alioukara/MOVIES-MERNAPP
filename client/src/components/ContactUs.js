import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Form, Button, Card } from 'react-bootstrap'

import { Error, Success } from './modals/notification.js'

const ContactUs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_hkqu5jo', 'template_xtva7e8', form.current, 'bndk1PR4oMzW62vaU')
      .then((result) => {
        Success()
      }, (error) => {
        Error()
      });
  };

  return (
<div style={{margin:"0px", paddingTop:"10%"}}>
 
    <Card style={{margin:"auto auto", width: "50%", minWidth:"360px", height: "30rem", textAlign:"center"}} className=" cardcard col">
    <h1>Contact Us</h1> <br/>
      <Card.Body className=' col bg-light'>

        <Form ref={form} onSubmit={sendEmail}>
        <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="user_name"  />
           
          </Form.Group>
          <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label>Email address*</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="user_email" required />
           
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label>Message*</Form.Label>
            <Form.Control type="text" placeholder="Your Message" as="textarea" name="message" required/>
          <Button style={{ margin:"auto auto"}} variant="primary" type="submit">
            Send
          </Button>
          </Form.Group>
         
        </Form>
      </Card.Body>
    </Card>
</div>

  );
};

export default ContactUs;
