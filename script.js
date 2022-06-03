//code by deep .. too many people in this project

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
    var password = document.forms["reg"]["password_input"].value;

    login_obj = GetCookie('login');
    if (login_obj) {
        if (email === login_obj['email']) {
            document.getElementById('login_error').innerHTML = 'Már van fiókod ezzel az emaillel!';
            return;
        }
        if (lastname === login_obj['lastname'] || firstname === login_obj['firstname']) {
            document.getElementById('login_error').innerHTML = 'Már van fiókod ezzel az névvel!';
            return;
        }
    }

    if (!isValidName(lastname)) {
        document.getElementById('login_error').innerHTML = 'Nem megfelelő vezetéknév!';
        return;
    }
    if (!isValidName(firstname)) {
        document.getElementById('login_error').innerHTML = 'Nem megfelelő keresztnév!';
        return;
    }
    if (!isValidEmail(email)) {
        document.getElementById('login_error').innerHTML = 'Nem megfelelő email!';
        return;
    }
    if (!isValidPassword(password)) {
        document.getElementById('login_error').innerHTML = 'Nem elég erős jelszó!';
        return;
    }

    SetCookie('login', { firstname, lastname, email, password });
    console.log('Cookie set. firstname: ' + firstname + ' lastname: ' + lastname + ' email: ' + email + ' password: ' + password);
    window.location.href = "login.html";
}

function Login() {
    event.preventDefault();

    var email = document.forms["login"]["email"].value;
    var password = document.forms["login"]["password_input"].value;
    login_obj = GetCookie('login');

    if (!login_obj) {
        document.getElementById('login_error').innerHTML = 'Nincs fiókod, regisztrálj!';
        return;
    }
    if (!email) {
        document.getElementById('login_error').innerHTML = 'Email mező kitöltése kötelező!';
        return;
    }
    if (!password) {
        document.getElementById('login_error').innerHTML = 'Jelszó mező kitöltése kötelező!';
        return;
    }
    if (!email === login_obj.email) {
        document.getElementById('login_error').innerHTML = 'Email nem jó!';
        return;
    }
    if (!password === login_obj.password) {
        document.getElementById('login_error').innerHTML = 'Jelszó nem jó!';
        return;
    }

    SetCookie('logged_in', true);
    document.getElementById('fiok').innerHTML = 'Üdv, '+login_obj.firstname;
    document.getElementById('login_reg').innerHTML = '<hr class="top_hr"><h1 class="login_reg_sign">' + login_obj.lastname + ' ' + login_obj.firstname + '</h1><p class="reg">' + login_obj.email + '</p><button onclick="Logout()" >KIJELENTKEZÉS</button><hr class="down_hr">';
}

function ShowPassword() {
    pass_element = document.getElementById('password_input');

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
    let cards = null || [];

    const favorites = GetCookie('favorites');

    for (let i = 0; i < cards_html.length; i++) {
        const element = cards_html[i];
        
        let icon = element.getElementsByTagName("i")[0];
        let item_name = element.getElementsByTagName("h5")[0];

        if (icon.classList.contains('bi-heart')) { //un filled
            if (Array.isArray(favorites)) {
                if (favorites.includes(item_name)) {
                    console.log('delete');
                    console.log(indexOf(item_name));
                    cards[indexOf(item_name)] = null; //delete
                }
            }
        } else if (icon.classList.contains('bi-heart-fill')) { //filled
            if (Array.isArray(favorites)) {
                if (!favorites.includes(item_name)) {
                    cards.push(item_name.innerHTML); //add
                }
            }
        } 
    }

    let resultToReturn = false;
    let duplicates = [];
    for (let i = 0; i < cards.length; i++) {
        const element = cards[i];
        
        //console.log(element);

        for (let j = 0; j < cards.length; j++) {
            // prevents the element from comparing with itself
            if (i !== j) {
                // check if elements' values are equal
                if (cards[i] === cards[j]) {
                    // duplicate element present
                    cards[i] = null;
                    duplicates.push(cards[i]);
                    
                    //resultToReturn = true;
                    // terminate inner loop
                    break;
                }
            }
        }
        // terminate outer loop
        if (resultToReturn) {
            break;
        }
    }

    for (let d = 0; d < duplicates.length; d++) {
        const element = duplicates[d];
        
        cards.push(element);
    }

    SetCookie('favorites', cards)
}

