let login_Email = document.getElementById('loginEmail');
let login_Password = document.getElementById('loginPassword');
let loginBtn = document.getElementById('loginBtn');
let psReveal = document.getElementById('psReveal');

if (psReveal) {
    psReveal.addEventListener('click', () => {
        if (login_Password.type === "password") {
            login_Password.type = "text";
        } else {
            login_Password.type = "password";
        }
    })
}

if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const { data, error } = await client.auth.signInWithPassword({
            email: login_Email.value,
            password: login_Password.value,
        })

        if (error) {
            console.log(error.message);
            Swal.fire({
            icon: "error",
            title: "Login Failed!",
            text: "Invalid Email or Password",
            confirmButtonColor: "#d33",
            });
        }else{
            Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Welcome Back 🎉",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
            }).then(() => {
            window.location.href = "/index.html";
            });
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
        }else{
            window.location.href = '/dashboard.html'
        }
    }
}