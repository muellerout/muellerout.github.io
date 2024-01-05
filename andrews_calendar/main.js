const daysLeft = 330;

let mainWrapperElement = document.getElementById('main_wrapper');

for (let i = daysLeft; i > 0; i--) {

    let dayElement = document.createElement('div');

    dayElement.setAttribute('class', 'day unchecked');
    dayElement.setAttribute('id', i);
    dayElement.innerText = i;
    dayElement.addEventListener('click', updateDayElementState);

    mainWrapperElement.appendChild(dayElement);
}

restoreCheckedDays();

function updateCheckedDays(dayElement) {

    let checkedDays = getCheckedDays();

    checkedDays = new Set(checkedDays);

    if (dayElement.className == 'day unchecked') {

        checkedDays.add(dayElement.id);
        dayElement.className = 'day checked';
    }

    else {

        checkedDays.delete(dayElement.id);
        dayElement.className = 'day unchecked';
    }

    window.localStorage.setItem('checkedDays', JSON.stringify([...checkedDays]));
}

function changeDayElementStyle(dayElement) {

    if (dayElement.className == 'day unchecked' ) {
        
        dayElement.style.backgroundColor = '#8081e2';
        dayElement.style.color = 'white';
    }

    else {

        dayElement.style.backgroundColor = 'white';
        dayElement.style.color = '#8081e2';
        dayElement.style.border = '#8081e2 solid 3px';
    }

}

function updateDayElementState() {

    changeDayElementStyle(this);
    updateCheckedDays(this);
}

function restoreCheckedDays() {

    let checkedDays = getCheckedDays();

    checkedDays.forEach(checkedDay => {

       let dayElement = document.getElementById(checkedDay);

       changeDayElementStyle(dayElement);
       updateDayElementClass(dayElement, 'day checked');
    });
}

function getCheckedDays() {

    let checkedDays = window.localStorage.getItem('checkedDays');

    return checkedDays != null ? JSON.parse(checkedDays) : [];
}

function updateDayElementClass(dayElement, className) {
    
    dayElement.className = className;
}
