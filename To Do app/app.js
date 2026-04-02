document.addEventListener("DOMContentLoaded", function () {

    // 1. Select elements
    const todoNameInput = document.getElementById("todoName");
    const taskInput = document.getElementById("task");
    const addBtn = document.getElementById("addbtn");
    const todoList = document.getElementById("todolist");

    // 2. Get todos from localStorage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // 3. Show todos on screen
    function renderTodos() {
        todoList.innerHTML = "";

        todos.forEach(function (todo, index) {
            const todoHTML = `
                <div class="todo-item">
                    <div class="todo-content">
                        <h3>${todo.name}</h3>
                        <p>${todo.description}</p>
                        <span class="statuspending">Pending</span>
                    </div>

                    <div class="todo-action">
                        <button class="edit" onclick="editTodo(${index})">
                            edit
                        </button>
                        <button class="delete" onclick="deleteTodo(${index})">
                            delete
                        </button>
                    </div>
                </div>
            `;

            todoList.innerHTML += todoHTML;
        });
    }

    // 4. Add new todo
    addBtn.addEventListener("click", function () {

        const name = todoNameInput.value.trim();
        const description = taskInput.value.trim();

        // check empty input
        if (name === "" || description === "") {
            alert("Please enter task details");
            return;
        }

        // create object
        const newTodo = {
            name: name,
            description: description
        };

        // add to array
        todos.push(newTodo);

        // save to localStorage
        localStorage.setItem("todos", JSON.stringify(todos));

        // clear input fields
        todoNameInput.value = "";
        taskInput.value = "";

        // update UI
        renderTodos();
    });

    // 5. Delete todo
    function deleteTodo(index) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
    }

    // 6. Edit todo
    function editTodo(index) {
        const newName = prompt("Edit task name:", todos[index].name);

        if (newName !== null && newName.trim() !== "") {
            todos[index].name = newName;
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos();
        }
    }

    // 7. Make functions global (important for buttons)
    window.deleteTodo = deleteTodo;
    window.editTodo = editTodo;

    // 8. Run when page loads
    renderTodos();
});