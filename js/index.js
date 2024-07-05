const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const dField = document.querySelector(".date");
let dateBody = document.querySelector("#dateBody");
let closeButton = document.querySelector("#closee-btn");

const patientBtn = document.getElementById("patientBtn")
const HospitalBtn = document.getElementById("HospitalBtn")
const MassagesBtn = document.getElementById("MassagesBtn")
const AnalyticsBtn = document.getElementById("AnalyticsBtn")
const addUsersBtn = document.getElementById("addUsersBtn")
const main = document.querySelector('main')
const right = document.querySelector('#right')
const container = document.querySelector('.container')
const massages = document.querySelector('#massages')
const patients = document.querySelector('#patients')
const hospitals = document.querySelector('#hospitals')
const addNewUsers =document.querySelector('#addNewUsers')
const static = document.getElementById("static")
const recentUpdate = document.getElementById('recentUpdate')
const addHospitalBTN = document.getElementById('addHospitalBTN')
const addPatientsBtn = document.getElementById('addPatientsBtn')
const hospitalData =document.getElementById('hospitalData')
const patientsData = document.getElementById('patientsData')
const buttens = document.querySelector('.buttens')

static.style.display='block';

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
})


dateBody.innerHTML=" ";
let date = new Date();
let dr=`
<p>${new Date().toDateString()}</p>
 <img src="./images/calendar.jpg">
`
dateBody.innerHTML+=dr;





// show sidebar 
menuBtn.addEventListener('click', () =>{
sideMenu.style.display = 'block';
})
closeButton.addEventListener('click', () =>{
    sideMenu.style.display = 'block';
})

patientBtn.addEventListener('click',()=>{
    main.style.display='none';
    right.style.display='none';
    recentUpdate.style.display='none';
    patients.style.display='block';
    massages.style.display='none';
    addNewUsers.style.display='none'
    hospitals.style.display='none'
    hospitalData.style.display='none'
    patientsData.style.display='none'
    patientBtn.classList.add("active")
    HospitalBtn.classList.remove("active")
    MassagesBtn.classList.remove("active")
    AnalyticsBtn.classList.remove("active")
    addUsersBtn.classList.remove("active")
    container.style.gridTemplateColumns = '14rem auto';
   })

HospitalBtn.addEventListener('click',()=>{
    right.style.display='none';
    main.style.display='none';
    recentUpdate.style.display='none';
    patients.style.display='none';
    massages.style.display='none';
    addNewUsers.style.display='none'
    hospitals.style.display='block'
    patientBtn.classList.remove("active")
    HospitalBtn.classList.add("active")
    MassagesBtn.classList.remove("active")
    AnalyticsBtn.classList.remove("active")
    addUsersBtn.classList.remove("active")
    hospitalData.style.display='none'
    patientsData.style.display='none'
    container.style.gridTemplateColumns = '14rem auto ';
   })

MassagesBtn.addEventListener('click',()=>{
    right.style.display='none';
    main.style.display='none';
    recentUpdate.style.display='none';
    patients.style.display='none';
    massages.style.display='block';
    addNewUsers.style.display='none'
    hospitals.style.display='none'
    patientBtn.classList.remove("active")
    HospitalBtn.classList.remove("active")
    MassagesBtn.classList.add("active")
    AnalyticsBtn.classList.remove("active")
    addUsersBtn.classList.remove("active")
    hospitalData.style.display='none'
    patientsData.style.display='none'
    container.style.gridTemplateColumns = '14rem auto ';
   })

AnalyticsBtn.addEventListener('click',()=>{
    right.style.display='block';
    main.style.display='block';
    recentUpdate.style.display='block';
    patients.style.display='none';
    massages.style.display='none';
    addNewUsers.style.display='none'
    hospitals.style.display='none'
    patientBtn.classList.remove("active")
    HospitalBtn.classList.remove("active")
    MassagesBtn.classList.remove("active")
    AnalyticsBtn.classList.add("active")
    addUsersBtn.classList.remove("active")
    hospitalData.style.display='none'
patientsData.style.display='none'
container.style.gridTemplateColumns = '14rem auto 23rem';
   })

addUsersBtn.addEventListener('click',()=>{
    right.style.display='none';
    main.style.display='none';
    recentUpdate.style.display='none';
    patients.style.display='none';
    massages.style.display='none';
    addNewUsers.style.display='block'
    hospitals.style.display='none'
    patientBtn.classList.remove("active")
    HospitalBtn.classList.remove("active")
    MassagesBtn.classList.remove("active")
    AnalyticsBtn.classList.remove("active")
    addUsersBtn.classList.add("active")
    hospitalData.style.display='none'
    patientsData.style.display='none'
    buttens.style.display='block'
    container.style.gridTemplateColumns = '14rem auto';

   })


   addHospitalBTN.addEventListener('click',()=>{
    buttens.style.display='none'
    hospitalData.style.display='block'
   })
   addPatientsBtn.addEventListener('click',()=>{
    buttens.style.display='none'
    patientsData.style.display='block'
   })


// CreatePatients(patentsDataRegistration)

// search patients //

const searchfunction=()=>{
    let filter =document.getElementById("myInput").value.toUpperCase();
    let myTable = document.getElementById('patientBody');
    let tr = myTable.getElementsByTagName('tr');
     for(var i=0; i<tr.length;i++){
       let td = tr[i].getElementsByTagName('td')[4];
       if(td){
         let textValue = td.textContent || td.innerHTML;
         if(textValue.toUpperCase().indexOf(filter)> -1){
           tr[i].style.display ="";

         }
         else{
           tr[i].style.display ="none";
         }
       }
     }
   }

// search hospitals //
const searchfunctionForHospital=()=>{
    let filter =document.getElementById("Input").value.toUpperCase();
    let myTable = document.getElementById('hospitalBody');
    let tr = myTable.getElementsByTagName('tr');
     for(var i=0; i<tr.length;i++){
       let td = tr[i].getElementsByTagName('td')[0];
       if(td){
         let textValue = td.textContent || td.innerHTML;
         if(textValue.toUpperCase().indexOf(filter)> -1){
           tr[i].style.display ="";

         }
         else{
           tr[i].style.display ="none";
         }
       }
     }
   }


closeBtn.addEventListener('click',() => {
    sideMenu.style.display = 'none';
})

