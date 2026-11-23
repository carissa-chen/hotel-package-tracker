const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// POST /api/packages - REQ-1: Log a new package
router.post('/', async (req, res) => {
  try {
    const { trackingNumber, guestName, carrier } = req.body;

    // Validate required fields: each must be present and not blank
    const isBlank = (value) => !value || String(value).trim() === '';
    if (isBlank(trackingNumber) || isBlank(guestName) || isBlank(carrier)) {
      return res.status(400).json({
        error: 'Validation Error: trackingNumber, guestName, and carrier are required.'
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
    const query = String(req.query.q || '').trim();

    // Validate the search term: it must be present and not blank
    if (!query) {
      return res.status(400).json({
        error: 'Validation Error: a search term (q) is required.'
      });
    }

    // Escape special characters so the term is matched as plain text
    const pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const packages = await Package.find({
      $or: [
        { trackingNumber: { $regex: pattern, $options: 'i' } },
        { guestName: { $regex: pattern, $options: 'i' } }
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
