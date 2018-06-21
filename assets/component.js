"use strict";
window.customElements.define('task-todo',
class Task extends HTMLElement {
    constructor(id, header, author, date, description){
        super();
        // console.log("Task Component");
    }

    render(id, header, author, date, description) {
       
        if(id == null)
            var shadow = this.attachShadow({mode:"open"});
        else {
            var parent = document.querySelector("#"+id);
            var shadow = parent.shadowRoot == null ? parent.createShadowRoot() : parent.shadowRoot;
        }
        
        var style = document.createElement("style");

        style.textContent = `
            .todo-task {
                border-radius: 5px;
                background-color: #fff;
                width: 230px;
                margin: 5px;
                padding: 5px;
            }

            .task-header{
                font-weight: bold;
            }

            .task-date{
                font-size: small;
                font-style: italic;
            }

            .task-description{
                font-size: smaller;
            }
        `

        this.model = {"id":shadow.childElementCount, "header":header, "author":author, "date":date, "description": description};

        var div = document.createElement("div");
        div.id = this.model.id;
        div.className = "todo-task ui-draggable";
        div.style = "position: relative;";
        div.setAttribute("draggable", "true");
        div.addEventListener("click", (ev) => {
            var form = document.getElementById("todo-form");
            form.elements[0].value = this.model.header;
            form.elements[1].value = this.model.author;
            form.elements[2].value = this.model.description;
            form.elements[3].value = this.model.date;
            form.elements[4].value = this.model.id;
            form.elements[5].value = id;
        });
        div.addEventListener("dragstart", (ev) => {
            ev.dataTransfer.setData("application/json", JSON.stringify(this.model));
        }, false);
        div.addEventListener("dragend", (ev) => {
            shadow.removeChild(div);
        }, false);

        var divHeader = document.createElement("div");
        divHeader.textContent = header;
        divHeader.className = "task-header";

        var divAuthor = document.createElement("div");
        divAuthor.textContent = author;
        divAuthor.className = "task-owner";

        var divDate = document.createElement("div");
        divDate.textContent = date;
        divDate.className = "task-date";

        var divDesc = document.createElement("div");
        divDesc.textContent = description;
        divDesc.className = "task-description";

        div.appendChild(divHeader);
        div.appendChild(divAuthor);
        div.appendChild(divDate);
        div.appendChild(divDesc);

        shadow.appendChild(style);
        shadow.appendChild(div);
    }
});
