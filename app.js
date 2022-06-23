let Thinks = {
  addTitle: "",
  addDescription: "",
  idnumb: 0,
  isComplete: false
};

let thinksArray = []

// const completeCheck = {
//   false: 
//   true:
// }

const resetThinkArray = () => {
  thinksArray = [];
  localStorage.clear();
  document.getElementById("todolist").innerHTML = "";

};

const resetBodyShow = () => {
  let r = document.querySelector(".resetBody")
  if (r.style.display == "block") {
    r.style.display = "none"
    document.querySelector(".backgroundimg").style.filter = "none"

  }
  else {
    r.style.display = "block"
    document.querySelector("#addDo").style.display = "none"
    document.querySelector(".backgroundimg").style.filter = "none"
  }

}

const pressEvet = () => {
  resetThinkArray();
  document.querySelector(".resetBody").style.display = "none"
}

const pressHayir = () => {
  document.querySelector(".resetBody").style.display = "none"
}



// + butonuna basarsak yapılacak listesine yeni kaydetme bölümü açılır, tekar bastığımızda kapanır.
function addToDoList() {
  var x = document.getElementById("addDo");
  if (x.style.display === "block") {
    x.style.display = "none";
    document.querySelector(".backgroundimg").style.filter = "none"
  }
  else {
    x.style.display = "block";
    document.querySelector(".backgroundimg").style.filter = "blur(3px)"
    document.querySelector(".resetBody").style.display = "none"
  }
  // eğer kaydetmeden tekrardan + butonuna basarsak yazılan veriyi kaydetmeden siler ve çıkar
  document.getElementById("addDoForm").reset();
};

// Create tuşuna basınca veriyi kaydeder ve anasayfaya döner
function createAndNone() {
  document.getElementById("addDo").style.display = "none";
  document.querySelector(".backgroundimg").style.filter = "none"

};

// Update tuşuna basınca veriyi kaydeder ve anasayfaya döner
function updateAndNone() {
  document.getElementById("updateDo").style.display = "none";
  document.querySelector(".backgroundimg").style.filter = "none"

};



// Yeni eleman ekleme bölümü ve Mevcut elemanı güncelleme  bölümü açıkken esc tuşuna bastığımızda kapanıp ana sayfaya döner
function keyPressEsc(event) {
  if (event.keyCode == 27) {
    document.getElementById("addDo").style.display = "none";
    document.getElementById("updateDo").style.display = "none";
    document.querySelector(".backgroundimg").style.filter = "none"

  }

}

//  check inputuna  yapılan şeylerin üstünü çizmek için fonksiyon denemesi
// function thinksDecoration(e) {
//   var y = e.parentNode;
//   if (e.parentNode.style.backgroundColor == "white") {
//     y.style.backgroundColor = "#EBE8ED";
//     e.nextElementSibling.firstElementChild.style.textDecoration = "line-through";
//     e.style.backgroundColor="#9E00FF"

//     Thinks.iscomplete= true;
//     saveThinksArrayLS();

//   }
//   else {

//     e.parentNode.style.backgroundColor = "white";
//     e.nextElementSibling.firstElementChild.style.textDecoration = "none";
//     e.style.backgroundColor="white"
//     Thinks.iscomplete= false;
//     // thinksArray.iscomplete = !thinksArray.iscomplete;
//     saveThinksArrayLS();
//   }
// };


// yukarıdaki thinksDecoration methodunda tek tek verdiğimiz stil değişikliklerini toogle methodu ile kıs şekilde verdik
// yukarıdaki değişiklikleri  css de yazıp  bunları toggle methodu ıle yaparak daha temiz kod elde ediyoruz
function thinksDecoration(e) {
  let item = e.parentNode;
  item.classList.toggle("complete")

  for (let i = 0; i < thinksArray.length; i++) {
    if (thinksArray[i].idnumb == e.dataset.id) {
      thinksArray[i].isComplete = !thinksArray[i].isComplete;
      saveThinksArrayLS();
    }
    else {

    }
  }
};

// const removeThinks =(idnumb)=> {
//   const toDoThinksEl = document.getElementsByClassName("toDoThinks");

//   for (let i = 0; i<toDoThinksEl.length; i++){
//     if(toDoThinksEl[i].dataset.idnumb=idnumb) toDoThinksEl[i].remove();
//   }

// }

