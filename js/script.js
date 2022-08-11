let todoItems = [];

function renderTodo(todo) {
  const list = document.querySelector('.js-todo-list');
  const item = document.querySelector(`[data-key='${todo.id}']`);
  
  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = '';
    return
  }

  const isChecked = todo.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${"You will need to clock-out at: " + todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
  document.getElementById("timeInput").style.display = "inline";
}

function time_convert(num)
  { 
   var hours = Math.floor(num / 60);  
   var minutes = num % 60;
   return hours + ":" + minutes;         
 }

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');
  const [hoursInput, minutesInput] = input.value.split(':');
  hourInt = parseInt(hoursInput)
  hourConvert = (hourInt % 60)
  minuteInt = parseInt(minutesInput)

  //verificar isso
  if (minuteInt < 10) {
    minuteInt = "0"+minuteInt;
    return minuteInt
  }


  hour = time_convert((hourInt * 60)+ minuteInt + 510)
  duration = time_convert(510)
  
  
  clockOut = (hour);
  
  


  const text = input.value.trim();
  if (text !== '') {
    addTodo(clockOut);
    input.value = '';
    input.focus();
    document.getElementById("timeInput").style.display = "none";
  }
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});