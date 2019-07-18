import React from "react";
import { NavLink } from "react-router-dom"
import { slide as Menu } from "react-burger-menu";

import './Sidebar.css';

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange = (state) => {
        this.setState({ menuOpen: state.isOpen })
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu = () => {
        this.setState({ menuOpen: false })
    }

    render() {
        return (
            <Menu {...this.props}
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}
            >
                <NavLink className="menu-item" to="/" onClick={this.closeMenu}>
                    <i className="fas fa-list"></i>
                    Record
                </NavLink>

                <NavLink className="menu-item" to="/chart" onClick={this.closeMenu}>
                    <i className="fas fa-chart-pie"></i>
                    Chart
                </NavLink>

                <NavLink className="menu-item" to="/category" onClick={this.closeMenu}>
                    <i className="fas fa-tags"></i>
                    Category
                </NavLink>
            </Menu>
        );
    }
};

export default Sidebar;