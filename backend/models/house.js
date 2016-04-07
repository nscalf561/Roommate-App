var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;


var HouseSchema = new Schema ({
	name: String, 
	address: String,
	chores: [{
		task: String,
		isCompleted: Boolean,
		completedAt: { type: Date, default: new Date() },
		upvotes: Number,
		completedBy: String,
		upvotedBy: [String],
		comments: [{
			content: String,
			author: String,
			createdAt: { type: Date, default: new Date() }
		}]
	}],
	announcements: [{
		content: String,
		userName: String,
		userId: String,
		createdAt: { type: Date, default: new Date() }
	}],
	supplies: [{
		item: String,
		createdByName: String,
		createdById: String,
		createdAt: { type: Date, default: new Date() },
		purchasedByName: String,
		purchasedById: String,
		purchasedOn: { type: Date }
	}],
	completedChores: [{
		task: String,
		completedAt: { type: Date, default: new Date() },
		completedByName: String,
		completedById: String
	}]
});


var House = mongoose.model('House', HouseSchema);
module.exports = House;