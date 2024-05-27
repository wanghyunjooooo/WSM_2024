const API_KEY = "a3bead40f36544649519179aa05a9cec"; //학교 급식 api 키
const URL = "https://open.neis.go.kr/hub/mealServiceDietInfo"; //학교 급식 API URL
const ATPT_OFCDC_SC_CODE = "B10"; //서울특별시 교육청
const  SD_SCHUL_CODE = "7011569"; //미림마이스터고

let currentDate = new Date();   //현재 날짜 지정한다.

//급식 정보 제목 표시하자
const displayDate = () => {
    let days = "일월화수목금토";    //요일
    let month = currentDate.getMonth() + 1; //현재 달 불러오기
    let date = currentDate.getDate();   //현재 날짜 불러오기
    let day = currentDate.getDay();    //요일 (0: 일 1: 월)
    days = days.split("");  //"일월화수목금토" -> ['일','월','화'] 요일을 문자열로 변환

    const schoolFoodTitleHeader = document.getElementsByClassName("school-food-title")[0];
    const titleText = `🍚 ${days[day]}요일(${month}/${date})의 메뉴🍚`;
    schoolFoodTitleHeader.innerText = titleText;
}

//급식 정보 날짜 바꾸자
const changeDate = (diff) => {
    currentDate.setDate
    (currentDate.getDate() + diff);
    displayDate();  //화면에 변경된 날짜를 표시

    const dateData = currentDate.toISOString().slice(0,10).replace(/-/g,"");  
    // 2024-05-23 -> 20240523 'YYYYMMDD'
    getSchoolFoodMenu(dateData)
   
}

//급식 API 이용해서 급식 정보 받아오자
const getSchoolFoodMenu = (dateData) => {
let url = `${URL}?Type=json&KEY=${API_KEY}\
&pIndex=1\
&pSize=100\
&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}\
&SD_SCHUL_CODE=${SD_SCHUL_CODE}\
&MLSV_YMD=${dateData}`;

    //비동기로 url 호출
    //error 없다면 then 함수 호출되고, response.json()으로 실제 데이터만 가져오자
    //error 있다면 catch 함수 호출되고, 에러 출력하자
   fetch(url)
   .then((response) => response.json())
   .then((data) => console.log(data))
   .catch((error) => console.error(error));
}

getSchoolFoodMenu("20240520");

//받아온 급식 정보 웹사이트에 표시하자
