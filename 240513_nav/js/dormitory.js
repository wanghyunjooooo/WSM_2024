//seletion 3개 가져오자
const selectionItemDivs = document.getElementsByClassName("selection-item");
//각 페이지 요소 가져오기
const calendarDiv = document.getElementById("calendar");
const selectionWashingmachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameDiv = document.querySelector("#selection-room-name"); 
const boardDiv = document.querySelector("#board");
const pageDivs = [calendarDiv,selectionRoomNameDiv,selectionWashingmachineTimeDiv,boardDiv];

// calendarDiv.style.display = "block";
// selectionWashingmachineTimeDiv.style.display = "block";
// selectionRoomNameDiv.style.display= "block";
// boardDiv.style.display = "block";

let allData; //모든 초기화 정보 : 세탁기,시간,호실정보
let weeklyReservations; //미리 요일별로 지정된 예약 정보
let newReservation; //사용자가 입력하고 있는 예약 정보
let reservations;  //사용자가 예약완료한 정보들

const initData = async () => {
    //allData 가져오자
    const getAllData = async (url) => {
        return fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error.message));
    }

    //weeklyResevation 가져오자
    const getWeeklyReservation = async (url) => {
      try{  
        const response = await fetch(url);
        const data = await response.json(); 
        return data;
      } catch (error){
        console.log(error.message);
      }
    }

    allData = await getAllData("js/allData.json");
    weeklyReservations = await getWeeklyReservation("js/weekly-reservation.json");

}


const setPage = (page) => {
    //clear selection
    for (const selectionItemDiv of selectionItemDivs){
        selectionItemDiv.classList.remove("select");
    }


    if(selectionItemDivs.length - 1 >= page){   //4페이디 selection은 없음
    selectionItemDivs[page-1].classList.add("select");
    }

    //clear pages
    pageDivs.forEach(pageDiv => {
        pageDiv.style.display = "none";
    });

    //show page
    pageDivs[page-1].style.display = "block";   //1페이지가 calendar,2페이지가 swt, 3페이지가 srn, 4페이지가 board

}

const cilckDate = (event) => {
  console.log(event);
  console.log(event.target.textContent);
  console.log(event.target.dataset.date); //<div class = "itme" data-date="뭐시기"> 텍스트</div> => 뭐시기
  newReservation = {  //날짜,세탁기,시간,호실,이름,알림
    "date": undefined,
    "washingmachine": undefined,
    "time": undefined,
    "room": undefined,
    "name": undefined,
    "notification": true,
  }
  newReservation.date = event.target.dataset.date;  //클릭한 날짜 정보 새 예약 기록하자
  setPage(2);   //2페이지로 이동~~
}

setPage(1);
initData();


