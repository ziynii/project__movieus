
### │ 소개

영화 서치 및 리뷰 사이트로
React 기반의 프레임워크인 NextJS로 api를 구성해 DB와 연결된 웹 어플리케이션을 제작했습니다.

<br />

### │ Link

**🔗 github**

[https://github.com/ziynii/project__movieus](https://github.com/ziynii/project__movieus)

🔗 **project site**

[https://project-movieus.vercel.app/](https://project-movieus.vercel.app/)

😊 테스트용 아이디와 인증번호:  testid@mius.com  /   144412

<br />


### │ 주요기능

1. 이메일 인증을 통해 로그인
2. 리뷰 쓰기, 삭제와 다른 유저의 리뷰 좋아요 기능
3. 영화 검색 및 영화 찜하기와 찜 한 목록 모아보기
4. 유저끼리 팔로우 기능


<br />


### │ Skill

🔸 **NextJS**

 React 기반의 프레임워크인 NextJS를 이용해 Serverless 한 웹 어플리케이션을 제작했습니다

🔸 **TailwindCSS**

 TailwindCSS로 스타일 작업을 진행했습니다

🔸 **PlanetScale + Prisma**

 SQL과 호환되는 Serverless 데이터베이스인 PlanetScale을 사용해 데이터를 관리했습니다

🔸  **SWR**

 데이터를 Fetch 할 때 SWR의 캐시를 이용해 불필요한 api 요청을 방지했습니다

<br />

### │ 주요 기능

**🔸 로그인 / 홈 / 검색**

 <p>
  <img src="https://user-images.githubusercontent.com/85431762/231251215-98584d0a-884a-40b9-810a-77a1b37af632.JPG" alt="로그인" width="250px"/>
  <img src="https://user-images.githubusercontent.com/85431762/231249635-87eaa8bc-aa51-45ad-8965-187c97cc7d4e.JPG" alt="홈" width="250px"/>
  <img src="https://user-images.githubusercontent.com/85431762/231249669-553a1735-b374-4ce8-8c80-dbfa24ba3f45.JPG" alt="검색" width="250px"/>
 </p>
 

<br />


🔸 **영화 상세페이지**

 <p>
  <img src="https://user-images.githubusercontent.com/85431762/231249639-80789808-d512-4a28-a18b-76bf2861e909.JPG" alt="영화 정보" width="250px"/>
  <img src="https://user-images.githubusercontent.com/85431762/231249661-d966b5aa-16d5-49ce-8e5b-145b17404bd1.JPG" alt="리뷰" width="250px"/>
  <img src="https://user-images.githubusercontent.com/85431762/231249654-aeef3862-d2e6-4c96-9508-5851194c9425.JPG" alt="추천 영화" width="250px"/>
 </p>

<br />


🔸 **리뷰 등록**

 <p>
  <img src="https://user-images.githubusercontent.com/85431762/231249672-16751822-5310-4508-8d35-a22a86cf02a2.JPG" alt="놀이터 글 전체보기" width="250px"/>
 </p>

<br />


🔸 **마이페이지**

 <p>
  <img src="https://user-images.githubusercontent.com/85431762/231249651-c99b4316-7031-4c33-a879-284db57a8128.JPG" alt="내 리뷰" width="250px"/>
  <img src="https://user-images.githubusercontent.com/85431762/231249644-df53036f-2ac4-4ed8-ba60-40df72b2aade.JPG" alt="찜 한 영화" width="250px"/>
  <img src="https://user-images.githubusercontent.com/85431762/231249628-3d4de551-7889-4e58-beaf-246b63d72c09.JPG" alt="팔로잉" width="250px"/>
  
<Br />


🔸 **유저페이지 / 프로필수정**

 <p>
  <img src="https://user-images.githubusercontent.com/85431762/231249631-f5c44609-f9dd-4687-a39b-40b9c4f6c291.JPG" alt="유저페이지" width="250px"/>
   <img src="https://user-images.githubusercontent.com/85431762/231249621-4222f997-fcc5-4544-916d-3583833d905c.JPG" alt="프로필 수정" width="250px"/></p>
 
<Br />


### │ Tablet



**🔸 홈**

  <img src="https://user-images.githubusercontent.com/85431762/231249679-0593c356-8860-4a22-8393-9f25c03ff4a4.JPG" width="500px"/>
  
  **🔸 영화 상세페이지**
  
  <img src="https://user-images.githubusercontent.com/85431762/231249676-54f515a0-5cd6-4174-b0fe-7fecb1fc669c.JPG"  width="500px"/>
  
  **🔸 마이페이지**
  
  <img src="https://user-images.githubusercontent.com/85431762/231249683-3dacdc65-3532-48f1-816a-b3c99313f921.JPG"  width="500px"/>


<br />

### │ Desktop



**🔸 홈**

  <img src="https://user-images.githubusercontent.com/85431762/231249609-45d7921e-f5cc-4d76-857c-fcba6995c382.JPG" width="500px"/>
  
  **🔸 영화 상세페이지**
  
  <img src="https://user-images.githubusercontent.com/85431762/231249597-dce2b419-9528-4ed5-ae77-016dc1e1b43e.JPG"  width="500px"/>
  
  **🔸 마이페이지**
  
  <img src="https://user-images.githubusercontent.com/85431762/231249612-76c44a84-7230-49aa-bc40-4d80d7595243.JPG"  width="500px"/>


<br />

### 🌟 Error & Solution

☑️ **Abort fetching component for route**

**[ ERROR ]**

```jsx
// 토큰이 인증되면 홈으로 이동
useEffect(() => {
    if (tokenData?.ok) {
      router.push('/');
    }
  }, [tokenData, router]);

// 유저가 존재하면 홈으로 이동
useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

```
위와 같이 token이 인증되었을 때와 user가 이미 존재할 때 홈 화면으로 이동하는 코드에서
아래와 같은 에러 메시지를 받았습니다.

<b>⚠️ ERROR: Abort fetching component for route ‘/’ </b>


**[ SOLUTION ]**

비슷한 케이스의 에러를 서치한 결과 token이 인증되었을 때 user가 생성되므로 

- 토큰 인증
- 유저가 존재

두 가지 useEffect 조건에 만족되기 때문에 router.push(’/’)가 두번 호출되어 에러가 발생하는 것으로 확인되었습니다.

이를 방지하기 위해 user가 존재한다면 홈으로 이동하는 코드를 login 페이지 컴포넌트에서 분리해 아래와 같이 미들웨어로 생성하였습니다.
```jsx
(_middleware.ts)

if (req.nextUrl.pathname.startsWith('/login')) {
    if (req.cookies.has('movieussession')) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
```


<Br />

☑️ **Vercel 배포 시 메일 발송이 되지 않는 오류**

**[ ERROR ]**

로컬 환경에서는 인증번호를 담은 메일이 전송되지만
vercel로 배포한 환경에서는 Status는 200으로 뜨나 메일이 보내지지 않는 오류가 있었습니다.

**[ SOLUTION ]**

Promise와 async/await을 추가해 해결했습니다.
기존의 코드에서는 Promise를 반환하지 않으므로 vercel이 메일이 발송되는 코드를
기다리지 않고 이메일이 전송되기 전에 vercel의 스크립트가 종료되어 발생한 오류였습니다.

<Br />


