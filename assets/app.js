function allowDrop(ev) {
    ev.preventDefault();
}
function drop(ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("application/json")) ;
    let Drawer = customElements.get('task-todo');
    let drawer = new Drawer();
    drawer.render(ev.target.id, data.header, data.author, data.date, data.description);
}

function init(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://raw.githubusercontent.com/cndkhuong/webcomp/master/db.json", true);
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);
        var data = response.cards;
        data.forEach(element => {
            let Drawer = customElements.get('task-todo');
            let drawer = new Drawer();
            drawer.render("pending", element.title, element.author, element.date,  element.description);
        });
    };
    xhr.send();
}

function add() {
    document.getElementById("todo-form").elements[0].value;
    var params = {};
    params["title"] = document.getElementById("todo-form").elements[0].value;
    params["owner"] = document.getElementById("todo-form").elements[1].value;
    params["date"] = document.getElementById("todo-form").elements[3].value;
    params["description"] = document.getElementById("todo-form").elements[2].value;

    let Drawer = customElements.get('task-todo');
    let drawer = new Drawer();
    drawer.render("pending", params.title, params.owner, params.date,  params.description);
};

function edit() {
    document.getElementById("todo-form").elements[0].value;
    var params = {};
    params["title"] = document.getElementById("todo-form").elements[0].value;
    params["owner"] = document.getElementById("todo-form").elements[1].value;
    params["date"] = document.getElementById("todo-form").elements[3].value;
    params["description"] = document.getElementById("todo-form").elements[2].value;
    params["id"] = document.getElementById("todo-form").elements[4].value;
    params["parentid"] = document.getElementById("todo-form").elements[5].value;

    var task = document.getElementById(params["parentid"]).shadowRoot.getElementById(params["id"]);
    task.querySelector(".task-header").innerHTML = params["title"];
    task.querySelector(".task-owner").innerHTML = params["owner"];
    task.querySelector(".task-date").innerHTML = params["date"];
    task.querySelector(".task-description").innerHTML = params["description"];
};

function remove() {
    document.getElementById("todo-form").elements[0].value;
    var params = {};
    params["title"] = document.getElementById("todo-form").elements[0].value;
    params["owner"] = document.getElementById("todo-form").elements[1].value;
    params["date"] = document.getElementById("todo-form").elements[3].value;
    params["description"] = document.getElementById("todo-form").elements[2].value;
    params["id"] = document.getElementById("todo-form").elements[4].value;
    params["parentid"] = document.getElementById("todo-form").elements[5].value;

    var task = document.getElementById(params["parentid"]).shadowRoot.getElementById(params["id"]);
    document.getElementById(params["parentid"]).shadowRoot.removeChild(task);
};