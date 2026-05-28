# os-sw-high-02

오산소프트웨어고 1학년 특강 5교시 **라이브 바이브 코딩 데모** 작업 디렉토리.

학생들이 손들기·슬리도에 적은 *학교에서 자주 불편한 일* 6가지를 — Codex 같은 AI 에이전트에게 **바이브 코딩 프롬프트**로 던져서 한 화면짜리 프로토타입을 그 자리에서 만든다.

## 🔗 데모 보기

GitHub Pages: **<https://nalbam.github.io/os-sw-high-02/>**

| | 카테고리 | 프롬프트 | 데모 |
|---|---|---|---|
| **01** | 마감 | [ITEM-01.md](./ITEM-01.md) | [수행평가 마감 알리미](https://nalbam.github.io/os-sw-high-02/ITEM-01/) |
| **02** | 당번 | [ITEM-02.md](./ITEM-02.md) | [청소 당번 알리미](https://nalbam.github.io/os-sw-high-02/ITEM-02/) |
| **03** | 일정 | [ITEM-03.md](./ITEM-03.md) | [오늘 어디 가지?](https://nalbam.github.io/os-sw-high-02/ITEM-03/) |
| **04** | 학습 | [ITEM-04.md](./ITEM-04.md) | [오늘 할 일](https://nalbam.github.io/os-sw-high-02/ITEM-04/) |
| **05** | 공지 | [ITEM-05.md](./ITEM-05.md) | [공지 모아보기](https://nalbam.github.io/os-sw-high-02/ITEM-05/) |
| **06** | 점수 | [ITEM-06.md](./ITEM-06.md) | [체육대회 점수판](https://nalbam.github.io/os-sw-high-02/ITEM-06/) |

## 🎤 라이브 사용 흐름

1. 슬리도에 올라온 답을 보고 가장 가까운 카테고리 ITEM 을 고른다
2. 해당 `ITEM-0X.md` 의 **바이브코딩 프롬프트** 블록을 그대로 복사
3. Codex 에 붙여넣고 실행 — 한 화면이 만들어지는 과정을 함께 본다
4. 결과물이 좋으면 `docs/ITEM-0X/index.html` 로 커밋해서 데모 사이트로 공개

## 📁 디렉토리 구조

```
.
├── README.md            ← 이 파일
├── ITEM-0X.md           ← 라이브 데모용 바이브 코딩 프롬프트 6개
└── docs/                ← GitHub Pages 루트
    ├── index.html       ← 6개 데모를 모은 랜딩 페이지
    └── ITEM-0X/
        └── index.html   ← 각 데모 (한 화면 프로토타입)
```

## 🎨 프롬프트 공통 톤

각 ITEM 의 프롬프트는 다음을 공통 전제로 작성되어 있다:

- **한 화면짜리 웹 페이지** — 라이브 데모 10분 안에 결과가 보이게
- **데이터는 브라우저(`localStorage`)** — 백엔드·DB·인증 없음
- **모바일·PC 친화** — 학생이 폰으로도 쓸 수 있게
- **한국어 UI** — 학생 입장에서 바로 알아볼 수 있게
- 정확한 기술 스택은 명시하지 않음 — **AI 가 판단**하게 둔다 (바이브코딩)

## 🚀 GitHub Pages 설정

Settings → Pages

- **Source**: `Deploy from a branch`
- **Branch**: `main` · `/docs`

설정 후 `https://nalbam.github.io/os-sw-high-02/` 로 접속하면 랜딩 페이지가 뜨고, 각 카드에서 6개의 데모로 들어갈 수 있다.

## 🧪 로컬에서 보기

별도 빌드가 없는 정적 HTML 이라 그대로 열어도 되고, 간단히 서버를 띄워도 된다.

```sh
# Python 3
python3 -m http.server 8000 -d docs

# 또는 Node
npx serve docs
```

브라우저에서 <http://localhost:8000> 으로 접속.
