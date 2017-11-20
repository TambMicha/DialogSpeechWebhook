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

	var speech = mediator(req.body.result);

	// var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem occured. Speak again."
	console.log("Res: ");
	console.log (res);
	return res.json({
		speech: speech,
		displayText: speech
	});
});

function mediator (res) {
	var result = "";

	switch(res.metadata.intentName) {
		case "Echo":
			result = echo(res);
			break;
		default:
			result = "Seems like some problem occured. Speak again.";
	} 

	return result;
}

function echo (res) {
	console.log("func Echo:");
	var speech = res && res.parameters && res.parameters.echoText ? res.parameters.echoText : "Seems like some problem occured. Speak again.";
	console.log (speech)
	return speech;
}

module.exports = router;