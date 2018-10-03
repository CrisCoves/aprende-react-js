import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

export default function Button ( props ) {
    return (
        <button>{
            props.isLoading
                ? <Spinner name="circle"/>
                : props.label
        }</button>
    )
}

Button.propTypes = {
    isLoading: PropTypes.bool,
    label: PropTypes.string,
}