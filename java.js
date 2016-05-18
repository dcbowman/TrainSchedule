
// 1. Link to Firebase
var trainData = new Firebase("https://train-homework.firebaseio.com/");

// 2. Button for adding train info
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainStart = $("#startInput").val().trim();//need to check format 
	var trainFrequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding train info
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		start: trainStart,
		frequency: trainFrequency
	}

	// Uploads employee data to the database
	trainData.push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination); 
	console.log(newTrain.start);
	console.log(newTrain.frequency)

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#startInput").val("");
	$("#frequenctyInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainStart = childSnapshot.val().start;
	var trainFrequency = childSnapshot.val().frequency;

	// Employee Info
	console.log(trainName);
	console.log(trainDestination);
	console.log(trainStart);
	console.log(trainFrequency);

	// Prettify the train start
	var trainStartPretty = moment.unix(trainStart).format("h:mm");

	//!!!Create a variable for the current time
	var currentTime = moment().format('LT');
	console.log(currentTime);

// caclulate next arrival by adding the frequency until it is after the current time
	
var expected_nextTrain = moment().isSameOrAfter(currentTime);
var returned_nextTrain = moment(trainStart).add(trainFrequency, 'minutes');  // 
returned_nextTrain.isSame(expected_nextTrain)  // true

	

	//prettify the next arrival
	var nextArrivalPretty = moment.unix(expected_nextTrain).format("h:mm");


	// Calculate the total billed rate
	var minAway = expected_nextTrain - currentTime;
	console.log(minAway);

	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainStartPretty + "</td><td>" + trainFrequency + "</td><td>" + nextArrivalPretty + "</td><td>" + minAway + "</td></tr>");

});




