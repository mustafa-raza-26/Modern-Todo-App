let todoName = document.getElementById('todoName');
let todoDescription = document.getElementById('todoDescription');
let initailizeBtn = document.getElementById('initailizeBtn');
let priority = document.getElementById('users');
let display = document.getElementById('display');
let logoutBtn = document.getElementById('logoutBtn');

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
        }
    })
}

window.onload = async () => {

    const { data: { user } } = await client.auth.getUser()
    if (user === null) {
        window.location.href = '/index.html'
    }else{
        console.log(user.id);
    }

    let user_id = user.id

    const { data, error } = await client
    .from('todo_user_data')
    .select('*')
    .eq('auth_id', user_id)
    if (error) {
        alert(error.message);
    }else{
        for (let i = 0; i < data.length; i++) {
            if (display) {
            display.innerHTML +=`
                <div class="task-card col-12 col-md-5">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="mb-1">${data[i].todo_Name}</h5>
                            <p class="text-muted small text-white-50">${data[i].todo_Explanation}</p>
                            <div class="d-flex gap-2">
                                <span class="badge badge-neon">${data[i].priority} Priority</span>
                            </div>
                        </div>
                        <span id="dot" class="text-white-50"><i class="fa-solid fa-ellipsis-vertical"></i></span>
                    </div>
                </div>
            `
            }
        }
}}

// deleteBtn ki jagah ye use karo (id="dot" ki jagah class="dot-btn" use karna hoga HTML mein)
if (display) {
    display.addEventListener('click', async (e) => {
        const dotBtn = e.target.closest('#dot');
        const { data: { user } } = await client.auth.getUser()
        if (user === null) {
            window.location.href = '/index.html'
        }
        
        let user_id = user.id
        const response = await client
        .from('todo_user_data')
        .delete()
        .eq('auth_id', user_id)
    });
}


if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        const { error } = await client.auth.signOut({ scope: 'local' })
        if(error){
            console.log(error.message);
        }
        else{
            alert('logout successfully')
            window.location.href = './index.html'
        }
    })
}