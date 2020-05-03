const body = document.querySelector("body");

const IMG_NUM = 3;

function paintImage(num) {
  const img = new Image();
  img.src = `${num + 1}.jpg`;
  img.classList.add("bgImage");
  body.appendChild(img);
}

function genRand() {
  const num = Math.floor(Math.random() * IMG_NUM);
  return num;
}

function bgInit() {
  const randNum = genRand();
  paintImage(randNum);
  const loading = document.querySelector(".loading");
  loading.style.display = "none";
}
bgInit();
