{
  const welcome = () => {
    console.log("Hello world.");
  };

  let tasks = [];
  let hideDoneTasks = false;

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

  const hideAllDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const bindHideAllDoneTasksEvents = () => {
    const hideAllDoneTasksButton = document.querySelector(
      ".js-hideAllDoneTasks"
    );

    if (hideAllDoneTasksButton !== null) {
      hideAllDoneTasksButton.addEventListener("click", () => {
        hideAllDoneTasks();
      });
    }
  };

  const toggleAllTasksDone = (tasks) => {
    tasks = tasks.map((task) => (task.done = true));

    render();
  };

  const bindToggleAllTasksDoneEvents = () => {
    const toggleAllTasksDoneButton = document.querySelector(
      ".js-toggleAllTasksDone"
    );

    if (toggleAllTasksDoneButton !== null) {
      toggleAllTasksDoneButton.addEventListener("click", () => {
        toggleAllTasksDone(tasks);
      });
    }
  };

  const renderTasks = () => {
    let tasksString = "";

    for (const task of tasks) {
      tasksString += `
        <li class="tasks__item ${task.done && hideDoneTasks === true 
            ? "tasks__item--hidden" 
            : ""}">
          <button class="tasks__button tasks__button--toggleDone js-toggleDone">
            ${task.done 
              ? "✔" 
              : ""}
          </button>
          <span class="tasks__content ${task.done 
              ? "tasks__content--done" 
              : ""}">
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
          <button class="section__button js-hideAllDoneTasks">
            ${hideDoneTasks === false 
              ? "Ukryj" 
              : "Pokaż"} ukończone
          </button>
          <button class="section__button js-toggleAllTasksDone">Ukończ wszystkie</button>
          `;
    }

    document.querySelector(".js-buttons").innerHTML = buttonsString;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindToggleDoneEvents();
    bindRemoveEvents();
    bindHideAllDoneTasksEvents();
    bindToggleAllTasksDoneEvents();
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
