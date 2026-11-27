# Frontend Convention

본 문서는 함께(Hamggae) 프로젝트의 프론트엔드 개발 및 협업을 위한 공통 규칙을 정리한 문서입니다.

모든 팀원은 아래 컨벤션을 준수하여 일관된 코드 스타일과 원활한 협업을 유지합니다.

## 1. Git Branch Convention

### 1.1 브랜치 전략

| 브랜치 | 역할 |
|---|---|
| `main` | 최종 배포 및 안정화된 코드를 관리하는 브랜치 |
| `dev` | 기본(Default) 브랜치. 개발한 기능을 통합하고 테스트하는 브랜치 |
| `feat/*` | 새로운 기능 개발 |
| `fix/*` | 버그 및 오류 수정 |
| `refactor/*` | 기존 코드 구조 개선 |
| `docs/*` | 문서 추가 및 수정 |
| `chore/*` | 프로젝트 설정 및 기타 작업 |

- 모든 작업 브랜치는 최신 `dev` 브랜치에서 생성합니다.
- `main`과 `dev` 브랜치에 직접 Push하지 않고 PR을 통해 Merge합니다.
- 기능 개발 및 수정 작업은 `dev` 브랜치를 대상으로 PR을 생성합니다.
- 최종 배포 또는 안정화된 버전을 반영할 때 `dev`에서 `main`으로 PR을 생성합니다.

### 1.2 브랜치 네이밍 규칙

**형식**

`타입/#이슈번호-작업내용`

**예시**

```text
feat/#1-login
feat/#2-home-page
fix/#3-login-error
refactor/#4-header
docs/#5-readme
chore/#6-eslint
```

**작성 규칙**

- 브랜치명은 영문 소문자로 작성합니다.
- 작업 내용은 간결하게 작성합니다.
- 단어 사이는 하이픈(`-`)으로 구분합니다.
- 작업에 해당하는 GitHub Issue 번호를 포함합니다.
- 하나의 브랜치에서는 하나의 Issue에 해당하는 작업을 진행하는 것을 원칙으로 합니다.

## 2. Commit Convention

### 2.1 커밋 메시지 형식

`타입: 작업 내용`

**예시**

```text
feat: 로그인 기능 구현
fix: 로그인 버튼 클릭 오류 수정
refactor: Header 컴포넌트 구조 개선
docs: README 업데이트
chore: ESLint 설정 변경
```

### 2.2 커밋 타입

| 타입 | 설명 |
|---|---|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 및 오류 수정 |
| `refactor` | 기능 변경 없이 코드 구조 개선 |
| `style` | 코드 포맷, 공백 등 기능과 무관한 스타일 수정 |
| `docs` | README 등 문서 추가 및 수정 |
| `test` | 테스트 코드 추가 및 수정 |
| `chore` | 프로젝트 설정, 패키지 관리 등 기타 작업 |


### 2.3 커밋 메시지 작성 규칙

- 타입은 영문 소문자로 작성합니다.
- 타입 뒤에 콜론(`:`)과 공백 한 칸을 추가합니다.
- 작업 내용은 한글 또는 영어로 간결하고 명확하게 작성합니다.
- 하나의 커밋에는 가급적 하나의 논리적인 변경 사항만 포함합니다.
- 불필요한 커밋이나 의미를 알기 어려운 메시지는 지양합니다.

**올바른 예시**

```text
feat: 회원가입 폼 유효성 검사 구현
fix: API 응답 데이터 처리 오류 수정
style: 코드 들여쓰기 및 포맷 정리
chore: Prettier 설정 추가
```

**지양 예시**

```text
수정
작업 완료
fix
final
```

## 3. Git Workflow

### 3.1 전체 작업 흐름

