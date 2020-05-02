const clock = document.querySelector(".--clock");
const userForm = document.querySelector(".user--form");
function clock_print() {
  const nowTime = new Date();
  const year = nowTime.getFullYear();
  const month = Number(nowTime.getMonth()) + 1;
  const day = nowTime.getDate();
  const hour = nowTime.getHours();
  const minute = nowTime.getMinutes();
  const second = nowTime.getSeconds();
  clock.innerText = `${year}.${month}.${day}  ${hour}:${minute}:${second}`;
}

function loadUser(user) {
  const userParent = userForm.parentNode;
  userParent.removeChild(userForm);
  const userDiv = document.createElement("div");
  const userName = document.createElement("h2");
  userName.innerText = user;
  userDiv.appendChild(userName);
  userParent.appendChild(userDiv);
}

function userDetect() {
  const user = localStorage.getItem("user");
  if (user == null) {
    userForm.addEventListener("submit", handleUserName);
  } else {
    loadUser(user);
  }
}

function handleUserName(event) {
  event.preventDefault();
  const inputValue = document.querySelector(".user--input").value;
  localStorage.setItem("user", inputValue);
  loadUser(localStorage.getItem("user"));
}

function clockNameInit() {
  setInterval(clock_print, 1000);
  userDetect();
}
clockNameInit();
