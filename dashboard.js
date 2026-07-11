let todoName = document.getElementById('todoName');
let todoDescription = document.getElementById('todoDescription');
let initailizeBtn = document.getElementById('initailizeBtn');
let priority = document.getElementById('users');
let display = document.getElementById('display');
let logoutBtn = document.getElementById('logoutBtn');

// Add Todo
if (initailizeBtn) {
    initailizeBtn.addEventListener('click', async () => {
        const { error } = await client
        .from('todo_user_data')
        .insert({
            todo_Name:todoName.value,
            todo_Explanation:todoDescription.value,
            priority:priority.value
        })

        if (error) {
            alert(error.message);
        }else{
            alert('Todo Save');
            window.location.reload();
        }
    })
}

// Load Todos
window.onload = async () => {

    const { data: { user } } = await client.auth.getUser();
    if (!user) {
        window.location.href = "./index.html";
        return;
    }

    const { data, error } = await client
        .from("todo_user_data")
        .select('*')
        .eq('auth_id', user.id);

    if (error) {
        alert(error.message);
        return;
    }
    
    display.innerHTML = "";
    data.forEach(todo => {
        display.innerHTML += `
        <div class="task-card col-12 col-md-5">
            <div class="d-flex justify-content-between">
                <div>
                    <h5 class="mb-1">${todo.todo_Name}</h5>
                    <p class="text-white-50">${todo.todo_Explanation}</p>
                    <span class="badge badge-neon">${todo.priority} Priority</span>
                </div>
                <span class="dot-btn" data-id="${todo.id}" style="cursor:pointer"><i class="fa-solid fa-trash"></i></span>
            </div>

        </div>`;
    });

};


if (display) {
    display.addEventListener('click', async (e) => {
        const btn = e.target.closest('.dot-btn');
        if (!btn) return;

        const todoId = btn.dataset.id;
        const { error } = await client
            .from('todo_user_data')
            .delete()
            .eq('id', todoId);

        if (error) {
            alert(error.message);
        } else {
            alert('Todo Deleted');
            window.location.reload();
        }
    });

}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        const { error } = await client.auth.signOut({
            scope: 'local'
        });

        if (error) {
            alert(error.message);
        } else {
            alert('Logout Successfully');
            window.location.href = './index.html';
        }

    });

}