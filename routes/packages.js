const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// POST /api/packages - REQ-1: Log a new package
router.post('/api/packages', async (req, res) => {
  try {
    const { trackingNumber, recipientName, carrier } = req.body;

    // Validate required fields
    if (!trackingNumber || !recipientName || !carrier) {
      return res.status(400).json({
        error: 'Validation Error: trackingNumber, recipientName, and carrier are required.'
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