const removeThinks = (e) => {
  let c = e.parentNode.parentNode;
  c.remove();
  console.log(c.dataset)



  thinksArray = thinksArray.filter((thinks) => {
    if (thinks.idnumb != c.dataset.id) return c;
  });

  saveThinksArrayLS();
}


const addThinksItemToHtml = (thinks) => {
  const thinksListEl = document.getElementById("todolist");
  const thinksItemHtml = `<li data-id="${thinks.idnumb}" class="toDoThinks" style="background-color: white;" >
  <div data-id="${thinks.idnumb}" style="display: flex; justify-content: space-between;" 
      class="form-check ${thinks.isComplete ? "complete" : ""} ">
    <img data-id="${thinks.idnumb}" onclick="thinksDecoration(this)" class="checkButton"  src="./img/checkNo.png" alt="">
    <span style="margin-left: 5px;" >
      <h4 class="title" data-id="${thinks.idnumb}" ondblclick="updateAddDo(this)">
      ${thinks.addTitle}
      </h4>
      <p class="description" data-id="${thinks.idnumb}">
      ${thinks.addDescription}
      </p>
    </span>
    <button class="buttonDelete" onclick="removeThinks(this)"> 
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>

</li>`;


  thinksListEl.insertAdjacentHTML("beforeend", thinksItemHtml);

};

const saveThinksArrayLS = () => {
  localStorage.setItem("thinkArrayLS", JSON.stringify(thinksArray));
}; 


const addToDoThinks = () => {
  // let thinks = Object.create(Thinks);
  // thinks.addTitle = document.getElementById("addTitle").value;
  // thinks.addDescription = document.getElementById("addDescription").value;
  // thinks.idnumb = Math.floor((Math.random() * 1000) + 1);

  let thinks;
  thinks = {
    ...Thinks,
    // idnumb la  random id atıyoruz 1 ile 1001 arasında rast gele bir sayı veriliyor
    idnumb: Math.floor((Math.random() * 1000) + 1),
    addTitle: document.getElementById("addTitle").value,
    addDescription: document.getElementById("addDescription").value,
    isComplete: false,
  };

  if (addTitle.value.length == 0) {
    // alert("Herhangi bir değer girmediğiniz için kayıt edemedik.")
    document.getElementById("emptyError").style.display = "block"

    const myTimeout = setTimeout(myGreeting, 2000);
    function myGreeting() {
      document.getElementById("emptyError").style.display = "none"
    }
  }

  else {
    thinksArray = [...thinksArray, thinks]
    saveThinksArrayLS();
    document.getElementById("addDoForm").reset();
    addThinksItemToHtml(thinks);

  }
};


// burada daha önceden kaydettiğimiz bir yapılacak işin  günccellemesini yapıyoruz ismini ya da açıklamasını değiştiriyoruz
const updateAddDo = (e) => {
  let openUpdate = document.getElementById("updateDo")
  openUpdate.style.display = "block"
  let innerTitle = document.getElementsByClassName("title")
  let innerDescription = document.querySelectorAll(".description")


  for (let i = 0; i < thinksArray.length; i++) {
    if (thinksArray[i].idnumb == e.dataset.id) {
      console.log(e.innerText)
      document.getElementById("updateTitle").value = innerTitle[i].innerText
      // innerTitle[i].innerText=innerTitle.value
      thinksArray[i].addTitle = 13
      thinksArray[1].addDescription = 211
      
      document.getElementById("addDescription").value = innerDescription[i].innerText
      // thinksArray[i].addTitle = document.getElementById("addTitle").value
      console.log(thinksArray[i].addTitle)


    }

  }

};

const updateDoThinks = () => {
  console.log(thinksArray)
  console.log(document.getElementById("updateTitle").value)
  document.getElementById("todolist").innerHTML = "";
  thinksArray.forEach((item) => {
    addThinksItemToHtml(item);
  });

}

// sayfayı yenilediğimizde local storage deki kayıtlı bilgileri ekrana tekrardan yansıtıyoruz
const refreshPage = () => {
  document.getElementById("todolist").innerHTML = "";
  thinksArray.forEach((item) => {
    addThinksItemToHtml(item);
  });
};

const thinkArrayLS = localStorage.getItem("thinkArrayLS");

if (thinkArrayLS) {
  thinksArray = JSON.parse(thinkArrayLS);
  refreshPage();
}


