import {GET_EMPLOYEE_LIST_FAILURE, GET_EMPLOYEE_LIST_REQUEST, GET_EMPLOYEE_LIST_SUCCESS} from "../actions/entities";
import {Entity} from "../types/models";

// @TODO add state interfaces
// flatten the data (altho data is already flat), but in production using something like https://github.com/paularmstrong/normalizr
// would also implement some form of caching bases as per https://sliced.co


interface EntityInterface<E> {
    loading: boolean,
    byId: {
        [key: number]: E
    },
    ids: number[]
}

type EntityStateInterface<E> = {
    [M in keyof E]: EntityInterface<E[M]>
}

const initialState = (): EntityStateInterface<Entity> => ({
    employee: {
        loading: false,
        byId: {},
        ids: [],
    }
});

const entities = (state = initialState(), action: any) => {

    switch (action.type) {

        case GET_EMPLOYEE_LIST_REQUEST:
            return {
                ...state,
                employee: {
                    ...state.employee,
                    loading: true
                }
            };
        case GET_EMPLOYEE_LIST_FAILURE:
            return {
                ...state,
                employee: {
                    ...state.employee,
                    loading: false
                },
                error: 'Error while fetching repositories'
            };

        case GET_EMPLOYEE_LIST_SUCCESS:

            return {
                ...state,
                employee: {
                    ...state.employee,
                    loading: false,
                    ids: setUserIds(state.employee.ids, action),
                    byId: setUsersById(state.employee.byId, action),
                }
            };
        default:
            return state;
    }
};


const setUsersById = (byId: any, action: any) => {

    const {data} = action.payload;

    const usersById = {};

    for (const item of data) {
        usersById[item.id] = item;
    }

    return Object.assign({}, byId, usersById);
};

const setUserIds = (ids: any, action: any) => {

    const {data} = action.payload;
    return data.map((item: any) => item.id);
};


export default entities;