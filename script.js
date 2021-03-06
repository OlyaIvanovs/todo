document.onclick = hideBlocks;

var today = new Date();
var todayMonth = today.getMonth();
var todayYear = today.getFullYear();
var todayDay = today.getDate();

function hideBlocks() {
    for (var k = 0; k < todoOptionsBlocks.length; k++) {
        if (todoOptionsBlocks[k].hasAttribute('show')) {
            todoOptionsBlocks[k].removeAttribute('show');
            break;
        }
        if (!todoOptionsBlocks[k].hasAttribute('show') &&
            todoOptionsBlocks[k].style.display == 'block') {
            todoOptionsBlocks[k].style.display = 'none';
        }
    }
}

function getYMDDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    var dateStr = "" + day + "." + month + "." + year;
    return dateStr;
}

// to increase with sign = 1 or to decrease with sign = -1
function changeNumberProjects(pr_id, sign) {
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].id == pr_id) {
            if (sign == 1) {
                projects[i].number += 1;
            } else if (sign == -1) {
                projects[i].number -= 1;
            }
            projectsLi[i+1].getElementsByTagName('b')[0].innerHTML = ' (' + projects[i].number + ')';
            break;
        }
    }
}

function showMoreLinks(todoMoreLinks) {
    for (var k = 0; k < todoMoreLinks.length; k++) {
        todoMoreLinks[k].onclick = function() {
            var options = this.parentElement.getElementsByClassName('todo_li_more_options')[0];
            options.style.display = 'block';
            options.setAttribute('show', '');
        }
    }
}

function changeTodo(optionsBlock, showAll=false) {
    var todoOptionsParent = optionsBlock.parentElement;
    while (todoOptionsParent.tagName !== "HTML") {
        if (todoOptionsParent.tagName === "LI") {
            break;
        } 
        todoOptionsParent = todoOptionsParent.parentNode;
    }
    var todoId = todoOptionsParent.getAttribute('todo_id');
    for (var l=0; l<toDos.length; l++) {
        if (toDos[l].id == todoId) {
            var todo = toDos[l];
        }
    }
    var todoOptions = optionsBlock.getElementsByTagName('li');
    for (var i = 0; i < todoOptions.length; i++) {
        var optionId = todoOptions[i].id;
        if (optionId.startsWith("todo_edit_")) {
            todoOptions[i].onclick = function() {
                var todoOptionsParent = this.parentElement;
                while (todoOptionsParent.tagName !== "HTML") {
                    if (todoOptionsParent.hasAttribute('todo_id')) {
                        var todoItem = todoOptionsParent;
                        var todoId = todoOptionsParent.getAttribute('todo_id');
                        for (var n = 0; n < toDos.length; n++) {
                            if (toDos[n].id == todoId) {
                                var todo = toDos[n];
                            }
                        }
                        break;
                    } 
                    todoOptionsParent = todoOptionsParent.parentNode;
                }
                var todoEditMenu = document.getElementById('todo_edit');  
                var todoEditMenuButtons = todoEditMenu.getElementsByTagName('button');
                todoEditMenuButtonEdit = todoEditMenuButtons[0];    
                todoEditMenuButtonCancel = todoEditMenuButtons[1];
                todoEditMenuInput = todoEditMenu.getElementsByTagName('input')[0];
                todoEditMenuInput.value = '';
                todoEditMenuInput.setAttribute('placeholder', todo.name)

                todoEditMenu.style.display = 'block';

                todoEditMenuButtonEdit.onclick = function() {
                    todo.name = todoEditMenuInput.value;
                    todoItem.getElementsByTagName('p')[0].innerHTML = todo.name;
                    todoEditMenu.style.display = 'none';
                }
                todoEditMenuButtonCancel.onclick = function() {
                    todoEditMenu.style.display = 'none';
                }


            }
        }
        if (optionId.startsWith("todo_move_")) {
            todoOptions[i].onclick = function() {
                var todoOptionsParent = this.parentElement;
                while (todoOptionsParent.tagName !== "HTML") {
                    if (todoOptionsParent.hasAttribute('todo_id')) {
                        var todoItem = todoOptionsParent;
                        var todoId = todoOptionsParent.getAttribute('todo_id');
                        for (var n = 0; n < toDos.length; n++) {
                            if (toDos[n].id == todoId) {
                                var todo = toDos[n];
                            }
                        }
                        break;
                    } 
                    todoOptionsParent = todoOptionsParent.parentNode;
                }
                var todoMoveMenu = document.getElementById('todo_move');  
                var todoMoveMenuButtons = todoMoveMenu.getElementsByTagName('button');
                var todoMoveMenuSelect = todoMoveMenu.getElementsByTagName('select')[0];
                todoMoveMenuButtonMove = todoMoveMenuButtons[0];    
                todoMoveMenuButtonCancel = todoMoveMenuButtons[1];
                todoMoveMenu.style.display = 'block'; 
                var previousProjectId = todo.project_id;    
                todoMoveMenuButtonMove.onclick = function() {
                    var newProjectIdStr = todoMoveMenuSelect[todoMoveMenuSelect.selectedIndex].id;
                    var newProjectId = newProjectIdStr.split('_').slice(-1)[0];
                    if (newProjectId != previousProjectId) {;
                        todo.project_id = newProjectId;
                        changeNumberProjects(newProjectId, 1);
                        changeNumberProjects(previousProjectId, -1);
                        if (!showAll) document.getElementById('todo_list').removeChild(todoItem);

                    }
                    todoMoveMenu.style.display = 'none';
                } 
                todoMoveMenuButtonCancel.onclick = function() {
                    todoMoveMenu.style.display = 'none';
                }
            }
        }
    }
}

