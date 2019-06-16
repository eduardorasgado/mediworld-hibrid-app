import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default class NotFound extends Component {
  render() {
    return (
        <div className="page-not-found">
        <h1 className="title">
            404
        </h1>
        <div className="desc">
            La página que estás buscando no existe!
        </div>
        <Link to="/">
            <Button className="go-back-btn" 
            type="primary" 
            size="large">
                Ir al inicio
            </Button>
        </Link>
    </div>
    )
  }
}
