const todoInputItems = document.querySelector(`.whattodo`);
const todoListItems= document.querySelector(`.todolist`);
const leftItems=document.querySelector('.leftItems');

const body=document.querySelector("body");

function makeSnowFlake(){
    const snowflake= document.createElement("div");
    const delay= Math.random()*10
    const initialOpacity = Math.random();

    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random()*window.screen.width}px`;
    snowflake.style.animationDelay=`${delay}s`;
    snowflake.style.opacity=initialOpacity;

    body.appendChild(snowflake);


}
for (let i=0; i<50;i++){
      makeSnowFlake();
}

let todos=[];
let id = 0;

const setTodos =(newTodos) => {
    todos = newTodos;
}

const getTodos = ()=>{
    return todos;
}

const appendTodos=(text) =>{
    const newId=id++;
    const newTodo = getTodos().concat({id: newId, complete: false, content: text});
    setTodos(newTodo);
    showLeftItems();
    showList();
}

const getLeftItems = () => {
    return todos.filter(todo=> todo.complete === false);
}

const showLeftItems =()=>{
    const leftTodos = getLeftItems();
    leftItems.innerHTML=`남은 할 일 : ${leftTodos.length}`;
} 


const showList=()=>{
    todoListItems.innerHTML=null;
    const allTodos = getTodos();

    allTodos.forEach(todo => {
        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('listItem');
        
        const checkElem = document.createElement('div');
        checkElem.classList.add('checkbox');
        checkElem.addEventListener('click', ()=>completeTodo(todo.id));
        checkElem.innerHTML='😶'

        const todoElem=document.createElement('div');
        todoElem.classList.add('todo'); 
        todoElem.innerText=todo.content;

        const delBtnElem = document.createElement('button');
        delBtnElem.classList.add('delBtn');
        delBtnElem.addEventListener('click', ()=> deleteTodo(todo.id));
        delBtnElem.innerHTML='🗑';


        if(todo.complete){
            todoItemElem.classList.add('checked');
            checkElem.innerText='😀';
        }

        todoItemElem.appendChild(checkElem);
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(delBtnElem);
        todoListItems.appendChild(todoItemElem);

    })
}

const completeTodo=(todoId) => {
    const newTodo = getTodos().map(todo=>todo.id === todoId ? {...todo, complete: !todo.complete} : todo);
    setTodos(newTodo);
    showLeftItems();
    showList();
}

const deleteTodo = (todoId) => {
    const newTodo = getTodos().filter(todo=> todo.id !== todoId);
    setTodos(newTodo);
    showLeftItems();
    showList();
}

const init = () => {
    todoInputItems.addEventListener('keypress', (e) =>{
        if( e.key === 'Enter' ){
            appendTodos(e.target.value); todoInputItems.value ='';
        }
    })
    showLeftItems();
    showList();
}   

init()

