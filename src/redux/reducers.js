import {combineReducers} from 'redux';
import undoable from 'redux-undo';
import {simulatorReducer, optionReducer} from './simulator';
import {dollReducer} from './doll';

const reducers = undoable(combineReducers({
  simulator: simulatorReducer,
  dolls: dollReducer,
  options: optionReducer,
}));

export default reducers;
