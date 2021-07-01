import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Register from './Components/Register';
import MainMenu from './Components/MainMenu';
import Root from './Components/Roots';
import { withNamespaces } from 'react-i18next';

// function App ({ t }) {
//   return <h1>{t('Welcome to React')}</h1>
// }


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() { 
    const {t} = this.props;

    return  (
      //<h1> { t("Registro")}</h1>
      <BrowserRouter> 
        <Switch>
          <Route exact path='/mainMenu' render={(props) => <MainMenu {...props}/>}/>
          <Route exact path='/' render={(props) => <Login {...props} />} /> 
          <Route exact path='/register' render={(props) => <Register {...props}/> }/>
        </Switch>
      </BrowserRouter>
      ); 
    }
  }





export default withNamespaces()(App);

//export default App;
