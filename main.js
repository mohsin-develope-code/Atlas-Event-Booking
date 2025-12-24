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




    //Button Loader
  //   const btn = document.getElementById("submitBtn");

  // btn.addEventListener("click", function () {
  //   btn.classList.add("loading");
  //   btn.disabled = true;

  //   // simulate form submit (remove this in real form)
  //   setTimeout(() => {
  //     btn.classList.remove("loading");
  //     btn.disabled = false;
  //   }, 3000);
  // });



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
      const allFriendsDetails = document.getElementById("allFriendsDetails").value;
      //get dropdown value
      const course = document.getElementById("course").value;
      const graduationYear = document.getElementById("graduationYear").value;
      //Get Check box value
      const planning = document.querySelector(".Planning-Check:checked")?.value || "";
      const exam = document.querySelector(".Exam-Check:checked")?.value || "";
      const friend = document.querySelector(".Friends-Check:checked")?.value || "";
      const attendence = document.querySelector(".Attendence-Check:checked")?.value || "";

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
        const response = await fetch('http://localhost:8000/api/form-details', {
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