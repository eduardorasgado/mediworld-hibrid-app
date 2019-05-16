import React, { Component }from 'react';
//importando react router y complementos
import { withRouter, Route, Switch } from 'react-router-dom';
//importando las utilidades para las peticiones a la api
import { getCurrentUser } from '../APIUtilities';
import './App.css';

// importando componentes de logueo, registro y perfil
import Login from '../user/login/Login';

//importando los componentes material de diseño
import { Layout, notification } from 'antd';
import Loader from '../elemental/Loader';
import StartPage from '../elemental/StartPage';
import AuthPage from '../elemental/AuthPage';

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
    })
  }

  /**
   * Usado para producir una notificacion, actualizar el usuario actual y redireccionar,
   * una vez logueado
   */
  handleLogin() {
    notification.success({
      message: 'Mediworld App',
      description: 'Te has logueado con éxito'
    });

    this.loadCurrentUser();
    // TODO: Checar entre context/props
    this.props.history.push("/");

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
        <Content class="app-content">
          <div className="container">
            <Switch>
              <Route exact path="/"
                render={(props) =>
                  <StartPage {...props} /> 
                }
              ></Route>
              <Route path="/start-over-here"
                render={(props) =>
                  <AuthPage {...props}/>
                }
              >
              </Route>
              <Route path="/login" 
                render={(props) =>
                  <Login onLogin={this.handleLogin} {...props}></Login>
                }
              >
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout> 
    );
  }
}


export default withRouter(App);
