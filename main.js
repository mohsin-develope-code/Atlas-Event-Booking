function allowOnlyOne(className) {
      const boxes = document.querySelectorAll("." + className);
      boxes.forEach((box) => {
        box.addEventListener("change", () => {
          if (box.checked) {
            boxes.forEach((other) => {
              if (other !== box) other.checked = false;
            });
          }
        });
      });
    }


    allowOnlyOne("Planning-Check")
    allowOnlyOne("support-check")
    allowOnlyOne("Exam-Check")
    allowOnlyOne("Friends-Check")
    allowOnlyOne("Attendence-Check")



    //----------------------------------
    //         Catch Input Values
    //----------------------------------


    const registerNow = document.getElementById("contactForm");
    const btn = document.getElementById("submitBtn");

    registerNow.addEventListener("submit", async function (e){
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("number").value.trim();
      const alternatePhone = document.getElementById("alternateNumber").value.trim();
      const city = document.getElementById("city").value.trim();
      const collegeName = document.getElementById("collegeName").value.trim();
      const collegeLocation = document.getElementById("collegeLocation").value;
      //get dropdown value
      const course = document.getElementById("course").value;
      const graduationYear = document.getElementById("graduationYear").value;
      //Get Check box value
      const planning = document.querySelector(".Planning-Check:checked")?.value || "";
      const exam = document.querySelector(".Exam-Check:checked")?.value || "";
      const friend = document.querySelector(".Friends-Check:checked")?.value || "";
      const attendence = document.querySelector(".Attendence-Check:checked")?.value || "";

     let allFriendsDetails = [];

      document.querySelectorAll(".friend-section").forEach(section => {
        const name = section.querySelector(".friend-name input").value;
        const phone = section.querySelector(".friend-number input").value;

        allFriendsDetails.push({ name, phone });
      });

       console.log('now you see a friend details');
       console.log(allFriendsDetails)


      const formData = {
        name: name,
        email: email,
        phone: phone,
        alternatePhone: alternatePhone, 
        city: city,
        collegeName: collegeName,
        collegeLocation: collegeLocation,
        allFriendsDetails: allFriendsDetails,
        course: course,
        graduationYear: graduationYear,
        planning: planning,
        exam: exam,
        friend: friend,
        attendence: attendence,
      }


      //show loader 
      btn.classList.add("loading");
      btn.disabled = true;

      // simulate form submit (remove this in real form)
      setTimeout(() => {
      btn.classList.remove("loading");
      btn.disabled = false;
       }, 2000);



      try {
        const response = await fetch('https://api.ultimatejaipurians.in/api/form-details', {
                                      method: "POST", 
                                      body: JSON.stringify(formData),
                                      headers: { 'Content-Type': 'application/json' }
        })

        const result = await response.json();
        const {status, userData , message} = result;

        if(status){
          console.log("Your API is Working")
          console.log(userData)

            localStorage.setItem('city', userData.city)
            localStorage.setItem('phone', userData.phone)
            localStorage.setItem('email', userData.email)
            localStorage.setItem('name', userData.name)
            localStorage.setItem('all-Friends', JSON.stringify(userData.allFriendsDetails))
           
          //redirect
          setTimeout(window.location.href = 'success.html', 3000);
    
        } else {
          //popup show for error reason
        }

      } catch (error) {
        //pop show for error reason
      }


      // console.log(formData)



    })





    //-------------------------------------------------------
    //              Add Friend Detail Fields
    //-------------------------------------------------------

  const friendContainer = document.getElementById("friend-container");

  friendContainer.addEventListener("click", function (e) {

  // ➕ ADD FRIEND
  if (e.target.classList.contains("add-friend")) {
    const newFriend = document.createElement("div");
    newFriend.classList.add("friend-section");

    newFriend.innerHTML = `
      <div class="friend-name">
        <input type="text" placeholder="Friend's Name" style="width: 100%; padding: 8px 10px; border: 1px solid grey; border-radius: 7px">
      </div>

      <div class="friend-number">
        <input type="tel" placeholder="Friend's Phone Number" style="width: 100%; padding: 8px 10px; border: 1px solid grey; border-radius: 7px">
      </div>

      <div class="remove-friend"
           style="margin-left: 20px; background-color: grey;
                  padding: 3px 8px; border-radius: 50%;
                  cursor: pointer;">
        ×
      </div>
    `;

    friendContainer.appendChild(newFriend);
  }

  if (e.target.classList.contains("remove-friend")) {
    const section = e.target.closest(".friend-section");
    section.remove();
  }

});





