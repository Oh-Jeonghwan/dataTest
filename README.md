# 데이터 전송 방법
## @RequestParam

### @RequestParam은 쿼리스트링을 통해 넘어오는 파라미터 값을 받는다. 주로 get방식과 사용되며, post나 put과 같이 사용될 때는 폼데이터 와 파라미터로 넘어오는 값들을 키-밸류 형태로 받을 수 있다.

- @RequestParam은 하나의 인자만 받을 수 있고 객체를 받지 못 한다.

- @RequestParam은 파일을 받을 수도 있다.

### 1. Get 방식으로 보낼 때 콘텐트 타입에 따른 차이점(콘텐트 타입: Multipart/form-data, form-urlencoded, json)
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
content type이 따로 명시 되지 않는다. get 방식에는 contentType이 없는 건지, 기본값이 form-urlencoded 타입이지만 body로 넘어가지 않기 때문에 나타나지 않는 것인지는 잘 모르겠다.

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


   @RequestParam에 Get 방식으로 요청할 때 contentType이 multipart/form-data, urlencoded 형태일 때는 쿼리스트링으로 들어오고 이를 파싱하여 잘 받아준다. 하지만 json 데이터일 때는 제대로 받지 못 하고 정보를 잃어버리게 되어 400에러가 난다.


### 2. Post 방식으로 보낼 때 콘텐트 타입에 따른 차이점(콘텐트 타입: Multipart/form-data, form-urlencoded, json)
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

## @RequestBody

### @RequestBody 는 요청 본문의 body에 json이나 xml 값으로 요청을 하여 HttpMessageConverter를 거쳐 javaObject에 맞는 타입으로 바꿔서 바인딩을 시켜준다. Http request message 를 역직렬화(javaObject로 파싱) 해주는 역할을 한다. 따라서 기본생성자가 필요하다.(객체에 데이터를 써주는 게 아니라 넘어온 데이터를 javaObject로 변환해주기 때문에 setter 메소드는 필요없다.) 
  *직렬화: 자바 시스템 내부에서 사용되는 Object 또는 Data를 외부의 자바 시스템에서도 사용할 수 있도록 byte 형태로 데이터를 변환하는 기술.
  - @RequestBody 는 파일을 받을 수 없다. (바이너리 방식으로 들어오는 파일은 json 형식을 받아서 javaObject로 파싱해주는 @RequestBody로는 받아줄 수 없다.)

