import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc,query, orderBy,setDoc, arrayUnion,getDoc  } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
let tableBody = document.querySelector("#tableBody");
let divBody = document.querySelector("#divBody");
let numBody = document.querySelector("#numBody");
let hospitalBody = document.querySelector("#hospitalBody");
let patientBody = document.querySelector("#patientBody");
let peopleChat = document.getElementById('peopleChat');
let rightChat = document.getElementById('rightChat')
let chatCount = document.getElementById('chatCount')
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB14zbC2yF8LEHUE1uOQJgGJZNk-myvaZA",
  authDomain: "emergency-app-da505.firebaseapp.com",
  projectId: "emergency-app-da505",
  storageBucket: "emergency-app-da505.appspot.com",
  messagingSenderId: "237732499396",
  appId: "1:237732499396:web:b5773febab872ef9cfde91",
  measurementId: "G-TLG1KFKDYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// References to Firestore collections

const hospitalsRef = query(collection(db, "Hospitals"), orderBy("createdAt", "desc"));
const patientsRef = collection(db, "patients");
const ChatRef = collection(db, "Chats");
// Listen for real-time updates in the Patients collection
const unsubscribe = onSnapshot(hospitalsRef, (snapshot) => {
  console.log("Hospitals collection changes:");
  // Clear the table body to prevent duplicate entries on updates
  tableBody.innerHTML= " "; // Assuming tableBody is a reference to the table body element
  divBody.innerHTML= " ";
  numBody.innerHTML= " ";
  hospitalBody.innerHTML= " ";
  let count = 0;
  snapshot.forEach((doc) => {
    const hospitalData = doc.data();
    const address = hospitalData.address;
    const doctorId = hospitalData.doctorId;
    const doctorName = hospitalData.doctorName;
    const email = hospitalData.email;
    const gender = hospitalData.gender;
    const hospitalName = hospitalData.hospitalName;
    const dataId = hospitalData.id;
    const image = hospitalData.pfpURL;
    const phoneNumber = hospitalData.phoneNumber;
    const dop = hospitalData.createdAt;
    let status = hospitalData.status;
    const hosStatus1 = "accepted";
    const hosStatus2 = "rejected";
    console.log(status)
    console.log(" ", doc.id, "=>", hospitalData);

    const leaveDate = new Date(dop * 1000);


// Data observation using onSnapshot (listen for changes in the Hospitals collection)

    // Get day and time using toLocaleString with options
    const formattedTime = leaveDate.toLocaleString("en-US", {
      weekday: 'short', // Display only short weekday name (e.g., Mon, Tue)
      month: 'short', // Display short month name (optional)
      day: 'numeric', // Include day of the month
      hour: 'numeric', // Include hours with padding (01-12)
      minute: 'numeric', // Include minutes with padding (00-59)
    });
    
    if (status != null) {
      if (image != null) {
        const div = `
      <div class="update">
         <div class="profile-photo">
             <img src=${image}>
         </div>
         <div class="message">
           <p><b>${hospitalName}</b> Send a request to have an access </p>
           <small class="text-muted"> ${formattedTime}</small>
         </div>
      </div>`
        divBody.innerHTML += div;
      }
      else {
        const div = `
      <div class="update">
         <div class="profile-photo">
             <img src="images/empty.jpeg">
         </div>
         <div class="message">
           <p><b>${hospitalName}</b> Send a request to have an access </p>
           <small class="text-muted"> ${formattedTime}</small>
         </div>
      </div>`
        divBody.innerHTML += div;

      }
      if(status == true){
      let Hr=`
     <tr data-id =${dataId}>
      <td>${hospitalName}</td>
      <td>${doctorName}</td>
      <td>${doctorId}</td>
      <td>${email}</td>
      <td>${phoneNumber}</td>
      <td>${address}</td>
      <td>${formattedTime}</td>
      <td class="tex">
        <button class="submitBtn warning" id="openPopupBtn">${hosStatus1}</button>
      </td>
     </tr>
        `
      hospitalBody.innerHTML+=Hr;
      }
      else if(status == false){
        let Hr=`
        <tr data-id =${dataId}>
        <td>${hospitalName}</td>
        <td>${doctorName}</td>
        <td>${doctorId}</td>
        <td>${email}</td>
        <td>${phoneNumber}</td>
        <td>${address}</td>
        <td>${formattedTime}</td>
        <td class="tex">
          <button class="rejectBtn warning" id="openPopupBtn">${hosStatus2}</button>
        </td>
      </tr>
          `
        hospitalBody.innerHTML+=Hr;
        
      }

    }
    else {
      if (image != null) {
        const div = `
      <div class="update unread">
         <div class="profile-photo">
             <img src=${image}>
         </div>
         <div class="message">
           <p><b>${hospitalName}</b> Send a request to have an access </p>
           <small class="text-muted"> ${formattedTime}</small>
         </div>
      </div>`
        divBody.innerHTML += div;
      }
      else {
        const div = `
      <div class="update unread">
         <div class="profile-photo">
             <img src="images/empty.jpeg">
         </div>
         <div class="message">
           <p><b>${hospitalName}</b> Send a request to have an access </p>
           <small class="text-muted"> ${formattedTime}</small>
         </div>
      </div>`
        divBody.innerHTML += div;

      }
   
    }


    if (status == null) {

      count++;
      const tr  = `
      <tr data-id =${dataId}>
        <td>${hospitalName}</td>
        <td>${doctorName}</td>
        <td>${doctorId}</td>
        <td>${email}</td>
        <td>${phoneNumber}</td>
        <td>${address}</td>
        <td class="tex">
         <button  class="submit warning" id="accept">accept</button>
         <button  class="reject primary" id="refuse" >Refuse</button>
        </td>
      </tr>
    `;
     
    tableBody.innerHTML += tr;
  
    }
  });
  

  let Nr = `
         <h2>Recent Updates</h2>
         <span id="num-of-notif">${count}</span>
  `
  numBody.innerHTML+=Nr;
  console.log(count);


  let rejectButtons = document.querySelectorAll('.reject');
  rejectButtons.forEach(reject => {
    reject.addEventListener("click", () => {
      let hospitalRow = reject.parentElement.parentElement;
      console.log(hospitalRow) // Get the row element
      hospitalRow.classList.add('hidden'); // Hide the row immediately

      // Optional: Update status in Firestore
      let hospitalId = reject.parentElement.parentElement.dataset.id;
      console.log(hospitalId);
      const hospitalRef = doc(db, "Hospitals", hospitalId);
      updateDoc(hospitalRef, {
        status: false
      }).then(() => {
        console.log("Hospital status updated");
      }).catch((error) => {
        console.error("Error updating hospital:", error);
      });

    });
  });
  ////////////////////
  let submitButtons = document.querySelectorAll('.submit');
  submitButtons.forEach(submit => {
    submit.addEventListener("click", (e) => {
      e.preventDefault();
      let hospitalRow = submit.parentElement.parentElement;
      console.log(hospitalRow) // Get the row element
      hospitalRow.classList.add('hidden'); // Hide the row immediately

      // Optional: Update status in Firestore
      let hospitalId = submit.parentElement.parentElement.dataset.id;
      const hospitalRef = doc(db, "Hospitals", hospitalId);
      updateDoc(hospitalRef, {
        status: true
      }).then(() => {
        console.log("Hospital status updated");
      }).catch((error) => {
        console.error("Error updating hospital:", error);
      });

    });

  })


 let acceptedButtons = document.querySelectorAll(".submitBtn");
 let rejectedButtons = document.querySelectorAll(".rejectBtn");
 let popup = document.getElementById("popup");
 const form = document.querySelector("form");
  acceptedButtons.forEach(submitBtn => {
    submitBtn.addEventListener("click", () => {
      
      function openPopup() {
        popup.classList.add("open-popup");
      }
      function closePopup() {
        popup.classList.remove("open-popup");
      }
      openPopup();

      // Add event listener to close buttons within the popup (adjust class name)
      let hospitalId= submitBtn.parentElement.parentElement.dataset.id;
      console.log(hospitalId);
      form.addEventListener("submit",(e)=>{
        e.preventDefault()
        const hospitalRef = doc(db, "Hospitals", hospitalId);
          updateDoc(hospitalRef, {
            status: false
          })
            console.log("Hospital status updated");
            
           closePopup();

      })
      
      });
    });

    rejectedButtons.forEach(rejectBtn => {
      rejectBtn.addEventListener("click", () => {
        
        function openPopup() {
          popup.classList.add("open-popup");
        }
        function closePopup() {
          popup.classList.remove("open-popup");
        }
        openPopup();
  
        // Add event listener to close buttons within the popup (adjust class name)
        let hospitalId= rejectBtn.parentElement.parentElement.dataset.id;
        console.log(hospitalId);
        form.addEventListener("submit",()=>{
          const hospitalRef = doc(db, "Hospitals", hospitalId);
            updateDoc(hospitalRef, {
              status: true
            })
              console.log("Hospital status updated");
              
             closePopup();
  
        })
        
        });
        window.addEventListener("click", (e) => {
          if ( e.target === popup) {
            popup.classList.remove("open-popup");
          }
        })
        closeButton.addEventListener('click', () =>{
          popup.classList.remove("open-popup");
      })
       
      });

});
   // ADD HOSPITALS

 const hospRef = collection(db, "Hospitals");
 const RegisterBTN1 = document.getElementById('RegisterBTN1');

 RegisterBTN1.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent default form submission
  
  const hospitalPassword = document.getElementById('hospitalPassword').value;
  const hospitalAddress = document.getElementById('hospitalAddress').value;
  const hospitalDoctorId = document.getElementById('hospitalDoctorId').value;
  const DoctorName = document.getElementById('DoctorName').value;
  const hospitalEmail = document.getElementById('hospitalEmail').value;
  const HospitalName = document.getElementById('HospitalName').value;
  const doctorGender = document.getElementById('doctorGender').value;
  const hospitalPhone = document.getElementById('hospitalPhone').value;

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, hospitalEmail, hospitalPassword);
    const user = userCredential.user;

    // Add hospital data to Firestore
    const ref =doc(db,"Hospitals",user.uid)
    const docRef =await setDoc(ref, {
      address: hospitalAddress,
      email: hospitalEmail,
      gender: doctorGender,
      doctorName: DoctorName,
      phoneNumber: hospitalPhone,
      hospitalName: HospitalName,
      doctorId: hospitalDoctorId,
      pfpURL: null,
      id: user.uid,
      createdAt: new Date(),
      status:null
       // Adding the creation timestamp
    });

    console.log('Hospital added:', user);
  } catch (error) {
    console.error('Error creating hospital:', error.code, error.message);
  }
  document.getElementById('hospitalPassword').value='';
  document.getElementById('hospitalAddress').value='';
  document.getElementById('hospitalDoctorId').value='';
  document.getElementById('DoctorName').value='';
  document.getElementById('hospitalEmail').value='';
  document.getElementById('HospitalName').value='';
  document.getElementById('doctorGender').value='';
  document.getElementById('hospitalPhone').value='';
 });
      