1. GitHub Issue 생성
2. 최신 `dev` 브랜치 반영
3. `dev` 기반 작업 브랜치 생성
4. 기능 구현 및 자체 테스트
5. 변경 사항 Commit 및 Push
6. `dev` 브랜치를 대상으로 Pull Request 생성
7. 최소 1명 이상의 팀원에게 코드 리뷰 요청
8. 리뷰 및 수정 사항 반영
9. 승인 후 `dev` 브랜치에 Merge
10. 기능 통합 및 최종 테스트 후 작업 마무리 시점에 `main` 브랜치에 Merge

### 3.2 Issue 규칙

- 작업 시작 전 GitHub Issue를 생성합니다.
- Issue 제목은 `타입: 작업 내용` 형식으로 작성합니다.
- 담당자(Assignee)와 적절한 Label을 설정합니다.

**Issue 제목 예시**

```text
feat: 로그인 페이지 구현
fix: 홈 화면 데이터 로딩 오류 수정
refactor: 공통 버튼 컴포넌트 개선
docs: 프로젝트 실행 방법 추가
chore: 프로젝트 초기 설정
```

### 3.3 브랜치 생성

작업 브랜치는 항상 최신 `dev` 브랜치에서 생성합니다.

```bash
git switch dev
git pull origin dev
git switch -c feat/#1-login
```

이후 해당 브랜치에서 기능을 개발합니다.

### 3.4 최신 dev 브랜치 반영

다른 팀원의 PR이 Merge되어 `dev` 브랜치가 변경되었다면 현재 작업 브랜치에도 최신 내용을 반영합니다.

```bash
git fetch origin
git merge origin/dev
```

- 위 명령어는 현재 작업 브랜치에서 실행합니다.
- 충돌(Conflict)이 발생하면 충돌 내용을 확인한 후 직접 해결합니다.
- 충돌 해결 후 변경된 기능이 정상적으로 작동하는지 확인합니다.

### 3.5 Pull Request 규칙

- PR 제목은 `타입: 작업 내용` 형식으로 작성합니다.
- 기존 PR Template을 활용합니다.
- PR 생성 전 코드 오류 및 불필요한 변경 사항이 없는지 확인합니다.
- 최소 1명 이상의 팀원에게 리뷰를 요청하고 승인 후 Merge합니다.
- 리뷰에서 수정 요청을 받았다면 해당 내용을 반영합니다.

**PR 생성 전 체크리스트**

- [ ] 최신 `dev` 브랜치의 변경 사항을 반영했는가?
- [ ] 구현한 기능이 정상적으로 작동하는가?
- [ ] 불필요한 코드 및 디버깅용 `console.log`를 제거했는가?
- [ ] 빌드 및 필요한 테스트를 완료했는가?

### 3.6 Merge 및 브랜치 삭제

- 팀원 리뷰 및 승인 후 PR을 Merge합니다.
- Merge 방식은 팀 내 합의된 방식을 따릅니다.
- Merge 완료 후 사용하지 않는 작업 브랜치는 삭제합니다.
- `main` 브랜치는 일반적인 기능 개발에 사용하지 않습니다.

## 4. Project Folder Structure

현재 프로젝트의 초기 설정을 기준으로 아래 폴더 구조를 유지합니다.

