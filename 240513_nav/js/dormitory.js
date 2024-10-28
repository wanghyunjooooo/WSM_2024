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

const setPage = (page) => {
    //clear pages
    pageDivs.forEach(pageDiv => {
        pageDiv.style.display = "none";
    });

    //show page
    pageDivs[page-1].style.display = "block";   //1페이지가 calendar,2페이지가 swt, 3페이지가 srn, 4페이지가 board

}

setPage(1);

