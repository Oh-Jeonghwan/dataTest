# 데이터 전송 방법
## @RequestParam

### @RequestParam은 쿼리스트링을 통해 넘어오는 파라미터 값을 받는다. 주로 get방식과 사용되며, post나 put과 같이 사용될 때는 폼데이터 와 파라미터로 넘어오는 값들을 키-밸류 형태로 받을 수 있다.

- @RequestParam은 하나의 인자만 받을 수 있고 객체를 받지 못 한다.

- @RequestParam은 파일을 받을 수도 있다.

### 1. Get 방식으로 보낼 떄 콘텐트 타입에 따른 차이점(콘텐트 타입: Multipart/form-data, form-urlencoded, json)
- 넘겨주는 뷰단: 일반적인 폼형식 

  ![get 요청 시 html](https://user-images.githubusercontent.com/98066327/173469725-9b08ebe5-6e1d-487f-bd00-388e9495bb9d.png)

- get 요청 시 개발자 도구에서의 유알엘 형태와 요청헤드

  ![get 요청 시 url과 헤더](https://user-images.githubusercontent.com/98066327/173469898-87bfc7de-857b-4378-91f5-6848dfd85420.png)

- get 요청 시 페이로드(get 방식이지만 찍힌다.)

  ![get 요청 시 페이로드(파싱 전)](https://user-images.githubusercontent.com/98066327/173469949-8bd113d8-e1ce-4c9a-92db-1ea2e162b7da.png)
(파싱 전)

  ![get 요청 시 페이로드(파싱 후)](https://user-images.githubusercontent.com/98066327/173469994-c1add8ca-4128-4933-9d56-5687f588ca4e.png)
(파싱 후)

get 방식에서는 쿼리 스트링 형태로 넘어와 파싱되어 데이터로 읽힌다. 
content type이 따로 명시 되지 않기 때문에 multipart/form-data 방식과 x-www-form-urlencoded 형식의 차이가 없다.

/

#### Json은 위 2개와 다르다.

- json 요청 javascript

  ![get 요청 시 Json javascript](https://user-images.githubusercontent.com/98066327/173472200-1f7a75aa-96c1-4621-98a8-2d68e0dfbb87.png)

- json 요청 시 url과 요청 헤드

  ![get 요청 시 (json) url과 요청 헤더](https://user-images.githubusercontent.com/98066327/173472284-ac600437-5e24-4086-9632-e18ae55f8541.png)

- json 요청 시 페이로드 값

  ![get 요청 시 (json) 들어온 페이로드 값(디코딩 전)](https://user-images.githubusercontent.com/98066327/173472419-f30d6664-c6bd-4414-acd7-91a12c0d78e9.png)
디코딩 전

  ![get 요청 시 (json) 들어온 페이로드 값(디코딩 후)](https://user-images.githubusercontent.com/98066327/173472487-13ec7f85-754c-4ed6-8c4b-ed99e0dc168e.png)
디코딩 후


- json get 요청 시 에러사항

  - javascript로 요청 시

   ![get 요청 시 (json) 에러 사항(html로 보냈을 때)](https://user-images.githubusercontent.com/98066327/173472576-aca99cec-cb30-40e7-8df9-e1e8625db9ee.png)

   javascript로 요청 시 400 에러가 나는데 json형식의 데이터가 제대로 들어오지 않아 나는 오류이다. 


  - post맨으로 요청 시

   ![get 요청 시 (json) 에러 사항(postman으로 보냈을 때)](https://user-images.githubusercontent.com/98066327/173472632-93f02723-db1a-4a06-adc2-f7f4e6c28ef5.png)

    post맨으로 요청 시 또한 400 에러가 나는데 이때 나는 에러는 json 데이터를 @RequestParam이 받아주지 못 하고 보내준 데이터를 잃어버리게 되어 생기는 에러이다.


  #### 결론: @RequestParam에 Get 방식으로 요청할 때 contentType이 multipart/form-data, urlencoded 형태일 때는 쿼리스트링으로 들어오고 이를 파싱하여 잘 받아준다. 하지만 json 데이터일 떄는 제대로 받지 못 하고 정보를 잃어버리게 되어 400에러가 난다.


### 2. Post 방식으로 보낼 떄 콘텐트 타입에 따른 차이점(콘텐트 타입: Multipart/form-data, form-urlencoded, json)
  - Multipart/form-data(form/submit으로 전송시(파일 있을 때, 없을 때), jequery로 전송 시(파일 있을 때, 없을 때))
    - Multipart/form-data를 form/submit 방식으로 보낼 html
   
      ![@RequestaParam Post multipartformdata 뷰](https://user-images.githubusercontent.com/98066327/173475214-4ea31714-4594-4c71-a61b-ad3fdefd48e7.png)
      
      - 파일 첨부 시 요청 헤더(form/submit 방식)
      
        ![@RequestaParam Post multipartformdata (파일전송 시)](https://user-images.githubusercontent.com/98066327/173482003-b59d1851-6dc3-46a0-ad23-52c825500a37.png)
      
      데이터를 제대로 받아 주었지만 위에 사진에서 보는 것과 같이 파일 첨부 시 페이로드 값은 찍히지 않는다.(이게 맞는 것인지는 잘 모르겠다.)
    
      - 파일 미첨부 시 요청 헤더(form/submit 방식)
        
        ![@RequestaParam Post multipartformdata (파일미전송 시)헤더](https://user-images.githubusercontent.com/98066327/173484523-31199b45-fd52-44ca-beb9-62b410fa685f.png)
      
      - 파일 미첨부 시 페이로드(form/submit 방식)

        ![@RequestaParam Post multipartformdata (파일미전송 시) 페이로드 파싱되기 전](https://user-images.githubusercontent.com/98066327/173486950-ab4bf5a6-e4f0-40d3-a389-0c203c3345be.png)
        (파싱 전)
        
        ![@RequestaParam Post multipartformdata (파일미전송 시) 페이로드](https://user-images.githubusercontent.com/98066327/173484749-6e6956bc-5d9b-4412-b652-e58572ee2af6.png)
        (파싱 후)
        
        웹킷 형태로 찍히고 파일은 바이너리 형태로 들어오고 웹킷에는 파일 이름 등의 정보가 없는 것으로 찍히고 있다.(백단에도 값이 들어오는데 이게 맞는 것인지 잘 모르겠다.)
        
        <백단에 값 들어오는 사진>
        
        ![폼 전송 시 파일 안 보냈을 때도 값이 들어온다](https://user-images.githubusercontent.com/98066327/173485767-729a1602-59dd-42f8-9595-4645662b2c03.png)
        
    - Multipart/fomr-data jquery로 보냈을 때
   
      - 파일 첨부 시 요청 헤더(jquery 방식)
      - 
        ![jquery방식 요청헤더 파일 미첨부](https://user-images.githubusercontent.com/98066327/173487191-a912f4f8-ceb2-4491-9e63-545bfa9c4917.png)
      
      - 파일 미첨부 시 페이로드
        
        ![jquery방식 페이로드(파싱전) 파일 미첨부](https://user-images.githubusercontent.com/98066327/173487363-99a86195-d76a-4098-8ee1-a13e1f44668e.png)
        (파싱전)
        
        ![jquery방식 페이로드(파싱후) 파일 미첨부](https://user-images.githubusercontent.com/98066327/173487514-07b54e69-dc58-4ad0-807d-cd02b83e3747.png)
        (파싱후)
        
      - 파일 첨부 시: form/submit 방식과 달리 jquery 방식은 파일 첨부와 파일 미첨부 시와 동일하다.
      
  multipart/form-data type의 데이터를 @RequestParam으로 받게 된다면 웹킷 형태로 들어오고 그 데이터가 키:밸류 형태로 파싱되어 데이터를 읽을 수 있다.
  
      
  - form-urlencoded(이 방식으로는 파일을 보낼 수 없기에 form/submit 방식, jquery 방식 1번씩 진행)
    - form/submit 방식으로 보낼 html
    
      ![@RequestParam urlencoded view](https://user-images.githubusercontent.com/98066327/173488001-9e37674f-d75b-49d2-92b4-dc1c53c8d9eb.png)
    
    - 요청헤더(form/submit 방식)
    
      ![@ReuqestParam post로 요청(url, contentType)](https://user-images.githubusercontent.com/98066327/173488219-5604ccd8-1c02-43fb-bd73-2a12321d0205.png)
    
    - 페이로드
     
      ![@RequestParam post 페이로드 파싱되기 전(키=밸류 키=밸류)](https://user-images.githubusercontent.com/98066327/173488289-0dca8cb4-33a3-45cc-b98e-da3f995e3f9b.png)
      (파싱 전)
        
      ![@RequestParam post 페이로드 파싱된 후(키 밸류 키 밸류)](https://user-images.githubusercontent.com/98066327/173488309-803ab3e5-409e-4a15-96e3-603420881f7c.png) 
      (파싱 후)
     
    - jequery로 보내기: form-urlencoded 형태는 문자 형태의 데이터만 전송하기에 FormData를 보낼 수 없다. 
      Required request parameter 'title' for method parameter type String is not present] 내용의 400에러가 뜬다. 
   
   form-urlencoded 형태는 파일이나 jquery를 통해 폼데이터를 보낼 수 없고 @RequestParam으로 받는다면 쿼리스트링과 같은 형식의 키=밸류&키=밸류 형태로 데이터를 보내 키:밸류 형태로 파싱 하여 데이터를 읽게 된다.
        
        
        
    
    





