# girlsfrontline-simulator

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Build Status](https://travis-ci.org/DDBase/girlsfrontline-simulator.svg?branch=master)](https://travis-ci.org/DDBase/girlsfrontline-simulator)
[![Dependency Status](https://dependencyci.com/github/DDBase/girlsfrontline-simulator/badge)](https://dependencyci.com/github/DDBase/girlsfrontline-simulator)

> 소녀전선 전투 시뮬레이터 라이브러리

현재 개발이 중단된 상태이며, 대신 Pixi.js 기반 [웹 시뮬레이터](https://github.com/CirnoV/RFB)를 제작 중에 있습니다.

## Feature
* 인형 데이터 파싱
* 제대 이동과 타겟팅
* 기본 공격 (HG, SMG, AR, RF, MG, 철혈)
* 진형 버프
* 자가 버프 스킬
* 전체 버프 스킬
* 일부 죽창류 스킬

현재 작업 상황은 [여기에서](https://trello.com/b/KmID8JpE) 확인하실 수 있습니다

## Install

```bash
$ git clone https://github.com/CirnoV/girlsfrontline-simulator.git
$ cd girlsfrontline-simulator
$ yarn
```

## Usage
코드 테스트

```bash
$ yarn test [TestPathPattern]
```

index.spec.js 테스트

```bash
$ yarn test index
```

전체 테스트

```bash
$ yarn test
```

## License
[MIT](./LICENSE)

## API
[API 문서](./src/api.md)
