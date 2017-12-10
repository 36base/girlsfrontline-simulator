// import {combineReducers} from 'redux';
// import undoable from 'redux-undo';
// import {createAction, handleAction, handleActions} from 'redux-actions';
import EventEmitter from 'eventemitter3';
import {calculate} from './calculator';
import reducers from './redux/reducers';
import {updateOptions, updateDolls} from './redux/simulator';
// import {calculate, registerEvents} from './calculator';

class Simulator extends EventEmitter {
  constructor() {
    super();

    this.initialState = {
      simulator: {
        frame: 0,
        dolls: [],
      },
      options: {
        night: false,
        realMode: false,
      },
    };

    this.reducers = reducers;
    this.store = {};
  }

  get dolls() {
    const state = this.store.getState();
    const {simulator: {present: {simulator: {dolls}}}} = state;

    return dolls;
  }

  // TODO: 댕댕베이스 데이터 의존성 제거
  init(dolls, options) {
    const {store: {dispatch}} = this;

    dispatch(updateOptions(options));
    dispatch(updateDolls(dolls));

    // TODO
    // this.dolls.forEach((doll) => registerEvents(doll, this));
  }

  start() {
    // FIXME: 프레임 제한이 아닌, 적이나 아군 제대 둘 중 하나가 전멸할 때 까지가 목표
    for (this.currentFrame = 1; this.currentFrame <= 900; this.currentFrame++) {
    // for (this.currentFrame = 1; this.currentFrame <= 3600; this.currentFrame++) {
      this.emit('frameStart');
      this.dolls
        .filter((doll) => doll.hp > 0)
        .forEach((doll) => calculate(doll, this));
      this.emit('frameEnd');
    }
  }
}

export default Simulator;
