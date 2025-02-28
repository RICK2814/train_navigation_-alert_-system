document.addEventListener("DOMContentLoaded", function () {
    const alertBadge = document.getElementById("alert-badge");
    const alertsContainer = document.getElementById("alerts-container");
    const alertSection = document.getElementById("active-alerts");
    const tabs = document.querySelectorAll(".tab");
    const tabContent = document.getElementById("tab-content");

    let activeAlerts = [];

    function updateAlertBadge() {
        if (activeAlerts.length > 0) {
            alertBadge.textContent = `${activeAlerts.length} Active Alerts`;
            alertBadge.classList.remove("hidden");
            alertSection.classList.remove("hidden");
        } else {
            alertBadge.classList.add("hidden");
            alertSection.classList.add("hidden");
        }
    }

    function addAlert(message) {
        if (!activeAlerts.includes(message)) {
            activeAlerts.push(message);
            const alertDiv = document.createElement("div");
            alertDiv.classList.add("card");
            alertDiv.innerHTML = `<p>${message}</p> <button onclick="clearAlert('${message}')">Clear</button>`;
            alertsContainer.appendChild(alertDiv);
            updateAlertBadge();
        }
    }

    window.clearAlert = function (message) {
        activeAlerts = activeAlerts.filter(alert => alert !== message);
        alertsContainer.innerHTML = "";
        activeAlerts.forEach(alert => addAlert(alert));
        updateAlertBadge();
    };

    function simulateAlerts() {
        setInterval(() => {
            const events = [
                "Smoke detected in engine compartment",
                "Obstacle detected 500m ahead"
            ];
            const randomEvent = Math.floor(Math.random() * 10);
            if (randomEvent < events.length) {
                addAlert(events[randomEvent]);
            }
        }, 15000);
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabContent.innerHTML = `<p>Loading ${tab.dataset.tab}...</p>`;
            setTimeout(() => {
                tabContent.innerHTML = `<h3>${tab.dataset.tab} Section</h3><p>Details about ${tab.dataset.tab}.</p>`;
            }, 1000);
        });
    });

    simulateAlerts();
});