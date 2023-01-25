{
  const welcome = () => {
    console.log("Hello world.");
  };

  let tasks = [];

  const setInputFocus = () => {
    document.querySelector(".js-newTask").focus();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const formReset = () => {
    document.querySelector(".js-form").reset();
  };

  const toggleTaskDone = (index) => {
    tasks = tasks.map((task, taskIndex) =>
      taskIndex === index
        ? {
            ...task,
            done: !task.done,
          }
        : task
    );

    render();
  };

  const removeTask = (removedTaskIndex) => {
    tasks = [
      ...tasks.slice(0, removedTaskIndex),
      ...tasks.slice(removedTaskIndex + 1),
    ];

    render();
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const renderTasks = () => {
    let tasksString = "";

    for (const task of tasks) {
      tasksString += `
        <li class="tasks__item">
          <button class="tasks__button tasks__button--toggleDone js-toggleDone">
          ${task.done ? "✔" : ""}
          </button>
          <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
          ${task.content}
          </span>
          <button class="tasks__button tasks__button--remove js-remove">
          🗑
          </button>
        </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = tasksString;
  };

  const renderButtons = () => {
    let buttonsString = "";

    if (tasks.length !== 0) {
      buttonsString = `
          <button class="section__button">Pokarz ukończone</button>
          <button class="section__button">Ukończ wszystkie</button>
          `;
    }

    document.querySelector(".js-buttons").innerHTML = buttonsString;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindToggleDoneEvents();
    bindRemoveEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    setInputFocus();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);

    formReset();
  };

  const init = () => {
    welcome();

    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
