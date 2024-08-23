const orderService = require('./order.service')

exports.getTotalSalesOverTime = async (req, res, next) => {
	const { interval } = req.query;
	
	try {
		const salesData = await orderService.getTotalSalesOverTime(interval);
		res.status(200).json(salesData);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getSalesGrowthRate = async (req, res, next) => {
	const { interval } = req.query;

	try {
		const salesData = await orderService.getSalesGrowthRate(interval);
		return res.status(200).json(salesData);
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message
		});
	}
}

exports.getRepeatCustomers = async (req, res, next) => {
	const { interval } = req.query;
	try {
		const repeatCustomers = await orderService.getRepeatCustomers(interval);
		res.json(repeatCustomers);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


exports.getCustomerLifetimeValueByCohort = async (req, res, next) => {
	try {
		const data = await orderService.getCustomerLifetimeValueByCohort();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
