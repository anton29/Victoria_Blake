 $(document).ready(function(){
    $(window).scroll(function(){
       // console.log($(window).scrollTop())
      if($(window).scrollTop()> 125){
        // console.log("called")
        $('#nav').addClass('navbar-fixed');
      }
      if($(window).scrollTop() < 126){
        $('#nav').removeClass('navbar-fixed');
      }
    })
  })

//==================================== custome page =================================================

function bodyColor (form) {
    this.document.getElementsByTagName("body")[0].style.backgroundColor = form.favcolor.value;
    var textnode = document.createTextNode(form.favcolor.value);
    var node = document.createElement("LI");
    node.appendChild(textnode);
    document.getElementById("p1").appendChild(node);
   // return TestVar
}
function headerColor (form) {
    var TestVar = form.favcolor.value;
    this.document.getElementsByTagName("header")[0].style.backgroundColor = form.favcolor.value;
    this.document.getElementsByTagName("footer")[0].style.backgroundColor = form.favcolor.value;
    var textnode = document.createTextNode(form.favcolor.value);
    var node = document.createElement("LI");
    node.appendChild(textnode);
    document.getElementById("p2").appendChild(node);

   // return TestVar
}
function wrapperColor (form) {
    var TestVar = form.favcolor.value;
    document.getElementById("wrapper").style.backgroundColor = form.favcolor.value;   
    var textnode = document.createTextNode(form.favcolor.value);
    var node = document.createElement("LI");
    node.appendChild(textnode);
    document.getElementById("p3").appendChild(node);

   // return TestVar
}

function showValue(newValue)
{
  //document.querySelectorAll("#wrapper")[0].style.width = form.favcolor.value;   
  document.getElementById("range").innerHTML=newValue;
  document.getElementById("wrapper").style.width = document.getElementById("range").innerHTML + "%";
  console.log(document.getElementById("range").innerHTML)
}

function T1Color (form) {
    var TestVar = form.favcolor.value;
    document.querySelectorAll("#top_row > div:nth-child(1) > h4 > a")[0].style.color = form.favcolor.value;   
    var textnode = document.createTextNode(form.favcolor.value);
    var node = document.createElement("LI");
    node.appendChild(textnode);
    document.getElementById("p4").appendChild(node);

   // return TestVar
}
function navBar (form) {
    var TestVar = form.favcolor.value;
    document.querySelectorAll("#wrapper > nav > nav")[0].style.backgroundColor = form.favcolor.value;   
    var textnode = document.createTextNode(form.favcolor.value);
    var node = document.createElement("LI");
    node.appendChild(textnode);
    document.getElementById("p5").appendChild(node);

   // return TestVar
}
//=============================== custome page end =================================================

// ===============================cookie==============================================================

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        //cookie found do something

        // console.log(user)
    } else {// no cookie do something
       // console.log(user)
       setTimeout(function() {
            window.location='#openModal'
        }, 3000);
       user = "init";
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
}

// ===============================cookie end==========================================================

//================================nav bar=============================================================
 

 //================================nav bar end=============================================================
 

