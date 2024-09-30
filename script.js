// Toggle Navigation Menu
const toggleMenu = document.querySelector(".toggle-menu");
const navbar = document.querySelector(".navbar");

toggleMenu.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Array to hold reported pets
let pets = [];

// Get the current location for pet rescue
let latitude, longitude;

// Function to get user's current geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Show position and update form input with latitude and longitude
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  document.getElementById(
    "pet-location"
  ).value = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

// Handle form submission for reporting a pet
document
  .getElementById("report-pet-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const petName = document.getElementById("pet-name").value;
    const petType = document.getElementById("pet-type").value;
    const petDescription = document.getElementById("pet-description").value;
    const petImageFile = document.getElementById("pet-image").files[0];
    
    // Check if an image file is selected
    if (!petImageFile) {
      alert("Please upload an image of the pet.");
      return;
    }

    const petLocation = document.getElementById("pet-location").value;

    // Create a FileReader to read the image
    const reader = new FileReader();
    reader.onload = function (event) {
      // Create a new pet object
      const pet = {
        name: petName,
        type: petType,
        description: petDescription,
        image: event.target.result, // Use the image data URL
        location: petLocation,
        latitude: latitude,
        longitude: longitude,
      };

      // Add the pet to the array and display it
      pets.push(pet);
      displayPets(pets);

      // Reset the form
      document.getElementById("report-pet-form").reset();
    };

    // Read the uploaded image as a data URL
    reader.readAsDataURL(petImageFile);
  });

// Function to display pets in the pet card container
function displayPets(petsArray) {
  const petsContainer = document.getElementById('pets-container');
  petsContainer.innerHTML = ''; // Clear the container

  petsArray.forEach(pet => {
      const petCard = document.createElement('div');
      petCard.classList.add('pet-card');

      petCard.innerHTML = `
          <img src="${pet.image}" alt="${pet.name}" style="width: 100%; height: auto;"> <!-- Ensure responsive image -->
          <h3>${pet.name}</h3>
          <p>${pet.description}</p>
          <p><strong>Location:</strong> ${pet.location}</p> <!-- Display location -->
          <button onclick="adoptPet('${pet.name}')">Adopt</button>
      `;

      petsContainer.appendChild(petCard);
  });
}

// Function to handle pet adoption requests
function adoptPet(petName) {
  const adoptionRequestsList = document.getElementById("adoption-requests-list");
  const listItem = document.createElement("li");
  listItem.textContent = `You have requested to adopt ${petName}.`;
  adoptionRequestsList.appendChild(listItem);
}

// Initialize the map
let map;
function initMap() {
  const defaultLocation = { lat: -34.397, lng: 150.644 };
  map = new google.maps.Map(document.getElementById("map-container"), {
    zoom: 10,
    center: defaultLocation,
  });
}

// Function to update the map with rescue locations
function updateMap(petsArray) {
  petsArray.forEach((pet) => {
    if (pet.latitude && pet.longitude) {
      const petLocation = { lat: pet.latitude, lng: pet.longitude };
      new google.maps.Marker({
        position: petLocation,
        map: map,
        title: pet.name,
      });
    }
  });
}

// Search functionality
document.getElementById("search-bar").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchTerm)
  );
  displayPets(filteredPets);
});

// Filter functionality
document
  .getElementById("pet-type-filter")
  .addEventListener("change", function () {
    const selectedType = this.value;
    const filteredPets =
      selectedType === "all"
        ? pets
        : pets.filter((pet) => pet.type === selectedType);
    displayPets(filteredPets);
  });

// Donation handler
function handleDonation() {
  alert("Thank you for your support!");
}

// Get location on page load
getLocation();
