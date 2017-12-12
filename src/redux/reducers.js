import {combineReducers} from 'redux';
import undoable, {includeAction} from 'redux-undo';
import {simulatorReducer, optionReducer, FRAME_START} from './simulator';

const reducers = combineReducers({
  simulator: undoable(simulatorReducer, {filter: includeAction(FRAME_START)}),
  options: optionReducer,
});

export default reducers;
