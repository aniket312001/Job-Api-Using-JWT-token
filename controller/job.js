const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors")
const Job = require("../models/Job")

const getAllJob = async (req,res)=>{

    const jobs = await Job.find({createby:req.user.userId}).sort('createdAt')
    res.send({jobs,count:jobs.length})
}

const getJob = async (req,res)=>{
    
    try{
        const job = await Job.findById(req.params.id)
        res.send(job)
    }
    catch (e){
        throw new NotFoundError("Job id is not valid")
    }
  
}


const createJob = async (req,res)=>{
    req.body.createby = req.user.userId
    const job = await Job.create(req.body)
    
    res.status(StatusCodes.OK).json(job)
}


const updateJob = async (req,res)=>{
    req.body.createby = req.user.userId
    const job = await Job.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

    res.status(StatusCodes.OK).json(job)
}

const DeleteJob = async (req,res)=>{
    await Job.findByIdAndDelete(req.params.id)
    res.send("Job Deleted Successfully ...!")
}


module.exports =  {
    createJob,
    getJob,
    getAllJob,
    updateJob,
    DeleteJob
}