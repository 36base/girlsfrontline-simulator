import {combineReducers} from 'redux';
import undoable from 'redux-undo';
import {simulatorReducer, optionReducer} from './simulator';

const reducers = combineReducers({
  simulator: undoable(simulatorReducer),
  options: optionReducer,
});

export default reducers;
