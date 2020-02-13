import React, { useState } from 'react';

import { Form, Button, Col} from 'react-bootstrap';



const InvitationForm = ({ bookingId }) => {
    // const { jamId } = props;
    // const [accInfo, setaccInfo] = useState({});
    
    // const handleInputChange = (event) => {
    //     event.persist();
    //     setaccInfo(accInfo => ({...accInfo, [event.target.id]: event.target.value}));

    // }

    // const handleSubmit = (event) => {
    //     if (event) {
    //       event.preventDefault();
    //     }
    //     const jamField = 'accommodationInfo';
    //     DataService.updateJamInfo(jamId, jamField, accInfo)
    // }
    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        console.log('form = ', form)
        // this.props.propsFn.push(`/`); 

    };

    return (

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    )
}

export default InvitationForm
