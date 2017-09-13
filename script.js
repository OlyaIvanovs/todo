//create new task
function addNewTodo() {
    console.log('new');
    var toDo = {};
    toDos.push(toDo);

    var newTodoCont = document.getElementById('add_todo_cont');
    newTodoCont.style.visibility = 'visible';

    var newTodoAddButton = newTodoCont.getElementsByTagName('button')[0];
    var newTodoCancelButton = newTodoCont.getElementsByTagName('button')[1];
    var newTodoAddInput = newTodoCont.getElementsByTagName('input')[0];
    var newTodoAddSelect = newTodoCont.getElementsByTagName('select')[0];
    var newTodoWarning = document.getElementById('add_todo_warning');
    var listTodo = document.getElementById('todo_list');
    newTodoWarning.style.display = 'none';
    newTodoAddInput.value = '';
    newTodoAddSelect.selectedIndex = 0;
    
    newTodoCancelButton.onclick = function() {
        newTodoCont.style.visibility = 'hidden';
    }

    newTodoAddButton.onclick =  function() {
        var newTodoIdProject = newTodoAddSelect[newTodoAddSelect.selectedIndex].id;
        var listTodo = document.getElementById('todo_list');
        toDo.name = newTodoAddInput.value;
        toDo.status = 'new';
        toDo.project_id = newTodoIdProject.split('_').slice(-1)[0];
        if (!toDo.name) {
            newTodoWarning.style.display = 'block';
        } else {
            toDo.id = toDoId;
            toDoId++;
            newTodoCont.style.visibility = 'hidden';

            var itemTodo = document.createElement('li');
            var itemTodoCheckbox = document.createElement('input');
            itemTodoCheckbox.type = "checkbox";
            itemTodo.appendChild(itemTodoCheckbox);
            itemTodo.appendChild(document.createTextNode("NEW!  " + toDo.name));
            var itemTodoDelete = document.createElement('button');
            itemTodoDelete.appendChild(document.createTextNode('Delete'));
            itemTodoDelete.className = "todos_li_delete";
            itemTodo.appendChild(itemTodoDelete);
            listTodo.appendChild(itemTodo);

            itemTodoDelete.onclick = function() {
                for (var k = 0; k < toDos.length; k++) {
                    if (toDos[k].id == toDo.id) {
                        toDos.splice(k, 1);
                        break;
                    };
                }
                listTodo.removeChild(this.parentElement);
            };

            itemTodoCheckbox.onclick = function() {
                var doneTodo = this.parentElement;
                toDo.status = (toDo.status == 'new'? 'done': 'new');

                if (this.checked) {
                    doneTodo.removeChild(doneTodo.getElementsByTagName('button')[0]);
                    var doneText = document.createElement('b');
                    doneText.appendChild(document.createTextNode(' DONE!'));
                    doneText.style.color = 'green';
                    doneTodo.appendChild(doneText);
                } else {
                    var itemTodoDelete = document.createElement('button');
                    itemTodoDelete.appendChild(document.createTextNode('Delete'));
                    doneTodo.appendChild(itemTodoDelete);
                    itemTodoDelete.className = "todos_li_delete";
                    itemTodoDelete.onclick = function() {
                        toDos.pop(toDo);
                        listTodo.removeChild(this.parentElement);
                    };
                    doneTodo.removeChild(doneTodo.getElementsByTagName('b')[0]);
                }
            }

        }
    }



    // toDos.length += 1;
}

function doneTodo(cont, todos, todos_project) {
    var doneTodos = cont.getElementsByTagName('input');
    var project = true;
    if (typeof todos_project == 'undefined') {
        todos_project = todos;
        var project = false;
    }
    for(var i = 0; i < todos_project.length; i++) {
        doneTodos[i].onclick = function() {
            var doneTodo = this.parentElement;
            var todoId = doneTodo.getAttribute('todo_id');

            for (var k = 0; k < todos.length; k++) {
                if (todos[k].id == todoId) {
                    todos[k].status = (todos[k].status == 'new'? 'done': 'new');
                    break;
                };
            }

            if (this.checked) {
                doneTodo.removeChild(doneTodo.getElementsByTagName('button')[0]);
                var doneText = document.createElement('b');
                doneText.appendChild(document.createTextNode(' DONE!'));
                doneText.style.color = 'green';
                doneTodo.appendChild(doneText);
            } else {
                var itemTodoDelete = document.createElement('button');
                itemTodoDelete.appendChild(document.createTextNode('Delete'));
                doneTodo.appendChild(itemTodoDelete);
                itemTodoDelete.className = "todos_li_delete";
                itemTodoDelete.onclick = function() {
                    for (var k = 0; k < todos.length; k++) {
                        if (todos[k].id == todoId) {
                            todos.splice(k, 1);
                            break;
                        };
                    }
                    listTodo.removeChild(this.parentElement);
                };
                doneTodo.removeChild(doneTodo.getElementsByTagName('b')[0]);
            }
        }
    }
}

