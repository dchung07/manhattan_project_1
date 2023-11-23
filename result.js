const endBodyTitle = document.getElementById("endBodyTitle");

const points = localStorage.getItem('points');

endBodyTitle.innerHTML = "Points accumulated: " + points;