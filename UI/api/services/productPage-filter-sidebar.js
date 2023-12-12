let isClosed = true;
function openCloseNav() {
    if(isClosed === true){

    document.getElementById("mySidebar").style.width = "240px";
    document.getElementById("main").style.marginLeft = "180px";
    isClosed = false;
    }
    else{
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    isClosed = true;
    }
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    isClosed = true;
}