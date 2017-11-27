## 연구 결과 정리

### 제대

#### 그리폰 제대 초기 위치

| 1열 | 2열 | 3열 |
| --- | --- | --- |
| (-2, 8) | (0, 8) | (2, 8) |
| (-2, 4) | (0, 4) | (2, 4) |
| (-2, 0) | (0, 0) | (2, 0) |

#### 제대 이동속도(초)

| 종류 | 이동속도 |
| --- | --- |
| 그리폰 제대 | `(전체 speed중 최저값) / 5` |
| 철혈 인형 | `speed / 5` |

### 사거리 & 타겟팅

#### 사거리 & 타겟팅 범위
| 종류 | 적용 계산식 (출처: [Wikipedia](https://en.wikipedia.org/wiki/Euclidean_distance)) | 사거리 | 타겟팅 범위 |
| --- | --- | --- | --- |
| 철혈 인형 | ![유클리드 거리 (2차원)](https://wikimedia.org/api/rest_v1/media/math/render/svg/6dd5850dcf5a994208de0ce308a727c6163acdf4) | `range` | `range - 1` |
| 그리폰 제대 (1 ~ 2열) | ![유클리드 거리 (1차원)](https://wikimedia.org/api/rest_v1/media/math/render/svg/40acb4e3dca881674b97303ffabfae6f28e3952e) | `-(진형 x좌표값) + 7` | 사거리와 동일 |
| 그리폰 제대 (1 ~ 3열) | ![유클리드 거리 (1차원)](https://wikimedia.org/api/rest_v1/media/math/render/svg/40acb4e3dca881674b97303ffabfae6f28e3952e) | `-(진형 x좌표값) + 9` | 사거리와 동일 |

#### 타겟팅 조건
| 종류 | 조건 | 우선순위 |
| --- | --- | --- |
| 철혈 인형 | 가장 가까운 거리에 있는 적 | 없음 |
| AR | 가장 가까운 거리에 있는 적 | 저격병 > ??? > 기타 |
| RF | 가장 먼 거리에 있는 적 | 저격병 > ??? > 기타 |
| HG, SMG, MG, SG | 랜덤 | 없음 |
