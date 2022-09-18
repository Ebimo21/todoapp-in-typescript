"use strict";
const heading = document.getElementById("heading");
const root = document.getElementById("root");
const todoUL = document.getElementById("ulItem");
const formEl = document.getElementById("todo-form");
let listItemText;
const headingOneEl = document.createElement("h1");
const headingOneElTextNode = document.createTextNode("Welcome to my TodoList Application");
headingOneEl.append(headingOneElTextNode);
heading.append(headingOneEl);
function initialize() {
    initDatabase();
    render();
}
const initDatabase = () => {
    if (!localStorage.todolist) {
        localStorage.todolist = JSON.stringify([]);
    }
};
const getData = () => {
    return JSON.parse(localStorage.todolist);
};
const setData = (item) => {
    localStorage.todolist = JSON.stringify(item);
};
const render = () => {
    getData().map((item, index) => {
        const liEl = document.createElement("li");
        const delBtn = document.createElement("button");
        delBtn.addEventListener('click', (handleDeleteTodoItem)(item));
        delBtn.innerText = "X";
        delBtn.dataset.key = `${index}`;
        liEl.dataset.key = `${index}`;
        const listText = item;
        liEl.append(listText);
        liEl.append(delBtn);
        todoUL.append(liEl);
    });
};
const handleDeleteTodoItem = (todo) => {
    return function () {
        const item = getData().filter((item, index) => item !== todo);
        setData(item);
    };
};
const handleAddTodo = (e) => {
    e.preventDefault();
    const formData = new FormData(formEl);
    let data = getData();
    const list = formData.get("todo-item");
    data.push(list);
    setData(data);
};
formEl.addEventListener("submit", handleAddTodo);
initialize();
const fun = 12;
