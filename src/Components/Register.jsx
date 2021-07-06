import React from 'react';
import '../Styles/register.css';
import { Form, Button, Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import clientService from '../Services/ClientService'
import 'react-toastify/dist/ReactToastify.css';
import resenia from '../Images/re-senia_adobespark.png';
import { withNamespaces } from 'react-i18next';


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',
        platform: '',
        error: {},
        };
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePlatform = this.changePlatform.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePlatform = this.validatePlatform.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.render = this.render.bind(this);
        this.register = this.register.bind(this);
    }

    changeEmail(event) {
        this.setState({ email: event.target.value });
        console.log('email: ' + this.setState({ email: event.target.value }))
    }

    changePassword(event) {
        this.setState({ password: event.target.value })
    }

    changePlatform(event) {
        this.setState({ platform: event.target.value });
    }

    validateEmail(){
        return !(this.state.email.includes('@') && this.state.email.includes(".com"))
    }
    
    validatePassword(){
        return this.state.password === '';
    }

    validatePlatform(){
        return this.state.platform === '';
    }
      
    validateForm(){
        let newError = {}
    
        if(this.validateEmail()){
          newError["email"] = "Debe utilizar un mail válido!"
        }
    
        if(this.validatePassword()){
          newError["password"] = "Deber escribir una contraseña!"
        }

        if(this.validatePlatform()){
            newError["platform"] = "Debe escribir una plataforma!"
        }
    
        this.setState({error: newError})
        return Object.keys(newError).length === 0
    }
    

    register() {
        if(this.validateForm()){
            clientService.registerClient({contactMail: this.state.email, password: this.state.password, clientPlatformName: this.state.platform.toLowerCase()})
            .then((res) => { 
                this.props.history.push('/')
                })
            .catch(e => {
                if(e.error.status === 409){
                    console.log('El email ya fue registrado!');
                }
            })
            console.log("no entra en nada")
        }
    }

    render() { 
        const {t} = this.props;
        return  (
            <div>
                <div>
                    <Card className = "shadow bg-white rounded card">
                        <Card.Body className="body">
                            <Form.Group as={Row}>
                                <img src={resenia} alt="description"/>
                                <Form.Group controlId="formGridIdioma" className = "offset-9">
                                    <Form.Control as="select" className="select"
                                        placeholder="Idioma"
                                        name="idioma"
                                        onChange = {(event) => this.changeIdiom(event)}
                                        value={this.state.idioma}
                                    >
                                        <option>English</option>
                                        <option>Español</option>
                                    </Form.Control>
                                </Form.Group>
                        </Form.Group>
                        </Card.Body>
                    </Card>
                </div>
                <div className="pt-5 pl-5 pr-5 backgroundRegister">
                    <div className="row">
                        <div className="col-4 offset-1" >
                            <Card className="shadow bg-white rounded">
                                <Card.Body className = "backgroundCardR">
                                    <h1 style={{textAlign: 'center', color:'red'}}>
                                        Re-seña
                                    </h1>
                                    <h2 style={{textAlign: 'center'}}>
                                        {t("Registro")}
                                    </h2>
                                    <Form className="pt-3">
                                        <Form.Group controlId="formGridPlatform">
                                            <Form.Label>Plataforma</Form.Label>
                                            <Form.Control 
                                                placeholder={t("Escribe la plataforma")}
                                                name="platform"
                                                onChange={(event) => this.changePlatform(event)}
                                                value={this.state.platform}
                                                isInvalid={!!this.state.error.platform}
                                            />
                                            <Form.Control.Feedback type="invalid">{this.state.error.platform}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                placeholder={t("Escriba el email de registro")} 
                                                value={this.state.email} 
                                                onChange={(event) => this.changeEmail(event)}
                                                isInvalid={!!this.state.error.email} 
                                            />
                                            <Form.Control.Feedback type="invalid">{this.state.error.email}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                                type="password" 
                                                placeholder={t("Escriba el password de registro")} 
                                                value={this.state.password} 
                                                onChange={(event) => this.changePassword(event)}
                                                isInvalid={!!this.state.error.password} 
                                            />
                                            <Form.Control.Feedback type="invalid">{this.state.error.password}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Button id="button" variant="primary" onClick={(event) => this.register()}>
                                            Crear
                                        </Button>
                                        <br/>
                                        {t("Ya tienes cuenta?")} <Link to={'/'}>{t("Click aquí")}</Link>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}

export default withNamespaces()(Register);