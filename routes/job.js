const express = require('express')
const { getAllJob, createJob, updateJob, DeleteJob, getJob } = require('../controller/job')
const router = express.Router()


router.get('/',getAllJob)
router.get('/:id',getJob)
router.post('/',createJob)
router.put('/:id',updateJob)
router.delete('/:id',DeleteJob)

module.exports = router