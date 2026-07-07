let todoName = document.getElementById('todoName');
let todoDescription = document.getElementById('todoDescription');
let initailizeBtn = document.getElementById('initailizeBtn');
let priority = document.getElementById('users');
let display = document.getElementById('display');
let deleteBtn = document.getElementById('dot');
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
            console.log(error.message);
        }else{
            alert('todo save in table')

        }
        
    })
}

window.onload = async () => {

    const { data: { user } } = await client.auth.getUser()
    if (user === null) {
        window.location.href = './index.html'
    }else{
        console.log(user.id);
    }

    let user_id = user.id

    const { data, error } = await client
    .from('todo_user_data')
    .select('*')
    .eq('auth_id', user_id)
    if (error) {
        console.log(error.message);
    }else{
        console.log(data);

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
                <span class="material-icons-outlined text-muted text-white-50" id="dot">more_vert</span>
            </div>
        </div>
    `
    }}
}}

if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
        const response = await client
        .from('todo_user_data')
        .delete()
        .eq('id', 1)
    })
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