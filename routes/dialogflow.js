var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Dialogflow' });
// });

router.post('/', function (req, res, next) {
	console.log("Req: ");
	console.log(req.body);
	var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem occured. Speak again."
	return res.json({
		speech: speech,
		displayText: speech
	});
});

router.post('/echo', function (req, res, next) {
	// var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem occured. Speak again."
	// return res.json({
	// 	speech: speech,
	// 	displayText: speech
	// });
});

module.exports = router;