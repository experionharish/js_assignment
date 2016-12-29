
//Email validation
function validateEmail(email) {
    var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(email);
}


//Validating Login credentials 
function login() {
	var userName = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var messageElement = document.getElementById("loginStatus");
	var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var loginResponse = this.responseText;
            loginResponse = JSON.parse(loginResponse);
            
            if(loginResponse.status==403){  // Login failed message
            	messageElement.style.background="#FFBABA";
            	messageElement.style.color="#D8000C";
            }
            else if(loginResponse.status==200){ // Login success message
            	messageElement.style.background="#DFF2BF";
            	messageElement.style.color="#4F8A10";

            	window.setTimeout(function () {
            	    location.href = "home.html";
    			}, 500);
            }
         
            document.getElementById("loginStatus").innerHTML = loginResponse.message; // displaying the login message
           	
       }
    };

    if(validateEmail(userName)){ //validating email

		xhttp.open("POST","https://exptest.herokuapp.com/api/login", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("userName="+userName+"&password="+password);
	}
	else{  //invalid email address. warning message
		messageElement.style.background="#FEEFB3";
        messageElement.style.color="#9F6000";
        document.getElementById("loginStatus").innerHTML="Enter a valid Username";
	}


}


// Retrieving images from server
function getImages() {
	var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var imageObjects = this.responseText;
            imageObjects = JSON.parse(imageObjects);
            console.log(imageObjects.data.length);

           	for(var i=0;i<imageObjects.data.length;i++){
         		
         		var imgDiv = document.createElement("div");
         		imgDiv.className="img";
         		
         		var imgNode = document.createElement("img");
         		imgNode.setAttribute("src",imageObjects.data[i].imageUrl);
 				imgNode.setAttribute("width","300");
 				imgNode.setAttribute("height","200");


 				var imgCaption = document.createElement("div");
 				imgCaption.className="caption";
 				imgCaption.innerHTML=imageObjects.data[i].caption;

 				imgDiv.appendChild(imgNode);
 				imgDiv.appendChild(imgCaption);
 				document.getElementById("content").appendChild(imgDiv);
         	}

         			
        }
    };

	xhttp.open("GET","https://exptest.herokuapp.com/api/imageGallery", true);
	xhttp.send();

}

//User logout
function logout(){
	var logout=confirm("Do you want to logout?");
	if(logout==true){
		window.location="index.html";
	}

}