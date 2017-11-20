var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Dialogflow' });
// });

/* Route at which all dialogflow requests are being sent 
For the use of multiple intents:
	the intents must be saved in a dictionary and based on the intent received, a different action occurs.
*/ 
router.post('/', function (req, res, next) {
	console.log("Req result: ");
	// console.log(req.body);
// intent name location in Json: req.body.result.metadata.intentName
	console.log("Intent" + req.body.result.metadata.intentName);
// intent parameters location in Json: req.body.result.parameters
	console.log(req.body.result.parameters);
// intent query location in Json: req.body.result.resolvedQuery
	console.log(req.body.result.resolvedQuery);
	console.log("----------------------------------");
	// console.log(res);
	return mediator(req.body.result, res);

	// var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem occured. Speak again."
	// console.log("Res: ");
	// console.log (res);
	// return res.json({
	// 	speech: speech,
	// 	displayText: speech
	// });
});

function mediator (value, res) {
	var result = "";

	switch(value.metadata.intentName) {
		case "Echo":
			res = echo(value, res);
			break;
		case "Do_Location_Test":
			res = location(value, res);
			break;
		default:
			res.json({
				speech: "Seems like some problem occured. Speak again.",
				displayText: "Seems like some problem occured. Speak again."
			});
	} 
	console.log("mediator print: ");
	// console.log(result);
	return res;
}

function echo (value, res) {
	console.log("func Echo:");
	var speech = value && value.parameters && value.parameters.echoText ? value.parameters.echoText : "Seems like some problem occured. Speak again.";
	console.log (speech)
	return res.json({
		speech: speech,
		displayText: speech
	});
}

function location (value, res) {
	console.log("func Location:");

	return res.json({
		speech: "",
		messages: [{
			type: "basic_card",
			platform: "google",
			title: "Tambien location",
			subtitle: "Tambien",
			formattedText: "Location to Tambien",
			image: {
				url: "https://picsum.photos/200/300"
			},
			buttons: [{
				title: "Go to maps",
				openUrlAction: {
					url: "https://www.google.com/"
				}
			}]
		}]
	});
}


module.exports = router;