//create new task
function addNewTodo() {
    let toDo = {};
    toDos.push(toDo);

    let newTodoCont = document.getElementById('add_todo_cont');
    newTodoCont.style.visibility = 'visible';

    let newTodoAddButton = newTodoCont.getElementsByTagName('button')[0];
    let newTodoCancelButton = newTodoCont.getElementsByTagName('button')[1];
    let newTodoAddInput = newTodoCont.getElementsByTagName('input')[0];
    let newTodoAddSelect = newTodoCont.getElementsByTagName('select')[0];
    let newTodoWarning = document.getElementById('add_todo_warning');
    let newTodoAddDate = document.getElementById('chosen_date');
    let listTodo = document.getElementById('todo_list');
    let calendarWrap = document.getElementsByClassName('calendar_wrapper')[0];
    let dateDelete = document.getElementsByClassName('todos_add-new_delete-date')[0];
    let calendar = MyCalendar();
    let chosenDateCont = calendar.chosenDateCont();
    chosenDateCont.value = "" + todayDay + ' ' + monthsArray[todayMonth] + ' ' + todayYear;
    let noDate = false;
    dateDelete.onclick = function() {
        noDate = true;
        chosenDateCont.value = "";
    }
    calendarWrap.onclick = function() {
        if (chosenDateCont.value) {
            noDate = false;
        }
    }
    newTodoWarning.style.display = 'none';
    newTodoAddInput.value = '';
    newTodoAddSelect.selectedIndex = 0;

    newTodoAddDate.onclick = function() {
        calendarWrap.style.cssText = "height: auto; visibility: visible;";
    }
    
    newTodoCancelButton.onclick = function() {
        newTodoCont.style.visibility = 'hidden';
        calendarWrap.style.cssText = "height: 0; visibility: hiddens;";
    }

    newTodoAddButton.onclick =  function() {
        let newTodoIdProject = newTodoAddSelect[newTodoAddSelect.selectedIndex].id;
        var listTodo = document.getElementById('todo_list');
        toDo.name = newTodoAddInput.value;
        toDo.status = 'new';
        if (!noDate) {
           toDo.date = calendar.chosenDate(); 
           toDo.showed_date = getYMDDate(toDo.date);
        }
        toDo.project_id = newTodoIdProject.split('_').slice(-1)[0];
        changeNumberProjects(toDo.project_id, 1);
        if (!toDo.name) {
            newTodoWarning.style.display = 'block';
        } else {
            toDo.id = toDoId;
            toDoId++;
            newTodoCont.style.visibility = 'hidden';
            calendarWrap.style.cssText = "height: 0; visibility: hidden;";

            let selectedProject = document.getElementsByClassName('projects_li active')[0];
            if (selectedProject.id == 'see_all_todos' || 
                (selectedProject.getAttribute('project_id') == toDo.project_id)) {
                let itemTodo = document.createElement('li');
                itemTodo.setAttribute("todo_id", toDo.id);
                listTodo.appendChild(itemTodo);

                let source   = document.getElementById('todo_template').innerHTML;
                let template = Handlebars.compile(source);
                console.log(toDo.date);
                console.log(toDo.date);
                itemTodo.innerHTML = template(
                    {id: toDo.id, name: toDo.name, date: toDo.date, showed_date: toDo.showed_date});

                let itemTodoDelete = itemTodo.getElementsByClassName('todos_li_delete')[0];
                let itemTodoCheckbox = itemTodo.getElementsByTagName('input')[0];
                showMoreLinks(itemTodo.getElementsByClassName('todo_li_more_link'));
                changeTodo(itemTodo.getElementsByClassName('todo_li_more_options')[0]);

                itemTodoDelete.onclick = function() {
                    for (let k = 0; k < toDos.length; k++) {
                        if (toDos[k].id == toDo.id) {
                            toDos.splice(k, 1);
                            changeNumberProjects(toDo.project_id, -1);
                            break;
                        };
                    }
                    listTodo.removeChild(this.parentElement);
                };

                itemTodoCheckbox.onclick = function() {
                    let doneTodo = this.parentElement;
                    toDo.status = (toDo.status == 'new'? 'done': 'new');

                    if (this.checked) {
                        doneTodo.removeChild(doneTodo.getElementsByTagName('button')[0]);
                        let doneText = document.createElement('b');
                        doneText.appendChild(document.createTextNode(' DONE!'));
                        doneText.style.color = 'green';
                        doneTodo.appendChild(doneText);
                    } else {
                        let itemTodoDelete = document.createElement('button');
                        itemTodoDelete.appendChild(document.createTextNode('Delete'));
                        doneTodo.appendChild(itemTodoDelete);
                        itemTodoDelete.className = "todos_li_delete";
                        itemTodoDelete.onclick = function() {
                            toDos.pop(toDo);
                            listTodo.removeChild(this.parentElement);
                            changeNumberProjects(toDo.project_id, -1);
                        };
                        doneTodo.removeChild(doneTodo.getElementsByTagName('b')[0]);
                    }
                }
            }
        }
    }
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
                var doneSign = doneTodo.getElementsByTagName('b')[1];
                doneTodo.removeChild(doneSign);
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
                        changeNumberProjects(todos[k].project_id, -1);
                        break;
                    };
                }
                cont.getElementsByTagName('ul')[0].removeChild(this.parentElement);
            };
        }
    }
}

