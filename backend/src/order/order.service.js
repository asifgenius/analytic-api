const { model } = require('mongoose');
const ShopifyOrder = model('ShopifyOrder');

function _getSalesAnalysisByInterval(interval) {
	let groupStage = {};

	switch (interval) {
		case 'daily':
			groupStage = {
				_id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
				totalSales: { $sum: { $round: [{ $toDouble: "$total_price" }, 2] } }
			};
			break;
		case 'monthly':
			groupStage = {
				_id: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
				totalSales: { $sum: { $round: [{ $toDouble: "$total_price" }, 2] } }
			};
			break;
		case 'quarterly':
			groupStage = {
				_id: {
					$concat: [
						{ $toString: { $year: "$created_at" } },
						"-0",
						{
							$toString: {
								$ceil: {
									$divide: [{ $month: "$created_at" }, 3]
								}
							}
						}
					]
				},
				totalSales: {
					$sum: {
						$round: [{ $toDouble: "$total_price" }, 2]
					}
				}
			};
			break;

		case 'yearly':
			groupStage = {
				_id: { $dateToString: { format: "%Y", date: "$created_at" } },
				totalSales: { $sum: { $round: [{ $toDouble: "$total_price" }, 2] } }
			};
			break;
		default:
			throw new Error('Invalid interval');
	}

	return ShopifyOrder.aggregate([
		{ $match: { financial_status: 'paid' } },
		{ $addFields: { created_at: { $dateFromString: { dateString: "$created_at" } } } },
		{ $group: groupStage },
		{ $sort: { _id: 1 } }
	]);
}

function _calculateGrowthRate(salesData) {
	let growthRates = [];

	for (let i = 1; i < salesData.length; i++) {
		const previous = salesData[i - 1].totalSales;
		const current = salesData[i].totalSales;

		let growthRate = 0;

		if (previous > 0) {
			growthRate = ((current - previous) / previous) * 100;
		} else if (previous === 0 && current > 0) {
			growthRate = 100;
		} else if (current === 0) {
			growthRate = 0;
		}
		growthRates.push({
			period: salesData[i]._id,
			totalSales: current > 0 ? current : 0,
			growthRate: growthRate.toFixed(2) + '%'
		});
	}


	return growthRates;
}

exports.getTotalSalesOverTime = async (interval) => {
	const result = await _getSalesAnalysisByInterval(interval)
	return result;
};

exports.getSalesGrowthRate = async (interval) => {
	const result = await _getSalesAnalysisByInterval(interval)
	const growthRates = _calculateGrowthRate(result);
	return growthRates;
};

exports.getRepeatCustomers = async (interval) => {
	try {
		let groupStage = {};

		switch (interval) {
			case 'daily':
				groupStage = {
					_id: {
						$dateToString: {
							format: "%Y-%m-%d",
							date: { $toDate: "$created_at" }
						}
					},
					customerEmails: { $addToSet: "$customer.email" } 
				};
				break;
			case 'monthly':
				groupStage = {
					_id: {
						$dateToString: {
							format: "%Y-%m",
							date: { $toDate: "$created_at" }
						}
					},
					customerEmails: { $addToSet: "$customer.email" }
				};
				break;
			case 'quarterly':
				groupStage = {
					_id: {
						$concat: [
							{ $substr: [{ $toDate: "$created_at" }, 0, 4] },
							"-Q",
							{ $toString: { $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] } } }
						]
					},
					customerEmails: { $addToSet: "$customer.email" }
				};
				break;
			case 'yearly':
				groupStage = {
					_id: {
						$dateToString: {
							format: "%Y",
							date: { $toDate: "$created_at" }
						}
					},
					customerEmails: { $addToSet: "$customer.email" }
				};
				break;
			default:
				throw new Error('Invalid interval. Allowed values: daily, monthly, quarterly, yearly.');
		}

		const repeatCustomers = await ShopifyOrder.aggregate([
			{
				$match: {
					financial_status: "paid"
				}
			},
			{ $group: groupStage },
			{
				$project: {
					_id: 1,
					customerCount: { $size: "$customerEmails" }
				}
			},
			{ $sort: { _id: 1 } }
		]);

		return repeatCustomers;
	} catch (error) {
		throw new Error(`Error fetching repeat customers: ${error.message}`);
	}
};

exports.getCustomerLifetimeValueByCohort = async () => {
	try {
		return ShopifyOrder.aggregate([
			{
				$match: {
					financial_status: "paid"
				}
			},
			{
				$addFields: {
					created_at: { $dateFromString: { dateString: "$created_at" } },
				},
			},
			{
				$group: {
					_id: {
						customerEmail: "$customer.email",
						cohortMonth: { $dateToString: { format: "%Y-%m", date: "$created_at" } }
					},
					totalSpent: { $sum: { $toDouble: "$total_price" } },
				},
			},
			{
				$group: {
					_id: "$_id.cohortMonth",
					customers: { $addToSet: "$_id.customerEmail" },
					totalRevenue: { $sum: "$totalSpent" },
					avgLifetimeValue: { $avg: "$totalSpent" },
				},
			},
			{
				$addFields: {
					customerCount: { $size: "$customers" },
				},
			},
			{
				$project: {
					_id: 0,
					cohortMonth: "$_id",
					customerCount: 1,
					totalRevenue: 1,
					avgLifetimeValue: 1,
				},
			},
			{
				$sort: { cohortMonth: 1 },
			},
		]);
	} catch (error) {
		console.error("Error calculating lifetime value by cohorts:", error);
		throw error;
	}
}
