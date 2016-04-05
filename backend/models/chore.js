var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;


var ChoreSchema = new Schema ({
	task: String,
	isCompleted: Boolean,
	completedAt: { type: Date, default: new Date()},
	upvotes: Number,
	completedBy: String,
	comments: [String]
});


var Chore = mongoose.model('Chore', ChoreSchema);
module.exports = Chore;