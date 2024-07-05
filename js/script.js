const form =document.querySelector("form"),
uField=form.querySelector(".name"),
uInput=uField.querySelector("input"),
eField=form.querySelector(".email"),
eInput=eField.querySelector("input"),
pField=form.querySelector(".password"),
pInput=pField.querySelector("input");
let alertMassage=document.getElementById('alertMassage');


form.onsubmit =(e) => {
    e.preventDefault(); //prevent form from submitting
    
 function getAlertMessage(text, color) {
    alertMassage.classList.replace('d-none', 'd-block');
    alertMassage.innerHTML = text;
    alertMassage.style.color = color;
};

    if(uInput.value == ""){ // check if name is empty
        uField.classList.add("shake","error");
    }
    if(eInput.value == ""){
        eField.classList.add("shake","error");
    }
    if(pInput.value == ""){
        pField.classList.add("shake","error");
    }
    setTimeout(()=>{ //check remove shake after 500ms
        uField.classList.remove("shake");
        eField.classList.remove("shake");
        pField.classList.remove("shake");
    },500);
    // let's work on input keyup
    uInput.onkeyup = ()=>{
        if(uInput.value == ""){
            uField.classList.add("error");
        }else{
            uField.classList.remove("error");
        }
    }
    eInput.onkeyup = ()=>{
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(!eInput.value.match(pattern)){
            eField.classList.add("error");
        }else{
            eField.classList.remove("error");
        }
    }
    pInput.onkeyup = ()=>{
        if(pInput.value == ""){
            pField.classList.add("error");
        }else{
            pField.classList.remove("error");
        }
    }
    if ( pInput.value === "rovana80" &&  eInput.value === "rovanamohamed80@gmail.com" && (uInput.value === "rovana" || uInput.value ==="nardeen" || uInput.value ==="ahmed" )) {
                // Redirect to admin dashboard or perform any other action
                const admin = {
                    adminName: uInput.value,
                    adminEmail: eInput.value,
                    adminPassword: pInput.value,
                    adminLoggedIn: true
                };
                localStorage.setItem("adminData", JSON.stringify(admin));
        
                window.location.href = "index.html";
        
            } 

            
    if ( checkInputsWrong()== true) {
                // Redirect to admin dashboard or perform any other action
                getAlertMessage("Invalid Name , email or password. Please try again.",'red');
        
            };


    function checkInputsWrong() {
            
        if (pInput.value != "" && eInput.value != "" && uInput.value != "" && // Check for empty fields
        (pInput.value !== "rovana80" || eInput.value !== "rovanamohamed80@gmail.com" ||
         !(uInput.value == "rovana" || uInput.value  == "nardeen" || uInput.value  == "ahmed"))) {
      return true;
    } else {
      // Login successful actions (redirect or store admin data)
     return false;
    }
 };



};









 



















// let userNameInput = document.getElementById('userNameInput');
// let emailLoginInput = document.getElementById('emailLoginInput');
// let passwordLoginInput = document.getElementById('passwordLoginInput');
// let loginBtn = document.getElementById('loginBtn');
// let alertMassage=document.getElementById('alertMassage');



// document.getElementById("loginForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     const enteredUsername = document.getElementById("userNameInput").value;
//     const enteredPassword = document.getElementById("passwordLoginInput").value;
//     const enteredEmail = document.getElementById('emailLoginInput').value;

//     // Here you can add your authentication logic
//     // For simplicity, I'm just checking if the username is "admin" and password is "adminpassword"
//     if ( enteredPassword === "rovana2000" &&  enteredEmail === "rovanamohamed80@gmail.com") {
//         // Redirect to admin dashboard or perform any other action
//         const admin = {
//             adminName: enteredUsername,
//             adminEmail: enteredEmail,
//             adminPassword: enteredPassword,
//             adminLoggedIn: true
//         };
//         localStorage.setItem("adminData", JSON.stringify(admin));

//         window.location.href = "home.html";

//     } else {
//         alert("Invalid username or password. Please try again.");
//     }
// });










































// let userInformation = [];
// userInformation["email"] = "rovanamohamed80@gmail.com";
// userInformation["password"] = "rovana2000";
//  console.log(userInformation);



// function logIn() {
//     if(checkInputsEmpty() == true)
//     {
//         getAlertMessage('All Inputs Required','red')
//     }
//     else
//     {
//         if(checkEmailPassword() == true)
//         {

//             window.location.href='home.html';
//         }
//         else
//         {
//             getAlertMessage('Email or Password not Correct','red');
//         }
//     }
   
// }
// function checkEmailPassword() {
//     for (let i = 0; i < userInformation.length; i++) {
//         if (userInformation.email == emailLoginInput.value && userInformation.password == passwordLoginInput.value) {
//             localStorage.setItem('userName',userInformation.userName)
//             return true;
//         }
//     }
// }
// function getAlertMessage(text, color) {
//     alertMassage.classList.replace('d-none', 'd-block');
//     alertMassage.innerHTML = text;
//     alertMassage.style.color = color;
// }
// function checkInputsEmpty() {
//     if ( emailLoginInput.value == '' || passwordLoginInput.value == '')
//         return true;
//     else
//         return false;
// }
// loginBtn.addEventListener('click', function(){
//     logIn();
// })