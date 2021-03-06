# 테스트 코드 기반으로 작성하는 Todo List

## 비지니스 로직 테스트
- 단위 테스트, E2E 테스트
- 라이브러리 : jest, cypress

## 테스트 분류
- `단위 테스트 (Unit Test)` 란?
  - **작성한 애플리케이션에서 테스트 가능한 가장 작은 단위의 코드를 테스트하는 기법이다.**
  - 여러 작은 단위의 테스트들이 독립적으로 true, false 를 판단하기 때문에 테스트가 실패했을 경우, 어느 부분이 문제인지를 빠르게 판단할 수 있지만 애플리케이션의 전체적인 flow가 정상임을 보장하지 않는다.
   
- `E2E 테스트 (End to End Test)` 란?
  - **기능 테스트(Funtional Test)라고도 불리는 이 테스팅 기법은 말 그대로 끝에서 끝까지 테스트하는 기법이다.**
  - 사용자가 직접 애플리케이션을 사용하는 것처럼 동작하도록 스크립트를 작성하고, 이것을 실제로 실행시켜보면서 개발자가 의도한대로 도작하는지 검증할 수 있다.
  - lb) cypress, testcafe, nightwatch (現 회사에서는 testcafe 채택)
   
- `통합 테스트 (Integration Test)` 란?
  - **애플리케이션에서 두 가지 이상의 요소가 함께 상호 작용할 때, 개발자가 의도한 대로 동작하는지 테스트하는 기법이다.**
  - ex) Store에 연결(connect)된 Component를 테스트하는 경우 { Store ↔ Component }
  > 🤔 하지만 두 가지 이상의 요소가 함께 상호 작용하는 부분은 맞지만, 결국 하나의 가정을 테스트하기 때문에 이것을 통합 테스트라고 말할 수 있을지 의문이다. 따라서 단위테스트와 통합 테스트의 경계는 모호하다..

## 테스트의 기본 ルール
테스트는 아래의 내용을 만족해야 한다.
- 테스트 케이스(Test Case)는 반드시 `True`, `False`를 반환해야 한다.
- 위의 True, False는 반드시 어떠한 `가정`을 통해 포함한다.
- 개발자가 작성한 가정에 따라 출력된 **값(result)**이 **예상(expect)**한 값과 일치하는지에 따라 True, False가 결정된다.
- 테스트의 결과는 외부에 있는 어떤 요소에 의해 결정되는 부분이 없어야 하며 **오로지 가정에 의해서만** 결정되어야 한다.
- 즉, 가정이 변하지 않는 이상 테스트의 결과는 항상 동일해야 한다.
- 가정은 테스트 케이스의 의도(개발자가 생각한 로직)를 포함하며 각 테스트 케이스 하나 당 **하나의 의도만을 포함**해야 한다.

## 테스트 케이스 만들기
#### Given-When-Then pattern
기본적으로 `Given`, `When`, `Then`에 맞춰서 테스트 코드를 작성하고 있다.
```js
test(`should $1`, () => {
  // Given
  const data = $4;

  // When
  const result = $3;

  // Then
  expect(result).toEqual($2);
})
```
- 테스트를 작성할 때는 위 Code Snippet을 만들어 두고 아래의 1번부터 4번까지의 Flow를 작성한다.
    1. 테스트 케이스의 **목적**을 작성한다.
    2. 최종적으로 확인해야하는 부분, 즉 **예상하는 값**을 작성한다.
    3. 어떠한 **flow**를 검증할지 작성한다.
    4. 3번 검증을 위해 어떠한 **가정**이 필요한지 작성한다.
> **테스트 코드를 작성하는 것이 익숙하지 않을 때 어떤 순서로 어떻게 작성해야하는지 계속 버벅이는 경우가 많다.**
> 비지니스 로직을 작성하는 코드와 달리 테스트 코드 작성의 흐름이 익숙하지 않아서라고 코드 작성에 시간을 많이 소요해버린다고 생각된다.
> 따라서, 위의 **Code Snippet**를 토대로 **코드 작성의 순서를 강제로 정함**으로써 시간낭비를 줄일 수 있다.

## 라이브러리 설치
```
$ npm install --save-dev @testing-library/react-hooks
$ npm install --save-dev axios-mock-adapter
```

- `@testing-library/react-hooks` 란?
  - react hooks를 테스트 하기 위해 도움을 주는 라이브러리
- `axios-mock-adapter` 란?
  -  axios를 목킹하여 실제로 서버에 요청하지 않고 로컬에서 서버로부터 데이터를 받아온 척 해주는 라이브러리