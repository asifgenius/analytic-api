const { Schema, model, default: mongoose } = require('mongoose')

const orderSchema = new Schema({
	id: Number,
	email: String,
	closed_at: Date,
	created_at: Date,
	updated_at: Date,
	number: Number,
	note: String,
	token: String,
	gateway: String,
	test: Boolean,
	total_price: String,
	subtotal_price: String,
	total_weight: Number,
	total_tax: String,
	taxes_included: Boolean,
	currency: String,
	financial_status: String,
	confirmed: Boolean,
	total_discounts: String,
	buyer_accepts_marketing: Boolean,
	name: String,
	referring_site: String,
	landing_site: String,
	cancelled_at: Date,
	cancel_reason: String,
	user_id: Number,
	location_id: Number,
	source_identifier: String,
	source_url: String,
	device_id: Number,
	phone: String,
	customer_locale: String,
	app_id: Number,
	browser_ip: String,
	landing_site_ref: String,
	order_number: Number,
  
	total_line_items_price_set: {
	  shop_money: {
		amount: String,
		currency_code: String
	  },
	  presentment_money: {
		amount: String,
		currency_code: String
	  }
	},
  
	total_discounts_set: {
	  shop_money: {
		amount: String,
		currency_code: String
	  },
	  presentment_money: {
		amount: String,
		currency_code: String
	  }
	},
  
	total_shipping_price_set: {
	  shop_money: {
		amount: String,
		currency_code: String
	  },
	  presentment_money: {
		amount: String,
		currency_code: String
	  }
	},
  
	subtotal_price_set: {
	  shop_money: {
		amount: String,
		currency_code: String
	  },
	  presentment_money: {
		amount: String,
		currency_code: String
	  }
	},
  
	total_price_set: {
	  shop_money: {
		amount: String,
		currency_code: String
	  },
	  presentment_money: {
		amount: String,
		currency_code: String
	  }
	},
  
	total_tax_set: {
	  shop_money: {
		amount: String,
		currency_code: String
	  },
	  presentment_money: {
		amount: String,
		currency_code: String
	  }
	},
  
	customer: {
	  id: Number,
	  email: String,
	  first_name: String,
	  last_name: String,
	  orders_count: Number,
	  state: String,
	  total_spent: String,
	  last_order_id: Number,
	  note: String,
	  verified_email: Boolean,
	  multipass_identifier: String,
	  tax_exempt: Boolean,
	  phone: String,
	  tags: String,
	  last_order_name: String,
	  currency: String,
	  marketing_opt_in_level: String,
	  tax_exemptions: [String],
	  admin_graphql_api_id: String,
	  default_address: {
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
		province_code: String,
		country_code: String,
		country_name: String,
		default: Boolean
	  }
	}
  }, { timestamps: true });
  
model("ShopifyOrder", orderSchema, 'shopifyOrders');
