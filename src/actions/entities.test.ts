import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {ApiEndpoint} from "../types/enums";
import {GET_EMPLOYEE_LIST_REQUEST, GET_EMPLOYEE_LIST_SUCCESS, getEmployeeList} from "./entities";

describe('fetchDog action', () => {

    let store: any;
    let httpMock: any;

    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

    beforeEach(() => {
        httpMock = new MockAdapter(axios);
        const mockStore = configureMockStore();
        store = mockStore({});
    });

    it('get employee list', async () => {

        const responseData = [{
            id: 1,
            name: 'David Denton',
            email: 'david@rotageek.com',
            message: 'Hello World',
        }];

        // given
        httpMock.onGet(ApiEndpoint.baseUrl + ApiEndpoint.employee).reply(200, responseData);

        // when
        getEmployeeList()(store.dispatch);

        await flushAllPromises();

        // then
        expect(store.getActions()).toEqual(
            [
                {
                    type: GET_EMPLOYEE_LIST_REQUEST
                },
                {
                    payload: responseData,
                    type: GET_EMPLOYEE_LIST_SUCCESS
                }
            ]);
    })
});