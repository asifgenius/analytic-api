const { model } = require('mongoose');
const ShopifyCustomer = model('ShopifyCustomer');

exports.getNewCustomersOverTime = async (interval) => {
	  if (!['daily', 'monthly', 'quarterly', 'yearly'].includes(interval)) {
        throw new Error('Invalid interval. Allowed values: daily, monthly, quarterly, yearly.');
    }

    const pipeline = [
        {
            $addFields: {
                created_at_date: {
                    $cond: {
                        if: { $eq: [{ $type: '$created_at' }, 'string'] },
                        then: { $dateFromString: { dateString: '$created_at' } },
                        else: '$created_at'
                    }
                }
            }
        },
        {
            $project: {
                created_at_date: 1,
                interval: {
                    $switch: {
                        branches: [
                            {
                                case: { $eq: [interval, 'daily'] },
                                then: { $dateToString: { format: "%Y-%m-%d", date: "$created_at_date" } }
                            },
                            {
                                case: { $eq: [interval, 'monthly'] },
                                then: { $dateToString: { format: "%Y-%m", date: "$created_at_date" } }
                            },
                            {
                                case: { $eq: [interval, 'quarterly'] },
                                then: {
                                    $concat: [
                                        { $dateToString: { format: "%Y", date: "$created_at_date" } },
                                        "-0",
                                        { $ceil: { $divide: [{ $month: "$created_at_date" }, 3] } }
                                    ]
                                }
                            },
                            {
                                case: { $eq: [interval, 'yearly'] },
                                then: { $dateToString: { format: "%Y", date: "$created_at_date" } }
                            }
                        ],
                        default: "Invalid interval"
                    }
                }
            }
        },
        {
            $group: {
                _id: "$interval",
                customerCount: { $sum: 1 } 
            }
        },
        {
            $sort: { _id: 1 }
        }
    ];

    try {
        const result = await ShopifyCustomer.aggregate(pipeline);
        return result;
    } catch (error) {
        throw new Error(`Error fetching new customers: ${error.message}`);
    }

  
};

exports.getGeographicalDistribution = async () => {
	return await ShopifyCustomer.aggregate([
		{
			$group: {
				_id: "$default_address.city",
				customersCount: { $sum: 1 }
			}
		},
		{ $sort: { customersCount: -1 } }
	]);
};