const unsubscribePatients = onSnapshot(patientsRef, (snapshot) => {
  patientBody.innerHTML = "";
  snapshot.forEach((doc) => {
    const patientsData = doc.data();
    const { address, age, chronicDiseases, email, gender, height, name, nationalId, phoneNumber, weight, pfpURL, WatchHistory, prescription, id, createdAt } = patientsData;

    const leaveDate = createdAt ? new Date(createdAt.seconds * 1000) : new Date();
    const formattedTime = leaveDate.toLocaleString("en-US", {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    let patientRow = `
      <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${nationalId}</td>
        <td>${phoneNumber}</td>
        <td>${email}</td>
        <td>${address}</td>
        <td>${chronicDiseases.length ? chronicDiseases : "N/A" }</td>
        <td><div class="scrollable">${prescription.length ? prescription :  "N/A"}</div></td>
        <td><div class="scrollable">${WatchHistory.length ? WatchHistory : " N/A"}</div></td>
        <td>${weight}</td>
        <td>${height}</td>
        <td>${age}</td>
        <td>${gender}</td>
        <td>${formattedTime}</td>
      </tr>
    `;
    patientBody.innerHTML += patientRow;
  });

  
// ADD PATIENTS
const RegisterBTN2 = document.getElementById('RegisterBTN2');

RegisterBTN2.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent default form submission
  
  const patientEmail = document.getElementById('patientEmail').value;
  const patientPassword = document.getElementById('patientPassword').value;
  const patientAddress = document.getElementById('patientAddress').value;
  const patientAge = document.getElementById('patientAge').value;
  const patientGender = document.getElementById('patientGender').value;
  const patientHeight = document.getElementById('patientHeight').value;
  const patientName = document.getElementById('patientName').value;
  const patientNationalID = document.getElementById('patientNationalID').value;
  const patientPhone = document.getElementById('patientPhone').value;
  const patientWeight = document.getElementById('patientWeight').value;

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, patientEmail, patientPassword);
    const user = userCredential.user;
    
    // Add patient data to Firestore
    const reference =doc(db,"patients",user.uid);
    const documentRef = await setDoc(reference, {
      address: patientAddress,
      age: patientAge,
      chronicDiseases: null,
      email: patientEmail,
      gender: patientGender,
      height: patientHeight,
      name: patientName,
      nationalId: patientNationalID,
      phoneNumber: patientPhone,
      weight: patientWeight,
      pfpURL: null,
      WatchHistory: null,
      prescription: null,
      id: user.uid,
      createdAt: new Date() // Adding the creation timestamp
    });

    console.log('Patient added:', user);
  } catch (error) {
    console.error('Error creating patient:', error.code, error.message);
  }
  document.getElementById('patientEmail').value ='';
  document.getElementById('patientPassword').value='';
  document.getElementById('patientAddress').value='';
  document.getElementById('patientAge').value='';
  document.getElementById('patientGender').value='';
  document.getElementById('patientHeight').value='';
  document.getElementById('patientName').value='';
  document.getElementById('patientNationalID').value='';
  document.getElementById('patientPhone').value='';
  document.getElementById('patientWeight').value='';

});
});

