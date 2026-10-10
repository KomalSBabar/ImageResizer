
const companyData = {
    puresynth: {
        logo: "images/puresynth-logo.png",
        background: "images/LinkedIn-Assets/image-bg2.png",
        employeeName: "Prashant Kumar Gaurav",
        designation: "AGM - Sales & Marketing (PAN India)",
        employeeImage: "images/LinkedIn-Assets/image-p.jpg",
        description: "We are pleased to welcome Mr. Prashant Kumar Gaurav to PureSynth Research Chemicals as AGM - Sales & Marketing (PAN India). We extend our warmest wishes as he embarks on this new professional journey with us. With over 20 years of experience in Sales & Marketing, he brings valuable industry expertise and strategic insights."
    },

    chemtek: {
        logo: "images/chemtek-logo.png",
        background: "images/LinkedIn-Assets/chemtek-bg.png",
        employeeName: "",
        designation: "",
        employeeImage: "",
        description: ""
    }
};

let activeCompany = "puresynth";

const companyTabs = document.querySelectorAll(".company-tab");
const form = document.querySelector(".controls");

const tabImageInput = document.getElementById("imageInput");
const tabNameInput = document.getElementById("nameInput");
const tabDesignationInput = document.getElementById("designationInput");
const tabDescriptionInput = document.getElementById("description");

const tabEmployeeName = document.getElementById("employeeName");
const tabEmployeeDesignation = document.getElementById("employeeDesignation");
const tabEmployeePic = document.getElementById("employeePic");
const tabLogoPreview = document.getElementById("logoPreview");

const poster = document.getElementById("poster");
const posterBackground = poster.querySelector(".poster-bg");

function switchCompany(companyKey) {
    const company = companyData[companyKey];

    if (!company) return;

    activeCompany = companyKey;

    // Update active tab
    companyTabs.forEach(tab => {
        tab.classList.toggle(
            "active",
            tab.dataset.company === companyKey
        );
    });

    // Reset form fields
    nameInput.value = company.employeeName;
    designationInput.value = company.designation;
    descriptionInput.value = company.description;
    imageInput.value = "";

    // Reset poster content
    employeeName.textContent = company.employeeName;
    employeeDesignation.textContent = company.designation;

    employeePic.src = company.employeeImage;
    employeePic.style.display = company.employeeImage ? "block" : "none";

    logoPreview.src = company.logo;
    posterBackground.src = company.background;

    // Reset message
    const message = document.getElementById("message");

    if (companyKey === "puresynth") {
        message.textContent = company.description;
    } else {
        message.textContent = "";
    }
}

companyTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        switchCompany(tab.dataset.company);
    });
});

// Initialize default tab
switchCompany("puresynth");
