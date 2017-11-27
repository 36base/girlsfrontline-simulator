# GirlsFrontline Simulator API

> 댕댕베이스 소녀전선 시뮬레이터 API

시뮬레이터에서 사용하는 API들을 개발자들이 사용하기 쉽게 모아놓은 문서입니다!

<a name="main"></a>
## [doll](#doll)
  * [team](#doll_team)
  * [hp](#doll_hp)
  * [posX, posY](#doll_pos)
  * [currentDummy](#doll_currentDummy)
  * [currentTarget](#doll_currentTarget)
  * [nextAtkFrame](#doll_nextAtkFrame)
  * [frameData](#doll_frameData)
  * [frameEvent](#doll_frameEvent)
  * [dollData](#doll_dollData)
    * [codeName](#dollData_codeName)
    * [level](#dollData_level)
    * [dummyLink](#dollData_dummyLink)
    * [gunType](#dollData_gunType)
    * [posX, posY](#dollData_posXY)
    * [stats](#dollData_stats)
    * [gridPos](#dollData_gridPos)
    * [effect](#doll_effect)
    * [skill](#doll_skill)

## [Simulator](#Simulator)
  * [new Simulator(options)](#Simulator_constructor)
  * [frameStart](#Simulator_frameStart)
  * [frameEnd](#Simulator_frameEnd)
  * [statCalculate](#Simulator_statCalculate)

<a name="doll"></a>
## [doll](#main) 멤버

<a name="doll_team"></a>
### [team](#main) ⇒ <code>String</code>
해당 인형의 진형을 나타냅니다.

| Value | Description |
| --- | --- |
| friendly | 아군 |
| enemy | 철혈 |

```javascript
const {team} = doll

if (team === 'friendly') {
  console.log('당신은 그리폰 소속!')
} else if (team === 'enemy') {
  console.log('당신은 철혈공조 소속!')
} else {
  console.log('당신은 누구?')
}
```

<a name="doll_hp"></a>
### [hp](#main) ⇒ <code>Number</code>
해당 인형의 현재 HP를 나타냅니다.

```javascript
const {hp} = doll

if (hp > 0) {
  console.log('당신은 살아있군요!')
} else {
  console.log('당신은 죽었습니다...')
}
```

<a name="doll_pos"></a>
### [posX, posY](#main) ⇒ <code>Number</code>
해당 인형의 현재 좌표를 나타냅니다.

```javascript
const {posX, posY} = doll

console.log(`인형은 현재 ${posX}, ${posY}에 있습니다.`)
```

<a name="doll_currentDummy"></a>
### [currentDummy](#main) ⇒ <code>Number(getter)</code>
해당 인형의 남은 더미를 나타냅니다.

```javascript
const {currentDummy} = doll

console.log(`인형의 남은 더미: ${currentDummy}개`)
```

<a name="doll_currentTarget"></a>
### [currentTarget](#main) ⇒ <code>Object(doll)</code>
해당 인형의 현재 타겟을 나타냅니다.

```javascript
const {currentTarget} = doll

if (currentTarget) {
  const {posX, posY} = currentTarget
  const {codeName} = currentTarget['dollData']

  console.log(`현재 타겟은 ${posX}, ${posY} 좌표의 ${codeName}입니다.`)

  // 현재 타겟은 12, 4 좌표의 ST AR-15입니다.
}
```

<a name="doll_nextAtkFrame"></a>
### [nextAtkFrame](#main) ⇒ <code>Number</code>
해당 인형이 다음에 공격할 프레임을 나타냅니다.

<a name="doll_frameData"></a>
### [frameData](#main) ⇒ <code>Array</code>
해당 인형의 프레임별 로그를 나타냅니다.

<a name="doll_frameEvent"></a>
### [frameEvent](#main) => <code>Array(Object)</code>
해당 인형이 특정 프레임에 실행할 함수를 나타냅니다.

```javascript
const {frameEvent, dollData} = doll
const {codeName} = dollData

// 130 프레임에 콜백 실행
frameEvent.push({
  frame: 130,
  callback: () => {
    console.log(`${codeName}이(가) 130 프레임에 호출되었습니다!`)
  }
})
```

<a name="doll_dollData"></a>
### [dollData](#main) ⇒ <code>Object(dollData)</code>
해당 인형의 데이터를 나타냅니다.

```javascript
const {dollData} = doll
const {level, dummyLink}

if (dollData['codeName'] === 'ST AR-15') {
  console.log(`${level}레벨 ${dummyLink}링 스타쟝 안뇽안뇽!!!`)
  // 100레벨 5링 스타쟝 안뇽안뇽!!!
}
```

## dollData 멤버

<a name="dollData_codeName"></a>
### [codeName](#main) ⇒ <code>String</code>
해당 인형의 이름을 나타냅니다.

<a name="dollData_level"></a>
### [level](#main) ⇒ <code>Number</code>
해당 인형의 레벨을 나타냅니다.

<a name="dollData_dummyLink"></a>
### [dummyLink](#main) ⇒ <code>Number</code>
해당 인형의 더미 개수를 나타냅니다.

<a name="dollData_gunType"></a>
### [gunType](#main) ⇒ <code>Number</code>
해당 인형의 타입을 나타냅니다.

| Value | Description |
| --- | --- |
| 1 | HG |
| 2 | SMG |
| 3 | RF |
| 4 | AR |
| 5 | MG |
| 6 | SG |

```javascript
const {gunType} = dollData

switch (gunType) {
  case 1: console.log('HG')
    break;
  case 2: console.log('SMG')
    break;
  case 3: console.log('RF')
    break;
  case 4: console.log('AR')
    break;
  case 5: console.log('SG')
    break;
  case 6: console.log('MG')
    break;
  default:
    console.log('UNKNOWN')
}
```

<a name="dollData_posXY"></a>
### [posX, posY](#main) ⇒ <code>Number</code>
(철혈 전용) 해당 인형이 배치된 좌표를 나타냅니다.

```javascript
const {posX, posY} = dollData

console.log(`인형은 ${posX}, ${posY}에 배치되었습니다.`)
```

<a name="dollData_stats"></a>
### [stats](#main) ⇒ <code>Object</code>
해당 인형의 기본 스탯을 나타냅니다.

| Key | Value Type | Description |
| --- | --- | --- |
| armor | Number | 장갑 |
| dodge | Number | 회피 |
| hit | Number | 명중 |
| hp | Number | 체력 |
| pow | Number | 화력 |
| range | Number | 사거리(철혈) |
| rate | Number | 사속 |
| shield | Number | 보호막(철혈) |
| speed | Number | 이동속도 |
| crit | Number | 크리티컬 확률(%) |
| critDmg | Number | 크리티컬 데미지 추가 증가량(%) |
| armorPiercing | Number | 장갑 관통 |
| nightView | Number | 야간전 명중(%) |
| coolDown | Number | 쿨타임 감소(%) |
| bullet | Number | 장탄 수 |

<a name="dollData_gridPos"></a>
### [gridPos](#main) ⇒ <code>Number</code>
(아군 전용) 해당 인형이 소속된 제대에서의 위치를 나타냅니다.


<a name="doll_effect"></a>
### [effect](#main) ⇒ <code>Object(effect)</code>
해당 인형의 진형 버프 데이터를 나타냅니다.

| Key | Value Type | Description |
| --- | --- | --- |
| effectType | Number | 버프 대상 |
| effectCenter | Number | 버프 중심 |
| effectPos | Array(Number) | 버프 적용 위치 |
| gridEffect | Array(Effect) | 버프 목록 |

| Key | Value Type | Description |
| --- | --- | --- |
| Effect.type | [String(stat)](#dollData_stats) | 스탯 종류 |
| Effect.value | Number | 스탯 증가량 |

```javascript
const {dollData} = doll
const {effect} = dollData

effect['gridEffect'].map((elem) => {
  console.log(`${elem['type']} 스탯 ${elem['type']}% 상승`)
})
```


<a name="doll_skill"></a>
### [skill](#main) ⇒ <code>Object(skill)</code>
해당 인형의 스킬 데이터를 나타냅니다.

| Key | Value Type | Description |
| --- | --- | --- |
| activeTime | Number | 스킬 사용 시간 |
| coolDown | Number | 스킬 쿨타임 |
| duration | Number | 스킬 지속시간 |
| actionId | Number | 스킬 ID? |
| dataPool | Array(Number) | 스킬 효과 |
| nightDataPool | Array(Number) | 스킬 효과(야간전) |
| buffTarget | Array(buffInfo) | 전체 버프 정보 |
| buffSelf | Array(buffInfo) | 자가 버프 정보 |

| Key | Value Type | Description |
| --- | --- | --- |
| buffInfo.type | [String(stat)](#dollData_stats) | 스킬 버프 타입 |
| buffInfo.target | Number | ??? |

<a name="Simulator"></a>
## [Simulator](#main)

<a name="Simulator_constructor"></a>
### [new Simulator(options)](#main)

| Key | Default | Description |
| --- | --- | --- |
| options.night | false | 야간전 |
| options.realMode | false | 실제 전투 모드 |

```javascript
const simul = new Simulator({
  night: true,
  realMode: true
})
```

## Simulator Events

<a name="Simulator_frameStart"></a>
### [frameStart](#main)
프레임이 시작되었을 때 호출됩니다.

#### Usage
```javascript
Simulator.on('frameStart', () => {
  console.log('프레임이 시작되었습니다!')
})
```

<a name="Simulator_frameEnd"></a>
### [frameEnd](#main)
프레임이 종료되었을 때 호출됩니다. 모든 계산이 종료된 상태이므로 제대 전체를 컨트롤 할 때 유용합니다.

#### Usage
```javascript
Simulator.on('frameEnd', () => {
  console.log('프레임이 종료되었습니다!')
})
```

<a name="Simulator_statCalculate"></a>
### [statCalculate](#main)
스탯을 연산 할 때 호출됩니다.

| Key | Value Type | Description |
| --- | --- | --- |
| add | [stats](#dollData_stats) | 스탯 증가량 |
| effectMul | [stats](#dollData_stats) | 진형 버프에 의한 스탯 증가량 |
| skillMul | [stats](#dollData_stats) | 스킬 버프에 의한 스탯 증가량 |

#### Usage
```javascript
Simulator.on('statCalculate', (doll, addStats) => {
  if (doll['codeName'] === 'ST AR-15') {
    // 화력 10 증가
    addStats['add']['pow'] += 10

    // (진형 버프) 화력 25% 증가
    addStats['effectMul']['pow'] += 1.25

    // (스킬 버프) 화력 25% 증가
    addStats['skillMul']['pow'] *= 1.25
  }
})
```
