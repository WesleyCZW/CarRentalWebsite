document.addEventListener("DOMContentLoaded", function () {
    const reservations = [
        { carName: "BMW X3", licensePlate: "SMM123A", bookingId: "X3-001" },
        { carName: "Mercedes-Benz E-Class", licensePlate: "MBE456B", bookingId: "MBE-002" },
        { carName: "Tesla Model 3", licensePlate: "TML789C", bookingId: "TML-003" },
        { carName: "Porsche 911 Dakar", licensePlate: "P911-111", bookingId: "P911-004" },
        { carName: "Toyota Alphard", licensePlate: "TAL-222", bookingId: "TAL-005" }
    ];

    // Randomly select 3 reservations to display
    const selectedReservations = reservations.sort(() => 0.5 - Math.random()).slice(0, 3);
    const reservationList = document.getElementById("reservation-list");

    selectedReservations.forEach(res => {
        const div = document.createElement("div");
        div.classList.add("reservation-card");
        div.innerHTML = `
            <h3>${res.carName}</h3>
            <p><strong>License Plate:</strong> ${res.licensePlate}</p>
            <p><strong>Booking ID:</strong> ${res.bookingId}</p>
            <button class="verify-damage" data-booking="${res.bookingId}">Verify Damage</button>
        `;
        reservationList.appendChild(div);
    });

    // Handle Damage Verification
    const damageModal = document.getElementById("damage-modal");
    const closeButton = document.querySelector(".close-button");
    let selectedBooking = null;

    document.querySelectorAll(".verify-damage").forEach(button => {
        button.addEventListener("click", function () {
            selectedBooking = this.getAttribute("data-booking");
            damageModal.style.display = "block";
        });
    });

    closeButton.addEventListener("click", () => {
        damageModal.style.display = "none";
    });

    document.getElementById("add-to-bill").addEventListener("click", function () {
        const damageCost = document.getElementById("damage-cost").value;
        const damageImage = document.getElementById("damage-image").files[0];

        if (!damageCost || !damageImage) {
            alert("Please upload an image and enter a damage cost.");
            return;
        }

        alert(`Damage cost of $${damageCost} has been added to the bill.`);

        // Remove the reservation after verification
        document.querySelector(`button[data-booking="${selectedBooking}"]`).parentElement.remove();
        damageModal.style.display = "none";
    });
});
