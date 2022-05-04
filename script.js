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
        event.target.style.fontSize = "30px";
    })

};
colorGreyTask();