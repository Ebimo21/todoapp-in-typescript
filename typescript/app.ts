const heading = document.getElementById("heading") as HTMLDivElement;
const root = document.getElementById("root") as HTMLDivElement;
const todoUL = document.getElementById("ulItem") as HTMLDivElement;
const formEl:HTMLFormElement = document.getElementById("todo-form") as HTMLFormElement
let listItemText: string[] ;

const headingOneEl = document.createElement("h1") as HTMLHeadingElement;
const headingOneElTextNode: Text = document.createTextNode("Welcome to my TodoList Application") ;
headingOneEl.append(headingOneElTextNode);
heading.append(headingOneEl);

function initialize():void{
    initDatabase()
    render()
}

const initDatabase =():void =>{
    if(!localStorage.todolist){
        localStorage.todolist = JSON.stringify([])
    }
}


const getData = ():string[] =>{
    return JSON.parse(localStorage.todolist)
}

const setData = (item:string[]):void =>{
    localStorage.todolist= JSON.stringify(item)
}

const render = ():void =>{
    getData().map((item:string, index:number) =>{
        const liEl:HTMLLIElement = document.createElement("li");
        const delBtn:HTMLButtonElement = document.createElement("button");

        delBtn.addEventListener('click', (handleDeleteTodoItem)(item));
        delBtn.innerText = "X"
        delBtn.dataset.key = `${index}`;

        liEl.dataset.key = `${index}`;
        const listText:string = item
        liEl.append(listText)
        liEl.append(delBtn)
        todoUL.append(liEl)
    })
}

const handleDeleteTodoItem= (todo:string):VoidFunction =>{
        return function():void{
            const item:string[] = getData().filter( (item, index) => item !== todo)
            setData(item)
        }
}


const handleAddTodo =(e: any):void =>{
    e.preventDefault()
    const formData= new FormData(formEl) as any
    let data: string[] = getData();
    const list:string = formData.get("todo-item")
    data.push(list)
    setData(data)
}

formEl.addEventListener("submit", handleAddTodo)

initialize()
const fun = 12