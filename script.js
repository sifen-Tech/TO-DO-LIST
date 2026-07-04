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
        createTaskElement(task);
        taskInput.value='';
        saveTasks()
    }else{
        alert('please type a task first')
    }

}

  


addButton.addEventListener('click', addTask);

function createTaskElement(task){
    const listItem =document.createElement('li');
    listItem.textContent = task;

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
        tasks.push(item.textContent.replace('Delete','').replace('Done','').trim());


    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function loadTasks(){
    const tasks= JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}
//if(taskInput.value.trim()===''){
//         alert("Please type a task first");
//     }
//     else{
//         let li =document.createElement("li");
//         li.innerHTML = taskInput.value;
//         taskList.appendChild(li);
       
    
//     taskInput.value="";
    
// }
// }
//     addButton.addEventListener('click', addTask);
//     const doneButton = document.createElement('button');
// //     

    // let taskText = document.createElement("span");
    // taskText.textContent = taskInput.value;
    // li.appendChild(taskText);
    // let doneButton = document.createElement("button");
    // doneButton.textContent = "Done";
    // doneButton.className = "done-btn";
    // doneButton.addEventListener('click', function() {
    // li.classList.toggle("checked");
    //     });
    // li.appendChild(doneButton);
    // taskList.appendChild(li);
    // addButton.addEventListener('click', addTask);

    // function saveTasks(){
    //     localStorage.setItem("data",listContainer.innerHTML);
    // }
    // function showTask(){
    //     listContainer.innerHTML =localStorage.getItem("data");
    // }
    // showTask();

