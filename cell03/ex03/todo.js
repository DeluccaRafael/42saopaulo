// Seleciona elementos do DOM
const ftList = document.getElementById('ft_list');
const addTaskButton = document.getElementById('addTaskButton');

// Função para salvar as tarefas no cookie
function saveTasks() {
    const tasks = [];
    const taskElements = document.querySelectorAll('.task');
    taskElements.forEach(task => tasks.push(task.innerText));
    document.cookie = `tasks=${JSON.stringify(tasks)}; path=/;`;
}

// Função para carregar as tarefas do cookie
function loadTasks() {
    const cookies = document.cookie.split('; ');
    const tasksCookie = cookies.find(cookie => cookie.startsWith('tasks='));
    if (tasksCookie) {
        const tasks = JSON.parse(tasksCookie.split('=')[1]);
        tasks.reverse()
        tasks.forEach(taskText => addTask(taskText, false));

    }
}

// Função para adicionar uma tarefa 
function addTask(taskText, save = true) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.innerText = taskText;

    // Evento de clique para remover a tarefa
    taskDiv.addEventListener('click', () => {
        if (confirm('Deseja remover esta tarefa?')) {
            taskDiv.remove();
            saveTasks();
        }
    });

    // Adiciona a tarefa ao topo da lista
    ftList.prepend(taskDiv);

    // Salva as tarefas no cookie (somente se save for true)
    if (save) {
        saveTasks();
    }
}

// Evento de clique para adicionar nova tarefa
addTaskButton.addEventListener('click', () => {
    const taskText = prompt('Digite a nova tarefa:');
    if (taskText && taskText.trim() !== '') {
        addTask(taskText.trim());
    }
});

// Carrega as tarefas salvas ao abrir a página
loadTasks();