let dataSentToFire = [];
let dataOfActivatedChat = [];
let idOfActiveChat = null;
let isInitialLoad = true; // Flag for initial load
let prevActiveChatId = null; // To store the ID of the previously active chat

// Function to send a message to Firestore
async function sendMessageToChat(chatId, messageContent) {
  try {
    const message = {
      content: messageContent,
      senderID: "Ramadany1w9FsalmazYuamidowQKLgYrovanaOzDnardeen7tokaG",
      messageType: "Text",
      sentAt: new Date()
    };

    const chatDocRef = doc(db, "Chats", chatId);
    const chatDocSnapshot = await getDoc(chatDocRef);

    if (chatDocSnapshot.exists()) {
      await updateDoc(chatDocRef, {
        messages: arrayUnion(message)
      });
      console.log("Message sent!");

      // Update local data structure
      const chatIndex = dataSentToFire.findIndex(chat => chat.chatId === chatId);
      if (chatIndex !== -1) {
        dataSentToFire[chatIndex].chatDataMes.push(message);
      }

      return message;
    } else {
      console.error(`Error: Chat document ${chatId} does not exist.`);
      return null;
    }
  } catch (e) {
    console.error("Error sending message: ", e);
    return null;
  }
}

// Function to append a message to chat in DOM
function appendMessageToChat(message) {
  // Update preview in chat list
  const chatItem = document.querySelector(`.personChat[data-chat="person${dataSentToFire.findIndex(chat => chat.chatId === idOfActiveChat) + 1}"]`);
  if (chatItem) {
    const previewElement = chatItem.querySelector('.previewChat');
    const timeElement = chatItem.querySelector('.timeChat');
    if (previewElement) previewElement.innerText = message.content;
    if (timeElement) timeElement.innerText = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  // Append message to the active chat
  // const messageBubble = document.createElement('div');
  // messageBubble.classList.add('bubble');
  // messageBubble.classList.add(message.senderID === "Ramadany1w9FsalmazYuamidowQKLgYrovanaOzDnardeen7tokaG" ? 'me' : 'you');
  // messageBubble.innerText = message.content;

  const activeChat = document.querySelector('.chat.active-chat');
  if (activeChat) {
    activeChat.appendChild(messageBubble);
    activeChat.scrollTop = activeChat.scrollHeight;
  }
}

// Function to attach event listeners
function attachEventListeners() {
  const chatItems = document.querySelectorAll('.personChat');
  const chatSections = document.querySelectorAll('.chat');
  const sendBTN = document.querySelector('.rightChat .write .send');
  const writeChatInput = document.querySelector('.writeChatInput');

  writeChatInput.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter' && writeChatInput.value !== '') {
      const messageContent = writeChatInput.value;
      writeChatInput.value = '';

      const message = await sendMessageToChat(idOfActiveChat, messageContent);
      if (message) {
        appendMessageToChat(message);
      }
    }
  });

  sendBTN.addEventListener('click', async () => {
    if (writeChatInput.value !== '') {
      const messageContent = writeChatInput.value;
      writeChatInput.value = '';

      const message = await sendMessageToChat(idOfActiveChat, messageContent);
      if (message) {
        appendMessageToChat(message);
      }
    }
  });

  chatItems.forEach(item => {
    item.addEventListener('click', () => {
      chatItems.forEach(el => el.classList.remove('activeted'));
      item.classList.add('activeted');
      const chatData = item.getAttribute('data-chat');
      const index = item.getAttribute('data-index');

      idOfActiveChat = dataSentToFire[index].chatId;
      dataOfActivatedChat = dataSentToFire[index];

      chatSections.forEach(section => section.classList.remove('active-chat'));
      const activeChat = document.querySelector(`.chat[data-chat="${chatData}"]`);
      if (activeChat) activeChat.classList.add('active-chat');
    });
  });
}

