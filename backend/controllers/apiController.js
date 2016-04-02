var apiController = {

	index: function (req, res) {
		res.json({
			message: "made it to api"
		});
	}
};

module.exports = apiController;