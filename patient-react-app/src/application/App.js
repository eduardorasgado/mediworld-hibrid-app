import React, { Component }from 'react';
//importando react router y complementos
import { withRouter, Route, Switch } from 'react-router-dom';
//importando las utilidades para las peticiones a la api
import { getCurrentUser } from '../APIUtilities';
import './App.css';

// importando componentes de logueo, registro y perfil
import Login from '../user/login/Login';

//importando los componentes material de diseño
import { Layout } from 'antd';
import Loader from '../elemental/Loader';
import StartPage from '../elemental/StartPage';
const { Content } = Layout;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true
    }

    this.loadCurrentUser = this.loadCurrentUser.bind(this);
  }

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
              <Route path="/login" 
              render={(props) =>
                <Login></Login>
              }>

              </Route>
            </Switch>
          </div>
        </Content>
      </Layout> 
    );
  }
}


export default withRouter(App);
