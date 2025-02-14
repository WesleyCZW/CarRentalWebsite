//Payment Processing Function
document.addEventListener("DOMContentLoaded", function () {
    const paymentForm = document.querySelector(".auth-form");

    if (paymentForm) {
        paymentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            alert("Thank you for your Payment, See You Again!.");

            // Clear all reservation data after successful payment
            localStorage.removeItem("currentReservation");

            // Redirect to homepage
            window.location.href = "../index.html";
        });
    }
});