function LoadFavorites() {
    const favorites = GetCookie('favorites');
    if (!Array.isArray(favorites)) {return;}

    //console.log(cards);

    let cards_html = document.getElementsByClassName('card');

    for (let i = 0; i < cards_html.length; i++) {
        const element = cards_html[i];

        let item_name = element.getElementsByTagName("h5")[0].innerHTML;
        if (favorites.includes(item_name)) {
            let item_span = element.getElementsByTagName("span")[0];
            let item_i = element.getElementsByTagName("i")[0];

            item_span.style = 'color: red';
            item_i.classList.remove('bi-heart');
            item_i.classList.add('bi-heart-fill');
        }
    }
}

function CheckUser() {
    login_obj = GetCookie('login');
    logged_in = GetCookie('logged_in');
    if (!login_obj || !logged_in) {return};

    document.getElementById('fiok').innerHTML = 'Üdv, ' + login_obj.firstname;
    
    login_reg = document.getElementById('login_reg');
    if (login_reg) {
        document.getElementById('login_reg').innerHTML = '<hr class="top_hr"><h1 class="login_reg_sign">' + login_obj.lastname + ' ' + login_obj.firstname + '</h1><p class="reg">' + login_obj.email + '</p><button onclick="Logout()" >KIJELENTKEZÉS</button><hr class="down_hr">';
    }
}

function Logout() {
    SetCookie('logged_in', false)
    document.getElementById('fiok').innerHTML = 'Fiók';
    document.getElementById('login_reg').innerHTML = '<hr class="top_hr"><h1 class="login_reg_sign">BEJELENTKEZÉS</h1><form name="login"><div id="inputs"><input type="text" id="email" name="email" placeholder="E-mail" required><div id="password"><input type="password" id="password" name="password" placeholder="Jelszó" required><span><a href=""><i class="bi bi-eye"></i></a></span></div></div><a href="reg.html"><p class="reg">Nincs még fiókod? Regisztrálj!</p></a><button onclick="Login()" >BEJELENTKEZÉS</button><div id="login_error"></div></form><hr class="down_hr">';
}

function PutToCart() {
    let cart = GetCookie('cart') || [];
    let item_name = document.getElementById('name').innerHTML;
    let sizes = document.getElementById('sizes');
    let item_size = sizes.options[sizes.selectedIndex].text;
    let item_image = document.getElementsByTagName("img")[1].src;
    let color_div = document.getElementById('color_style');
    let item_color = color_div.getElementsByTagName("p")[0].innerHTML;
    let title_div = document.getElementById('title');
    let item_sex = title_div.getElementsByTagName("p")[0].innerHTML;
    let price_div = document.getElementById('price');
    let item_price = price_div.getElementsByTagName("h1")[0].innerHTML;

    let inCartAlready = false;
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        
        if (item.name === item_name) {
            inCartAlready = true;
            cart[i].amount = cart[i].amount + 1
        }
    }

    if (!inCartAlready) {
        cart.push({
            name : item_name,
            size : item_size,
            image : item_image,
            color : item_color,
            sex : item_sex,
            price : item_price,
            amount: 1
        });
    }

    SetCookie('cart', cart);
}

function RemoveFromCart(element) {
    event.preventDefault();

    console.log(element);
}

function LoadCart() {
    let cards_div = document.getElementById('cards');
    if (!cards_div) {return;}

    let cards_div_string = '';
    let cart = GetCookie('cart') || [];

    if (!cart.length > 0) {
        document.getElementById('cards').innerHTML = '<div id="first_card"><div id="content"><h1>Nincs Semmi a kosaradban!</h1></div></div>';
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        let item_html = '';
        const item = cart[i];
        //console.log(item);
        item_html = '<div id="first_card"><hr class="top_hr"><div id="content"><div id="images"><img src="'+item.image+'" alt=""></div><div id="info"><div id="title_price"><h1>'+item.name+'</h1><div id="price"><p>'+item.price+' x '+item.amount+'</p></div></div><div id="left_side"><p>'+item.sex+'</p><p>'+item.color+'</p><a onclick="RemoveFromCart(this)" href=""><p class="delete">ELTÁVOLÍTÁS</p></a></div></div></div><hr class="bottom_hr">';
        //console.log(item_html);
        let a = cards_div_string.concat(item_html);
        cards_div_string = a;
    }
    document.getElementById('cards').innerHTML = cards_div_string;
    //console.log(cards_div_string);
}

window.onload = function() {
    console.log('hey');

    CheckUser();
    LoadFavorites();
    LoadCart();
};


//Alex::
//Navbar kezdete

//Navbar scrolling kezdete
/* SZAR .. ERROR GENERATOR

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

*/
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
/*  SZAR

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
//who tf here.. understands this btw?