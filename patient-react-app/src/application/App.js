import React, { Component }from 'react';
//importando react router y complementos
import { withRouter, Route, Switch } from 'react-router-dom';
//importando las utilidades para las peticiones a la api
import { getCurrentUser } from '../utils/APIUtilities';
import './App.css';
import 'antd/dist/antd.css';

// importando componentes de logueo, registro y perfil
import Login from '../user/login/Login';
import Register from '../user/register/Register';
import Profile from '../user/profile/Profile';

//importando los componentes material de diseño
import { Layout, notification } from 'antd';
import Loader from '../elemental/Loader';
import StartPage from '../elemental/StartPage';
import AuthPage from '../elemental/AuthPage';
import NotFound from '../elemental/error/NotFound';
import NotAuthenticated from '../elemental/AuthBased/NotAuthenticated';
import Authenticated from '../elemental/AuthBased/Authenticated';

const { Content } = Layout;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: false,
      // TODO: CAMBIAR A TRUE
      isLoading: false
    }

    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    // configurando las notificaciones
    notification.config({
      placement: 'topRight',
      top: 70,
      // segundos
      duration: 3
    });
  }

  /**
   * Metodo para actualizar el estado de autenticacion y obtener el usuario logueado dada
   * la funcion getCurrentUser de las utilidades de API
   */
  loadCurrentUser() {
    this.setState({
      isLoading: true
    });

    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      })
      console.log(error);
    })
  }

  /**
   * Usado para producir una notificacion, actualizar el usuario actual y redireccionar,
   * una vez logueado
   */
  handleLogin() {
    
    this.loadCurrentUser();
    notification.success({
      message: 'Mediworld App',
      description: 'Te has logueado con éxito'
    });
    this.props.history.push("/paciente/me");

  }

  // CICLO DE COMPONENTES
  componenDidMount() {
    this.loadCurrentUser();
  }

  render() {
    if(this.state.isLoading) {
      return <Loader />
    }
    return (
      <Layout className="app-container">
        <Content className="app-content">
          <div className="container">
            <Switch>
              
              <Route exact path="/"
                render={(props) =>
                  <StartPage {...props} /> 
                }
              ></Route>
              
              <NotAuthenticated
                path="/start-over-here"
                component={AuthPage}
                isAuthenticated={this.state.isAuthenticated}
              ></NotAuthenticated>
              
              <NotAuthenticated
                path="/login"
                component={Login}
                isAuthenticated={this.state.isAuthenticated}
                onLogin={this.handleLogin}
              ></NotAuthenticated>
              
              <NotAuthenticated
                path="/register"
                component={Register}
                isAuthenticated={this.state.isAuthenticated}
              ></NotAuthenticated>

              <Authenticated
                path="/paciente/me"
                component={Profile}
                isAuthenticated={this.state.isAuthenticated}
              ></Authenticated>
              
              <Route component={NotFound}></Route>
            </Switch>
          </div>
        </Content>
      </Layout> 
    );
  }
}


export default withRouter(App);
