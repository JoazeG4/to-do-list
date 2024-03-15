const form = document.getElementById('task-form');
const taskList = document.getElementById('tasks');
const cleanButton = document.getElementById('clean');
var count = 0;

form.onsubmit = function (e) {
    e.preventDefault();
    const inputField = document.getElementById('task-input');
    if (inputField.value.trim().length !== 0) {
        addTask(capitalizeFirstLetter(inputField.value.trim()));
        form.reset();
    } else {
        alert('Por favor, digite uma tarefa!');
    }
};

// Formatação da descrição da tarefa
function capitalizeFirstLetter(string) {
    return string.substring(0, 1).toUpperCase() + string.slice(1);
}

// Criação de tarefa
function addTask(description) {
    const taskContainer = document.createElement('div');
    const newTask = document.createElement('input');
    const taskLabel = document.createElement('label');
    const taskButton = document.createElement('button');
    const taskDescriptionNode = document.createTextNode(description);
    const removeTask = document.createTextNode('Remover');

    newTask.setAttribute('type', 'checkbox');
    newTask.setAttribute('name', description);
    newTask.setAttribute('id', 'task-' + count);

    taskLabel.setAttribute('for', 'task-' + count);
    taskLabel.appendChild(taskDescriptionNode);

    taskButton.setAttribute('type', 'button');
    taskButton.setAttribute('class', 'button-remove');
    taskButton.setAttribute('data-task-id', 'task-' + count);
    taskButton.appendChild(removeTask);
    taskButton.addEventListener('click', removeTaskHandler);

    taskContainer.classList.add('task-item');
    taskContainer.appendChild(newTask);
    taskContainer.appendChild(taskLabel);
    taskContainer.appendChild(taskButton);

    taskList.appendChild(taskContainer);

    count++;
}

// Event listener para o botão "Excluir Tudo"
cleanButton.addEventListener('click', function () {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
});

// Função para remover uma tarefa
function removeTaskHandler(event) {
    const taskId = event.target.getAttribute('data-task-id');
    const taskToRemove = document.getElementById(taskId);

    if (taskToRemove) {
        taskToRemove.parentNode.remove(); 
    }
}