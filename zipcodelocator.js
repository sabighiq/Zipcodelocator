// Listen for submit
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo); //we listen for submit event here & then
//we call function getLocationInfo

// Listen for delete
document.querySelector("body").addEventListener("click", deleteLocation); 

function getLocationInfo(e) { //here we ceated that function & that's gonna take event parameter e
  
  //Get zip value from input
  const zip = document.querySelector(".zip").value; //here we use queryselector and we use .zip since it is class & not #zip

  // Make request
  //here we use ES^ syntax
  fetch(`https://api.zippopotam.us/IN/${zip}`) //since i live in India so i am fetching api of india from this website
    .then(response => { //this will returns a promise & we gonna map it to json 
      if (response.status != 200) { //if it's not equal to 200 that means it is not good zipcode basically it is just status 
      //if i put 4040 the you know what is going to happen

        showIcon("remove"); 
        
        document.querySelector("#output").innerHTML = `  
              <article class="message is-danger"> 
              <div class="message-body">Invalid Zipcode, please try again</div></article>
            `;
        throw Error(response.statusText); //in addition to status it will actually give you the status text & so that's
        //we want to throw
      } else {
        showIcon("check");
        return response.json();
      }
    })
    .then(data => {
      // Show location info
      let output = ""; //we set this empty initially
      data.places.forEach(place => { //we use some bulma css here
        output += `
              <article class="message is-primary">
                <div class="message-header">
                  <p>Location Info</p>
                  <button class="delete"></button>
                </div>
                <div class="message-body">
                  <ul>
                    <li><strong>City: </strong>${place["place name"]}</li>
                    <li><strong>State: </strong>${place["state"]}</li>
                    <li><strong>Longitude: </strong>${place["longitude"]}</li>
                    <li><strong>Latitude: </strong>${place["latitude"]}</li>
                  </ul>
                </div>
              </article>
            `;
      });

      
      document.querySelector("#output").innerHTML = output;
    })
    .catch(err => console.log(err));

  e.preventDefault(); //this gonna prevent default behaviour
}

// Show check or remove icon
function showIcon(icon) {
  // Clear icons
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  // Show correct icon
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

// Delete location box
function deleteLocation(e) {
  if (e.target.className == "delete") { //we take event parameter & then we look at target & className & that's equal 
  //to delete then below lines
    document.querySelector(".message").remove();
    document.querySelector(".zip").value = "";
    document.querySelector(".icon-check").remove();
  }
}
