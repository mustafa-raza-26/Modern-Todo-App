let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
let userPassword = document.getElementById('userPassword');
let signup_Btn = document.getElementById('signupBtn');
let psReveal = document.getElementById('psReveal');

if (psReveal) {
    psReveal.addEventListener('click', () => {
        if (userPassword.type === "password") {
            userPassword.type = "text";
        } else {
            userPassword.type = "password";
        }
    })
}

if (signup_Btn) {
    signup_Btn.addEventListener('click', async (e) => {
        e.preventDefault();


        const { data:authData, error:authError } = await client.auth.signUp({
            email: userEmail.value,
            password: userPassword.value,
            options: {
            data: {
                first_name: userName.value,
            }
            }
        })
        
        if (authError) {
            alert(authError.message);
        }else{
            alert('User create')
        }

        const { error } = await client
        .from('todo_user')
        .insert({
            user_Name:userName.value,
            user_Email:userEmail.value,
            user_Password:userPassword.value,
        })

        if (error) {
            console.log(error);
        }else{
            alert('User Save')
            window.location.href = '/index.html'
        }
        
    })
}