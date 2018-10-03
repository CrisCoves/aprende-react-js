import React, { Component } from 'react';
import './App.css';

//import dummyData from './dummyData.js';
import Logo from './Logo.js';
import Card from './Card.js';
import Searcher from './Searcher.js';

// si te registras en la  API de Marvel, puedes acceder a la API sin ningún problema, te registras y te da una API key
// aqui usamos la API key de Miguel Angel
const API_URL = 'http://gateway.marvel.com:80/v1/public';
const APIKEY_QUERYSTRING = 'apikey=408b6d7a1fd0560193bf0a239d279af1';

export default class App extends Component {

    constructor ( ...args ) {
        super( ...args )
        // es una buena práctica definir los estados iniciales
        this.state = {
            // dummyData es un array que tiene los resultados como los esperamos
            results: [],
            initialState: true,
            isLoading: false
        }

        // es una buena práctica ver las funciones q van a utilizar el this y bindearlas en el constructor
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleSubmit ( textToSearch ) {
        // e.preventDefault(); => quitamos esto y sustituimos e por el parámetro textToSearch
        // despues de crear el componente Searcher, que nos permitirá poder utilizar el fetch de manera más modular.
        // este handleSubmit se lo vamos a pasar ahora a Searcher como prop
        this.setState( { initialState: false, isLoading: true } );
        // vamos a querer buscar algo cuando hagamos un submit.
        // vamos a hacer un fetch de un recurso

        const FETCH_URL =
            `${API_URL}/characters?nameStartsWith=${textToSearch}&${APIKEY_QUERYSTRING}`;
        // el primer parámetro de fetch ya es la url que queremos capturar.
        // la llamada nos va a dar una respuesta json.
        fetch( FETCH_URL )
            .then( res => res.json() )
            .then( res => {
                // desactivar el spinner cuando obtenemos la respuesta
                this.setState( { isLoading: false, results: res.data.results } );
            } )
    }

    render () {
        return (
            <div className='container' >
               <Logo isCentered />

                {/* mostramos este texto solo si no se ha hecho una búsqueda */}
                { this.state.initialState &&
                    <p className='has-text-centered'>Por favor, usa el formulario para buscar el personaje</p>
                }

                <Searcher
                    isLoading={this.state.isLoading}
                    onSubmit={this.handleSubmit}
                />

                {/* cogemos el estado y hacemos hijos dinamicos a partir de los datos del array
                 No olvidar que cada hijo del array, cuando lo estamos iterando, debe tener una 'key' unica */}

                {/* en el render estamos diciendo que haga un mapeo del estado de results. Con lo que cada vez que el estado cambia,
                 se vuelve a renderizar */}
                 <div className='results' >
                     {this.state.results.map( item => <Card item={item} key={item.id}/> )}
                 </div>
            </div>
        );
    }
}





















