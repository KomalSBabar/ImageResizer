const imageInput = document.getElementById("imageInput");
const nameInput = document.getElementById("nameInput");
const designationInput = document.getElementById("designationInput");
const messageBlock = document.getElementById("description");

const employeePic = document.getElementById("employeePic");
const employeeName = document.getElementById("employeeName");
const messageEmployeeName = document.getElementById("messageEmployeeName");
const employeeDesignation = document.getElementById("employeeDesignation");
const messageEmployeeDesignation = document.getElementById("messageEmployeeDesignation");
const message = document.getElementById("message");


document.getElementById("updateBtn").addEventListener("click", () => {

    const name = nameInput.value.trim();
    const designation = designationInput.value.trim();
    const message_block = messageBlock.value.trim();

    employeeName.textContent =
        name || "Employee Name";

    employeeDesignation.textContent =
        designation || "Employee Designation";

    message.textContent =
        message_block || "Employee Description";

    

    const file = imageInput.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){
            employeePic.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById("downloadBtn").addEventListener("click", async function(){

    await document.fonts.ready;

    const poster = document.getElementById("poster");

    html2canvas(poster,{
        scale:2,
        useCORS:true,
        backgroundColor:null,
        imageTimeout:0
    }).then(function(canvas){

        const link = document.createElement("a");

        link.download =
            employeeName.textContent.replace(/\s+/g,'_') +
            "_Welcome_Post.png";

        link.href = canvas.toDataURL("image/png");
        link.click();
    });

});