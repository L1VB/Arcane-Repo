document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuContent = document.getElementById('menuContent');
  
    if (menuToggle && menuContent) {
        menuToggle.addEventListener('click', function() {
            if (menuContent.style.display === 'block') {
                menuContent.style.display = 'none';
            } else {
                menuContent.style.display = 'block';
            }
        });
  
        document.addEventListener('click', function(event) {
            if (!menuContent.contains(event.target) && event.target !== menuToggle) {
                menuContent.style.display = 'none';
            }
        });
    }
  });


// feed back
const form = document.getElementById("my-form");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // Stop default form action

  const formData = new FormData(form);
  const response = await fetch("https://formspree.io/f/xvgaqdww", {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: formData,
  });

  if (response.ok) {
    form.reset();

    // Wait 3 seconds then refresh the page
    setTimeout(() => {
      location.reload();
    }, 3000);
  } else {
    alert("There was a problem submitting your form.");
  }
});
