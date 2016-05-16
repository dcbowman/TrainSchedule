
// 1. Link to Firebase
var trainData = new Firebase("https://sweltering-inferno-8052.firebaseio.com/");

// 2. Button for adding train info
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainStart = moment($("#startInput").val().trim(), "HH:MM").format("X");//need to check format X 
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
	var trainStartPretty = moment.unix(trainStart).format("HH:MM");

	//!!!!!! Calculate the time the next train is coming 

	// To calculate the next train coming 
	var nextArrival = moment().diff(moment.unix(empStart, 'X'), "months");
	console.log(nextArrival);

	//!!!Create a variable for the current time
	var currentTime =

	// Calculate the total billed rate
	var minAway = nextArrival - currentTime;
	console.log(minAway);

	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainStartPretty + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

});




