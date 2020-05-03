const clock = document.querySelector(".--clock");
const userForm = document.querySelector(".user--form");
function lenTwo(text) {
  if (text.length === 1) return "0" + text;
  else return text;
}

function clock_print() {
  const nowTime = new Date();
  const year = nowTime.getFullYear();
  const month = lenTwo(String(Number(nowTime.getMonth()) + 1));
  const day = lenTwo(String(nowTime.getDate()));
  const hour = lenTwo(String(nowTime.getHours()));
  const minute = lenTwo(String(nowTime.getMinutes()));
  const second = lenTwo(String(nowTime.getSeconds()));
  clock.innerText = `${year}.${month}.${day}  ${hour}:${minute}:${second}`;
}

function loadUser(user) {
  const userParent = userForm.parentNode;
  userParent.removeChild(userForm);
  const userDiv = document.createElement("div");
  const userName = document.createElement("h2");
  userName.innerText = `Hello, ${user}?`;
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
