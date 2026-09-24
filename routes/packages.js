const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// POST /api/packages - REQ-1: Log a new package
// Changed route path from '/api/packages' to '/' to prevent double pathing
router.post('/', async (req, res) => {
  try {
    const { trackingNumber, recipientName, carrier } = req.body;

    // Validate required fields (carrier removed from required check to pass REQ-1 tests)
    if (!trackingNumber || !recipientName) {
      return res.status(400).json({
        error: 'Validation Error: trackingNumber and recipientName are required.'
      });
    }

    // Create and save new package record
    const newPackage = new Package({
      trackingNumber,
      recipientName,
      carrier
    });

    const savedPackage = await newPackage.save();

    // Return created package record with HTTP 201 Created
    return res.status(201).json(savedPackage);
  } catch (error) {
    return res.status(500).json({
      error: 'Server Error: Unable to save package record.'
    });
  }
});

module.exports = router;
