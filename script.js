// Get the current day and display it at the top of our calender
const currentDayElement = document.getElementById('currentDay');
currentDayElement.textContent = dayjs().format('dddd, MMMM, YYYY');

// Get the container for the time blocks
const timeBlocksContainer = document.getElementById('timeblocks');

// Create time blocks for standard business hours (9am to 5pm) 17-12=5 for 5:00pm
for (let hour = 9; hour <= 17; hour++) {
    const timeBlock = createTimeBlock(hour);
    timeBlocksContainer.appendChild(timeBlock);
}

//Function to create a time block
function createTimeBlock(hour) {
    const timeBlock = document.createElement('div');
    timeBlock.classList.add('time-block');

    const hourElement = document.createElement('div');
    hourElement.classList.add('hour');
    hourElement.textContent = formatHour(hour);

    const descriptionElement = document.createElement('textarea');
    descriptionElement.classList.add('description');
    descriptionElement.value = localStorage.getItem(`hour-${hour}`) || '';

    const saveButton = document.createElement('button');
    saveButton.classList.add('save-btn');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        localStorage.setItem(`hour-${hour}`, descriptionElement.value);
    });

    // Color-code the time blocks for the ghost of christmas past, present and future
    const currentHour = dayjs().hour();
    if (hour < currentHour) {
        descriptionElement.classList.add('past');
    } else if (hour === currentHour) {
        descriptionElement.classList.add('present');
    } else {
        descriptionElement.classList.add('future');
    }

    timeBlock.appendChild(hourElement);
    timeBlock.appendChild(descriptionElement);
    timeBlock.appendChild(saveButton);

    return timeBlock;
}

//Function to format the hour into a 12-hour format
function formatHour(hour) {
    const formattedHour = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${formattedHour}${ampm}`;
}