function deleteTodo(cont, todos,todos_project) {
    var deleteTodos = cont.getElementsByTagName('button');
    var project = true;
    if (typeof todos_project == 'undefined') {
        todos_project = todos;
        var project = false;
    }
    for(var i = 0; i < todos_project.length; i++) {
        if (deleteTodos[i]) {
            deleteTodos[i].onclick = function() {
                var todoId = this.parentElement.getAttribute('todo_id');
                for (var k = 0; k < todos.length; k++) {
                    if (project && todos_project[k].id == todoId) {
                        todos_project.splice(k, 1);
                        project = false;
                    };
                    if (todos[k].id == todoId) {
                        todos.splice(k, 1);
                        break;
                    };
                }
                cont.getElementsByTagName('ul')[0].removeChild(this.parentElement);
            };
        }
    }
}



var projects = [{'name': 'Routine', 'id': 0},
                {'name': 'Books', 'id': 1}];
var toDoId = 4;
var toDos = [{'name': 'Thing 1','status': 'new', 'id': 0, 'project_id': 0}, 
            {'name' : 'Thing2', 'status': 'new', 'id': 1, 'project_id': 0}, 
            {'name': 'Thing 3', 'status': 'done', 'id': 2, 'project_id': 1},
            {'name': 'Thing 111','status': 'new', 'id': 3, 'project_id': 1}];
var toDosDone = [{'name': 'Thing 3','status': 'done', 'id': 2, 'project_id': 1}]; 

var projectsCont= document.getElementById('projects');
var toDosDoneCont = document.getElementById('done_todos');
var toDosAllCont = document.getElementById('all_todos');

var source   = document.getElementById('list-todos-template').innerHTML;
var templateListTodos = Handlebars.compile(source);

var source   = document.getElementById('projects-list-template').innerHTML;
var template = Handlebars.compile(source);
var context = {projects: projects};
projectsCont.innerHTML = template(context);

var source   = document.getElementById('projects-select_template').innerHTML;
var template = Handlebars.compile(source);
var context = {projects: projects};
document.getElementById('projects-select').innerHTML = template(context);

var context = {title: "ALL Todos", toDos: toDos};
toDosAllCont.innerHTML = templateListTodos(context);


var projectLinks = projectsCont.getElementsByTagName('li');
for(var i = 0; i < projectLinks.length; i++) {
    projectLinks[i].onclick = function(){
        for(var i = 0; i < projectLinks.length; i++) {
            projectLinks[i].className = 'projects_li';
        }
        this.className += ' active';
        var projectId = this.getAttribute('project_id');
        var projectTasks = [];
        for (var k = 0; k < toDos.length; k++) {
            if (toDos[k].project_id == projectId) {
                projectTasks.push(toDos[k]);
            };
        }
        var context = {title: "ALL Todos", toDos: projectTasks};
        toDosAllCont.innerHTML = templateListTodos(context);
        deleteTodo(toDosAllCont, toDos, projectTasks);
        doneTodo(toDosAllCont, toDos, projectTasks);
    };
}

var seeAllTodos = document.getElementById('see_all_todos');
seeAllTodos.addEventListener('click', function(e) {
    e.preventDefault();
    var context = {title: "ALL Todos", toDos: toDos};
    toDosAllCont.innerHTML = templateListTodos(context);
    deleteTodo(toDosAllCont, toDos);
    doneTodo(toDosAllCont, toDos);
})


var addNewTodoButton = document.getElementById('add_button');
addNewTodoButton.onclick = addNewTodo;
deleteTodo(toDosAllCont, toDos);
doneTodo(toDosAllCont, toDos);

//Filter
var filterMenu = document.getElementById('id_filter');
filterMenu.onclick = function() {
    // show all todos that DONE
    if (filterMenu.selectedIndex == 1) {
        console.log(toDosDone);
    }
}


