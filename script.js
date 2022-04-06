//JSON.stringify(value) -- encode
//JSON.parse(result[1])) -- decode

function SetCookie(name, obj) {
    /* Cookie Version
    var encoded_obj = JSON.stringify(obj)
    var cookie = [name, '=', encoded_obj, '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
    */
    /* Local Storage Version */
    var encoded_obj = JSON.stringify(obj);
    localStorage.setItem(name, encoded_obj);
}

function GetCookie(name) { //Returns an object
    /* Cookie Version
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
    */
    /* Local Storage Version */
    var string = localStorage.getItem(name);
    var object = JSON.parse(string);
    return object;
}

function isValidName(name) {
    var expr = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
    if (name.match(expr)) {
        var first_letter = name[0]
        if (first_letter == first_letter.toUpperCase()) {

        } else {
            console.log('first letter not uppercase')
        }
        return true;
    } else {
        return false;
    }
}

function isValidPassword(password) {
    var expr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password.match(expr)) {
        return true;
    } else {
        return false;
    }
}

function isValidEmail(email) {
    var expr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(expr)) {
        return true;
    } else {
        return false;
    }
}

function Register() {
    event.preventDefault();

    var lastname = document.forms["reg"]["lastname"].value;
    var firstname = document.forms["reg"]["firstname"].value;
    var email = document.forms["reg"]["email"].value;
    var password = document.forms["reg"]["password"].value;

    login_obj = GetCookie('login');

    if (login_obj) {
        if (email === login_obj['email']) {
            document.getElementById('login_error').innerHTML = 'Már van fiókod!';
        }
    } else {
        if (lastname && firstname && email && password) {
            if (isValidName(firstname) && isValidName(lastname)) {
                if (isValidEmail(email)) {
                    if (isValidPassword(password)) {
                        SetCookie('login', { firstname, lastname, email, password });
                        console.log('Cookie set. firstname: ' + firstname + ' lastname: ' + lastname + ' email: ' + email + ' password: ' + password);
                        window.location.href = "login.html";
                    } else {
                        document.getElementById('login_error').innerHTML = 'Nem elég erős a jelszó!';
                    }
                } else {
                    document.getElementById('login_error').innerHTML = 'Nem megfelelő email!';
                }
            } else {
                document.getElementById('login_error').innerHTML = 'Nem megfelelő név!';
            }
        }
    }
}

function Login() {
    event.preventDefault();

    var email = document.forms["login"]["email"].value;
    var password = document.forms["login"]["password"].value;

    login_obj = GetCookie('login');

    if (login_obj && email && password) {
        if (email === login_obj.email && password === login_obj.password) {
            //login here
            document.getElementById('login_error').innerHTML = 'logged in -- under construction';
        } else {
            document.getElementById('login_error').innerHTML = 'Valami nem jó';
        }
    } else {
        document.getElementById('login_error').innerHTML = 'Nincs fiókod, regisztrálj!';
    }
}

function ShowPassword() {
    pass_element = document.getElementById('password');

    if (pass_element.type === "password") {
        pass_element.type = "text";
    } else {
        pass_element.type = "password";
    }
}

//<span onclick="Favorite(this)"><i class="bi bi-heart"></i></span>
function Favorite(element) {
    event.preventDefault();

    if (element.style.color === 'red') {
        element.style = 'color: black';
        element.getElementsByTagName("i")[0].classList.add('bi-heart');
        element.getElementsByTagName("i")[0].classList.remove('bi-heart-fill');
    } else {
        element.style = 'color: red';
        element.getElementsByTagName("i")[0].classList.remove('bi-heart');
        element.getElementsByTagName("i")[0].classList.add('bi-heart-fill');
    }
}

window.onload = function() {
    console.log('hey')
};

//Navbar kezdete

//Navbar scrolling kezdete

myID = document.getElementById("navbar");
var myScrollFunc = function() {
    var y = window.scrollY;
    if (y >= 50) {
        myID.className = "navbar scroll"
    } else {
        myID.className = "navbar"
    }
};
window.addEventListener("scroll", myScrollFunc);

//Navbar scrolling vége

//Navbar hamburger ikon-ra való nyomáskor megjelenő menü kezdete

function myFunction() {
    var x = document.getElementById("nav_id");
    if (x.className === "navbar") {
        x.className += " mobile";
    } else {
        x.className = "navbar";
    }
}

//Navbar hamburger ikon-ra való nyomáskor megjelenő menü vége

//Navbar vége

//Ugyan az csak a Bootstrap-es részre vonatkozóan kezdete

myID = document.getElementById("navbar_off");
var myScrollFunc = function() {
    var y = window.scrollY;
    if (y >= 50) {
        myID.className = "navbar_off scroll"
    } else {
        myID.className = "navbar_off"
    }
};
window.addEventListener("scroll", myScrollFunc);

/*
function myFunction() {
  var x = document.getElementById("nav_id_off");
  if (x.className === "navbar_off") {
    x.className += " mobile";
  } else {
    x.className = "navbar_off";
  }
}
*/

//Ugyan az csak a Bootstrap-es részre vonatkozóan vége