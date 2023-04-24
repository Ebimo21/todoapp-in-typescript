"use strict";
const formEl = document.getElementById("todo-form");
const todoUL = document.getElementById("ulItem");
const todoInput = document.getElementById("todo-input");
let listItemText;
let id = localStorage.id || 0;
const todo = {
    id: id,
    name: todoInput.value,
    completed: false,
};
const model = {
    init: () => {
        if (!localStorage.todos) {
            localStorage.todos = JSON.stringify([]);
        }
        if (!localStorage.id) {
            localStorage.id = JSON.stringify(0);
        }
    },
    getTodos: () => {
        return JSON.parse(localStorage.todos);
    },
    deleteTodo: (e) => {
        const item = e.target.parentNode.innerText;
        const remainingTodo = model.getTodos().filter((todo) => todo.name !== item);
        localStorage.todos = JSON.stringify(remainingTodo);
        console.log(remainingTodo);
    }
};
const octopus = {
    init: () => {
        model.init();
        view.init();
    },
    getData: () => {
        return model.getTodos();
    },
    addData: (e) => {
        e.preventDefault();
        const output = model.getTodos();
        const id = ++localStorage.id;
        output.push(Object.assign(Object.assign({}, todo), { id: id, name: todoInput.value }));
        localStorage.todos = JSON.stringify(output);
        formEl.reset();
        view.render();
    },
    updateData: (e) => {
        const item = e.target.parentNode.innerText;
        const modTodo = model.getTodos().map(todo => todo.name == item ? Object.assign(Object.assign({}, todo), { completed: !todo.completed }) : todo);
        localStorage.todos = JSON.stringify(modTodo);
    },
    deleteData: (e) => {
        model.deleteTodo(e);
        view.render();
    }
};
const view = {
    init: () => {
        view.render();
        formEl.addEventListener("submit", octopus.addData);
    },
    render: () => {
        view.handleRemoveAllChildNode(todoUL);
        octopus.getData().map((item) => {
            const liEL = document.createElement("li");
            const btnEl = document.createElement("input");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = item.completed;
            btnEl.type = "button";
            btnEl.value = "X";
            checkbox.addEventListener('change', octopus.updateData);
            btnEl.addEventListener("click", octopus.deleteData);
            liEL.innerText = item.name;
            liEL.append(checkbox);
            liEL.append(btnEl);
            todoUL.append(liEL);
        });
    },
    handleRemoveAllChildNode: (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
};
octopus.init();
// const heading = document.getElementById("heading") as HTMLDivElement;
// const root = document.getElementById("root") as HTMLDivElement;
// const todoUL = document.getElementById("ulItem") as HTMLUListElement;
// const formEl:HTMLFormElement = document.getElementById("todo-form") as HTMLFormElement
// let listItemText: string[] ;
// const headingOneEl = document.createElement("h1") as HTMLHeadingElement;
// const headingOneElTextNode: Text = document.createTextNode("Welcome to my TodoList Application") ;
// headingOneEl.append(headingOneElTextNode);
// heading.append(headingOneEl);
// function initialize():void{
//     initDatabase()
//     render()
// }
// const initDatabase =():void =>{
//     if(!localStorage.todolist){
//         localStorage.todolist = JSON.stringify([])
//     }
// }
// const getData = ():string[] =>{
//     return JSON.parse(localStorage.todolist)
// }
// const setData = (item:string[]):void =>{
//     localStorage.todolist= JSON.stringify(item)
// }
// const handleRemoveAllChildNode = (parent:HTMLUListElement):void=>{
//     while(parent.firstChild){
//         parent.removeChild(parent.firstChild);
//     }
// }
// const render = ():void =>{
//     handleRemoveAllChildNode(todoUL)
//     getData().map((item:string, index:number) =>{
//         const liEl:HTMLLIElement = document.createElement("li");
//         const delBtn:HTMLButtonElement = document.createElement("button");
//         delBtn.addEventListener('click', (handleDeleteTodoItem)(item));
//         delBtn.innerText = "X"
//         delBtn.dataset.key = `${index}`;
//         liEl.dataset.key = `${index}`;
//         const listText:string = item
//         liEl.append(listText)
//         liEl.append(delBtn)
//         todoUL.append(liEl)
//     })
// }
// const handleDeleteTodoItem= (todo:string):VoidFunction =>{
//         return function():void{
//             const item:string[] = getData().filter( (item, index) => item !== todo)
//             setData(item)
//             render()
//         }
// }
// const handleAddTodo =(e: any):void =>{
//     e.preventDefault()
//     const formData= new FormData(formEl) as any
//     let data: string[] = getData();
//     const list:string = formData.get("todo-item")
//     data.push(list)
//     setData(data)
//     formEl.reset()
//     render()    
// }
// formEl.addEventListener("submit", handleAddTodo)
// initialize()
