    function gotoLibrary() {
        window.location.href = "library.html";
    }
    function submitReview() {
        var input = document.getElementById("myInput").value;

        var reviewsDisplay = document.getElementById("reviewsDisplay");
        var newReview = document.createElement("p");
        newReview.className = "summary";
        newReview.innerHTML = "<strong>User:</strong><br>" + input;
        reviewsDisplay.appendChild(newReview);
        document.getElementById("myInput").value = "";
    }