// Function to activate the first chat
function activateFirstChat() {
  if (dataSentToFire.length > 0) {
    dataOfActivatedChat = dataSentToFire[0];
    idOfActiveChat = dataSentToFire[0].chatId;
    const firstChat = document.querySelector('.chat[data-chat=person1]');
    const firstPerson = document.querySelector('.personChat[data-chat=person1]');

    if (firstChat) firstChat.classList.add('active-chat');
    if (firstPerson) firstPerson.classList.add('activeted');
  }
}

// Function to activate the previously active chat or the first chat
function activatePreviousOrFirstChat() {
  if (prevActiveChatId) {
    const prevActiveChatIndex = dataSentToFire.findIndex(chat => chat.chatId === prevActiveChatId);
    if (prevActiveChatIndex !== -1) {
      const prevChatData = `person${prevActiveChatIndex + 1}`;
      const prevChatItem = document.querySelector(`.personChat[data-chat=${prevChatData}]`);
      const prevChatSection = document.querySelector(`.chat[data-chat=${prevChatData}]`);

      if (prevChatItem) prevChatItem.classList.add('activeted');
      if (prevChatSection) prevChatSection.classList.add('active-chat');

      idOfActiveChat = prevActiveChatId;
      dataOfActivatedChat = dataSentToFire[prevActiveChatIndex];
      return;
    }
  }
  activateFirstChat(); // Fallback to activating the first chat
}

