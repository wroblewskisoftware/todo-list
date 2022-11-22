{
  const tasks = [
    {
      content: "zrobić pracę domową",
      done: false,
    },
    {
      content: "dopracować pracę domową",
      done: false,
    },
    {
      content: "wstawić pracę domową do sprwdzenia",
      done: false,
    },
  ];

  const autofocus = () => {
    document.querySelector(".js-newTask").focus();
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const formReset = () => {
    document.querySelector(".js-form").reset();
  };

  const toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done;
    render();
  };

  const removeTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="list__item">
        <button class="list__button js-done">${task.done ? "✔" : ""}</button>
        <p class="list__paragraph ${task.done ? "list__paragraph--done" : ""}">
        ${task.content}
        </p>
        <button class="list__button list__button--remove js-remove">🗑</button>
        </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    autofocus();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);

    formReset();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
