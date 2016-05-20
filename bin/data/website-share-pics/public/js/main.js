/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	
	var numFiles;
	var prevNumFiles; 
	var sliderNum = 1;
	var getFiles = function(){
		console.log("getFiles initiated");
		$.post('/files', //the address. post request
			 {files: 'pics'},				// the data im sending
			 function(response){ //callback function (once a response comes through)
			 	// console.log(response);
			 	console.log(response);
			 	numFiles = response.numberOfPics -1; //one is the ds store file
			 	console.log(numFiles);
			 	if( numFiles > prevNumFiles){
			 		postPic(response);
			 	}
			 	prevNumFiles = numFiles;
			 }
		); //jquery function
	};

	setInterval(function(){ 
		getFiles();	
	}, 1000);
	
	var postPic = function(response){
		//width of img = 100%/num of pics
		
		var width = 90/numFiles;

		if(numFiles >= 4){
			width = 90/3;
		}
		var pictures = response.picNames;
		var newPic = pictures[pictures.length-1];
		console.log(newPic);
		var dot = newPic.indexOf(".");
		var id = newPic.slice(0, dot);
		var img = $('<img />', { 
		  id: id,
		  class: "pic",
		  src: '../files/' + newPic,
		  'width': width + '%',
		  'padding': '5px'
		});
		console.log(img);
		
	

		$(".pic").css({
			'width': width + '%',
			'padding': '5px'
		});
		if(numFiles % 7 == 0){
			sliderNum ++;
		}
			img.appendTo($('#slider-' + sliderNum));
		
		
	}

	$(".pic").click(function(){
		console.log("clicked");
	});


	var init = function(){
		console.log('Initializing app.');
		numFiles = 0;
	};



	return {
		init: init,
		getFiles: getFiles

	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);