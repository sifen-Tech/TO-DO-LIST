const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addBtn');
const errorMessage =document.getElementById('errorMsg');
const taskList = document.getElementById('taskList');
const counterTask= document.getElementById('counter');
const clearButton = document.getElementById('clearBtn')
loadTasks();
function addTask(){
    const task = taskInput.value.trim();
    if (task){
        createTaskElement({text:task,done:false});
        taskInput.value='';
        saveTasks();
    }else{
        alert('please type a task first');
    }

}

  addButton.addEventListener('click', addTask);

function createTaskElement(taskObj){
    const taskTextValue = typeof taskObj === 'object' ? taskObj.text : taskObj;
    const taskDone = typeof taskObj === 'object' ? taskObj.done :false;
    const listItem =document.createElement('li');

    if(taskDone){
        listItem.classList.add('done');
    }
    

    const taskText = document.createElement('span');
    taskText.textContent = taskTextValue;
    taskText.className = 'task-text';
    listItem.appendChild(taskText);

    const deleteButton= document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    listItem.appendChild(deleteButton);


    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.className = 'done-btn';
    listItem.appendChild(doneButton);


    taskList.appendChild(listItem);
    deleteButton.addEventListener('click',function(){
        taskList.removeChild(listItem);
        saveTasks();
    });


    doneButton.addEventListener('click',function(){
        listItem.classList.toggle('done');
        saveTasks();
    });
}
function saveTasks(){
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function(item){
        const textSpan = item.querySelector('.task-text');
        
        if (textSpan) {
            tasks.push({
                text:textSpan.textContent.trim(),
                done:item.classList.contains('done')
            })
            
        }
    

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function loadTasks(){
    taskList.innerHTML ='';
    const tasks= JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
    //  localStorage.setItem('tasks', JSON.stringify(tasks));
}

