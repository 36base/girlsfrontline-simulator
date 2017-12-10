import {combineReducers} from 'redux';
import undoable from 'redux-undo';
import {simulatorReducer, optionReducer} from './simulator';

const reducers = undoable(combineReducers({
  simulator: simulatorReducer,
  options: optionReducer,
}));

export default reducers;
