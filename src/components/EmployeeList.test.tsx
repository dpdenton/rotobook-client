import * as React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {ApiEndpoint} from "../types/enums";
import {getEmployeeList} from "../actions/entities";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import App from "../App";
import EmployeeListItem from "./EmployeeListItem";
import configureStore from '../store';

describe('Employee list integration tests', () => {

    let store: any;
    let httpMock: any;

    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

    beforeEach(() => {
        httpMock = new MockAdapter(axios);
        store = configureStore;
    });

    it('get employee list', async () => {

        const responseData = [
            {
                id: 1,
                name: 'David Denton',
                email: 'david@rotageek.com',
                message: 'Hello World',
            },
            {
                id: 2,
                name: 'Elton John',
                email: 'elton@rotageek.com',
                message: 'Hello World',
            }
        ];

        httpMock.onGet(ApiEndpoint.baseUrl + ApiEndpoint.employee).reply(200, responseData);

        const wrapper = mount(<Provider store={store}><App/></Provider>);

        expect(wrapper.find(EmployeeListItem)).toHaveLength(0);

        getEmployeeList()(store.dispatch);

        await flushAllPromises();
        wrapper.update();

        expect(wrapper.find(EmployeeListItem)).toHaveLength(2);

    })
});