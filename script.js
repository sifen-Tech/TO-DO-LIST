const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addBtn');
const errorMessage =document.getElementById('errorMsg');
const taskList = document.getElementById('taskList');
const counterTask= document.getElementById('counter');
const clearButton = document.getElementById('clearBtn')

loadTasks();
function showValidationError(message){
    if(errorMessage){
        errorMessage.textContent=message;
        errorMessage.style.display='block';
    
    setTimeout(() => {
        errorMessage.textContent='';
        errorMessage.style.display ='none';
    },3000);
    }
}
function taskCounter(){
    const totalTasks = taskList.querySelectorAll('li').length;
    const incompleteTasks = taskList.querySelectorAll('li:not(.done)').length;
    if(counterTask){
    if(totalTasks > 0 && incompleteTasks === 0){
        counterTask.textContent = '🎉 All tasks done!';
        counterTask.classList.add('all-done');
    }else{
        counterTask.textContent = `Tasks left:${incompleteTasks}`;
        counterTask.classList.remove('all-done');
    }
        
    
    }
    }

function addTask(){
    const task = taskInput.value.trim();
    if (!task){
        showValidationError('Please type a task first');
        return;
    }
    const existingTasks = Array.from(taskList.querySelectorAll('.task-text')) .map(span=>span.textContent.trim().toLowerCase());
    if (existingTasks.includes(task.toLowerCase())){
        showValidationError('This task already exists!');
        return;
    }
        createTaskElement({text:task,done:false});
        taskInput.value='';
        saveTasks();
        taskCounter();
    }

  addButton.addEventListener('click', addTask);

function createTaskElement(taskObj){
    const taskTextValue = typeof taskObj === 'object' ? taskObj.text : taskObj;
    const taskDone = typeof taskObj === 'object' ? taskObj.done :false;
    const listItem =document.createElement('li');
    listItem.className = "task-item";
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
        taskCounter();
    });
    

    doneButton.addEventListener('click',function(){
        listItem.classList.toggle('done');
        saveTasks();
        taskCounter();
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
    taskCounter();
    }
clearButton.addEventListener('click',function(){
    if (taskList.children.length === 0) {
        showValidationError('There are no tasks to clear')
        return;
    }
    if (confirm('Are you sure you want to delete all tasks?')) {
        taskList.innerHTML = '';
        localStorage.removeItem('tasks');
        taskCounter();
}
});

let colors = document.querySelectorAll(".color-circle");
colors.forEach(function(circle){

    circle.addEventListener("click", function(){

        document.body.style.backgroundColor = circle.dataset.color;
        for(let i = 0; i < colors.length; i++){ 
            colors[i].classList.remove("active"); 
        }
    circle.classList.add("active");
    });
});