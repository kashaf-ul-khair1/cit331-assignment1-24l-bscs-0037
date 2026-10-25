
const form = document.getElementById("registration-form");
const list = document.getElementById("registration-list");
const message = document.getElementById("confirm");
const clearButton = document.getElementById("clear-button");

// Show saved registrations
function showRegistrations() {
    const data = JSON.parse(localStorage.getItem("registrations") || "[]");

    list.innerHTML = "";

    data.forEach(function(student) {
        const item = document.createElement("li");

        item.textContent = student.name + " | " +
            student.email + " | " +
            student.phone + " | " +
            student.event + " | " +
            student.source.join(", ");

        list.appendChild(item);
    });
}

// Register a student
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const eventName = document.getElementById("event").value;

    const checkboxes = document.querySelectorAll(
        'input[name="source"]:checked'
    );

    const sources = [];

    checkboxes.forEach(function(box) {
        sources.push(box.value);
    });

    const student = {
        name: name,
        email: email,
        phone: phone,
        event: eventName,
        source: sources
    };

    const data = JSON.parse(localStorage.getItem("registrations") || "[]");

    data.push(student);

    localStorage.setItem("registrations", JSON.stringify(data));

    message.textContent = "Registration successful!";

    form.reset();

    showRegistrations();
});

// Clear all registrations
clearButton.addEventListener("click", function() {
    localStorage.removeItem("registrations");

    showRegistrations();

    message.textContent = "All registrations cleared!";
});

// Show saved registrations when page open
showRegistrations();
