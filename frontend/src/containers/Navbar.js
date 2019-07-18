import React from 'react';
import { Switch, Route } from "react-router-dom";

import NewRecordBtn from '../components/record/navbar/NewRecordBtn';
import Monthpicker from '../components/record/navbar/Monthpicker';
import NewCategoryBtn from '../components/category/navbar/NewCategoryBtn';
import TypeDropDown from '../components/chart/navbar/TypeDropDown';

import './Navbar.css';

class Navbar extends React.Component {

    render() {
        return (
            <Switch>
                <Route
                    path="/record"
                    render={props =>
                        <div className="navbar navbar-white bg-white d-flex justify-content-between">
                            <Monthpicker />
                            <NewRecordBtn />
                        </div>}
                />
                <Route
                    path="/chart"
                    render={props =>
                        <div className="navbar navbar-white bg-white d-flex justify-content-start">
                            <Monthpicker />
                            <TypeDropDown />
                        </div>}
                />
                <Route
                    path="/category"
                    render={props =>
                        <div className="navbar navbar-white bg-white d-flex justify-content-between">
                            <h4 id='navbar-category-title'>Category Settings</h4>
                            <NewCategoryBtn />
                        </div>}
                />
            </Switch>
        );
    }
}

export default Navbar;