```text
hahmgae-FE/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CONTRIBUTING.md
├── .husky/
│   └── pre-commit
├── src/
│   ├── apis/
│   │   └── axios.ts
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   │   └── HomePage.tsx
│   ├── routes/
│   │   └── router.tsx
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### 4.1 폴더별 역할

| 폴더 | 역할 |
|---|---|
| `apis/` | Axios 설정 및 API 요청 관련 코드 |
| `components/` | 재사용 가능한 공통 UI 컴포넌트 |
| `hooks/` | 커스텀 React Hook |
| `pages/` | 페이지 단위 컴포넌트 |
| `routes/` | 페이지 라우팅 설정 |
| `types/` | 공통 TypeScript 타입 및 인터페이스 |
| `utils/` | 여러 곳에서 사용하는 공통 유틸리티 함수 |

### 4.2 폴더 구조 규칙

- 기존 폴더 구조를 우선적으로 활용합니다.
- 재사용 가능한 UI는 `components/`에 작성합니다.
- 페이지 단위 UI는 `pages/`에 작성합니다.
- API 관련 코드는 `apis/`에서 관리합니다.
- 여러 컴포넌트에서 사용하는 공통 로직은 `hooks/` 또는 `utils/`로 분리합니다.
- 프로젝트 규모가 커지는 경우 팀원과 협의하여 하위 폴더를 추가할 수 있습니다.
- 폴더의 역할이 중복되지 않도록 관리합니다.

## 5. Code Style Convention

### 5.1 기본 규칙

- React와 TypeScript를 사용합니다.
- 함수형 컴포넌트와 React Hook 사용을 기본으로 합니다.
- 코드 포맷팅은 프로젝트에 설정된 Prettier 규칙을 따릅니다.
- 코드 품질 검사는 프로젝트에 설정된 ESLint 규칙을 따릅니다.
- `const` 사용을 우선하며 재할당이 필요한 경우에만 `let`을 사용합니다.
- `var`는 사용하지 않습니다.
- 불필요한 주석 및 사용하지 않는 코드는 제거합니다.
- 동일한 로직이 반복되는 경우 공통 함수나 컴포넌트로 분리하는 것을 고려합니다.

### 5.2 네이밍 규칙

| 구분 | 규칙 | 예시 |
|---|---|---|
| React 컴포넌트 | PascalCase | `LoginForm`, `Header` |
| 컴포넌트 파일 | PascalCase | `LoginForm.tsx` |
| 페이지 컴포넌트 | PascalCase + Page | `HomePage.tsx` |
| 변수 | camelCase | `userName`, `isLoggedIn` |
| 함수 | camelCase | `handleLogin`, `fetchUserData` |
| 커스텀 Hook | use + PascalCase | `useAuth`, `useModal` |
| 타입 / 인터페이스 | PascalCase | `User`, `LoginRequest` |
| 상수 | UPPER_SNAKE_CASE | `API_BASE_URL` |
| CSS 클래스 | kebab-case | `login-form`, `header-title` |

**추가 규칙**

- 변수명과 함수명은 역할을 쉽게 이해할 수 있도록 작성합니다.
- 이벤트 핸들러 함수는 `handle` 접두사를 권장합니다.
- Boolean 변수는 `is`, `has`, `can` 등의 접두사를 권장합니다.
- 커스텀 Hook은 반드시 `use`로 시작합니다.
- 의미를 파악하기 어려운 축약어 사용은 지양합니다.

### 5.3 React 컴포넌트 규칙

- 컴포넌트는 함수형으로 작성합니다.
- 하나의 컴포넌트가 지나치게 많은 역할을 담당하지 않도록 분리합니다.
- 컴포넌트에서 사용하는 Props는 TypeScript로 타입을 정의합니다.
- 동일한 UI가 반복되면 공통 컴포넌트로 분리하는 것을 고려합니다.
- 불필요한 상태(State) 선언을 지양합니다.
- 컴포넌트 내에 복잡한 비즈니스 로직을 과도하게 작성하지 않습니다.

**예시**

```tsx
interface LoginButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

function LoginButton({
  isLoading,
  onClick,
}: LoginButtonProps) {
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? '로그인 중...' : '로그인'}
    </button>
  );
}

export default LoginButton;
```

### 5.4 TypeScript 규칙

- 변수와 함수의 타입을 명확하게 관리합니다.
- TypeScript가 타입을 정확하게 추론하는 경우 불필요한 타입 선언은 생략할 수 있습니다.
- `any` 타입 사용은 지양합니다.
- 객체의 데이터 구조는 `interface` 또는 `type`으로 정의합니다.
- 여러 곳에서 사용하는 공통 타입은 `types/` 폴더에서 관리합니다.
- 컴포넌트에서만 사용하는 간단한 Props 타입은 해당 컴포넌트 파일에 정의할 수 있습니다.
- 타입 단언(`as`)은 필요한 경우에만 사용합니다.

**예시**

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
```

