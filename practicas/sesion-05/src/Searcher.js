import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Searcher.css';
import Button from './Button.js';


export default class Searcher extends Component {
    constructor ( ...args ) {
        super( ...args );
        this.state = {
            textToSearch: ''
        }

        /****
         * Nota: handleSubmit y handleChange no los tenemos aqui y queremos usarlos. Esto nos va a complicar un poco la cosa:
         * La magia de React, la utilidad de ir separando en componentes.
         * Para ello añadimos los handlers aqui asi:
         * y tambien eliminamos la funcion handlerChange de App.js y la escribimos aqui
         */
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleChange (e) {
        // Recordar que el seteo del estado es asíncrono!!!
        // el segundo parámetro que ofrece setState es un callback,
        // que te indica que el estado ha sido seteado.
        // this.setState({ textToSearch: e.currentTarget.value }, () => {
        //     console.log( this.state.textToSearch );
        // });
        this.setState( { textToSearch: e.currentTarget.value } )
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.onSubmit( this.state.textToSearch );
    }


    render () {
        return (
            <form className='Searcher' onSubmit={this.handleSubmit}>
                {/* deshabilitamos el input cuando este cargando (spinner)  */}
                <input
                       disabled={this.props.isLoading}
                       onChange={this.handleChange}
                       type="text"/>

                {/* creamos un componente Button al que le vamos a poder pasar diferentes props */}
                <Button
                    isLoading={this.props.isLoading}
                    label="Search"
                />
            </form>
        )
    }
}


Searcher.propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired
}

/****
 * si no se le pasa nada al Searcher,
 * se le puede definir que haga hago por defecto con las defaultProps,
 * por ejemplo mostrar el console log
 */
Searcher.defaultProps = {
    onSubmit: () => { console.log( 'Hola!' ); }
}

















