// Description: This is a comment
const form = document.getElementById('form');
const input = document.getElementById('input');
const ul = document.getElementById('ul');
const todos = JSON.parse(localStorage.getItem('todos'));

if(todos){
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit", function(event){
    event.preventDefault();
    console.log(input.value);
    add();
    saveData();
});

function add(todo){
    let todoText = input.value;
    let isCompleted = false;

    if(todo){
        todoText = todo.text;
        isCompleted = todo.completed;
    }
    if(todoText.trim() != ''){
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.appendChild(document.createTextNode(todoText));
        if (isCompleted) {
            li.style.textDecoration = "line-through";
        }
        li.addEventListener('contextmenu', function(event){
            event.preventDefault();
            li.remove();
            saveData();
        });
        li.addEventListener('click', function(){
            if (li.style.textDecoration === "line-through") {
                li.style.textDecoration = "none";
            } else {
                li.style.textDecoration = "line-through";
            }
            saveData();
        });
        
        ul.appendChild(li);
        input.value = '';
    }
};

function saveData(){
    const lists = document.querySelectorAll('li');
    let todos = [];
    lists.forEach(list=>{
        todos.push({
            text: list.innerText,
            completed: list.style.textDecoration === "line-through"
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
};