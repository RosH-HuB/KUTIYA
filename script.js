// Open the report modal
const reportBtn = document.getElementById('reportBtn');
const reportModal = document.getElementById('reportModal');
const closeReportBtn = document.getElementById('closeReportModal');

// "Oops, No pets" message element
const noPetsMessage = document.getElementById('noPetsMessage');

// Open the report modal
reportBtn.onclick = function() {
    reportModal.style.display = 'block';
};

// Close modal function
function closeModal() {
    reportModal.style.display = 'none';
}

// Close modal when the close button is clicked
closeReportBtn.onclick = closeModal;

// Close modal when clicking outside of the modal
window.onclick = function(event) {
    if (event.target === reportModal) {
        closeModal();
    }
};

// Check if containers are empty and show/hide "Oops" message
function checkContainers() {
    const dogsContainer = document.getElementById('dogsContainer');
    const catsContainer = document.getElementById('catsContainer');
    const othersContainer = document.getElementById('othersContainer');

    if (
        dogsContainer.children.length === 0 &&
        catsContainer.children.length === 0 &&
        othersContainer.children.length === 0
    ) {
        noPetsMessage.style.display = 'block'; // Show "Oops" message
    } else {
        noPetsMessage.style.display = 'none'; // Hide "Oops" message
    }
}

// Function to attach event listeners to adopt buttons
function attachAdoptButtonListeners() {
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    adoptButtons.forEach(button => {
        button.onclick = openAdoptionModal;
    });
}

// Handle Report Form Submission
const reportForm = document.getElementById('reportForm');
reportForm.onsubmit = function(event) {
    event.preventDefault();

    const petName = document.getElementById('petName').value;
    const petAge = document.getElementById('petAge').value;
    const petBreed = document.getElementById('petBreed').value;
    const petHealth = document.getElementById('petHealth').value;
    const petCategory = document.getElementById('petCategory').value;

    // For simplicity, appending a placeholder pet image
    const petCardHTML = `
        <div class="pet-card">
            <img src="https://via.placeholder.com/300" class="pet-img" alt="${petName}">
            <div class="pet-info">
                <h3>${petName}</h3>
                <p>Age: ${petAge}</p>
                <p>Breed: ${petBreed}</p>
                <p>Health: ${petHealth}</p>
                <button class="adopt-btn">Adopt Me</button>
            </div>
        </div>
    `;

    // Add the pet card to the appropriate container based on the category
    if (petCategory === 'dog') {
        document.getElementById('dogsContainer').insertAdjacentHTML('beforeend', petCardHTML);
    } else if (petCategory === 'cat') {
        document.getElementById('catsContainer').insertAdjacentHTML('beforeend', petCardHTML);
    } else {
        document.getElementById('othersContainer').insertAdjacentHTML('beforeend', petCardHTML);
    }

    // Attach listeners to new adopt buttons
    attachAdoptButtonListeners();

    // After submitting, hide "Oops" message if any pet is added
    checkContainers();

    // Close the modal and reset the form
    closeModal();
    reportForm.reset();
};

// Call checkContainers on page load to display/hide the "Oops" message accordingly
window.onload = function() {
    checkContainers(); // Ensure the message is correct when the page loads
};

// Donation Modal Script
function openDonationModal() {
    document.getElementById('donation-modal').style.display = 'block';
}

function closeDonationModal() {
    document.getElementById('donation-modal').style.display = 'none';
}

function submitDonation(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const amount = document.getElementById('amount').value;
    const upiId = document.getElementById('upi-id').value;

    // Create the UPI payment link
    const paymentLink = `upi://pay?pa=${upiId}&pn=YourOrganizationName&mc=1234&tid=${new Date().getTime()}&tn=Donation%20for%20Animal%20Rescue&am=${amount}&cu=INR&url=https://yourwebsite.com`;

    // Redirect to the UPI payment link
    window.location.href = paymentLink;

    // Close the modal after submission
    closeDonationModal();
}

// About Modal Script
function openAboutModal() {
    document.getElementById('about-modal').style.display = 'block';
}

function closeAboutModal() {
    document.getElementById('about-modal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const donationModal = document.getElementById('donation-modal');
    const aboutModal = document.getElementById('about-modal');
    const reportModal = document.getElementById('reportModal');

    if (event.target === donationModal) {
        closeDonationModal();
    }

    if (event.target === aboutModal) {
        closeAboutModal();
    }

    if (event.target === reportModal) {
        closeModal();
    }
}

// Close modal when the 'X' is clicked
document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', function() {
        const modal = button.closest('.modal');
        if (modal.id === 'about-modal') {
            closeAboutModal();
        } else if (modal.id === 'donation-modal') {
            closeDonationModal();
        } else if (modal.id === 'reportModal') {
            closeModal();
        }
    });
});

// Adoption window modal script
// Open the Adoption Modal
function openAdoptionModal() {
    document.getElementById('adoptionModal').style.display = 'block';
}

// Handle the Adoption Form Submission
document.getElementById('adoptionForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Process the form data (e.g., send it to a server or log it)
    console.log('Adoption Request:', { name, email, phone, message });

    // Show submission alert
    alert('Your adoption request has been submitted successfully!');

    // Clear the form
    this.reset();

    // Close the modal after submission
    document.getElementById('adoptionModal').style.display = 'none';
};

// Attach event listeners to adopt buttons on page load
attachAdoptButtonListeners();


// modal for be volunteer 

// Volunteer Modal Script
function openVolunteerModal() {
    document.getElementById('volunteerModal').style.display = 'block';
}

function closeVolunteerModal() {
    document.getElementById('volunteerModal').style.display = 'none';
}

function submitVolunteerForm(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve form data
    const volunteerName = document.getElementById('volunteerName').value;
    const volunteerEmail = document.getElementById('volunteerEmail').value;
    const volunteerPhone = document.getElementById('volunteerPhone').value;
    const volunteerSkills = document.getElementById('volunteerSkills').value;

    // Process the form data (you can send this to a server or log it)
    console.log('Volunteer Application:', { volunteerName, volunteerEmail, volunteerPhone, volunteerSkills });

    // Show submission alert
    alert('Your volunteer application has been submitted successfully!');

    // Clear the form
    document.getElementById('volunteerForm').reset();

    // Close the modal after submission
    closeVolunteerModal();
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const volunteerModal = document.getElementById('volunteerModal');
    if (event.target === volunteerModal) {
        closeVolunteerModal();
    }
};



