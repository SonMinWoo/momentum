let pending = [];
let finished = [];

const pendingList = document.querySelector(".pending--list");
const finishedList = document.querySelector(".finished--list");

function handleMove(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;

  if (ul.className === "pending--list") {
    pendingList.removeChild(li);
    btn.innerText = "<";
    finishedList.appendChild(li);
    let changedStorage = pending.filter(function(toDo) {
      return toDo.id !== parseInt(li.id, 10);
    });
    let moveObj = pending.filter(function(toDo) {
      return toDo.id === parseInt(li.id, 10);
    });
    pending = changedStorage;
    finished = finished.concat(moveObj);
  } else if (ul.className === "finished--list") {
    finishedList.removeChild(li);
    btn.innerText = "â";
    pendingList.appendChild(li);
    let changedStorage = finished.filter(function(toDo) {
      return toDo.id !== parseInt(li.id, 10);
    });
    let moveObj = finished.filter(function(toDo) {
      return toDo.id === parseInt(li.id, 10);
    });
    finished = changedStorage;
    pending = pending.concat(moveObj);
  }
  saveToDos("FINISHED", finished);
  saveToDos("PENDING", pending);
}

function handleDelete(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;

  if (ul.className === "pending--list") {
    pendingList.removeChild(li);

    let clearStorage = pending.filter(function(toDo) {
      return toDo.id !== parseInt(li.id, 10);
    });
    pending = clearStorage;
    saveToDos("PENDING", pending);
  } else if (ul.className === "finished--list") {
    finishedList.removeChild(li);

    let clearStorage = finished.filter(function(toDo) {
      return toDo.id !== parseInt(li.id, 10);
    });
    finished = clearStorage;
    saveToDos("FINISHED", finished);
  }
}

function saveToDos(key, type) {
  localStorage.setItem(key, JSON.stringify(type));
}

function createLi(text, type, id, check) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const downBtn = document.createElement("button");
  const span = document.createElement("span");
  const toDoObj = {
    text: text,
    id: id
  };

  delBtn.innerText = "X";

  if (check === "P") {
    downBtn.innerText = "â";
    pending.push(toDoObj);
  } else {
    downBtn.innerText = "<";
    finished.push(toDoObj);
  }

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(downBtn);
  li.id = id;
  delBtn.addEventListener("click", handleDelete);
  downBtn.addEventListener("click", handleMove);

  return li;
}

function paintPending(text, id) {
  pendingList.appendChild(createLi(text, pending, id, "P"));
  saveToDos("PENDING", pending);
}

function paintFinished(text, id) {
  finishedList.appendChild(createLi(text, pending, id, "F"));
  saveToDos("FINISHED", finished);
}

function handleSubmit(event) {
  const addInput = document.querySelector(".todo--input");
  event.preventDefault();
  const currentValue = addInput.value;
  const newId = new Date().getTime();
  paintPending(currentValue, newId);
  addInput.value = "";
}

function loadToDos() {
  const loadedPending = localStorage.getItem("PENDING");
  const loadedFinished = localStorage.getItem("FINISHED");

  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function(toDo) {
      paintFinished(toDo.text, toDo.id);
    });
  }

  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function(toDo) {
      paintPending(toDo.text, toDo.id);
    });
  }
}

function todoInit() {
  const form = document.querySelector(".todo--form");
  form.addEventListener("submit", handleSubmit);
  loadToDos();
}

todoInit();
