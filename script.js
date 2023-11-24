var modal = document.getElementById('addBookModal');
var addCircleIcon = document.getElementById('add-circle');

addCircleIcon.onclick = function () {
    modal.style.display = 'block';
};
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

function closeModal() {
    modal.style.display = 'none';
}

function validateForm() {
    const inputs = document.forms["addBookModal"].elements;

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input.type !== "submit" && input.checkValidity && !input.checkValidity()) {
            alert(input.validationMessage);
            return false;
        }
    }

    return true;
}