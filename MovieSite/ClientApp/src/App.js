import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Profile } from './components/Profile/Profile';
import { MovieRedactor } from "./components/MovieRedactor/MovieRedactor"
import { View } from "./components/View/View"
import { Settings } from "./components/Settings/Settings"
import { SearchPage } from "./components/SearchPage/SearchPage"
import Background from "./components/Images/Backgr.jpg"
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div className="page" style={{ backgroundImage: "url(" + Background + ")", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/Profile/' component={Profile} />
                    <Route exact path='/Redactor/:id' component={MovieRedactor} />
                    <Route exact path='/MoviePage/:id' component={View} />
                    <Route exact path='/Settings/' component={Settings} />
                    <Route exact path='/Search/' component={SearchPage} />
                </Layout>
            </div>
        );
    }
}
