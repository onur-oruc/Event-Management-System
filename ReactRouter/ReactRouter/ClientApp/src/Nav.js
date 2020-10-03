import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

function Nav() {
    const navStyle = {
        color: 'white',
        textDecoration: 'none',
        height: '50',
        width: '50'      
    }

    return (
        <nav >
            <ul className="nav-links">
                <Link style={navStyle} to='/'>
                    <li> Event Management System </li>
                </Link>
            </ul>
            <ul className="nav-links">
                <Link style={navStyle} to='/'>
                    <li> Events</li>
                </Link>
                <Link style={navStyle} to='admin-log-in'>
                    <li> Admin</li>
                </Link>
            </ul>
        </nav>
    );
}
export default Nav;
