// import {combineReducers} from 'redux';
// import undoable from 'redux-undo';
// import {createAction, handleAction, handleActions} from 'redux-actions';
import EventEmitter from 'eventemitter3';
// import {calculate} from './calculator';
import reducers from './redux/reducers';
import {updateFrame, updateDolls, updateOptions} from './redux/simulator';
import {calculate, registerEvents} from './calculator';

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
    const {store: {dispatch}} = this;

    dispatch(updateOptions(options));
    dispatch(updateDolls(dolls));

    this.removeAllListeners();

    Object.keys(this.dolls)
      .forEach((key) => registerEvents(this, key));
  }

  start() {
    // FIXME: 프레임 제한이 아닌, 적이나 아군 제대 둘 중 하나가 전멸할 때 까지가 목표
    for (this.currentFrame = 1; this.currentFrame <= 900; this.currentFrame++) {
    // for (this.currentFrame = 1; this.currentFrame <= 3600; this.currentFrame++) {
      this.emit('frameStart');
      Object.keys(this.dolls)
        .filter((key) => this.dolls[key].hp > 0)
        .forEach((key) => calculate(this, key));
      // this.emit('frameEnd');
    }
  }

  next() {
    this.store.dispatch(updateFrame(this.currentFrame + 1));
    this.emit('frameStart');
    Object.keys(this.dolls)
      .filter((key) => this.dolls[key].hp > 0)
      .forEach((key) => calculate(this, key));
  }
}

export default Simulator;
