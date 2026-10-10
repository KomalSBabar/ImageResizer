
(function () {
    "use strict";

    const imageInput = document.getElementById("chemtekImageInput");
    const nameInput = document.getElementById("chemtekNameInput");
    const designationInput = document.getElementById("chemtekDesignationInput");
    const descriptionInput = document.getElementById("chemtekDescription");

    const updateBtn = document.getElementById("chemtekUpdateBtn");
    const downloadBtn = document.getElementById("chemtekDownloadBtn");

    const poster = document.getElementById("chemtekPoster");
    const employeeName = document.getElementById("chemtekEmployeeName");
    const employeeDesignation = document.getElementById("chemtekEmployeeDesignation");
    const employeePic = document.getElementById("chemtekEmployeePic");
    const message = document.getElementById("chemtekMessage");

    if (
        !imageInput || !nameInput || !designationInput ||
        !descriptionInput || !updateBtn || !downloadBtn ||
        !poster
    ) {
        console.error("Chemtek poster elements were not found.");
        return;
    }

    // Preview the uploaded employee image
    imageInput.addEventListener("change", function () {
        const file = this.files && this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            employeePic.onload = function () {
            employeePic.style.display = "block";
        };

        employeePic.src = event.target.result;
        };

        reader.readAsDataURL(file);
    });

    // Update the Chemtek poster
    updateBtn.addEventListener("click", function () {
        employeeName.textContent = nameInput.value.trim();
        employeeDesignation.textContent =
            designationInput.value.trim();

        message.textContent = descriptionInput.value.trim();

        // Keep the employee image hidden if none is selected
        if (!imageInput.files || !imageInput.files.length) {
            if (!employeePic.getAttribute("src")) {
                employeePic.style.display = "none";
            }
        }

        // Fit long descriptions into the available area
        message.style.fontSize = "11.5px";

        requestAnimationFrame(function () {
            let fontSize = 11.5;

            while (
                message.scrollHeight > message.clientHeight &&
                fontSize > 8
            ) {
                fontSize -= 0.5;
                message.style.fontSize = fontSize + "px";
            }
        });
    });

    // Download only the Chemtek poster
    downloadBtn.addEventListener("click", async function () {
    if (typeof html2canvas === "undefined") {
        alert("Poster download library has not loaded.");
        return;
    }

    downloadBtn.disabled = true;

    try {
        // Wait until the employee image is ready
        if (employeePic.src && employeePic.style.display !== "none") {
            await employeePic.decode().catch(() => {});
        }

        const canvas = await html2canvas(poster, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false
        });

        const link = document.createElement("a");
        const safeName = (nameInput.value.trim() || "Employee")
            .replace(/[^a-z0-9_-]/gi, "_");

        link.download = "Chemtek_Welcome_" + safeName + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();

    } catch (error) {
        console.error("Download failed:", error);
        alert("Unable to download the poster. Please try again.");
    } finally {
        downloadBtn.disabled = false;
    }
});

})();