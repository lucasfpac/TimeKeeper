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
    <span style="color: green;"> &#10004;</span>
    <span style=" font-size: 15px; text-align: center;">${" Clock-in: <b>" + clockIn + "</b>, You will need to clock-out at: <b>" + todo.text+"</b>"}</span>
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
    checked: true,
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
}

function time_convert(num)
  { 
   var hours = Math.floor(num / 60);  
   var minutes = num % 60;
   return hours + ":" + minutes;         
 }

const form = document.querySelector('#clockForm');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');
  const [hoursInput, minutesInput] = input.value.split(':');
  
  function completarZero(n) {
    return n <= 9 ? `0${n}` : `${n}`;
  }
  
  dataForm = hoursInput + ":" + minutesInput;
  
  dataForm = "2022-08-10T" + dataForm;
  dataR = new Date(dataForm);
  
  HourIn = completarZero(dataR.getHours())
  minuteIn = completarZero(dataR.getMinutes())
  dataR.setHours(dataR.getHours() + 8);
  dataR.setMinutes(dataR.getMinutes() + 30);
  hora = completarZero(dataR.getHours());
  minuto = completarZero(dataR.getMinutes());
  
  clockIn = (HourIn+ ":" +minuteIn)
  clockOut = (hora + ":" + minuto);

  const text = input.value.trim();
  if (text !== '') {
    addTodo(clockOut);
    input.value = '';
    input.focus();
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

var date = new Date();
var currentDate = date.toISOString().slice(0,10);
var currentTime = date.getHours() + ':' + date.getMinutes();
document.getElementById('timeInput').value = currentDate;