const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router()


// GET
router.get('/', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(error => {
      res.status(500).json({
          message: 'Could not find this account'
        })
    })
})

router.post('/', (req, res) => {
  const { name, budget } = req.body

  if(!name || !budget) {
    res.status(400).json({
      message: 'Name or Budget missing!'
    })
   return
  }

  db('accounts').insert(req.body, 'id')
  .then(count => {
     res.status(200).json(count)
  })
  .catch(error => {
    res.status(500).json({
        message: 'Account missing!'
    })
  })
})

router.put('/:id', (req, res) => {
  const changes = req.body

  db('accounts')
  .where('id', '=', req.params.id)
  .update(changes)

  .then(count => {
    if(count > 0) {
      res.status(200).json(count)
    } else {
      res.status(404).json({ 
          message: 'ID seems to be incorrect' 
        })
    }
  })
  .catch(error => {
    res.status(500).json({
        message: 'Could not update!'
    })
  })
})

router.delete('/:id', (req, res) => {

 db('accounts')
 .where('id', '=', req.params.id)
 .del()

 .then(count => {
    if(count > 0) {
      res.status(200).json(count)
    } else {
      res.status(404).json({
          message: 'ID doesnt seem to exist'
        })
    }
 })
 .catch(error => {
   res.status(500).json({
       message: 'Could not delete'
    })
 })
})




module.exports = router 