function clickProjectLink() {
    var projectLinks = projectsCont.getElementsByTagName('li');
    for(var i = 0; i < projectLinks.length; i++) {
        projectLinks[i].onclick = function(){
            for(var i = 0; i < projectLinks.length; i++) {
                projectLinks[i].className = 'projects_li';
            }
            this.className += ' active';
            var projectId = this.getAttribute('project_id');
            var projectTasks = [];
            if (projectId) {
                for (var k = 0; k < toDos.length; k++) {
                    if (toDos[k].project_id == projectId) {
                        projectTasks.push(toDos[k]);
                    };
                }
            } else {
                projectTasks = toDos;
            }
            var context = {title: "ALL Todos", toDos: projectTasks};
            toDosAllCont.innerHTML = templateListTodos(context);
            deleteTodo(toDosAllCont, toDos, projectTasks);
            doneTodo(toDosAllCont, toDos, projectTasks);
            var todoMoreLinks = toDosAllCont.getElementsByClassName('todo_li_more_link');
            showMoreLinks(todoMoreLinks);
            var todoOptionsBlocks = toDosAllCont.getElementsByClassName('todo_li_more_options');
            for (var k = 0; k < todoOptionsBlocks.length; k++) {
                changeTodo(todoOptionsBlocks[k]);
            }
        };
    }
}


