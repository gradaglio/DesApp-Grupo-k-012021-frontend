import React from 'react';
import '../Styles/navbar.css';
import {Navbar, Nav, Form} from 'react-bootstrap';
import resenia from '../Images/re-senia_adobespark.png';
import {useTranslation} from 'react-i18next';


class NavbarView extends React.Component{

    constructor(args){
        super(args)
        this.state = {
            idiom:'',
        };

        this.changeIdiom = this.changeIdiom.bind(this);
    }

    changeIdiom(event){
        this.setState({ idiom: event.target.value });
    }



    render(){ 
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">
                    <img src={resenia} alt="description"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Form inline>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/"></Nav.Link>
                            <Form.Group controlId="formGridIdioma">
                                <Form.Control as="select" 
                                    placeholder="Idioma"
                                    name="idioma"
                                    onChange = {(event) => this.changeIdiom(event)}
                                    value={this.state.idioma}
                                >
                                    <option>English</option>
                                    <option>Español</option>
                                    
                                </Form.Control>
                            </Form.Group>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Form>
            </Navbar>
        );
    }
}

export default NavbarView;