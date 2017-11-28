import getDoll from './parser/doll'
import {calculate, registerEvents} from './calculator'
import EventEmitter from 'eventemitter3'

class Simulator extends EventEmitter {
  constructor (options) {
    super()
    this.dolls = []
    this.currentFrame = 0
    this.options = {
      night: false,
      realMode: false
    }
    if (typeof options === 'object') {
      Object.keys(options).forEach((key) => {
        this.options[key] = options[key]
      })
    }
  }

  init (slot, enemy) {
    const enemies = Object
      .keys(enemy)
      // 적 제대 이름 제외 Ex) "name": "0-2철혈 제226제대 구성"
      .filter((key) => key !== 'name')
      .map((key) => getDoll(enemy[key], 'enemy'))

    // 배열 인덱스로 버프 진형을 설정해야 하기 때문에 먼저 파싱한 뒤 필터링 하는 방식을 사용.
    const friendly = slot
      .map((item, index) => item ? getDoll(item, 'friendly', index) : undefined)
      .filter((item) => item !== undefined)

    // friendly와 enemies를 통합
    this.dolls = [...friendly, ...enemies]
    this.dolls.forEach((doll) => registerEvents(doll, this))
    this.currentFrame = 0
  }

  start () {
    // FIXME: 프레임 제한이 아닌, 적이나 아군 제대 둘 중 하나가 전멸할 때 까지가 목표
    for (this.currentFrame = 1; this.currentFrame <= 627; this.currentFrame++) {
    // for (this.currentFrame = 1; this.currentFrame <= 3600; this.currentFrame++) {
      this.emit('frameStart')
      this.dolls
        .filter((doll) => doll['hp'] > 0)
        .forEach((doll) => calculate(doll, this))
      this.emit('frameEnd')
    }
    return this.dolls
      .filter((doll) => doll['team'] === 'friendly')
      .map((item) => ({
        name: item['dollData']['codeName'],
        values: item['frameData']
      }))
  }
}

export default Simulator
