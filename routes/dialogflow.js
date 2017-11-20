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
    "conversationToken": "",
    "expectUserResponse": true,
    "expectedInputs": [
        {
            "inputPrompt": {
                "richInitialPrompt": {
                    "items": [
                        {
                            "simpleResponse": {
                                "textToSpeech": "Math and prime numbers it is!"
                            }
                        },
                        {
                            "basicCard": {
                                "title": "Math & prime numbers",
                                "formattedText": "42 is an even composite number. It\n    is composed of three distinct prime numbers multiplied together. It\n    has a total of eight divisors. 42 is an abundant number, because the\n    sum of its proper divisors 54 is greater than itself. To count from\n    1 to 42 would take you about twenty-one…",
                                "image": {
                                    "url": "https://example.google.com/42.png",
                                    "accessibilityText": "Image alternate text"
                                },
                                "buttons": [
                                    {
                                        "title": "Read more",
                                        "openUrlAction": {
                                            "url": "https://example.google.com/mathandprimes"
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "suggestions": []
                }
            },
            "possibleIntents": [
                {
                    "intent": "actions.intent.TEXT"
                }
            ]
        }
    ]
});
}


module.exports = router;