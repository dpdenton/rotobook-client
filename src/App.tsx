import * as React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

import {PagePaths} from "./types/enums";
import FormContainer from "./containers/FormContainer";
import Page from "./components/Page";
import EmployeeList from "./components/EmployeeList";
import Header from "./components/Header";

import './App.css';

const App = () => {

    return (
        <BrowserRouter>
            <Route
                render={render}
            />
        </BrowserRouter>
    )
};

const render = ({location}: any) => {

    return (
        <Page>
            <Header
                title={'RotaBook'}
                subTitle={'View, create and delete your employees'}
                path={location.pathname}
            />
            <Switch>
                <Route
                    path={PagePaths.EmployeeList}
                    exact={true}
                    component={EmployeeList}
                />
                <Route
                    path={PagePaths.EmployeeCreate}
                    exact={true}
                    component={FormContainer}
                />
            </Switch>
        </Page>
    )
};

export default App;
