import React from 'react'
import { Form, Card, Button,Row, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../Styles/login.css';
import AuthService from '../Services/AuthService';
import image from '../Images/re-senia_adobespark.png'
import resenia from '../Images/re-senia_adobespark.png';
//import "./translations/i18n";
import { withNamespaces } from 'react-i18next';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          plataforma: '',
          idiom:'',
          error: {},
        };
        this.login = this.login.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePlatform = this.changePlatform.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePlatform = this.validatePlatform.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.changeIdiom = this.changeIdiom.bind(this);
    }

    changeIdiom(event){
        this.setState({ idiom: event.target.value });
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

    changePlatform(event) {
        this.setState({ platform: event.target.value })
    }

    validateEmail(){
        return !(this.state.email.includes('@') && this.state.email.includes(".com"))
    }
    
    validatePassword(){
        return this.state.password === '';
    }

    validatePlatform(){
        return this.state.platform === 'Seleccione una plataforma';
    }
      
    validateForm(){
        let newError = {}
    
        if(this.validateEmail()){
          newError["email"] = "Utilice un mail valido!"
        }
    
        if(this.validatePassword()){
          newError["password"] = "Deber tener una contraseña!"
        }

        if(this.validatePlatform()){
            newError["platform"] = "Debe seleccionar una plataforma!"
        }
    
        this.setState({error: newError})
        return Object.keys(newError).length === 0
    }
    

    login() {
        if(this.validateForm()){
          AuthService.authenticate({email: this.state.email, password: this.state.password, platform: this.state.platform}).then((res) => {
            localStorage.setItem("user", JSON.stringify(res));
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
                                        placeholder={t("Idioma")}
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
                                        <Form.Label>{t( "Email")}</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder= {t("Escriba el email de registro" )}
                                            isInvalid={!!this.state.error.email} 
                                            value={this.state.email} 
                                            onChange={(event) => this.changeEmail(event)}
                                        />
                                        <Form.Control.Feedback type="invalid">{this.state.error.email}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder={t("Escriba el password de registro")} 
                                            isInvalid={!!this.state.error.password} 
                                            value={this.state.password} 
                                            onChange={(event) => this.changePassword(event)}
                                        />
                                        <Form.Control.Feedback type="invalid">{this.state.error.password}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="formGridPlatform">
                                        <Form.Label>Plataforma</Form.Label>
                                        <Form.Control  
                                            placeholder={t("Escriba la plataforma de registro")}
                                            name="platform"
                                            onChange={(event) => this.changePlatform(event)}
                                            value={this.state.platform}
                                        />
                                            
                                       
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