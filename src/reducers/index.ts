import {combineReducers} from 'redux';

import entities from './entities';
import forms from './forms';

const rootReducer = combineReducers({
    entities,
    forms,
});

export default rootReducer;