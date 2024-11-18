//seletion 3개 가져오자
const selectionItemDivs = document.getElementsByClassName("selection-item");
//각 페이지 요소 가져오기
const calendarDiv = document.getElementById("calendar");
const selectionWashingmachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameDiv = document.querySelector("#selection-room-name");
const boardDiv = document.querySelector("#board");
const pageDivs = [calendarDiv, selectionWashingmachineTimeDiv, selectionRoomNameDiv, boardDiv];
const washingmachineSelect = document.getElementById("washingmachine");
const timeSelect = document.querySelector("#time");


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
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  allData = await getAllData("js/allData.json");
  weeklyReservations = await getWeeklyReservation("js/weekly-reservation.json");

}


const setPage = (page) => {
  //clear selection
  for (const selectionItemDiv of selectionItemDivs) {
    selectionItemDiv.classList.remove("select");
  }


  if (selectionItemDivs.length - 1 >= page) {   //4페이디 selection은 없음
    selectionItemDivs[page - 1].classList.add("select");
  }

  //clear pages
  pageDivs.forEach(pageDiv => {
    pageDiv.style.display = "none";
  });

  //show page
  pageDivs[page - 1].style.display = "block";   //1페이지가 calendar,2페이지가 swt, 3페이지가 srn, 4페이지가 board

  if (page === 2) {  //세탁기,시간

    // 1,2,3번 세탁기, 1,2,3 시간 초기화
    initWashingmachineTime();

    //[다음] 클릭 => 세탁기번호,시간번호를 보관하자 => setPage(3)

  } else if (page === 3) { //호실,이름

  } else if (page === 4) {  //세탁기 예약 현황표

  }

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
  let dateString = event.target.dataset.date
  newReservation.date = new Date(dateString);  //클릭한 날짜 정보 새 예약 기록하자 "년 월 알 " -> 날짜삭제
  setPage(2);   //2페이지로 이동~~
}

setPage(1);
initData();


const initWashingmachineTime = () => {
  // { "1": ["1", "2", "3"], "2": ["1", "2", "3"], "3": ["1", "2", "3"] };
  let allWashingmachineTime = {};

  //초기세팅하자
  allData.washingmachine.forEach((washingmachine) => {    //1,2,3
    allWashingmachineTime[washingmachine] = Object.keys(allData.time);  //{1:["1","2","3"]}

  });

  // 클릭한 날짜의 요일 구하자
  let weekly = newReservation.date.getDay();
  console.log(weekly);
  // 미리 예약한 예약하 예약을 보고, 예약된 세탁기와 예약된 시간이 이쓰면 초기화 항목에서 빼자
  weeklyReservations.forEach((weeklyReservation) => {
      if(weekly === weeklyReservation.weekday){
        //초기화한 데이터에서 weeklyResercation에 예약된 세탁기 번호의 시간 번호를 빼자
        const {washingmachine,time} = weeklyReservation;
        // const washingmachine = weeklyReservation.washingmachine;
        // const time = weeklyReservation.time;
        const index = allWashingmachineTime[washingmachine].indexOf(String(time));
        if(index > -1){
          allWashingmachineTime[washingmachine].splice(index,1);//그 시간 삭제 하기
        }
      }
  });
  // 사용자가 예약한 예약을 보고, 예약된 세탁기와 예약된 시간이 있으면 초기화 항목에서 폐지
  //초기화 항목에서 예약된 시간 뺀 후,모든 시간이 없는 세탁기는 빼자
  let washingmachines = Object.keys(allWashingmachineTime).filter((washingmachine) => //["1","2","3"]
  allWashingmachineTime[washingmachine].length > 0); //월요일 ["1","3"]
  //세탁기 select에 option 만들어 넣자
  washingmachineSelect.innerHTML = ""; //세탁기 option 없애자
  washingmachines.forEach((washingmachine) => {
    
    
    //시간 select에 option 만들어 넣자
    let newOption = document.createElement("option"); //<option></option>
    newOption.value = washingmachine; //<option value = "세탁기번호"></option>
    newOption.textContent = `${washingmachine}번 세탁기`; //<option value = "세탁기번호">세탁기번호번 세탁기</option>
    washingmachineSelect.appendChild(newOption); //washingmachineSelect에 자식으로 넣자
  });
  console.log(allWashingmachineTime);
  //시간 select에 option 만들어 넣자
  const setTimeSelect = (event) => {
    timeSelect.innerHTML = ""; //시간 option 없애자
    const selectedWashingmachine = washingmachineSelect.value;
    let times = allWashingmachineTime[selectedWashingmachine]; //["1","2","3"]
    times.forEach((time) => {
      let newOption = document.createElement("option"); //<option></option>
      newOption.value = time; //option value = "시간값("1","2","3"중 하나")></option>
      newOption.textContent = allData["time"][time];

      timeSelect.appendChild(newOption);
    });
  };
  setTimeSelect();
  //세탁기 번호가 바뀌면 , setTimeSelect() 호출하자
  washingmachineSelect.onchange = (event) => setTimeSelect(event);
}

