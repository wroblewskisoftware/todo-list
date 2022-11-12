{
  const tasks = [
    {
      content: "odrobić lekcje",
      done: false,
    },
    {
      content: "wstawić pracę do sprwdzenia",
      done: false,
    },
    {
      content: "dopracować pracę",
      done: false,
    },
  ];

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li>
        ${task.content}
        </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const init = () => {
    render();
  };

  init();
}
