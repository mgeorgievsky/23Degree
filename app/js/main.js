document.addEventListener("DOMContentLoaded", function() {

	document.getElementById("button-menu").addEventListener('click', function() { 
        if (this.classList.contains("first-screen__menu-icon--opened")) {
            this.classList.remove("first-screen__menu-icon--opened")
            document.getElementById("list-menu").classList.remove("first-screen__menu-list--opened")
        }
        else {
            this.classList.add("first-screen__menu-icon--opened")
            document.getElementById("list-menu").classList.add("first-screen__menu-list--opened")
        }
    })

});
