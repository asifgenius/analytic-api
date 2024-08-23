const { Schema, model } = require('mongoose')

const customerSchema = new Schema({
	admin_graphql_api_id: String,
	created_at: String,
	currency: String,
	default_address: {
		properties: {
			id: Number,
			customer_id: Number,
			first_name: String,
			last_name: String,
			company: String,
			address1: String,
			address2: String,
			city: String,
			province: String,
			country: String,
			zip: String,
			phone: String,
			name: String,
			province_code: String,
			country_code: String,
			country_name: String,
			default: Boolean,
			email: String
		}
	},
	email_marketing_consent: {
		state: String,
		opt_in_level: String,
		consent_updated_at: Date,
		properties: {
			state: String,
			opt_in_level: String,
			consent_updated_at: String
		}
	},
	first_name: String,
	id: Number,
	last_name: String,
	last_order_id: Number,
	last_order_name: String,
	multipass_identifier: String,
	note: String,
	orders_count: Number,
	phone: String,
	sms_marketing_consent: String,
	state: String,
	tags: String,
	tax_exempt: Boolean,
	tax_exemptions: Array,
	total_spent: String,
	updated_at: String,
	verified_email: Boolean
}, { timestamps: true });

model("ShopifyCustomer", customerSchema, "shopifyCustomers");
