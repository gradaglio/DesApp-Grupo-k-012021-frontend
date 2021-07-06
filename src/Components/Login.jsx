import React from 'react'
import { Form, Card, Button,Row, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../Styles/login.css';
import AuthService from '../Services/AuthService';
import image from '../Images/re-senia_adobespark.png'
import resenia from '../Images/re-senia_adobespark.png';
import i18n from '../i18n.js';
import { withNamespaces} from 'react-i18next';
//import { ToastContainer, toast } from 'react-toastify';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          password: '',
          platform: '',
          idiom:'',
          error: {},
        };
        this.login = this.login.bind(this);
        this.changePlatform = this.changePlatform.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePlatform = this.validatePlatform.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.changeIdiom = this.changeIdiom.bind(this);
    }

    changeIdiom(event){
        let idiom =this.setState({ idiom: event.target.value });
        // if (idiom === "English"){
        //     i18n.changeLenguage="en"
        // }else{
        //     i18n.changeLenguage="es"
        // }
        //let newIdiom = this.state.idiom;
        //newIdiom[e.target.name] = e.target.value
        console.log('idioma: '+ idiom)
        i18n.changeLenguage = (idiom)
        
        
    }


    componentDidMount(){
        console.log(this.props)
    }

    changePlatform(event) {
        this.setState({ platform: event.target.value });
        //console.log('email: ' + this.setState({ email: event.target.value }) )
    }
    
    changePassword(event) {
        this.setState({ password: event.target.value })
    }

    validatePassword(){
        return this.state.password === '';
    }

    validatePlatform(){
        return this.state.platform === '';
    }
  
    validateForm(){
        let newError = {}
    
        if(this.validatePassword()){
            newError["password"] = "Deber escribir una contraseña!"
        }

        if(this.validatePlatform()){
            newError["platform"] = "Deber escribir una plataforma!"
        }

        this.setState({error: newError})
        return Object.keys(newError).length === 0
    }

    login() {
        if(this.validateForm()){
          AuthService.authenticate({password: this.state.password, clientPlatformName: this.state.platform.toLowerCase()}).then((res) => {
            localStorage.setItem("client", JSON.stringify(res));
            this.props.history.push('/mainMenu');
          }).catch(e => {
            console.log("usuario o contraseña incorrecto")
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
                                    <Form.Control as="select"
                                        name="idioma"
                                        onChange = {(event) => this.changeIdiom(event)}
                                        value={this.state.idiom}
                                        placeholder="Selecciona el tipo de proceso"
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
                                <Form.Group controlId="formBasicPlatform">
                                    <Form.Label>Platform</Form.Label>
                                    <Form.Control 
                                        type="Platform" 
                                        placeholder={t("Escriba la plataforma de registro")} 
                                        value={this.state.platform} 
                                        onChange={(event) => this.changePlatform(event)}
                                        isInvalid={!!this.state.error.platform} 
                                    />
                                    <Form.Control.Feedback type="invalid">{this.state.error.platform}</Form.Control.Feedback>
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