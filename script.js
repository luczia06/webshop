var logged_in = false
var logged_user = {}

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
            SetCookie('logged_in', true)
            document.getElementById('fiok').innerHTML = 'Üdv, '+login_obj.firstname;
            document.getElementById('login_reg').innerHTML = '<hr class="top_hr"><h1 class="login_reg_sign">' + login_obj.lastname + ' ' + login_obj.firstname + '</h1><p class="reg">' + login_obj.email + '</p><button onclick="Logout()" >KIJELENTKEZÉS</button><hr class="down_hr">';
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

    SaveFavorites()
}

function SaveFavorites() {
    let cards_html = document.getElementsByClassName('card');
    let cards = {};

    let favorites = GetCookie('favorites')

    for (let i = 0; i < cards_html.length; i++) {
        const element = cards_html[i];
        
        let icon = element.getElementsByTagName("i")[0];

        if (icon.classList.contains('bi-heart')) { //un filled
            cards[i] = {};
        } else if (icon.classList.contains('bi-heart-fill')) { //filled
            cards[i] = {};
        }

        favorites.forEach(element => {
            console.log(element);
        });
    }

    SetCookie('favorites', cards)

    for (let i = 0; i < cards.length; i++) {
        const element = cards[i];
        
        console.log(element);
    }
}

function LoadFavorites() {
    let cards = GetCookie('favorites');

    //console.log(cards);

    for (const key in cards) {
        console.log(key)
        const element = cards[key];

        //console.log(element);
        
        console.log(cards[key].favorited);

        if (cards[key].favorited == true) {
            console.log(key);
        }
    }
/*
    for (let i = 0; i < cards.length; i++) {
        console.log('aaa');
        console.log(cards[i].favorited);

        i_tag = document.getElementsByTagName('i')[i];

        if (elementb) {
            i_tag.style = 'color: red';
            i_tag.classList.remove('bi-heart');
            i_tag.classList.add('bi-heart-fill');
        }
    }
    */
}

function CheckUser() {
    login_obj = GetCookie('login');
    logged_in = GetCookie('logged_in');
    login_div = document.getElementById('login_reg').innerHTML;
    if (logged_in) {
        document.getElementById('fiok').innerHTML = 'Üdv, ' + login_obj.firstname;
        if (login_div) {
            document.getElementById('login_reg').innerHTML = '<hr class="top_hr"><h1 class="login_reg_sign">' + login_obj.lastname + ' ' + login_obj.firstname + '</h1><p class="reg">' + login_obj.email + '</p><button onclick="Logout()" >KIJELENTKEZÉS</button><hr class="down_hr">';
        }
    }
}

function Logout() {
    SetCookie('logged_in', false)
    document.getElementById('fiok').innerHTML = 'Fiók';
    document.getElementById('login_reg').innerHTML = '<hr class="top_hr"><h1 class="login_reg_sign">BEJELENTKEZÉS</h1><form name="login"><div id="inputs"><input type="text" id="email" name="email" placeholder="E-mail" required><div id="password"><input type="password" id="password" name="password" placeholder="Jelszó" required><span><a href=""><i class="bi bi-eye"></i></a></span></div></div><a href="reg.html"><p class="reg">Nincs még fiókod? Regisztrálj!</p></a><button onclick="Login()" >BEJELENTKEZÉS</button><div id="login_error"></div></form><hr class="down_hr">';
}

function PutToCart() {
    const cart = GetCookie('cart');
    let item_name = document.getElementById('name');
    let sizes = document.getElementById('sizes');
    let item_size = sizes.options[sizes.selectedIndex].text;

    cart.push({name : item_name, size : item_size});
}

window.onload = function() {
    console.log('hey');

    CheckUser();
    LoadFavorites();
};

//Navbar kezdete

//Navbar scrolling kezdete

myID = document.getElementById("navbar");
var myScrollFunc = function() {
    var y = window.scrollY;
    if (y >= 50) {
        myID.className = "navbar scroll";
    } else {
        myID.className = "navbar";
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