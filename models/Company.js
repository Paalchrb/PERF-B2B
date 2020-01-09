const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
	orgNum: {
		type: String,
		required: true,
		unique: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	address: {
		street: {
			type: String,
			required: true,
		},
		zipCode: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		}
	},
	companyContacts: {
		companyEmail: {
			type: String,
			required: true,
		},
		companyPhone: {
			type: String,
			required: true,
		} 
	},
	accountNumber: {
		type: String
	},
	website: {
		type: String
	},
	aboutUs: {
		type: String
	},
	social: {
		youtube: {
			type: String
		},
		twitter: {
			type: String
		},
		facebook: {
			type: String
		},
		linkedin: {
			type: String
		},
		instagram: {
			type: String
		}
<<<<<<< HEAD
	}
=======
	},
	products: [
		{
			createdAt: {
				type: Date,
				required: true,
				default: Date.now
			},
			productName: {
				type: String,
				required: true
			},
			productDescription: {
				type: String
			},
			productImage: {
				type: String
			},
			productPrice: {
				type: Number,
				required: true
			},
			productVat: {
				type: Number,
				required: true
			},
			active: {
				type: Boolean,
				required: true,
				default: true
			},
			productSubhead: {
				type: String
			},
			productInfoUpload:{
				type: String
			},
			productExternalUrl: {
				type: String
			}
		}
	]
>>>>>>> 7d4faa5a33123758d875e3c065afe73184285f3b
});

module.exports = Company = mongoose.model('Company', CompanySchema);



