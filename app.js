//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.querySelector(".todo__list");//ul of #incompleteTasks
var completedTasksHolder=document.querySelector(".completed-task__list");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    listItem.classList.add('todo__list-item', 'list-item')

    label.innerText=taskString;
    label.classList.add('todo__label', 'label')

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.classList.add('todo__input', 'input-checkbox')
    editInput.type="text";
    editInput.classList.add('todo__input', 'input-text')

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.classList.add('todo__button', 'button', 'button-edit')

    deleteButton.classList.add('todo__button', 'button', 'button-delete')
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.classList.add('todo__delete-img')
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.input-text');
    var label=listItem.querySelector(".label");
    var editBtn=listItem.querySelector(".button-edit");
    var containsClass=listItem.classList.contains("list-item--edit");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("list-item--edit");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    const checkBox = listItem.querySelector('.input-checkbox')
    const label = listItem.querySelector('.label')
    const editInput = listItem.querySelector('.input-text')
    const editButton = listItem.querySelector('.button-edit')
    const deleteButton = listItem.querySelector('.button-delete')
    const deleteButtonImg = listItem.querySelector('.todo__delete-img')

    listItem.classList.remove('todo__list-item');
    listItem.classList.add('completed-task__list-item', 'list-item');

    checkBox.className = 'completed-task__input';
    checkBox.classList.add('input-checkbox')

    label.className = 'completed-task__label';
    label.classList.add('label');

    editInput.className = 'completed-task__input';
    editInput.classList.add('input-text')

    editButton.className = 'completed-task__button';
    editButton.classList.add('button', 'button-edit')

    deleteButton.className = 'completed-task__button';
    deleteButton.classList.add('button', 'button-delete')

    deleteButtonImg.className = 'completed-task__delete-img'

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    const checkBox = listItem.querySelector('.input-checkbox')
    const label = listItem.querySelector('.label')
    const editInput = listItem.querySelector('.input-text')
    const editButton = listItem.querySelector('.button-edit')
    const deleteButton = listItem.querySelector('.button-delete')
    const deleteButtonImg = listItem.querySelector('.completed-task__delete-img')

    listItem.classList.remove('completed-task__list-item');
    listItem.classList.add('todo__list-item', 'list-item');

    checkBox.className = 'todo__input';
    checkBox.classList.add('input-checkbox')

    label.className = 'todo__label';
    label.classList.add('label');

    editInput.className = 'todo__input';
    editInput.classList.add('input-text')

    editButton.className = 'todo__button';
    editButton.classList.add('button', 'button-edit')

    deleteButton.className = 'todo__button';
    deleteButton.classList.add('button', 'button-delete')

    deleteButtonImg.className = 'todo__delete-img'

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".input-checkbox");
    var editButton=taskListItem.querySelector(".button-edit");
    var deleteButton=taskListItem.querySelector(".button-delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.