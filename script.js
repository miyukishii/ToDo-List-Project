const listTask = document.querySelector('#lista-tarefas');
const input = document.querySelector('#texto-tarefa');
const btnAddTask = document.querySelector('#criar-tarefa');
const btnRemoveCompleted = document.querySelector('#remover-finalizados');
const btnClearTasks = document.querySelector('#apaga-tudo');
const saveTasksBtn = document.querySelector('#salvar-tarefas');
const removeSelected = document.querySelector('#remover-selecionado');
const upTask = document.querySelector('#mover-cima');
const downTask = document.querySelector('#mover-baixo');

// Criando list ordenada

function addEvenOnItem(event) {
  const listItems = document.querySelectorAll('li');
  if (listItems.length > 0) {
    listItems.forEach((item) => (
      item !== event.target ? item.classList.remove('selected') : true
    ));
  }
  event.target.classList.add('selected');
}

function addTask() {
  if (input.value !== '') {
    const newTask = document.createElement('li');
    newTask.innerHTML = input.value;
    // Criando evento de click em cada item da lista
    newTask.addEventListener('click', (event) => addEvenOnItem(event));
    // Criando evento de double click para riscar em cada item da lista
    newTask.addEventListener('dblclick', () => {
      newTask.classList.toggle('completed');
    });
    listTask.appendChild(newTask);
  }
  input.value = '';
}
addTask();

// Criando evento de adicionar tarefa ao botão addTask

btnAddTask.addEventListener('click', addTask);

// Criar evento de click para limpar lista de tarefa

function clearTaskList() {
  listTask.innerHTML = '';
}

btnClearTasks.addEventListener('click', clearTaskList);

// Criar evento de click para remover completed tasks

function removeCompletedTasks() {
  const items = document.querySelectorAll('li');
  for (let aux = 0; aux < items.length; aux += 1) {
    if (items[aux].classList.contains('completed')) {
      listTask.removeChild(items[aux]);
    }
  }
}
btnRemoveCompleted.addEventListener('click', removeCompletedTasks);

// Função para verificar listas do localStorage, e para renderizar o que tiver salvo.

function verifyStorage() {
  if (localStorage.getItem('savedListTask') !== null) {
    const savedListTask = JSON.parse(localStorage.getItem('savedListTask'));
    savedListTask.forEach((task) => {
      const newTask = document.createElement('li');
      newTask.innerHTML = task.innerHTML;
      newTask.className = task.className;
      newTask.addEventListener('click', (event) => addEvenOnItem(event));
      newTask.addEventListener('dblclick', () => {
        newTask.classList.toggle('completed');
      });
      listTask.appendChild(newTask);
    });
  }
}

// Função para salvar lista no localStorage quando apertar saveTasksBtn

function saveInStorage() {
  const savedTasks = [];
  const tasks = document.querySelectorAll('li');
  tasks.forEach((task) => savedTasks.push({
    innerHTML: task.innerHTML,
    className: task.className,
  }));
  localStorage.setItem('savedListTask', JSON.stringify(savedTasks));
}

saveTasksBtn.addEventListener('click', saveInStorage);

// Função remover apenas o task selecionado

const removeSelectedTask = () => {
  const taskContainer = document.querySelector('#lista-tarefas');
  const tasks = document.querySelectorAll('li');
  tasks.forEach((task) => (
    task.classList.contains('selected') ? taskContainer.removeChild(task) : true
  ));
};

removeSelected.addEventListener('click', removeSelectedTask);

const moveTaskUp = () => {
  const selected = document.querySelector('.selected');
  const tasks = document.querySelectorAll('li');
  if (selected !== tasks[0] && selected !== null) {
    selected.previousElementSibling.before(selected);
  }
};

upTask.addEventListener('click', moveTaskUp);

const moveTaskDown = () => {
  const selected = document.querySelector('.selected');
  const tasks = document.querySelectorAll('li');
  if (selected !== tasks[tasks.length - 1] && selected !== null) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/after
    selected.nextElementSibling.after(selected);
  }
};

downTask.addEventListener('click', moveTaskDown);

window.onload = () => {
  verifyStorage();
};
