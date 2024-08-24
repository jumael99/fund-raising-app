const Location = require('../models/Location');

exports.getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createLocation = async (req, res) => {
    console.log('Creating location with data:', req.body);
    const location = new Location({
        name: req.body.name
    });

    try {
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (err) {
        console.error('Error creating location:', err);
        res.status(400).json({ message: err.message });
    }
};

exports.updateLocation = async (req, res) => {
    try {
        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true, runValidators: true }
        );
        if (!updatedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(updatedLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteLocation = async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json({ message: 'Location deleted', deletedLocation });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};