### 1. Get 방식으로 보낼 때 콘텐트 타입에 따른 차이점(콘텐트 타입: Multipart/form-data, form-urlencoded, json) 
  - 넘겨주는 뷰단
  
    ![@RequestBody Get 방식](https://user-images.githubusercontent.com/98066327/173621131-0ed598ca-cc1a-4f6d-8c7a-9b812e23ae87.jpg)
    
  - get 요청 시 개발자 도구에서의 요청헤더
  
    ![@RequestBody Get 방식 요청헤더와 유알엘(파싱 전)](https://user-images.githubusercontent.com/98066327/173621724-da8679f0-25b3-495e-a185-f722a793f0a2.jpg)

  - get 요청 시 개발자 도구에서의 페이로드
    
    ![@RequestBody Get 방식 페이로드(파싱 전)](https://user-images.githubusercontent.com/98066327/173621890-e2e46e9b-1aeb-47f0-8202-5cdd9efa2606.jpg)
    파싱 전

    ![@RequestBody Get 방식 페이로드(파싱 후)](https://user-images.githubusercontent.com/98066327/173621934-3ccd3e6f-2e58-4cb6-a31a-628a3ad071ad.jpg)
    파싱 후
    
    @RequestParam과 마찬가지로 요청헤더에 contentType이 명시되어 있지 않고, 데이터 또한 쿼리스트링 형식(키=밸류&키=밸류)으로 넘어와 키:밸류 의 형태로 파싱이 된다.
    
    #### JSON Data를 get으로 넘겨줄 때
    - 넘겨주는 javascript
    
      ![@RequestBody Get 방식 json전송 자바스크립트](https://user-images.githubusercontent.com/98066327/173623508-596c1555-abb0-4090-8503-627b43e2bceb.jpg)
    
    - json 데이터 get 요청 시 개발자 도구에서의 요청헤더
    
      ![@RequestBody Get 방식 json전송 요청헤더](https://user-images.githubusercontent.com/98066327/173624020-82659d26-63da-4d87-a561-0b3bab785573.jpg)
    
    - json 데이터 get 요청 시 개발자 도구에서의 페이로드
    
      ![@RequestBody Get 방식 json전송 페이로드](https://user-images.githubusercontent.com/98066327/173624162-df8698bb-1510-44b7-8b42-a43c95f0069f.jpg)
      
    - json 데이터 get 요청 시 에러사항
    
      ![@RequestBody Get 방식 json전송 에러 서항](https://user-images.githubusercontent.com/98066327/173624698-11ad476a-362a-4418-bd80-02826ea22f9c.jpg)
   
    @RequestParam의 json 데이터 겟방식 요청과 마찬가지로 html로 보낼 때 제대로 된 json 형태가 들어가지 않아 오류가 난다. 하지만 포스트맨으로 전송 시에는 제대로 된 json 형식을 보내줄 수 있고, 컨트롤러 단에서도 받아줄 수 있다.
    
   - json 데이터 포스트맨으로 get 요청 시
    
      ![@RequestBody Get 방식 json전송 postman](https://user-images.githubusercontent.com/98066327/173626119-2cd4a45b-b77e-4eb1-baa0-d23d388101f7.jpg)
      
### 2. Post 방식으로 보낼 때 콘텐트 타입에 따른 차이점(콘텐트 타입: Multipart/form-data, form-urlencoded, json)
   - Multipart/form-data(form/submit으로 전송 시, jequery로 전송 시)
     - Multipart/form-data를 form/submit 방식으로 보낼 html

        ![post multipart form-data formsubmit 방식 파일 없을 때](https://user-images.githubusercontent.com/98066327/173631094-e16f16c7-d89a-4291-a07b-e8c21984f544.jpg)

     - Multipart/form-data를 form/submit 방식 요청 헤더

        ![post multipart form-data formsubmit 요청 헤더](https://user-images.githubusercontent.com/98066327/173631953-9c16a9c9-bdc7-45ec-b2a3-ece8e03aa667.jpg)

     - Multipart/form-data를 form/submit 방식 페이로드

        ![post multipart form-data formsubmit 페이로드(파싱 전)](https://user-images.githubusercontent.com/98066327/173632067-571733b1-3822-487a-836a-df90fdb191b2.jpg)
        파싱전

        ![post multipart form-data formsubmit 페이로드(파싱 후)](https://user-images.githubusercontent.com/98066327/173632142-037d3f4e-8b42-4e8f-b69d-4bb3605d067e.jpg)
        파싱후
        
     @RequestParam과 마찬가지로 데이터 형식은 웹킷 형식으로 들어오고 키:밸류 형식으로 파싱되며 파일은 바이너리 형식으로 들어온다. 하지만 Multipart/form-data의 contentType를 지원할 수 없다는 415 에러가 뜬다.
      
       - Multipart/form-data를 jquery 방식
        - Multipart/form-data 를 jquery로 보낼 javascript
        
          ![post multipart form-data ajax 폼데이터 요청 제이쿼리](https://user-images.githubusercontent.com/98066327/173633348-ff2dd354-bb63-4c63-9b78-69226610ae3e.png)
          
        - Multipart/form-data 를 jquery로 보낸 요청헤더
        
          ![post multipart form-data ajax 폼데이터 요청 헤더](https://user-images.githubusercontent.com/98066327/173633565-59bc2218-2cf5-462a-bb0b-377cc79fa668.png)
        
        - Multipart/form-data 를 jquery로 보낸 페이로드
        
          ![post multipart form-data ajax 폼데이터 페이로드(파싱전)](https://user-images.githubusercontent.com/98066327/173633841-9f138b2b-45bf-4461-a6c0-4c1635a3a4a1.png)
          파싱 전
          
          ![post multipart form-data ajax 폼데이터 페이로드png](https://user-images.githubusercontent.com/98066327/173634069-9b01e8d2-d927-48bd-9f38-c9fd76c85e6f.png)
          파싱 후
        
        Jquery를 통해 FormData를 보내는 것과 form/submit 방식으로 보내는 것의 차이가 없다. 둘 다 해당 contentType를 지원하지 않는다는 415 에러가 난다.

   - form-urlencoded 
      - form-urlencoded 를 form/submit로 보낼 html
      - 
         ![post urlencoded formsubmit 방식 html](https://user-images.githubusercontent.com/98066327/173639217-81d7d68b-a3cd-4dd3-a4f5-176b76bb289c.jpg)
  
      - form-urlencoded 를 form/submit로 보낸 요청헤더
        
        ![post urlencoded formsubmit 방식 요청헤더](https://user-images.githubusercontent.com/98066327/173639267-9b4eef00-f436-4940-9114-f31d60191534.jpg)
        
      - form-urlencoded 를 form/submit로 보낸 페이로드
        
        ![post urlencoded formsubmit 방식 페이로드(파싱 전)](https://user-images.githubusercontent.com/98066327/173639333-d6239027-39f7-4b51-8426-32d0c66bfb1a.jpg)
          파싱 전
          
        ![post urlencoded formsubmit 방식 페이로드(파싱 후)](https://user-images.githubusercontent.com/98066327/173639402-6967fa4a-2bcd-46dd-bd23-0d01df545fa0.jpg)
          파싱 후
      
      - form-urlencoded 를 form/submit로 보낼 시 에러 사항

        ![post urlencoded formsubmit 방식 에러 사항](https://user-images.githubusercontent.com/98066327/173639541-e9ff5361-623f-4db3-835c-db105cce62d3.jpg)
     
     - form-urlencoded 를 jquery로 보낼 javascript
      
        ![@RequestBody post urlencoded(기본 ajax)](https://user-images.githubusercontent.com/98066327/173639934-f3d6e346-bc99-472c-8a94-991e43057665.png)
      
      - form-urlencoded 를 jquery로 보낼 시 페이로드

        ![@RequestBody post urlencoded(기본 ajax) 페이로드](https://user-images.githubusercontent.com/98066327/173640055-8b47daad-6102-45c8-93d6-9c457dfc4b96.png)
      
      @RequestBody의 form-urlencoded 방식의 post 전송은 form/submit 방식과 jquery 방식(FormData 전송)은 요청헤더도 다 같지만 페이로드 형태에서 차이가 난다(form/submit는 쿼리 스트링 형식/ jquery-FormData 전송 방식은 웹킷 형식). 그리고 두 방법 다  form-urlencode를 지원할 수 없다는 415 에러가 난다.
      
   
   - JSON 방식
     - JSON data 전송 jquery 요청 시 javascript
      
      ![@RequestBody post json (파일 유)컨트롤러 뷰](https://user-images.githubusercontent.com/98066327/173641037-16de0bd7-cf3d-4bdd-9d5b-896eeab803a1.png)
       
     - JSON data 전송 jquery 요청 시 요청헤더
      
      ![@RequestBody post json (파일 유)요청헤더](https://user-images.githubusercontent.com/98066327/173641185-26bca479-a178-4257-a1d9-ce489b717903.png)
     
     - JSON data 전송 jquery 요청 시 페이로드
      
      ![@RequestBody post json (파일 유)페이로드(파싱 전)](https://user-images.githubusercontent.com/98066327/173643125-df9d4381-33db-4659-99d3-378cdff681b6.png)
      파싱 전
      
      ![@RequestBody post json (파일 유)페이로드(파싱 후)](https://user-images.githubusercontent.com/98066327/173644167-a1bbe453-89d4-4059-bc18-06bbb5fe85d0.png)
      파싱 후
     
     - JSON data 파일 전송 시 값이 들어오지 않는 현상
      
      ![@RequestBody post json (파일 유)컨트롤러](https://user-images.githubusercontent.com/98066327/173646208-9a8beec6-34dd-4865-b7f7-3755af993958.png)
      
   
   @RequestBody는 json xml 형태의 contentType를 받으며 생성자가 있어야 한다. 또한 바이너리 형태로 들어오는 파일은 받을 수 없으며 null 찍히게 된다.
     
    

        
        
    
    





