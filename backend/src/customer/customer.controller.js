const customerService = require('./customer.service');

exports.getNewCustomersOverTime = async (req, res, next) => {
    const { interval } = req.query;

    if (!interval) {
        return res.status(400).json({ message: 'Interval parameter is required.' });
    }

    try {
        const newCustomers = await customerService.getNewCustomersOverTime(interval);
        res.status(200).json(newCustomers);
    } catch (error) {
        res.status(500).json({ message: `Error fetching new customers: ${error.message}` });
    }
};

exports.getGeographicalDistribution = async (req, res, next) => {
    try {
        const data = await customerService.getGeographicalDistribution();
        return res.status(201).json({
            data,
            success: true
        })
    } catch (error) {
        return next(error)
    }
};
