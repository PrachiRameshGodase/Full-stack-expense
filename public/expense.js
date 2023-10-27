
// //on domContent loaded, get all previous bookings and show them on user interface;
// document.addEventListener("DOMContentLoaded", async () => {
//   showAllPreviousUsersOnScreen();

// })


// const showAllPreviousUsersOnScreen = async () => {
//   try {
//     //here we will send request for getting all previous bookings
//     const response = await axios.get('http://localhost:3000/previous-bookings');
//     console.log(response.data.appointments)

//     const appoinments = response.data.appointments;
//     console.log(appoinments)

//     appoinments.forEach(appoinment => {
//       document.getElementById('itemList').insertAdjacentHTML('beforeend',
//         `<li id=${appoinment.id}>
//       ${appoinment.name} - ${appoinment.email} - ${appoinment.phonenumber}

//       <button> Edit </button>
//       <button> Delete </button>

//       </li>`)
//     });


//   } catch (err) {
//     console.log(err)
//   }
// }



const form = document.getElementById("appointmentform")

//handler for form submit event
form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault()
    const epense = document.getElementById("epense").value;
    const amount= document.getElementById("amount").value;
    const description = document.getElementById("description").value;

    const obj = {
      epense: epense,
      amount: amount,
      description: description
    }
// console.log(obj)

    const response = await axios.post("http://localhost:3000/expense", obj)
   

    console.log(response.data.appointmentDetail)
    const appointmentDetails = response.data.appointmentDetails

    showUserOnScreen(appointmentDetails)


  } catch (err) {
    console.log(err)
  }
})


// const showUserAppointmentOnScreen = async (appoinment) => {

//   try {

//     document.getElementById('itemList').insertAdjacentHTML('beforeend',
//       `<li id=${appoinment.id}>
//       ${appoinment.name} - ${appoinment.email} - ${appoinment.phonenumber}

//       <button> Edit </button>
//       <button> Delete </button>

//       </li>`)

//     //clear the input fields
//     clearInputFields()


//   } catch (err) {
//     console.log(err)
//   }

// }


// const clearInputFields = () => {
//   document.getElementById("epense").value='';
//   document.getElementById("amount").value='';
//   document.getElementById("descripion").value='';

// }
async function showUserOnScreen() {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML="";
  const response=await axios.get("http://localhost:3000/previous-bookings")
  
  const appointment=response.data.appointments;
  console.log(appointment)
  for(let i=0;i<appointment.length;i++){
  const appoinment=appointment[i];
console.log(appoinment.id)

console.log(appoinment.epense)
  const li = document.createElement('li');
  li.id="li";
  const deletebtn = document.createElement('button')    //create delete button
  const editbtn = document.createElement('button')       //create edit button
  deletebtn.id = 'button1';
  deletebtn.innerText = 'Delete'; 
  
  //add eventListener with arrow
  deletebtn.onclick = async() => {
    const respone=await axios.delete(`http://localhost:3000/delete-booking/${appoinment.id}`)
    console.log(respone.data)
    itemList.removeChild(li);
  }
  

  editbtn.id = 'button2';
  editbtn.innerText = 'Edit'; 
  
  //add eventListener with arrow
  const updatedData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phonenumber: document.getElementById('phone').value
};

const response = await axios.put(`http://localhost:3000/booking/${appoinment.id}`, updatedData);
console.log(response.data);
  li.textContent = appoinment.epense + '-' + appoinment.amount + '-' + appoinment.description;
  li.appendChild(deletebtn) 
  li.appendChild(editbtn) 
  itemList.appendChild(li); 
}
// clearInputFields()
}
//reload the all deatilsS
document.addEventListener("DOMContentLoaded",async()=>{
  showUserOnScreen();
  
})


