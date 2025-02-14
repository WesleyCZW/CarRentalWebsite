//User Functions
document.addEventListener('DOMContentLoaded', function () {
    // Register Function
    if (window.location.pathname.includes('User/register.html')) {
        const registerForm = document.querySelector('.auth-form');
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const fullName = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();

            if (!fullName || !email || !phone || !password || !confirmPassword) {
                alert('Please fill in all fields!');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Save user data to local storage
            const userData = { fullName, email, phone, password };
            localStorage.setItem('user', JSON.stringify(userData));

            alert('Registration Successful! Please proceed to login.');
            window.location.href = 'login.html';
        });
    }

    // Login Function
    if (window.location.pathname.includes('User/login.html')) {
        const loginForm = document.querySelector('.auth-form');
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
                alert('Invalid email or password');
                return;
            }

            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('userName', storedUser.fullName);

            alert('Login Successful!');
            window.location.href = '../index.html';
        });
    }

    // Logout Function
    if (sessionStorage.getItem('loggedIn') === 'true') {
        const nav = document.querySelector('nav');
        const logoutBtn = document.createElement('a');
        logoutBtn.textContent = 'Logout';
        logoutBtn.href = '#';
        logoutBtn.addEventListener('click', function () {
            // Clear both sessionStorage and localStorage
            sessionStorage.clear();
            localStorage.clear();

            alert('Logged out successfully. GOODBYE!');
            window.location.href = 'index.html';
        });
        nav.appendChild(logoutBtn);
    }
});

//Contact Function
document.addEventListener('DOMContentLoaded', function () {
    // Handle Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Display a success message
        alert('Thanks for getting in contact with us! We will reply within 3 working days.');

        // Clear the form inputs
        contactForm.reset();
    });
});

//Filter Functions
document.addEventListener('DOMContentLoaded', function () {
    const applyFiltersButton = document.querySelector('.apply-filters');
    
    applyFiltersButton.addEventListener('click', function () {
        const typeCheckboxes = document.querySelectorAll('.filter-group:nth-of-type(1) input[type="checkbox"]:checked');
        const brandCheckboxes = document.querySelectorAll('.filter-group:nth-of-type(2) input[type="checkbox"]:checked');
        
        let typeSelected = Array.from(typeCheckboxes).map(checkbox => checkbox.value.toLowerCase());
        let brandSelected = Array.from(brandCheckboxes).map(checkbox => checkbox.value.toLowerCase());

        if (typeSelected.length === 0 && brandSelected.length === 0) {
            alert('Please select at least one filter to apply.');
            return;
        }

        // Redirect logic based on filters
        if (brandSelected.includes('bmw')) {
            window.location.href = 'brandReserve/BMW.html';
        } else if (brandSelected.includes('tesla')) {
            window.location.href = 'brandReserve/Tesla.html';
        } else if (brandSelected.includes('porsche')) {
            window.location.href = 'brandReserve/Porsche.html';
        } else if (brandSelected.includes('toyota')) {
            window.location.href = 'brandReserve/Toyota.html';
        } else if (brandSelected.includes('mercedes-benz')) {
            window.location.href = 'brandReserve/MB.html';
        } else if (typeSelected.includes('ev')) {
            window.location.href = 'typeReserve/ev.html';
        } else if (typeSelected.includes('sedan')) {
            window.location.href = 'typeReserve/sedan.html';
        } else if (typeSelected.includes('suv')) {
            window.location.href = 'typeReserve/suv.html';
        } else if (typeSelected.includes('mpv')) {
            window.location.href = 'typeReserve/mpv.html';
        } else if (typeSelected.includes('coupe')) {
            window.location.href = 'typeReserve/coupe.html';
        } else {
            alert('No matching models found for the selected filters.');
        }
    });
});

//Reservation of Vehicle Function
document.addEventListener("DOMContentLoaded", function () {
    const reserveForm = document.getElementById("reserve-form");

    if (reserveForm) {
        reserveForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const fullName = document.getElementById("full-name").value;
            const email = document.getElementById("email").value;
            const contactNo = document.getElementById("contact-no").value;
            const pickupDate = document.getElementById("pickup-date").value;
            const returnDate = document.getElementById("return-date").value;

            // Get Car Details from Form Attributes
            const carName = reserveForm.getAttribute("data-car-name");
            const dailyPrice = reserveForm.getAttribute("data-daily-price");

            // Generate Random Booking ID & License Plate
            const bookingId = 123;
            const licensePlate = SMM123A;

            // Create reservation object
            const reservation = {
                fullName,
                email,
                contactNo,
                pickupDate,
                returnDate,
                bookingId,
                licensePlate,
                carDetails: { carName, dailyPrice }
            };

            // Save reservation data to localStorage
            localStorage.setItem("currentReservation", JSON.stringify(reservation));

            alert("Reservation successful! Your Booking ID is: " + 123);

            // Redirect to card details page
            window.location.href = "../cardDetails.html";
        });
    }
});

