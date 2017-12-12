// import {combineReducers} from 'redux';
// import undoable from 'redux-undo';
// import {createAction, handleAction, handleActions} from 'redux-actions';
import EventEmitter from 'eventemitter3';
// import {calculate} from './calculator';
import reducers from './redux/reducers';
import {startFrame, initDolls, initOptions} from './redux/simulator';
import {calculate, registerEvents} from './calculator';
import {initBattleStat} from './calculator/battleStat';

class Simulator extends EventEmitter {
  constructor() {
    super();

    this.initialState = {
      simulator: {
        frame: 0,
      },
      dolls: {},
      options: {
        night: false,
        realMode: false,
      },
    };

    this.reducers = reducers;
    this.store = {};
  }

  dispatch = (action) => {
    this.store.dispatch(action);
  };

  get present() {
    const state = this.store.getState();
    const {simulator: {simulator: {present}}} = state;

    return present;
  }

  get currentFrame() {
    const {present: {frame}} = this;

    return frame;
  }

  get options() {
    const state = this.store.getState();
    const {simulator: {options}} = state;

    return options;
  }

  get dolls() {
    const {present: {dolls}} = this;

    return dolls;
  }

  getDoll = (index) => this.dolls[index];

  // TODO: 댕댕베이스 데이터 의존성 제거
  init(dolls, options) {
    // index must not be '0' because targetIndex defaults to 0.
    if (Object.keys(dolls).some((index) => index === '0')) {
      throw new Error('Index must not be \'0\'');
    }

    const {store: {dispatch}} = this;

    dispatch(initOptions(options));
    dispatch(initDolls(dolls));

    this.removeAllListeners();

    Object.keys(this.dolls).forEach((key) => {
      registerEvents(this, key);
      initBattleStat(this, key);
    });
  }

  next() {
    this.dispatch(startFrame(this.currentFrame + 1));
    this.emit('frameStart');
    Object.keys(this.dolls)
      .filter((key) => this.dolls[key].hp > 0)
      .forEach((key) => calculate(this, key));
  }
}

export default Simulator;
