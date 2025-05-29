document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    once: true
  });
});

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
    document.getElementById("mySidepanel").style.width = "100%";
  }
    
/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  } 

// Close side panel when any link inside it is clicked
document.addEventListener("DOMContentLoaded", function () {
  let sidePanel = document.getElementById("mySidepanel");
  let links = sidePanel.getElementsByTagName("a");

  for (let link of links) {
      link.addEventListener("click", closeNav);
  }
});


$(document).ready(function () {
  $(".nav-link").click(function (event) {
    event.preventDefault(); // Prevent full page reload
  let pageUrl = $(this).attr("href");

  $.get(pageUrl, function (data) {
    $("#content").html(data);
  });

  window.history.pushState(null, "", pageUrl); // Update URL without reload
  });

    // Handle back/forward browser navigation
  window.onpopstate = function () {
    location.reload();
  };
});


function plusMinus(btn) {
  const box = btn.closest('.Home-services-box');

  btn.classList.toggle('plus-bar-change');

  const isOpen = btn.classList.contains('plus-bar-change');

  if (isOpen) {
    box.style.height = "fit-content";
  } else {
    box.style.height = '64px';
  }
}


const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});