var projects = [{'name': 'Routine', 'id': 0, 'number': 2},
                {'name': 'Books', 'id': 1, 'number': 2}];
var projectId = 2;
var toDoId = 4;
var todosdate = new Date('2017-09-26');
var showed_date = getYMDDate(todosdate);
var toDos = [{'name': 'Thing 1','status': 'new', 'id': 0, 'project_id': 0, 'date': todosdate, 'showed_date': showed_date}, 
            {'name' : 'Thing2', 'status': 'new', 'id': 1, 'project_id': 0, 'date': todosdate, 'showed_date': showed_date}, 
            {'name': 'Thing 3', 'status': 'done', 'id': 2, 'project_id': 1, 'date': todosdate, 'showed_date': showed_date},
            {'name': 'Thing 111','status': 'new', 'id': 3, 'project_id': 1}];
var toDosDone = [{'name': 'Thing 3','status': 'done', 'id': 2, 'project_id': 1}]; 

var projectsCont= document.getElementById('projects');
var toDosDoneCont = document.getElementById('done_todos');
var toDosAllCont = document.getElementById('all_todos');
var projectSelector = document.getElementById('projects-select');

var source   = document.getElementById('list-todos-template').innerHTML;
var templateListTodos = Handlebars.compile(source);
toDosAllCont.innerHTML = templateListTodos({title: "ALL Todos", toDos: toDos});

var source   = document.getElementById('projects-list-template').innerHTML;
var template = Handlebars.compile(source);
projectsCont.innerHTML = template({projects: projects});

var source   = document.getElementById('projects-select_template').innerHTML;
var template = Handlebars.compile(source);
projectSelector.innerHTML = template({projects: projects});
document.getElementById('projects-select-moving').innerHTML = template({projects: projects});

var projectsLi = projectsCont.getElementsByTagName('li');

clickProjectLink();

var seeAllTodos = document.getElementById('see_all_todos');
seeAllTodos.addEventListener('click', function(e) {
    e.preventDefault();
    var context = {title: "ALL Todos", toDos: toDos};
    toDosAllCont.innerHTML = templateListTodos(context);
    var todoMoreLinks = document.getElementsByClassName('todo_li_more_link');
    var todoOptionsBlocks = document.getElementsByClassName('todo_li_more_options');
    deleteTodo(toDosAllCont, toDos);
    doneTodo(toDosAllCont, toDos);
    showMoreLinks(todoMoreLinks);
    for (var k = 0; k < todoOptionsBlocks.length; k++) {
        changeTodo(todoOptionsBlocks[k], true);
    }
})


var addNewTodoButton = document.getElementById('add_button');
var todoMoreLinks = document.getElementsByClassName('todo_li_more_link');
var todoOptionsBlocks = document.getElementsByClassName('todo_li_more_options');
addNewTodoButton.onclick = addNewTodo;
deleteTodo(toDosAllCont, toDos);
doneTodo(toDosAllCont, toDos);
showMoreLinks(todoMoreLinks);
for (var k = 0; k < todoOptionsBlocks.length; k++) {
    changeTodo(todoOptionsBlocks[k], true);
}


var addNewProjectButton = document.getElementById('add_project');
addNewProjectButton.onclick = function() {
    var projectName = prompt("Please enter the name of a new project.");
    if (projectName != "" || projectName != null) {
        var newProject = {};
        newProject.name = projectName;
        newProject.id = projectId;
        newProject.number = 0;
        projectId++;
        projects.push(newProject);

        var projectsList = projectsCont.getElementsByTagName('ul')[0];
        var itemProject = document.createElement('li');
        itemProject.setAttribute("project_id", newProject.id);
        itemProject.setAttribute("class", "projects_li");
        itemProject.appendChild(document.createTextNode(newProject.name));
        var itemProjectNumber = document.createElement('b');
        itemProjectNumber.appendChild(document.createTextNode(' (' + newProject.number + ')'));
        itemProject.appendChild(itemProjectNumber);
        projectsList.appendChild(itemProject);
        projectSelector.innerHTML = template({projects: projects});
        clickProjectLink(); 
    }
}


