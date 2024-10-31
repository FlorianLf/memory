
window.onload = init;

function init(){
    document.getElementById('resetConnect').addEventListener('click', resetForm);
}


function resetForm(){
    window.location.reload();
}