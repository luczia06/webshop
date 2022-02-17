var cookies = {
    login: {
        logged_in: 'false',
    },
    favorites: {},
    cart: {}
}

//JSON.stringify(value) -- encode
//JSON.parse(result[1])) -- decode

function SetCookie(name, obj) {
    var encoded_obj = JSON.stringify(obj)
    var cookie = [name, '=', encoded_obj, '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
}

function GetCookie(name) { //Returns an object
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

//Disclaimer: Everything needs testing

function Register() {
    var lastname = document.forms["reg"]["lastname"].value;;
    var firstname = document.forms["reg"]["firstname"].value;
    var email = document.forms["reg"]["email"].value;
    var password = document.forms["reg"]["email"].password;
    /*
    if (document.getElementById('lastname').value != null) {
        lastname = document.getElementById('lastname').value;

        if (document.getElementById('firstname').value != null) {
            firstname = document.getElementById('firstname').value;

            if (document.getElementById('email').value != null) {
                email = document.getElementById('email').value;

                if (document.getElementById('password').value != null) {
                    password = document.getElementById('password').value;

                } else {
                    console.log('Jelszó!');
                    document.getElementById('login_error').innerHTML = 'Jelszó!';
                }
            } else {
                console.log('Email!');
                document.getElementById('login_error').innerHTML = 'Email!';
            }
        } else {
            console.log('Írj keresztnevet!');
            document.getElementById('login_error').innerHTML = 'Írj keresztnevet!';
        }
    } else {
        console.log('Írj vezetéknevet!');
        document.getElementById('login_error').innerHTML = 'Írj vezetéknevet!';
    }
    */

    login_obj = GetCookie('login');
    console.log(login_obj);
    if (login_obj) {
        if (email == login_obj.email) {
            console.log('Már van fiók ilyen emaillel!');
            document.getElementById('login_error').innerHTML = 'Már van fiók ilyen emaillel!';
        } else {
            SetCookie('login', {firstname, lastname, email, password});
            console.log('Cookie set. firstname: '+ firstname + 'lastname: ' + lastname + 'email: ' + email + ' password: ' + password);
        }
    } else {
        SetCookie('login', {firstname, lastname, email, password});
        console.log('Cookie set. firstname: '+ firstname + 'lastname: ' + lastname + 'email: ' + email + ' password: ' + password);
    }
}

function Login() {
    var email = '';
    var password = '';
    if (document.getElementById('email').value != null) {
        email = document.getElementById('email').value;

        if (document.getElementById('password' != null).value) {
            password = document.getElementById('password').value;

        } else {
            console.log('Jelszó!');
            document.getElementById('login_error').innerHTML = 'Jelszó!';
        }
    } else {
        console.log('Email!');
        document.getElementById('login_error').innerHTML = 'Email!';
    }

    login_obj = GetCookie('login');
    if (login_obj) {
        if (email == login_obj.email && password == login_obj.password) {
            console.log('login');
            //login here
            document.getElementById('login_error').innerHTML = 'logged in -- under construction';
        } else {
            console.log('Valami nem jó');
            document.getElementById('login_error').innerHTML = 'Valami nem jó';
            //change error <p>
        }
    } else {
        console.log('Nincs fiókod!');
        document.getElementById('login_error').innerHTML = 'Nincs fiókod, regisztrálj!';
    }
}

window.onload() = {

}