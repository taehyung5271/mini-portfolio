# React에서 상태 관리하는 방법
## useState
가장 기본적인 상태 관리 방법이다. 컴포넌트 내부에서 간단한 상태를 관리할 때 사용한다.

![리액트 스테이트](https://hslprbonsnqnizuabbpg.supabase.co/storage/v1/object/public/images/flux%20architecture.png)

## useReducer
복잡한 상태 로직이 필요할 때 사용한다. 여러 값이 연관되어 바뀌는 경우에 유용하다.

## 전역 상태 관리
컴포넌트 간에 상태를 공유해야 할 때는 Context API, Redux Toolkit, Zustand 같은 도구를 사용한다.