const express = require('express')
const holidays = express.Router()

const Holiday = require('../models/holidays.js')

// INDEX
holidays.get('/', async (req, res) => {
  try {
    const holidays = await Holiday.find()
    res.status(200).json(holidays)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// CREATE
holidays.post('/', async (req, res) => {
  try {
    const newHoliday = await Holiday.create(req.body)
    res.status(200).json(newHoliday)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// DELETE
holidays.delete('/:id', async (req, res) => {
  try {
    const deleteHoliday = await Holiday.findByIdAndRemove(req.params.id)
    res.status(200).json(deleteHoliday)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// EDIT
holidays.put('/:id', async (req, res) => {
  try {
    const updateHoliday = await Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updateHoliday)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = holidays
