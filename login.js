let login_Email = document.getElementById('loginEmail');
let login_Password = document.getElementById('loginPassword');
let loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const { data, error } = await client.auth.signInWithPassword({
            email: login_Email.value,
            password: login_Password.value,
        })

        if (error) {
            console.log(error.message);
        }else{
            alert('login successfully')
            console.log(data);
            window.location.href = '/dashboard.html'
        }
    })
}

window.onload = async () => {
    const { data, error } = await client.auth.getSession()
    if (error) {
        console.log(error.message);
    }else{
        console.log(data);
        if (data.session === null) {
            alert('login plz')
        }else{
            window.location.href = '/dashboard.html'
        }
    }
}