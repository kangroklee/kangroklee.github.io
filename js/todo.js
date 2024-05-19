const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let todos = [];

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function paintTodo(newTodoObj) {
    const listElement = document.createElement("li");
    listElement.id = newTodoObj.id;

    const mainContainer = document.createElement("div");
    const deleteContainer = document.createElement("div");

    mainContainer.className = "main-list";
    deleteContainer.className = "sub-list";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener("click", strikethru); 

    const span = document.createElement("span");
    span.innerText = newTodoObj.text;

    const btn = document.createElement("button");
    btn.innerText = "🗑️";
    btn.addEventListener("click", deleteTodo);

    mainContainer.appendChild(input);
    mainContainer.appendChild(span);
    listElement.appendChild(mainContainer);
    deleteContainer.appendChild(btn);
    listElement.appendChild(deleteContainer);

    todoList.appendChild(listElement);
}

function strikethru(event) {
    const done = event.target.parentElement;
    done.classList.toggle("strikethru");
}

function deleteTodo(event) {
    const li = event.target.parentElement.parentElement;
    todos = todos.filter((foo) => foo.id !== parseInt(li.id));
    li.remove();
    saveTodos();
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    }
    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);
if(savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach((item)=> paintTodo(item));
}