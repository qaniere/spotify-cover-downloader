MicroModal.init();

if(!localStorage.getItem('firstTimeRunningApp')) {
    localStorage.setItem("firstTimeRunningApp", false) 
    MicroModal.show("modal-welcome");
}

document.getElementById("start").addEventListener("click", function() {
    MicroModal.close("modal-welcome");
});