// Function to update chats in real-time and reflect changes in DOM
function unsubscribeChat() {
  return onSnapshot(ChatRef, async (snapshot) => {
    // Store the ID of the currently active chat
    prevActiveChatId = idOfActiveChat;

    let cartona = '';
    let chatContent = '';
    let i = 1;
    dataSentToFire = []; // Reset the array

    const chatPromises = [];

    snapshot.forEach((doc) => {
      const chatData = doc.data();
      const chatId = chatData.id;
      const messages = chatData.messages;

      if (Array.isArray(messages) && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        const firstMessage = messages[0];
        const startMes = firstMessage.sentAt;
        const lastMes = lastMessage.sentAt;
        const begining = new Date(startMes.seconds * 1000);
        const leaveDate = new Date(lastMes.seconds * 1000);
        const format = begining.toLocaleString("en-US", {
          hour: 'numeric',
          minute: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const formattedTime = leaveDate.toLocaleString("en-US", {
          hour: 'numeric',
          minute: 'numeric',
        });

        if (chatId.includes("Ramadany1w9FsalmazYuamidowQKLgYrovanaOzDnardeen7tokaG")) {
          const participant0 = chatData.participants[0];
          const participant1 = chatData.participants[1];

          const hospitalsPromise = new Promise((resolve, reject) => {
            onSnapshot(hospRef, (snapshot) => {
              snapshot.forEach((doc) => {
                const hospitalData = doc.data();
                if (hospitalData.id.includes(participant0) || hospitalData.id.includes(participant1)) {
                  let allData = { id: i - 1, userId: hospitalData.id, chatId: chatData.id, chatDataMes: chatData.messages };
                  dataSentToFire.push(allData);
                  cartona += `
                    <li class="personChat" data-chat="person${i}" data-index="${i-1}">
                      <img src='${hospitalData.pfpURL ? hospitalData.pfpURL : 'https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg'}' alt="" />
                      <span class="nameChat">${hospitalData.hospitalName}</span>
                      <span class="timeChat">${formattedTime}</span>
                      <span class="previewChat">${lastMessage.content}</span>
                    </li>`;
                  chatContent += `
                    <div class="chat" data-chat="person${i}">
                        <div class="conversation-start">
                            <span>${format}</span>
                        </div>`;

                  i++;
                  for (let x = 0; x < messages.length; x++) {
                    if (messages[x].senderID !== 'Ramadany1w9FsalmazYuamidowQKLgYrovanaOzDnardeen7tokaG') {
                      chatContent += `<div class="bubble you">
                                   ${messages[x].content}
                                      </div>`;
                    } else {
                      chatContent += `<div class="bubble me">
                            ${messages[x].content}
                               </div>`;
                    }
                  }
                  chatContent += `</div>`;
                }
              });
              resolve();
            }, reject);
          });

          chatPromises.push(hospitalsPromise);

          const patientsPromise = new Promise((resolve, reject) => {
            onSnapshot(patientsRef, (snapshot) => {
              snapshot.forEach((doc) => {
                const patientsData = doc.data();
                if (patientsData.id.includes(participant0) || patientsData.id.includes(participant1)) {
                  let allData = { id: i - 1, userId: patientsData.id, chatId: chatData.id, chatDataMes: chatData.messages };
                  dataSentToFire.push(allData);
                  cartona += `
                    <li class="personChat" data-chat="person${i}" data-index="${i-1}">
                      <img src='${patientsData.pfpURL ? patientsData.pfpURL : 'https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg'}' alt="" />
                      <span class="nameChat">${patientsData.name}</span>
                      <span class="timeChat">${formattedTime}</span>
                      <span class="previewChat">${lastMessage.content}</span>
                    </li>`;
                  chatContent += `
                    <div class="chat" data-chat="person${i}">
                        <div class="conversation-start">
                            <span>${format}</span>
                        </div>`;

                  i++;
                  for (let x = 0; x < messages.length; x++) {
                    if (messages[x].senderID !== 'Ramadany1w9FsalmazYuamidowQKLgYrovanaOzDnardeen7tokaG') {
                      chatContent += `<div class="bubble you">
                                   ${messages[x].content}
                                      </div>`;
                    } else {
                      chatContent += `<div class="bubble me">
                            ${messages[x].content}
                               </div>`;
                    }
                  }
                  chatContent += `</div>`;
                }
              });

              resolve();
            }, reject);
          });

          chatPromises.push(patientsPromise);
        }
      }
    });

    await Promise.all(chatPromises);

    chatContent += `<div class="write">
      <input type="text" class="writeChatInput" />
      <button class="write-link send" id="sendChat"></button>
      </div>`;
    document.querySelector('#chatCount').innerHTML = i - 1;
    document.querySelector('#peopleChat').innerHTML = cartona;
    document.querySelector('#rightChat').innerHTML = chatContent;

    setTimeout(() => {
      attachEventListeners();
      activatePreviousOrFirstChat(); // Activate previous or first chat based on condition
    }, 0);

    console.log("finish");
  });
}

// Initialize chat subscription
unsubscribeChat();
