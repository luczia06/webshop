var cookies = {
    login = {},
    favorites = {},
    cart = {}
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

function Register(name, password) {
    login_obj = GetCookie('login')
    console.log(login_obj)
    if (login_obj) {
        if (name == login_obj.name && password == login_obj.password) {
            console.log('Már van ilyen!')
        }
    } else {
        SetCookie('login', {name, password})
        console.log('Cookie set. name: '+ name + ' password: ' + password)
    }
}

function Login(name, password) {
    login_obj = GetCookie('login')
    if (login_obj) {
        if (name == login_obj.name && password == login_obj.password) {
            console.log('login')
            //login here
        } else {
            console.log('Valami nem jó')
            //change error <p>
        }
    } else {
        console.log('Nincs fiókod!')
    }
}

window.onload() = {

}