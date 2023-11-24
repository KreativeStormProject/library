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