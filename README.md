# mathcalc — 차곡차곡 연산

초1~중3 연산을 학년별로 골라 연습하는 학생용 앱 (단일 `index.html`, 서버·로그인 없음).

- 학생 화면: https://mathland25.github.io/mathcalc/
- 교사 화면: https://mathland25.github.io/mathcalc/#teacher

## 기록과 제출
- 학생 기록은 각자 기기의 localStorage에만 저장됩니다.
- 한 세트를 끝내면 구글 폼으로 자동 제출되고(개념 탐구 노트와 같은 폼), "선생님께 제출하기" 버튼과 코드 복사로도 보낼 수 있습니다.
- 교사 화면은 열 때 게시된 시트 CSV를 읽어 `app:'calc'` 코드만 모으고, 이름(띄어쓰기 제외)+반(2-1)이 같으면 한 학생으로 합칩니다.

## 제출 코드 규칙 (통합 교사용 화면과의 약속)
`GN2z.<base64url(deflate-raw(JSON))>`

```
{ v:2, app:'calc', id, name, cls, at, day, sem,
  ls:{ 단원id:{ s:상자0~5, d:완료0/1, c:[정답 수, 문항 수], u:갱신ms, h?, n? } } }
```

## catalog.json
단원 목록(95개)은 `index.html`의 `UNITS`에서 만듭니다. 단원을 추가·수정하면:

```
node tools/gen-catalog.mjs          # catalog.json 다시 만들기
node tools/gen-catalog.mjs --check  # index.html과 일치하는지 확인
```
