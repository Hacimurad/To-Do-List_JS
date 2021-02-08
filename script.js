//Choose All Element
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const listGroup=document.querySelector(".list-group");
const filter=document.querySelector("#filter");
const clearAll=document.querySelector("#clear-todo");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secCardBody=document.querySelectorAll(".card-body")[1];


evenListeners()
//Event Listener
function evenListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoader",loadAllTodos());
    secCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearAll.addEventListener("click",clearAllTodos);

}

//Functions


//Clear All

function clearAllTodos(){
    if(confirm("Hamisi Silinsinmi?")){

        listGroup.innerHTML="";

        localStorage.removeItem("todos")
    }
}

//Filter

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1){
            listItem.setAttribute("style","display : none !important")
        }else{
            listItem.setAttribute("style","display : block")
        }
    })
}


//Delete Item
function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","Todonuz Silindi")
    }

}

//delete From Storage
function deleteTodoFromStorage(deleteTodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index) {
        if(todo===deleteTodo){
            todos.splice(index,1); //Delete from Array
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos))
}



//when refresh page/send same element
function loadAllTodos(){

    let todos=getTodosFromStorage();

    todos.forEach(todo => {
        addTodoUI(todo)
    });
}

function addTodo(e){
    const newTodo=todoInput.value.trim();

    if(newTodo === "" ){
        showAlert("danger","Zehmet olmasa deyer daxil edin")

    }else{


        addTodoUI(newTodo);
        addToStorage(newTodo);
        showAlert("success","Tebrikler..");
    }

    e.preventDefault();
}

//Get items  from Stroge
function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos= JSON.parse(localStorage.getItem("todos")) ;
    }
    return todos;

}

//Browse add to Storage
function addToStorage(newTodo){

    let todos=getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));


}


//Alert function
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove()
    },2000)

}

//Function Add to HTML Element 
function addTodoUI(newTodo){
    //create li
    const newList=document.createElement("li");
    newList.className="list-group-item d-flex justify-content-between";
    
    //link a href create
    const link_a=document.createElement("a");
    link_a.href="#";
    link_a.className="delete-item";
    link_a.innerHTML="<i class = 'fa fa-remove'></i>";

    //Append elements
    newList.appendChild(document.createTextNode(newTodo));
    listGroup.appendChild(newList);
    newList.appendChild(link_a);
    todoInput.value="";
    
}

