const modeIcon = document.getElementById("modeIcon");
const form = document.getElementById("form");
const search = document.getElementById("search");
const addTask = document.getElementById("addTask");
const newTodo = document.getElementById("newTodo");
const taskList = document.getElementById("taskList");
const description = document.getElementById("description");
const myTaskList = JSON.parse(localStorage.getItem("myTask"));
let myTheme = localStorage.getItem("theme");

const enableDarkMode = () => {
  document.body.classList.add("dark-theme");
  modeIcon.classList.remove("inactive");
  modeIcon.classList.add("active");
  modeIcon.innerHTML = `
  <span class="material-icons-outlined">
    emoji_objects
  </span>`;
  description.innerHTML = `Click <span class="material-icons-outlined">
    emoji_objects
  </span> to switch to light mode`;
  localStorage.setItem("theme", "dark");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark-theme");
  modeIcon.classList.remove("active");
  modeIcon.classList.add("inactive");
  modeIcon.innerHTML = `
    <span class="material-icons-outlined">
      lightbulb
    </span>`;
  description.innerHTML = `Click <span class="material-icons-outlined">
    lightbulb
  </span> to switch to dark mode`;
  localStorage.setItem("theme", null);
};

if (myTheme === "dark") {
  enableDarkMode();
}
if (myTheme !== "dark") {
  disableDarkMode();
}

modeIcon.addEventListener("click", () => {
  myTheme = localStorage.getItem("theme");
  if (myTheme !== "dark") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

if (myTaskList) {
  myTaskList.forEach((task) => {
    addNewTask(task);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value) {
    addNewTask(search);
  }
});

newTodo.addEventListener("click", () => {
  localStorage.setItem("myTask", JSON.stringify(null));
  taskList.innerHTML = "";
  search.value = "";
});

function addNewTask(task) {
  let tasktext = task.value;
  if (task.task) {
    tasktext = task.task;
  }
  const taskEle = document.createElement("li");
  taskEle.innerHTML = `
  <p class="taskText">${tasktext}</p>
  <button class="editTask">
    <span class="material-icons-outlined">
      edit
    </span>
  </button>
  <button class="deleteTask">
    <span class="material-icons-outlined">
      delete
    </span>
  </button>`;

  const text = taskEle.querySelector(".taskText");
  if (task.task && task.mark === true) {
    text.classList.add("marked");
  }
  const editBtn = taskEle.querySelector(".editTask");
  const deleteBtn = taskEle.querySelector(".deleteTask");
  editBtn.addEventListener("click", () => {
    if (text.classList.contains("marked")) {
      alert("Can not edit Marked task");
    } else {
      if (text.contentEditable == "true") {
        text.contentEditable = "false";
        if (text.innerText.length > 0) {
          updateLS();
        } else {
          taskEle.remove();
          updateLS();
        }
      } else {
        text.contentEditable = "true";
        text.focus();
        updateLS();
      }
    }
  });

  deleteBtn.addEventListener("click", () => {
    taskEle.remove();
    updateLS();
  });

  text.addEventListener("click", () => {
    if (text.contentEditable !== "true") {
      if (text.classList.contains("marked")) {
        text.classList.remove("marked");
      } else {
        text.classList.add("marked");
      }
    }
    updateLS();
  });

  taskList.appendChild(taskEle);
  search.value = "";
  updateLS();
}

function updateLS() {
  const tasksEle = document.querySelectorAll(".taskText");
  const myTask = [];
  tasksEle.forEach((taskEle) => {
    myTask.push({
      task: taskEle.innerText,
      mark: taskEle.classList.contains("marked"),
    });
  });
  localStorage.setItem("myTask", JSON.stringify(myTask));
}

timeout_var = null;
function typeWriter(
  text_list,
  placeholder = false,
  i = 0,
  text_list_i = 0,
  delay_ms = 150
) {
  if (!i) {
    if (placeholder) {
      search.placeholder = "";
    } else {
      search.innerHTML = "";
    }
  }
  txt = text_list[text_list_i];
  if (i < txt.length) {
    if (placeholder) {
      search.placeholder += txt.charAt(i);
    } else {
      search.innerHTML += txt.charAt(i);
    }
    i++;
    setTimeout(typeWriter, delay_ms, text_list, placeholder, i, text_list_i);
  } else {
    text_list_i++;
    if (typeof text_list[text_list_i] === "undefined") {
      setTimeout(typeWriter, delay_ms * 5, text_list, placeholder);
    } else {
      i = 0;
      setTimeout(
        typeWriter,
        delay_ms * 3,
        text_list,
        placeholder,
        i,
        text_list_i
      );
    }
  }
}

text_list = [
  "meeting with Akshay at 3pm",
  "call shantanu in afternoon",
  "read an article",
  "complete assignment by 4pm",
  "prepare presentation",
  "write a social post",
  "pickup harry from school",
];
typeWriter(text_list, true);
