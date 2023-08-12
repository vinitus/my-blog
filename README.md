# Serialization된 JSX를 보기 위한 프로젝트

## 실행방법

1. npm install
2. npm run build
3. npm run start

npm run dev를 사용해도 되지만, 프로덕션 환경인 빌드된 파일에서 사용해보길 권장드립니다.

## 테스트 방법

1. 웹 서버가 켜지면 접속하고, 개발자 도구를 열고, 네트워크 탭을 열어야만 합니다.
2. 블로그 로고를 누르면 /hi url로 이동하는데, 이때 `hi?~~~=~~~`로 된 파일이 다운로드되는 것을 볼 수 있습니다.

이 파일이 바로 app/hi/page.tsx가 Serialization된 jsx코드입니다.
