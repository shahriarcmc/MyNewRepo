var xmlhttp = new XMLHttpRequest();
//JSON file location
var url = "json/ImageList_JSON.txt";
var ImageArray = [];
var currentIndex = -1;
var timeCounter = 0;

//this function will run when the page is loaded
$(document).ready(
    function() {
        //This function will read the json file and try to load the image
        function ReadJSONLoadImage() {
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    ImageArray = JSON.parse(xmlhttp.responseText);
                    LoadImages();
                }
            }

            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }

        //Function to update the time and to get new function once tine become 0
        setInterval(
            function() {
                if (timeCounter == 0) {
                    NextImageClick();
                } else {
                    timeCounter -= 1;
                }
            }, 1);

        //Function to load the images and display them
        function LoadImages() {
            for (var i = 0; i < ImageArray.length; i++) {
                if (currentIndex == -1 && i == 0) {
                    ActiveImage(i);
                    currentIndex = 0;
                    break;
                } else if (i == (currentIndex)) {
                    ActiveImage(i);
                    currentIndex = i;
                    break
                }
            }
        }

        //Update function that sets what to do when user click update button, it restart showing images form the ImageArray index = 0
        function UpdateImages() {
            currentIndex = 0;
            ReadJSONLoadImage();
        }
        //Displaying the image and adding animation to it 
        function ActiveImage(i) {
            $("#img1").attr("src", "images/" + ImageArray[i].fileName);

            $("#img1").animate({ opacity: '0.1' }, "slow");
            $("#img1").animate({ opacity: '1.0' }, "slow");
            //You can change duration form the JSON file
            timeCounter = ImageArray[i].duration;
        }

        //Function to load the next image form the array
        function NextImageClick() {
            if (currentIndex == ImageArray.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex += 1;
            }
            timeCounter -= 1;
            LoadImages();
        }

        //Function to load the Previous Image from the array based on the current  array index
        function PreviousImageClick() {
            if (currentIndex == 0) {
                currentIndex = ImageArray.length - 1;
            } else {
                currentIndex -= 1;
            }
            timeCounter -= 1;
            LoadImages();
        }

        //Creating the Event listner for Buttons Next, Previous and Update 
        function EventListeners() {
            var next = document.getElementById("btnNext");
            var previous = document.getElementById("btnPrevious");
            var btnUpdate = document.getElementById("btnUpdate");

            //When User Clicks Next Button
            if (next.addEventListener) {
                next.addEventListener("click", NextImageClick, false)
            } else if (next.attachEvent) {
                next.attachEvent("onclick", NextImageClick);
            }

            //When user clicks the Previous Image Button
            if (previous.addEventListener) {
                previous.addEventListener("click", PreviousImageClick, false)
            } else if (previous.attachEvent) {
                previous.attachEvent("onclick", PreviousImageClick);
            }

            //When user CLicks Update button
            if (btnUpdate.addEventListener) {
                btnUpdate.addEventListener("click", UpdateImages, false)
            } else if (btnUpdate.attachEvent) {
                btnUpdate.attachEvent("onclick", UpdateImages);
            }
        }

        //Conatins the set of Function to be palyed on startup
        function RunOnStartUp() {
            EventListeners();
            ReadJSONLoadImage();
        }

        //Event Listners
        if (window.addEventListener) {
            window.addEventListener("load", RunOnStartUp, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", RunOnStartUp);
        }
    }
)