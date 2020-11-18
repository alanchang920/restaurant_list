const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants, css: 'index.css' }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  let keyword = req.query.keyword.trim()
  // find   
  Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
    .lean()
    .then(restaurants => {
      // exception
      if (!restaurants.length) {
        keyword = `你的收藏沒有"${keyword}"的相關項目唷！`
      }
      // do the searching
      res.render('index', { restaurants, keyword, css: 'index.css' })
    })
    .catch(error => console.log(error))
})

module.exports = router