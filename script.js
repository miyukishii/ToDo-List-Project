const board = document.querySelector('#main-content');

// Criando list ordenada

const list = document.createElement('ol');
list.id = 'lista-tarefas';
board.appendChild(list);

// Criar função do evento do botão adicionar tarefa

function addTask() {
    const input = document.querySelector('#texto-tarefa');
    if(input.value !== '') {
    const newTask = document.createElement('li');
    newTask.innerHTML = input.value;
    list.appendChild(newTask);
    }
    input.value = null;
}
addTask();

// Criando evento no botão adicionar tarefa

const btnAddTask = document.querySelector('#criar-tarefa');

btnAddTask.addEventListener('click', addTask);

// Criando evento de click em cada item da lista

function colorGreyTask() {
    let item = document.querySelector('#lista-tarefas');
    item.addEventListener('click',function(event) {
        event.target.style.background = 'rgb(128, 128, 128)';
    })
};
colorGreyTask();

// Criando evento de click para riscar em cada item da lista 

function checkTask() {
    let item = document.querySelector('#lista-tarefas');
    item.addEventListener('dblclick',function(event) {
        event.target.className = 'completed';
    })
};
checkTask();

// Criar evento de click para limpar lista de tarefa

const btnClearTasks = document.querySelector('#apaga-tudo');

function clearTaskList() {
    const allTasks = document.querySelector('#lista-tarefas');
    allTasks.innerHTML = '';
}

btnClearTasks.addEventListener('click',clearTaskList);

// Criar evento de click para remover completed tasks

const btnRemoveCompleted = document.querySelector('#remover-finalizados');

function removeCompletedTasks() {
    let list = document.querySelector('#lista-tarefas');
    const items = document.querySelectorAll('li');
    for(let aux = 0; aux < items.length; aux += 1){
        if (items[aux].className === 'completed') {
            list.removeChild(items[aux]);
        }
    }
}
btnRemoveCompleted.addEventListener('click', removeCompletedTasks);