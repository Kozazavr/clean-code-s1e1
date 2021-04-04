//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task');//Add a new task.
const addButton = document.getElementsByTagName('button')[0];//first button
const incompleteTaskHolder = document.getElementById('form-todo__list');//ul of #incompleteTasks
const completedTasksHolder = document.getElementById('completed-tasks');//completed-tasks


//New task list item
const createNewTaskElement = function(taskString) {

  const listItem = document.createElement('li');

    //input (checkbox)
  const checkBox = document.createElement('input');//checkbx
    //label
  const label = document.createElement('label');//label
    //input (text)
  const editInput = document.createElement('input');//text
    //button.edit
  const editButton = document.createElement('button');//edit button

    //button.delete
  const deleteButton = document.createElement('button');//delete button
  const deleteButtonImg = document.createElement('img');//delete button image

  label.innerText = taskString;
  label.className = 'task';

    //Each elements, needs appending
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

    //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function() {
  console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

//Edit an existing task.

const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const containsClass = listItem.classList.contains('form-todo__edit');
    //If class of the parent is .editmode
  if (containsClass) {   //switch to .editmode
    label.innerText=editInput.value; //label becomes the inputs value.
    editBtn.innerText="Edit";
  } else {
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }
  
  listItem.classList.toggle("form-todo__edit");  //toggle .editmode on the parent.
};

//Delete task.
const deleteTask = function() {
  console.log("Delete Task...");
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function() {
  console.log("Complete Task...");
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem); //Append the task list item to the #completed-tasks
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
  console.log("Incomplete Task...");
  const listItem = this.parentNode; //Mark task as incomplete.
  incompleteTaskHolder.appendChild(listItem); //When the checkbox is unchecked
  bindTaskEvents(listItem,taskCompleted); //Append the task list item to the #incompleteTasks.
}

const ajaxRequest = function() {
  console.log("AJAX Request");
}

addButton.onclick = addTask; //The glue to hold it all together.
addButton.addEventListener('click', addTask); //Set the click handler to the addTask function.
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  const checkBox = taskListItem.querySelector("input[type=checkbox]"); //select ListItems children
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = editTask;  //Bind editTask to edit button.
  deleteButton.onclick = deleteTask;   //Bind deleteTask to delete button.
  checkBox.onchange = checkBoxEventHandler; //Bind taskCompleted to checkBoxEventHandler.
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {  //cycle over incompleteTaskHolder ul list items
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted); //for each list item
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {  //cycle over completedTasksHolder ul list items
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);  //bind events to list items chldren(tasksIncompleted)
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit m