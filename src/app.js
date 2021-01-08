MicroModal.init();

if(!localStorage.getItem('firstTimeRunningApp')) {
    //TODO: Uncomment when modal is ready localStorage.setItem("firstTimeRunningApp", false) 
    MicroModal.show("modal-welcome");
}
