import React from 'react'
import { Form, Card, Button,Row, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../Styles/login.css';
import AuthService from '../Services/AuthService';
import image from '../Images/re-senia_adobespark.png'
import resenia from '../Images/re-senia_adobespark.png';
import i18n from '../i18n.js';
import { withNamespaces, changeLenguage } from 'react-i18next';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          password: '',
          email: '',
          idiom:'',
          error: {},
        };
        this.login = this.login.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.changeIdiom = this.changeIdiom.bind(this);
    }

    changeIdiom(event){
        let idiom =this.setState({ idiom: event.target.value });
        if (idiom === "English"){
            i18n.changeLenguage="en"
        }else{
            i18n.changeLenguage="es"
        }
        
    }


    componentDidMount(){
        console.log(this.props)
    }

    changeEmail(event) {
        this.setState({ email: event.target.value });
    }
    
    changePassword(event) {
        this.setState({ password: event.target.value })
    }

    validatePassword(){
        return this.state.password === '';
    }

    validateEmail(){
        return !(this.state.email.includes('@') && this.state.email.includes(".com"))
    }

  
      
    validateForm(){
        let newError = {}
    
        if(this.validatePassword()){
            newError["password"] = "Deber escribir una contraseña!"
        }

        if(this.validateEmail()){
            newError["email"] = "Debe utilizar un mail válido!"
        }

        this.setState({error: newError})
        return Object.keys(newError).length === 0
    }
    

    login() {
        if(this.validateForm()){
          AuthService.authenticate({password: this.state.password, clientPlatformName: this.state.platform}).then((res) => {
            localStorage.setItem("client", JSON.stringify(res));
            this.props.history.push('/mainMenu');
          }).catch(e => {
            if(e.error.status === 404 || e.error.status === 400){
              this.notifyError('Usuario y/o contraseña incorrectos');
            }
          })
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
                <div className="pt-5 pl-5 pr-5 background">
                <div className="row">
                    <div className="col-4 offset-7">
                        <Card className="shadow bg-white rounded card">
                            <Card.Body className = "backgroundCard">
                                <h1 style={{textAlign: 'center', color:'red'}}>
                                    Re-seña
                                </h1>
                                <h2 style={{textAlign: 'center'}}>
                                    Login
                                </h2>
                                <Form className="pt-3 ">
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
                                        onChange={(event) => this.changePassword(event)}
                                        value={this.state.password} 
                                        isInvalid={!!this.state.error.password} 
                                    />
                                    <Form.Control.Feedback type="invalid">{this.state.error.password}</Form.Control.Feedback>
                                </Form.Group>
                                    
                                    <Button id="button" variant="primary" onClick={(event) => this.login()}>
                                       {t ("Ingresar")}
                                    </Button>
                                    <br/>
                                    {t("No tienes cuenta?")} <Link to={'/register'}>{t("Click aquí")}</Link>
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

export default withNamespaces()(Login);