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
    /*
    var encoded_obj = JSON.stringify(obj)
    var cookie = [name, '=', encoded_obj, '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
    */
    var encoded_obj = JSON.stringify(obj);
    localStorage.setItem(name, encoded_obj);
}

function GetCookie(name) { //Returns an object
    /*
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
    */
    var string = localStorage.getItem(name);
    var object = JSON.parse(string);
    return object;
}

function isValidPassword(password) { 
    var expr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(password.match(expr)) { 
        return true;
    } else { 
        return false;
    }
}

//Disclaimer: Everything needs testing

function Register() {
    event.preventDefault();
    var lastname = document.forms["reg"]["lastname"].value;
    var firstname = document.forms["reg"]["firstname"].value;
    var email = document.forms["reg"]["email"].value;
    var password = document.forms["reg"]["password"].value;
    console.log('1')
    login_obj = GetCookie('login');
    console.log(login_obj);
    if (login_obj) {
        console.log('2')
        console.log(email)
        console.log(login_obj['email'])
        if (email === login_obj['email']) {
            console.log('3')
            document.getElementById('login_error').innerHTML = 'Már van fiókod!';
        }/* else {
            console.log('4')
            if (lastname) {
                console.log('5')
                if (firstname) {
                    console.log('6')
                    if (email) {
                        console.log('7')
                        if (password) {
                            console.log('8')
                            var isValid = toString(isValidPassword(password))
                            if (isValid) {
                                console.log('9')
                                SetCookie('login', {firstname, lastname, email, password});
                                console.log('Cookie set. firstname: '+ firstname + 'lastname: ' + lastname + 'email: ' + email + ' password: ' + password);
                            } else {
                                document.getElementById('login_error').innerHTML = 'Nem elég erős a jelszó!';
                            }
                        }
                    }
                }
            }
        }*/
    } else {
        console.log('10')
        if (lastname) {
            console.log('11')
            if (firstname) {
                console.log('12')
                if (email) {
                    console.log('13')
                    if (password) {
                        console.log('14')
                        var isValid = isValidPassword(password)
                        if (isValid) {
                            console.log('15')
                            SetCookie('login', {firstname, lastname, email, password});
                            console.log('Cookie set. firstname: '+ firstname + 'lastname: ' + lastname + 'email: ' + email + ' password: ' + password);
                        } else {
                            document.getElementById('login_error').innerHTML = 'Nem elég erős a jelszó!';
                        }    
                    }
                }
            }
        }
    }
}

function Login() {
    event.preventDefault();
    var email = document.forms["login"]["email"].value;
    var password = document.forms["login"]["password"].value;

    login_obj = GetCookie('login');
    if (login_obj) {
        if (email) {
            if (password) {
                if (email == login_obj.email && password == login_obj.password) {
                    //login here
                    document.getElementById('login_error').innerHTML = 'logged in -- under construction';
                } else {
                    document.getElementById('login_error').innerHTML = 'Valami nem jó';
                    //change error <p>
                }
            }
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

window.onload = function() {
    console.log('hey')
};

//Navbar kezdete

//Navbar scrolling kezdte

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

//Navbar hamburger ikon-ra való nyomáskor megjelenő menü kezdte

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
