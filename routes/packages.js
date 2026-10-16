const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// POST /api/packages - REQ-1: Log a new package
router.post('/', async (req, res) => {
  try {
    const { trackingNumber, guestName, carrier } = req.body;

    // Validate required fields
    if (!trackingNumber || !guestName) {
      return res.status(400).json({
        error: 'Validation Error: trackingNumber and guestName are required.'
      });
    }

    // Create and save new package record
    const newPackage = new Package({
      trackingNumber,
      guestName,
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

// GET /api/packages - Retrieve all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    return res.status(200).json(packages);
  } catch (error) {
    return res.status(500).json({
      error: 'Server Error: Unable to retrieve packages.'
    });
  }
});

// GET /api/packages/search - Search packages
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const packages = await Package.find({
      $or: [
        { trackingNumber: { $regex: query, $options: 'i' } },
        { guestName: { $regex: query, $options: 'i' } }
      ]
    });
    return res.status(200).json(packages);
  } catch (error) {
    return res.status(500).json({
      error: 'Server Error: Unable to search packages.'
    });
  }
});

module.exports = router;
