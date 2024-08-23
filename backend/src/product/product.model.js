const { Schema, model, default: mongoose } = require('mongoose')

const productSchema = new Schema({
	admin_graphql_api_id: String,
	body_html: String,
	created_at: Date,
	handle: String,
	id: String,
	image: String,
	images: [String],
	options: [
		{
			id: String,
			product_id: String,
			name: String,
			position: Number,
			values: [String]
		}
	],
	product_type: String,
	published_at: Date,
	published_scope: String,
	status: String,
	tags: String,
	template_suffix: String,
	title: String,
	updated_at: Date,
	variants: [
		{
			id: String,
			product_id: String,
			title: String,
			price: Number,
			sku: String,
			position: Number,
			inventory_policy: String,
			compare_at_price: String,
			fulfillment_service: String,
			inventory_management: String,
			option1: String,
			option2: String,
			option3: String,
			created_at: Date,
			updated_at: Date,
			taxable: Boolean,
			barcode: String,
			grams: Number,
			weight: Number,
			weight_unit: String,
			inventory_item_id: String,
			inventory_quantity: Number,
			old_inventory_quantity: Number,
			requires_shipping: Boolean,
			admin_graphql_api_id: String,
			image_id: String,
			vendor: String
		}
	]
}, { timestamps: true });

model("ShopifyProduct", productSchema, 'shopifyProducts');
