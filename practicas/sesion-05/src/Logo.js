import React from 'react';
import PropTypes from 'prop-types';

export default function Logo ( props ) {
    const className = props.isCentered ? 'has-text-centered' : '';
    return (
        <div className={className}>
            <img src="marvel-logo.jpeg" alt="marvel logo" role='presentation'/>
        </div>
    )
}

Logo.propTypes = {
    isCentered: PropTypes.bool
}