//Return Vehicle Function
document.addEventListener("DOMContentLoaded", function () {
    const reservationData = JSON.parse(localStorage.getItem("currentReservation"));

    if (reservationData) {
        document.getElementById("car-name").textContent = reservationData.carDetails.carName;
        document.getElementById("summary-booking-id").textContent = reservationData.bookingId;
        document.getElementById("summary-license-plate").textContent = reservationData.licensePlate;
        document.getElementById("rental-duration").textContent = calculateRentalDuration(
            reservationData.pickupDate, reservationData.returnDate
        );
        document.getElementById("total-cost").textContent = calculateTotalCost(
            reservationData.carDetails.dailyPrice, reservationData.pickupDate, reservationData.returnDate
        );
    } else {
        document.querySelector(".order-summary").innerHTML = "<p>No active reservations found.</p>";
    }

    document.getElementById("return-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const enteredBookingId = document.getElementById("booking-id").value;
        const enteredLicensePlate = document.getElementById("license-plate").value;

        if (
            reservationData &&
            enteredBookingId === reservationData.bookingId &&
            enteredLicensePlate === reservationData.licensePlate
        ) {
            alert("Return Confirmed! Proceeding to Payment...");
            window.location.href = "payment.html";
        } else {
            alert("Invalid Booking ID or License Plate. Please check your details.");
        }
    });
});

// Utility Functions
function calculateRentalDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + " Days";
}

function calculateTotalCost(dailyPrice, startDate, endDate) {
    const price = parseInt(dailyPrice.replace("$", "").replace("/day", ""));
    const duration = calculateRentalDuration(startDate, endDate).split(" ")[0];
    return "$" + (price * duration);
}

//Reservation Message Function
document.addEventListener("DOMContentLoaded", function () {
    const successMessage = document.getElementById("reservation-success");

    if (sessionStorage.getItem("reservationSuccess") === "true") {
        successMessage.classList.remove("hidden");

        // Hide message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add("hidden");
            sessionStorage.removeItem("reservationSuccess");
        }, 5000);
    }
});

//Car Details Submission
document.addEventListener("DOMContentLoaded", function () {
    const reservationData = JSON.parse(localStorage.getItem("currentReservation"));

    if (reservationData) {
        document.getElementById("car-name").textContent = reservationData.carDetails.carName;
        document.getElementById("rental-duration").textContent = calculateRentalDuration(
            reservationData.pickupDate, reservationData.returnDate);
        document.getElementById("total-cost").textContent = calculateTotalCost(
            reservationData.carDetails.dailyPrice, reservationData.pickupDate, reservationData.returnDate);
    }

    document.getElementById("payment-form").addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Reservation Confirmed! An email will be sent to you shortly!");

        // Keep reservation in localStorage so it remains accessible in return.html
        sessionStorage.setItem("reservationSuccess", "true");

        // Redirect to home page
        window.location.href = "../index.html";
    });
});

//Check If Logged In Function
document.addEventListener("DOMContentLoaded", function () {
    const reserveLink = document.querySelector("a[href='Reserve/reserve.html']"); // Adjust path if needed

    if (reserveLink) {
        reserveLink.addEventListener("click", function (event) {
            if (!sessionStorage.getItem("loggedIn")) {
                event.preventDefault(); // Stop navigation
                alert("You must log in to reserve a car.");
                window.location.href = "User/login.html"; // Redirect to login page
            }
        });
    }
});

//Staff Login Function
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const staffLoginButton = document.getElementById("staff-login-button");
    const staffLoginForm = document.getElementById("staff-login-form");

    // Handle Regular User Login
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
                alert("Invalid email or password");
                return;
            }

            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("userName", storedUser.fullName);

            alert("Login Successful!");
            window.location.href = "../index.html"; // Redirect to homepage for regular users
        });
    }

    // Show Staff Login Form when clicking "Login as Staff"
    if (staffLoginButton) {
        staffLoginButton.addEventListener("click", function () {
            staffLoginForm.style.display = "block"; // Show the staff login form
            staffLoginButton.style.display = "none"; // Hide the button
        });
    }

    // Handle Staff Login
    if (staffLoginForm) {
        staffLoginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const staffId = document.getElementById("staff-id").value;
            const staffPassword = document.getElementById("staff-password").value;

            // Hardcoded Staff Credentials (Can be changed to use Local Storage)
            const validStaff = {
                id: "STAFF",
                password: "123"
            };

            if (staffId === validStaff.id && staffPassword === validStaff.password) {
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("isStaff", "true");

                alert("Staff Login Successful!");
                window.location.href = "../Staff/staffDashboard.html"; // Redirect to Staff Dashboard
            } else {
                alert("Invalid Staff ID or Password.");
            }
        });
    }
});
