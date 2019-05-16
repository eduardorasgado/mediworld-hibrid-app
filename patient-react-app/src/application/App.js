import {React, Component }from 'react';
//importando las utilidades para las peticiones a la api
import { getCurrentUser } from './APIUtilities';
import './App.css';

//importando los componentes material de diseño
import Loader from 'elemental/Loader';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
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
}

export default App;
