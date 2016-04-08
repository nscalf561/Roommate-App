var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;


var HouseSchema = new Schema ({
	name: String, 
	address: String,
	chores: [{
		task: String,
		completedAt: { type: Date, default: new Date() },
		upvotes: Number,
		addedBy: String,
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
	}],
	completedChores: [{
		task: String,
		completedAt: { type: Date, default: new Date() },
		completedByName: String,
		completedById: String
	}],
	purchasedSupplies: [{
		item: String,
		purchasedByName: String,
		purchaseById: String,
		purchasedOn: {type: Date}
	}]
});


var House = mongoose.model('House', HouseSchema);
module.exports = House;