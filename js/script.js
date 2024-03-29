//#region Sum hover and calculating

document.querySelector('#pricesSum').addEventListener("mouseover", function () {
    document.querySelectorAll('.payment .price').forEach(function (price) {
        price = +price.dataset.price;

        document.querySelector('#pricesSum').innerHTML = +document.querySelector('#pricesSum').innerHTML +
            price;
    });
});

document.querySelector('#pricesSum').addEventListener("mouseout", function () {
    this.innerHTML = "0";
})

//#endregion

//#region Payment hover

document.querySelectorAll('.payment .price').forEach(function (price) {
    price.addEventListener("mouseover", function () {
        this.innerHTML = this.dataset.price;
    });

    price.addEventListener("mouseout", function () {
        this.innerHTML = "-";
    });
});

//#endregion

//#region Attendace

const STUDENT_NAMES = ["ali", "sr609", "murad"];
const ATTENDANCE = JSON.parse(localStorage.getItem("attendance")) ?? {
    "ali": null,
    "sr609": null,
    "murad": null,
}

function loadAttendance() {
    for (let name in ATTENDANCE) {
        let attendanceButtons = document.querySelectorAll(`.${name}-attendance-button`);
        
        attendanceButtons.forEach(item => {
            item.style.backgroundColor = "#fff";
        });

        if (name != null) {
            for (let i = 0; i <= ATTENDANCE[name]; i++) {
                attendanceButtons[i].style.backgroundColor = "#000";
            }
        }
    }
}

STUDENT_NAMES.forEach(studentName => {
    let attendanceButtons = document.querySelectorAll(`.${studentName}-attendance-button`);

    attendanceButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            if (confirm("Внести изменения?")) {
                ATTENDANCE[studentName] = index;
                localStorage.setItem("attendance", JSON.stringify(ATTENDANCE));
                loadAttendance();
            }
        });
    });
});

//#endregion

function colorizeDayOfWeek() {
    let date = new Date();
    let day = date.getDay();
    let weekends = [5, 7];

    day += day == 0 ? 9 : 2; // Корректировка дней недели

    document.querySelectorAll(`.agenda-weekdays > .list-group > .list-group-item`).forEach(item => item.className = "list-group-item w-25");
    let currentWeekDay = document.querySelectorAll(`.agenda-weekdays > .list-group:nth-child(${day}) > .list-group-item`);

    if (weekends.includes(day)) {
        currentWeekDay.forEach(item => item.classList.add("bg-success"));
    } else {
        currentWeekDay.forEach(item => item.classList.add("bg-warning"));
    }
}

colorizeDayOfWeek();
loadAttendance()

setInterval(function () {
    colorizeDayOfWeek();
}, 1000);