//Date
function changeWeekTitles() {
    for (var k = 0; k < weekDays.length; k++) {
        var weekDay = weekDays[k].getElementsByClassName('table_week_day')[0];
        var day = new Date();
        day.setDate(day.getDate()- todayWeekDay + k + weekDiff*7);
        var dayMonth = day.getMonth();
        var dayDay = day.getDate();
        weekDay.getElementsByTagName('b')[0].textContent = dayDay + '.' + monthsNumArray[dayMonth];
        if (((k < todayWeekDay) && (weekDiff == 0)) || (weekDiff < 0)) {
            weekDay.className = 'table_week_day before';
        } else if (((k > todayWeekDay) && (weekDiff == 0)) || (weekDiff > 0)) {
            weekDay.className = 'table_week_day after';
        } else {
            weekDay.className = 'table_week_day active';
        }

        var weekDayTodos = [];
        var weekDayTodosCont = weekDays[k].getElementsByClassName('table_week_todos')[0];
        for (var i = 0; i < toDos.length; i++) {
            if (toDos[i].date && (toDos[i].date.getDate() == day.getDate())) {
                weekDayTodos.push(toDos[i]);
            };
        }
        var source   = document.getElementById('weekday_todos_template').innerHTML;
        var templateWeekdayTodos = Handlebars.compile(source);
        weekDayTodosCont.innerHTML = templateWeekdayTodos({toDos: weekDayTodos});
    }
}


var monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthsNumArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var todayDateCont = document.getElementById('date_today');
var weekDays = document.getElementsByClassName('table_week_td');
var prevWeek = document.getElementById("prev_week");
var nextWeek = document.getElementById("next_week");
var nextWeek = document.getElementById("cur_week");
var todayWeekDay = today.getDay() - 1;
if (todayWeekDay == -1) {todayWeekDay = 6};
var weekDiff = 0;
todayDateCont.appendChild(
    document.createTextNode(todayDay + ' ' + monthsArray[todayMonth] + ' ' + todayYear));
changeWeekTitles();

prev_week.onclick = function() {
    weekDiff -= 1;
    changeWeekTitles();
}

next_week.onclick = function() {
    weekDiff += 1;
    changeWeekTitles();
}

cur_week.onclick = function() {
    weekDiff = 0;
    changeWeekTitles();
}


var weekDayConts = document.getElementsByClassName('table_week_td');
for (var k = 0; k < weekDayConts.length; k++) {
    weekDayConts[k].onclick = function() {
        alert(this.getElementsByClassName("table_week_day_name")[0].textContent);
    }
}


var dragableEl = document.getElementById('dragable');
dragableEl.onmousedown = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    this.style.position = 'absolute';
    this.style.zIndex = '1000';

    document.onmousemove = function(ev) {
        dragableEl.style.left = ev.pageX + 'px';
        dragableEl.style.top = ev.pageY + 'px';
    }
}

document.onmouseup = function(e) {
    document.onmousedown = null;
    document.onmousemove = null;
}

var listTodo = document.getElementById('todo_list');
var listTodoItems = listTodo.getElementsByTagName('li');
for (k = 0; k < listTodoItems.length; k++) {
    listTodoItems[k].onmousedown = function() {
        var listTodoItem = this;
        this.style.position = 'absolute';
        this.style.zIndex = '1000';

        document.onmousemove = function(ev) {
            listTodoItem.style.left = ev.pageX + 'px';
            listTodoItem.style.top = ev.pageY + 'px';
        }
    }
}


var source   = document.getElementById('weekday_todos_template').innerHTML;
var templateWeekdayTodos = Handlebars.compile(source);

// Добавлять дату к таску(новая задача, редактирование, перенос)
// Сравнивать даты(число, год, день)
