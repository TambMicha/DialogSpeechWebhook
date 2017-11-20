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

	res = mediator(req.body.result);

	// var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem occured. Speak again."
	return res
});

function mediator (res) {
	var result.json({
		speech: "",
		displayText: ""
	});

	switch(res.metadata.intentName) {
		case "Echo":
			result = echo(res);
			break;
		case "":
			result = location(res);
			break;
		default:
			result.json({
				speech: "Seems like some problem occured. Speak again.",
				displayText: "Seems like some problem occured. Speak again."
			});
	} 

	return result;
}

function echo (res) {
	console.log("func Echo:");
	var speech = res && res.parameters && res.parameters.echoText ? res.parameters.echoText : "Seems like some problem occured. Speak again.";
	console.log (speech)
	var result.json({
		speech: speech,
		displayText: speech
	})
	return result;
}

function location (res) {
	console.log("func Location:");

	var result.json({
		conversationToken: "",
		expectUserResponse: true,
		expectedInputs: [
		{
			inputPrompt: {
				richInitialPrompt: {
					items: [
					{
						simpleResponse: {
							textToSpeech: "Directions to Tambien"
						}
					}, {
						basicCard: {
							title: "Directions to...",
							formattedText: "",
							image: {
								url: "https://maps.googleapis.com/maps/api/staticmap?center=51.580042,5.064080&markers=51.580042,5.064080&zoom=14&size=400x400",
								accessibilityText: ""
							},
							buttons: [
							{
								title: "Go to Google Maps",
								openUrlAction: {
									url: "https://www.google.nl/maps/dir//Tambien,+Kraaivenstraat+23,+5048+AB+Tilburg/@51.58005,5.061869,17z/data=!4m16!1m6!3m5!1s0x47c6be1737a1ea05:0x45c6ca274a4b443c!2sTambien!8m2!3d51.58005!4d5.064063!4m8!1m0!1m5!1m1!1s0x47c6be1737a1ea05:0x45c6ca274a4b443c!2m2!1d5.064063!2d51.58005!3e0?hl=en"
								}
							}]
						}
					}],
					suggestions: []
				}
			}
		}]
	});

	return result;
}

function card (values) {
	var card = 
	{
	    "conversationToken": "",
	    "expectUserResponse": true,
	    "expectedInputs": 
	    [
	        {
	            "inputPrompt": 
	            {
	                "richInitialPrompt": 
	                {
	                    "items": 
	                    [
	                        {
	                            "simpleResponse": 
	                            {
	                                "textToSpeech": "Here you have the directions to Tambien"
	                            }
	                        },
	                        {
	                            "basicCard": 
	                            {
	                                "title": "Directions to Tambien",
	                                "formattedText": "42 is an even composite number. It\n    is composed of three distinct prime numbers multiplied together. It\n    has a total of eight divisors. 42 is an abundant number, because the\n    sum of its proper divisors 54 is greater than itself. To count from\n    1 to 42 would take you about twenty-one…",
	                                "image": 
	                                {
	                                    "url": "https://maps.googleapis.com/maps/api/staticmap?center=51.580042,5.064080&markers=51.580042,5.064080&zoom=14&size=400x400",
	                                    "accessibilityText": "Image alternate text"
	                                },
	                                "buttons": 
	                                [
	                                    {
	                                        "title": "Go to maps",
	                                        "openUrlAction": 
	                                        {
	                                            "url": "https://www.google.nl/maps/dir//Tambien,+Kraaivenstraat+23,+5048+AB+Tilburg/@51.58005,5.061869,17z/data=!4m16!1m6!3m5!1s0x47c6be1737a1ea05:0x45c6ca274a4b443c!2sTambien!8m2!3d51.58005!4d5.064063!4m8!1m0!1m5!1m1!1s0x47c6be1737a1ea05:0x45c6ca274a4b443c!2m2!1d5.064063!2d51.58005!3e0?hl=en"
	                                        }
	                                    }
	                                ]
	                            }
	                        }
	                    ],
	                    "suggestions": []
	                }
	            },
	            "possibleIntents": 
	            [
	                {
	                    "intent": "actions.intent.TEXT"
	                }
	            ]
	        }
	    ]
	}
}

module.exports = router;