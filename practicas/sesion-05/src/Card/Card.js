import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import lscache from 'lscache';

import { MdStar } from 'react-icons/md';
import { MdStarBorder } from 'react-icons/md';


export default class Card extends Component {

    constructor ( ...args ) {
        super ( ...args );
        this.state = {
            isFav: this.props.isFav
        }

        // No olvidar bindear el contexto
        // Lo bindeamos porque estamos utilizando el setState dentro.
        this.addFav = this.addFav.bind( this );
        this.removeFav = this.removeFav.bind( this );
        this.saveToLocalStorage = this.saveToLocalStorage.bind( this );
    }


    addFav () {
        this.setState( { isFav: true } );
        this.saveToLocalStorage();
    }

    removeFav () {
        this.setState( { isFav: false } );
        this.saveToLocalStorage();
    }

    saveToLocalStorage () {
        // cogemos la id de las props de la Card donde ha sido clickada la estrella
        const id = this.props.item.id;
        let favs = lscache.get( 'favs' ) || [];
        // miramos en los favs si tenemos esta id, si no la tenemos, pusheamos esta id
        // y si no, hacemos un splice.
        // el splice: me quitas el elemento que está en ese índice, y solo me quitas uno, y además me modificas el array.

        if ( favs.indexOf( id ) < 0 ) {
            favs.push( id );
        } else {
            favs.splice( favs.indexOf( id ), 1 );
        }

        lscache.set( 'favs', favs );
    }

    render () {
        const item = this.props.item;
        const img = `${item.thumbnail.path}.${item.thumbnail.extension}`;
        return (
            <div className='card' key={item.id}>
                { this.state.isFav
                    ? <MdStar onClick={ this.removeFav }/>
                    : <MdStarBorder onClick={ this.addFav }/>}
                <img className='card-image' src={img} alt={item.name}/>
                <div className='card-content'>
                    <h2 className='card-title'>{item.name}</h2>
                    <p className='card-description'>{item.description}</p>
                </div>
            </div>
        )
    }
}

Card.propTypes = {
    item: PropTypes.object,
    isFav: PropTypes.bool
}
















