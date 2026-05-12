const form = document.querySelector("#duty-form");
const teamNameInput = document.querySelector("#team-name");
const membersInput = document.querySelector("#members");
const startDateInput = document.querySelector("#start-date");
const frequencyInput = document.querySelector("#frequency");
const teamLabel = document.querySelector("#team-label");
const todayPerson = document.querySelector("#today-person");
const todayMessage = document.querySelector("#today-message");
const scheduleList = document.querySelector("#schedule-list");
const completeButton = document.querySelector("#complete-duty");
const completionMessage = document.querySelector("#completion-message");
const notificationButton = document.querySelector("#enable-notification");

const STORAGE_KEY = "clean-turn-service";
const oneDay = 1000 * 60 * 60 * 24;

const formatDate = (date) =>
  new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);

const toDateInputValue = (date) => date.toISOString().slice(0, 10);

const parseMembers = (value) =>
  value
    .split(/[\n,]/)
    .map((member) => member.trim())
    .filter(Boolean);

const loadState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return null;
  }

  return JSON.parse(saved);
};

const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const getDutyIndex = (date, startDate, frequency, memberCount) => {
  const elapsedDays = Math.max(0, Math.floor((date - startDate) / oneDay));
  return Math.floor(elapsedDays / frequency) % memberCount;
};

const getSchedule = (state) => {
  const members = parseMembers(state.members);
  const startDate = new Date(`${state.startDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, offset) => {
    const dutyDate = new Date(today);
    dutyDate.setDate(today.getDate() + offset * Number(state.frequency));
    const dutyIndex = getDutyIndex(dutyDate, startDate, Number(state.frequency), members.length);

    return {
      date: dutyDate,
      isToday: offset === 0,
      person: members[dutyIndex],
    };
  });
};

const render = () => {
  const state = loadState() ?? {
    teamName: teamNameInput.value,
    members: membersInput.value,
    startDate: startDateInput.value,
    frequency: frequencyInput.value,
  };
  const members = parseMembers(state.members);

  teamNameInput.value = state.teamName;
  membersInput.value = state.members;
  startDateInput.value = state.startDate;
  frequencyInput.value = state.frequency;
  teamLabel.textContent = `${state.teamName} 오늘의 당번`;

  if (members.length === 0) {
    todayPerson.textContent = "-";
    todayMessage.textContent = "구성원 이름을 한 명 이상 입력해 주세요.";
    scheduleList.innerHTML = "";
    return;
  }

  const schedule = getSchedule(state);
  const todayDuty = schedule[0];
  todayPerson.textContent = todayDuty.person;
  todayMessage.textContent = `${formatDate(todayDuty.date)} 청소 담당입니다. 완료하면 다음 당번에게 차례가 넘어가요.`;

  scheduleList.innerHTML = schedule
    .map(
      (item, index) => `
        <li class="${item.isToday ? "is-today" : ""}">
          <div>
            <strong>${item.person}</strong>
            <p>${formatDate(item.date)}</p>
          </div>
          <span class="badge">${index === 0 ? "오늘" : `${index + 1}번째`}</span>
        </li>`,
    )
    .join("");
};

const updateStateFromForm = () => {
  const state = {
    teamName: teamNameInput.value.trim() || "우리 팀",
    members: membersInput.value,
    startDate: startDateInput.value,
    frequency: frequencyInput.value,
  };

  saveState(state);
  render();
};

const shiftTodayMemberToEnd = () => {
  const state = loadState();
  const members = parseMembers(state.members);

  if (members.length < 2) {
    completionMessage.textContent = "구성원이 2명 이상이면 다음 당번으로 넘길 수 있어요.";
    return;
  }

  const todayDuty = getSchedule(state)[0].person;
  const finishedIndex = members.indexOf(todayDuty);
  const nextMembers = members.filter((_, index) => index !== finishedIndex);

  state.members = [...nextMembers, todayDuty].join(", ");
  state.startDate = toDateInputValue(new Date());
  saveState(state);
  completionMessage.textContent = `${todayDuty} 님의 청소 완료! 다음 차례를 맨 앞으로 이동했어요.`;
  render();
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateStateFromForm();
});

completeButton.addEventListener("click", shiftTodayMemberToEnd);

notificationButton.addEventListener("click", async () => {
  if (!("Notification" in window)) {
    notificationButton.textContent = "이 브라우저는 알림을 지원하지 않아요";
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const dutyName = todayPerson.textContent;
    new Notification("청소 당번 알림", {
      body: `오늘 청소 당번은 ${dutyName} 님입니다. 잊지 말고 확인해 주세요!`,
    });
    notificationButton.textContent = "알림 권한이 켜졌어요";
  } else {
    notificationButton.textContent = "알림 권한이 필요해요";
  }
});

if (!startDateInput.value) {
  startDateInput.value = toDateInputValue(new Date());
}

if (!loadState()) {
  updateStateFromForm();
} else {
  render();
}
