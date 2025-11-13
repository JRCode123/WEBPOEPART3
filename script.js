// script.js - JavaScript functionality for Bright Minds Tutoring

// Newsletter Form Submission
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      const messageDiv = document.getElementById('newsletter-message');
      
      if (validateEmail(email)) {
        messageDiv.innerHTML = '<p class="success">Thank you for subscribing to our newsletter!</p>';
        newsletterForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Newsletter subscription:', email);
      } else {
        messageDiv.innerHTML = '<p class="error">Please enter a valid email address.</p>';
      }
    });
  }
  
  // Resource Filter Functionality
  const resourceSearch = document.getElementById('resource-search');
  const filterBtn = document.getElementById('filter-btn');
  
  if (resourceSearch && filterBtn) {
    filterBtn.addEventListener('click', function() {
      const searchTerm = resourceSearch.value.toLowerCase();
      const resources = document.querySelectorAll('.resource-category li');
      let foundResources = [];
      
      resources.forEach(resource => {
        const text = resource.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          foundResources.push(resource.textContent);
          resource.style.backgroundColor = '#e6f7ff';
        } else {
          resource.style.backgroundColor = '';
        }
      });
      
      const filteredDiv = document.getElementById('filtered-resources');
      if (filteredDiv) {
        if (foundResources.length > 0) {
          filteredDiv.innerHTML = `<p>Found ${foundResources.length} resources:</p><ul>${foundResources.map(r => `<li>${r}</li>`).join('')}</ul>`;
        } else {
          filteredDiv.innerHTML = '<p>No resources found matching your search.</p>';
        }
      }
    });
  }
  
  // Tutor Search Functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', function() {
      const searchTerm = searchInput.value.toLowerCase();
      const tutorCards = document.querySelectorAll('.tutor-card');
      let tutorsFound = 0;
      
      tutorCards.forEach(card => {
        const tutorInfo = card.textContent.toLowerCase();
        if (tutorInfo.includes(searchTerm)) {
          card.style.display = 'block';
          card.style.animation = 'highlight 1s';
          tutorsFound++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Show message if no tutors found
      if (tutorsFound === 0 && searchTerm !== '') {
        alert('No tutors found matching your search. Please try different keywords.');
      } else if (searchTerm === '') {
        // Show all tutors if search is empty
        tutorCards.forEach(card => {
          card.style.display = 'block';
        });
      }
    });
  }
  
  // Book Tutor Button Functionality
  const bookButtons = document.querySelectorAll('.book-tutor-btn');
  bookButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tutorName = this.getAttribute('data-tutor');
      if (confirm(`Would you like to book a session with ${tutorName}?`)) {
        window.location.href = `booking.html?tutor=${encodeURIComponent(tutorName)}`;
      }
    });
  });
  
  // Booking Form Pre-fill if tutor parameter exists
  const urlParams = new URLSearchParams(window.location.search);
  const tutorParam = urlParams.get('tutor');
  if (tutorParam && document.getElementById('tutor')) {
    document.getElementById('tutor').value = tutorParam;
  }
  
  // Subject selection show/hide other field
  const subjectSelect = document.getElementById('subject');
  const otherSubjectContainer = document.getElementById('other-subject-container');
  
  if (subjectSelect && otherSubjectContainer) {
    subjectSelect.addEventListener('change', function() {
      if (this.value === 'Other') {
        otherSubjectContainer.style.display = 'block';
      } else {
        otherSubjectContainer.style.display = 'none';
      }
    });
  }
  
  // Form Validation for Booking Form
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const subject = document.getElementById('subject').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const duration = document.getElementById('duration').value;
      const tutor = document.getElementById('tutor').value;
      const sessionType = document.querySelector('input[name="session-type"]:checked').value;
      
      let isValid = true;
      let errorMessage = '';
      
      if (!name || name.length < 2) {
        isValid = false;
        errorMessage += 'Please enter a valid name (at least 2 characters).\n';
      }
      
      if (!validateEmail(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
      }
      
      if (phone && !validatePhone(phone)) {
        isValid = false;
        errorMessage += 'Please enter a valid 10-digit phone number.\n';
      }
      
      if (!subject) {
        isValid = false;
        errorMessage += 'Please select a subject.\n';
      }
      
      if (!date) {
        isValid = false;
        errorMessage += 'Please select a date.\n';
      } else if (new Date(date) < new Date().setHours(0,0,0,0)) {
        isValid = false;
        errorMessage += 'Please select a future date.\n';
      }
      
      if (!time) {
        isValid = false;
        errorMessage += 'Please select a time.\n';
      }
      
      if (isValid) {
        // Show confirmation
        const confirmation = document.getElementById('booking-confirmation');
        const details = document.getElementById('booking-details');
        
        details.innerHTML = `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Tutor:</strong> ${tutor || 'No preference'}</p>
          <p><strong>Session Type:</strong> ${sessionType}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Duration:</strong> ${duration} minutes</p>
        `;
        
        confirmation.style.display = 'block';
        bookingForm.style.display = 'none';
        
        // Scroll to confirmation
        confirmation.scrollIntoView({ behavior: 'smooth' });
        
        // In a real application, you would send this data to a server
        console.log('Booking details:', { 
          name, email, phone, subject, tutor, sessionType, date, time, duration 
        });
      } else {
        alert('Please correct the following errors:\n' + errorMessage);
      }
    });
  }
  
  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const inquiryType = document.getElementById('inquiry-type').value;
      const message = document.getElementById('message').value;
      
      let isValid = true;
      let errorMessage = '';
      
      if (!name || name.length < 2) {
        isValid = false;
        errorMessage += 'Please enter a valid name.\n';
      }
      
      if (!validateEmail(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
      }
      
      if (phone && !validatePhone(phone)) {
        isValid = false;
        errorMessage += 'Please enter a valid 10-digit phone number.\n';
      }
      
      if (!inquiryType) {
        isValid = false;
        errorMessage += 'Please select an inquiry type.\n';
      }
      
      if (!message || message.length < 10) {
        isValid = false;
        errorMessage += 'Please enter a message with at least 10 characters.\n';
      }
      
      if (isValid) {
        // Show confirmation
        const confirmation = document.getElementById('contact-confirmation');
        confirmation.style.display = 'block';
        contactForm.style.display = 'none';
        
        // Scroll to confirmation
        confirmation.scrollIntoView({ behavior: 'smooth' });
        
        alert('Thank you for your message! We will get back to you soon.');
        
        // In a real application, you would send this data to a server
        console.log('Contact details:', { 
          name, email, phone, inquiryType, message 
        });
      } else {
        alert('Please correct the following errors:\n' + errorMessage);
      }
    });
  }
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Phone validation function
function validatePhone(phone) {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
}

// Add CSS animation for highlighting
const style = document.createElement('style');
style.textContent = `
  @keyframes highlight {
    0% { background-color: #ffffcc; }
    100% { background-color: transparent; }
  }
  
  .success {
    color: green;
    font-weight: bold;
  }
  
  .error {
    color: red;
    font-weight: bold;
  }
`;
document.head.appendChild(style);