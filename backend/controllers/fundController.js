const Fund = require('../models/Fund');

// Get all funds
exports.getFunds = async (req, res) => {
    try {
        const funds = await Fund.find().sort({ date: -1 });
        res.json(funds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new fund
exports.createFund = async (req, res) => {
    const fund = new Fund({
        amount: req.body.amount
    });

    try {
        const newFund = await fund.save();
        res.status(201).json(newFund);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a fund
exports.updateFund = async (req, res) => {
    try {
        const updatedFund = await Fund.findByIdAndUpdate(
            req.params.id,
            { amount: req.body.amount },
            { new: true }
        );
        res.json(updatedFund);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a fund
exports.deleteFund = async (req, res) => {
    try {
        await Fund.findByIdAndDelete(req.params.id);
        res.json({ message: 'Fund deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};