### 5.5 CSS 스타일 규칙

- CSS 클래스명은 kebab-case를 사용합니다.
- 클래스명은 해당 요소의 역할을 알 수 있도록 작성합니다.
- 기본적으로 스타일은 클래스 선택자를 중심으로 작성합니다.
- 불필요한 `!important` 사용을 지양합니다.
- 동일한 스타일 값이 반복되는 경우 CSS 변수를 활용합니다.
- 공통 스타일은 `index.css`와 같은 전역 스타일 파일에서 관리합니다.
- 컴포넌트별 스타일은 필요에 따라 CSS Modules(`.module.css`)를 활용하여 스타일 충돌을 방지합니다.
- 인라인 스타일은 동적으로 계산되는 값 등 필요한 경우에만 사용합니다.

**일반 CSS 예시**

```css
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-form__button {
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.login-form__button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

**CSS 작성 규칙**

- 들여쓰기와 속성 정렬은 Prettier 설정을 따릅니다.
- 스타일을 임의로 중복 작성하기보다 기존 공통 스타일을 우선 확인합니다.
- 색상, 폰트, 간격 등 공통 디자인 값은 가능한 한 일관되게 사용합니다.

### 5.6 API 및 비동기 처리 규칙

- API 요청은 `apis/` 폴더에서 관리합니다.
- 공통 Axios 설정은 기존 `apis/axios.ts`를 활용합니다.
- 동일한 API 요청 로직을 여러 컴포넌트에 중복 작성하지 않습니다.
- 비동기 작업에는 `async/await` 사용을 권장합니다.
- API 요청 실패 상황에 대한 오류 처리를 작성합니다.
- API 응답 데이터의 타입을 명확하게 정의합니다.
- API 주소 및 민감한 설정값은 환경 변수로 관리합니다.

**환경 변수 관리**

- `.env` 파일 등 실제 비밀값이 포함된 파일은 GitHub에 업로드하지 않습니다.
- 필요한 환경 변수의 이름은 `.env.example`에 정리합니다.
- API Key 등 민감한 정보가 클라이언트 번들에 노출되지 않도록 주의합니다.

## 6. Code Review Convention

### 6.1 리뷰 규칙

- 모든 PR은 최소 1명 이상의 팀원에게 리뷰받는 것을 원칙으로 합니다.
- 리뷰어는 코드의 기능, 가독성, 중복 여부 및 오류 가능성을 확인합니다.
- 수정이 필요한 부분은 구체적으로 설명합니다.
- 리뷰 요청 사항을 반영한 후 Merge를 진행합니다.

### 6.2 리뷰 시 확인 사항

- [ ] 요구된 기능이 정상적으로 구현되었는가?
- [ ] 코드 스타일 및 네이밍 규칙을 준수했는가?
- [ ] 불필요한 중복 코드가 없는가?
- [ ] 다른 기능에 영향을 주는 변경 사항은 없는가?
- [ ] 오류 및 예외 상황을 적절히 처리했는가?
- [ ] 불필요한 디버깅 코드가 포함되어 있지 않은가?

## 7. 기타 협업 규칙

- 작업 시작 전 담당 Issue를 확인합니다.
- 공통 컴포넌트나 프로젝트 설정을 수정할 경우 다른 팀원에게 공유합니다.
- 여러 파일에 영향을 주는 구조 변경은 사전에 팀원과 협의합니다.
- 새로운 라이브러리를 도입할 경우 팀원과 사용 목적을 공유합니다.
- 충돌이 발생했을 때 다른 팀원의 코드를 임의로 삭제하지 않습니다.
- 코드에 비밀번호, API Secret 등 민감한 정보를 직접 작성하지 않습니다.
- 컨벤션 변경이 필요한 경우 팀원과 합의한 후 문서를 수정합니다.

---

본 컨벤션은 프로젝트 진행 상황 및 팀원 간 협의에 따라 수정될 수 있습니다.
