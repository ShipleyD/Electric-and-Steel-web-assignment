/*Javascript for Electric and steel*/

/* The following javascript controls what happens when the hamburger menu is clicked, it opens the menu vertically so that its is mobile friendly.

The function works by adding or removing the the secondary class " responsive", so that the menu is either hidden or shown depending on the button being clicked.
If the class id is only .topnav then it will become .topnav.responsive and if the class id is already .topnav.responsive then it will become .topnav  .
 */
function hamburgerIcon() {
		var x = document.getElementById("myTopnav");
		if (x.className === "topnav") {
			x.className += " responsive";
		}else {
			x.className = "topnav";
		}
	}

/* The following javascript controls the automatic slideshow on the home page, the function is called after the photos have been loaded in the html.
-- original code source https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_slideshow_rr 

I have used code from a web tutorial as a base for this function. The function prompt has been included within the html for this function.

*/

var myIndex = 0;


function carousel() {
    var i;
    var z = document.getElementsByClassName("mySlides");
    for (i = 0; i < z.length; i++) {
       z[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > z.length) {myIndex = 1}   
	if(z.length)	
		z[myIndex-1].style.display = "block";  
    setTimeout(carousel, 4000); //This is set so the image changes every four seconds.
}






//The following javascript controls the gallery on the tattoo page.
//It is written so that one can add images without having to change anything within the javascript.
//The class names have been changed but otherwise this code has been taken from the following site.
//--- original source code 
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_lightbox

function openModal() {
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {
  document.getElementById('myModal').style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("tattooSlides");
  if(slides.length)
	{
	  var dots = document.getElementsByClassName("demo");
	  var captionText = document.getElementById("caption");
	  if (n > slides.length) {slideIndex = 1}
	  if (n < 1) {slideIndex = slides.length}
	  for (i = 0; i < slides.length; i++) {
		  slides[i].style.display = "none";
	  }
	  for (i = 0; i < dots.length; i++) {
		  dots[i].className = dots[i].className.replace(" active", "");
	  }
  	
	  slides[slideIndex-1].style.display = "block";
	  dots[slideIndex-1].className += " active";
	  captionText.innerHTML = dots[slideIndex-1].alt;
	}
}





//The following javascript is what makes the google map on the contact us page work
// This has been re used from a previous project.

function initMap() {
  var myLatLng = {lat: 51.079146, lng: -4.060858}; // This is the latitude and longitude for Electric & Steel, the map will be centered on this point when loaded, it will also have a pin marker on the location. It is stored as Variable "myLatLng".
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15, // Sets how zoomed in the map is when loaded, set at 15 so the streets are visable as well as a large amount of the surrounding area.
    center: myLatLng // Centers the map to the location of the parlour.
	
  });
  
// The following lines creates and positions the marker.
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
   	
  });
}


//The following javascript controls the canvas that is used to space out the pages.
// The following code is being recycled from a previous project, it has been editted to be more suitable for this sites needs.
//This code uses the canvas element allowing the user to draw through javascript functions.


function snow(){
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.outerWidth;		//The height and width can edited here 
	var H = window.outerHeight/4;	//The height and width can edited here 
	canvas.width = W;
	canvas.height = H;
	
	//snowflake particles
	var mp = 300; //This is the amount of particles that will float around the canvas.
	var particles = []; // array of particles
	for(var i = 0; i < mp; i++) //This creates a loop around the array
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*4+1, //radius
			d: Math.random()*mp //density
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		ctx.fillStyle = getRandomColor();	//This uses the random colour generator at the bottom of this page so that the particles change colour.
		ctx.beginPath();					
		for(var i = 0; i < mp; i++)			
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//Angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.001;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//I changed the next section around a little so that the particles movement was more random.
			p.y += Math.cos(angle+p.d) + (Math.floor((Math.random() * 10) + 1))/4;
			p.x += Math.sin(angle) * Math.floor((Math.random() * 10) + 1);
			
			//Sending flakes back from the top when it exits
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
	
	//This sets an interval loop that calls the draw function every 150 milliseconds.
	setInterval(draw, 150);
	
// This function is re-used from an old project and creates a random colour 
//It creates a Hex colour by having an array of 15 letters saved as a variable, and then a loop that uses the Maths reference to create a random number between 1 and 15.
//This number is then used as a pointer to a letter in the array, which is then added to the colour variable.
//These steps are then repeated six times, the Hex colour is then returned to where the function was origanally called.

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor((Math.random() * 15) + 1)];
    }
	
    return color;
}
}