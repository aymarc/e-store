


/* =======================================================================================
========Use the following to submit a form, clear it, cancel the filling process==========
========Ideal for simple pages which have a maximum of one form per page==================
==========================================================================================*/
//TODO:pass attribute key to enable authorized usage of script 

$(document).ready(function () {
    const AUTH_TOKEN = "access_token"; // SET STORAGE KEY WHERE TOKEN IS STORED
    const current_script001 = document.getElementById("custom-id") // get script id to retrieve attributes which are used as variable in this script
    const createFormKey = (current_script001.dataset && current_script001.dataset.createform && current_script001.dataset.createform.length) ? current_script001.dataset.createform : undefined; //retrieve the id of the create button
    const cancelFormKey = (current_script001.dataset && current_script001.dataset.cancelform && current_script001.dataset.cancelform.length) ? current_script001.dataset.cancelform : undefined; //retrieve the id of the cancel button
    const cleanFormKey = (current_script001.dataset && current_script001.dataset.cleanform && current_script001.dataset.cleanform.length) ? current_script001.dataset.cleanform : undefined; //retrieve the id of the clean button
    const pageFormKey = (current_script001.dataset && current_script001.dataset.pageform && current_script001.dataset.pageform.length) ? current_script001.dataset.pageform : undefined; //retrieve the id of the form
    const apiUrl = (current_script001.dataset && current_script001.dataset.apiurl && current_script001.dataset.apiurl.length) ? current_script001.dataset.apiurl : undefined; //retrieve the apiurl
    const baseUrl = (current_script001.dataset && current_script001.dataset.baseurl && current_script001.dataset.baseurl.length) ? current_script001.dataset.baseurl : ""; //retrieve the baseUrl
    const submitButtonKey = (current_script001.dataset && current_script001.dataset.submitbutton && current_script001.dataset.submitbutton.length) ? current_script001.dataset.submitbutton : ""; //retrieve the submitbutton 
    const payloadType = (current_script001.dataset && current_script001.dataset.payloadtype && current_script001.dataset.payloadtype.length) ? current_script001.dataset.payloadtype : ""; //retrieve the payloadtype  
    const token = window.localStorage.getItem(AUTH_TOKEN);

    let requestUrl = `${baseUrl}${apiUrl}`
    if (token) {
        requestUrl += `?token=Bearer ${token}`;
    }
    if (!current_script001) {
        console.error("__Common Functions__: Can not find reference to to current script.")
        return;
    }
    if (!createFormKey) {
        console.error("__Common Functions__: Can not find create button.")
        return;
    }
    if (!cancelFormKey) {
        console.error("__Common Functions__: Can not find cancel button.")
        return;
    }
    if (!cleanFormKey) {
        console.error("__Common Functions__: Can not find clean button.")
        return;
    }
    if (!pageFormKey) {
        console.error("__Common Functions__: Can not find associated form.")
        return;
    }
    if (!requestUrl) {
        console.warn("__Common Functions__: Can not send ajax. No api url provided.")
    }


    const createForm = document.getElementById(createFormKey); //retrieve the id of the create button
    const cancelForm = document.getElementById(cancelFormKey); //retrieve the id of the cancel button
    const cleanForm = document.getElementById(cleanFormKey); //retrieve the id of the clean button
    const pageForm = document.getElementById(pageFormKey); //retrieve the id of the form
    const submitButton = document.getElementById(submitButtonKey); //retrieve the submit button of the form 

    if (!createForm) {
        console.error("__Common Functions__: Can not bind create button.")
        return;
    }
    if (!cancelForm) {
        console.error("__Common Functions__: Can not bind cancel button.")
        return;
    }
    if (!cleanForm) {
        console.error("__Common Functions__: Can not bind clean button.")
        return;
    }
    if (!pageForm) {
        console.error("__Common Functions__: Can not bind associated form.")
        return;
    }
    if (!submitButton) {
        console.error("__Common Functions__: Can not bind submit button.")
        return;
    }



    function cleanFormFn() {
        // Get a reference to the form element
        const form = document.getElementById('container-form');
        // Loop through all form elements and reset their values
        Array.from(form.elements).forEach((element) => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                element.value = '';
            }
        });
    }
    function createFormFn(e) { //handle create button click
        const currentDisplay = pageForm.style.display;

        pageForm.style.display = "block";
        cleanForm.style.display = "inline-block";
        createForm.style.display = "none";
    }
    function cancelFormFn(e) {  //handles cancel button click
        e.preventDefault();
        const currentDisplay = pageForm.style.display;
        console.log("currentDisplay ", pageForm)

        cleanFormFn()
        pageForm.style.display = "none";
        cleanForm.style.display = "none";
        createForm.style.display = "inline-block";

    }
    function formDataToJson(formData) {
        const object = {};
        for (const [key, value] of formData.entries()) {
            object[key] = value;
        }
        return JSON.stringify(object);
    }
    createForm.addEventListener("click", createFormFn);

    cancelForm.addEventListener("click", cancelFormFn);

    cleanForm.addEventListener("click", cleanFormFn);


    cleanFormFn();

    // Define the function to handle the form submission
    function submitForm() {

        //check whether the api url is provided. if not exit the function
        const actionUpdate = submitButton.dataset && (submitButton.dataset.otheraction === "update");

        let reqMethod = "POST", contentType = false, formData = new FormData(pageForm);
        ;
        if (actionUpdate) {
            reqMethod = "PATCH";
        }

        if (payloadType === "json") {
            contentType = "application/json";
            formData = formDataToJson(formData);
        }

        if (!requestUrl) {
            return;
        }
        // Get the form data 
        const loading = Swal.fire({
            title: 'Processing...',
            allowOutsideClick: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
        // Make an AJAX request to send the form data
        $.ajax({
            type: reqMethod, // You can change the HTTP method as needed
            url: requestUrl, // Replace with your actual backend endpoint
            data: formData,
            processData: false,
            contentType: contentType,
            success: function (response) {
                // Close the loader
                loading.close();
                // Handle the success response here
                Swal.fire({
                    icon: 'success',
                    title: 'Contenaire Ajouter avec succes',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        cleanFormFn();
                        location.reload();
                        console.log(response);
                    }
                });
            },
            error: function (xhr, status, error) {
                // Close the loader
                loading.close();

                // Handle the error response here
                console.error("Form submission failed!");
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: error,
                })
                console.error(error);
            }
        });
    }

    // Add a submit event handler for the form
    pageForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        // Call the submitForm function to send the data via AJAX
        submitForm();
    });

    // You can also trigger the form submission on a button click if needed
    submitButton.addEventListener("click", function () {
        event.preventDefault();
        submitForm();
    });
})