import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logoutSuccess } from '../../redux/authReducer';

const Logout = () => {
    const dispatch = useDispatch();
    return(
        <Fragment>
            <NavLink href='#' onClick={ () => dispatch(logoutSuccess())}>Logout</NavLink>
        </Fragment>
    )
}


export default Logout;