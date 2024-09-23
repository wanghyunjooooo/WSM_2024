

//현재 날짜 구하자
currentDate = new Date();


//HTML -> js 변수 가져오자 #calendar-header > h1
const calendarHeader = document.getElementById("calendar-header");
const calendarHeaderH1 = calendarHeader.getElementsByTagName("h1")[0];
// const calendarHeaderH1 = document.querySelector("#calendar-header h1");



//이전/다음 버튼 클릭했을 때 이전달/다음달로 변경하자
//HTML -> js 변수
//click event 발생 했을 때 , 해야 할 일 정하자

const prevMonthButton = document.getElementById("prev-month");
// prevMonthButton.addEventListener("cilck",console.log("이전")); //리턴값이 undefined => 클릭했을때 가만히 있으라
prevMonthButton.addEventListener("click", () => changeMonth(-1)); //중요하다.매우중요하다.


const nextMonthButton = document.querySelector("#next-month");
nextMonthButton.onclick = () => changeMonth(1);

//diff: -1: 이전 달, 0: 현재 달, 1: 다음 달
const changeMonth = (diff) => {
    currentDate.setMonth(currentDate.getMonth() + diff);
    //년 구하자
    const year = currentDate.getFullYear();

    //월 구하자
    const month = currentDate.getMonth(); //1월 : 0
    //제목 바꾸자
    // console.log(`${year}년 ${month + 1}월`);

    //js 벼누에 innerHtml = `$(year)년 $(month + 1)월`
    calendarHeaderH1.innerHTML = `<i>${year}년 ${month + 1}월</i>`;
}

changeMonth(0); //현재 달 출력
