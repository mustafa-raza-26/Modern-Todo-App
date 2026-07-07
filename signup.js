let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
let userPassword = document.getElementById('userPassword');
let signup_Btn = document.getElementById('signupBtn');

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
            console.log('auth error',authError.message);
        }else{
            alert('auth get data')
            console.log('user auth', authData);
            
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
            alert('data save in table')
            window.location.href = '/index.html'
        }
        
    })
}