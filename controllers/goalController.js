const asyncHandler = require("express-async-handler")

const Goal = require('../models/goalModel')

// @desc Get goals
// @route Get /api/goals
// @access Private
const getGoal = asyncHandler(async (req,res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
    //res.status(200).json({message: 'Get goals'})
})

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req,res) => {
   if (!req.body.text){
    //res.status(400).json({message: 'Please ass a text field'})
    res.status(400)
    throw new Error('Please enter a text field')
   }
   const goal = await Goal.create({
    text: req.body.text,
   })
   res.status(200).json(goal)
    //res.status(200).json({message: 'Sets goals'})
})

// @desc Update goals
// @route PUT /api/goal/:id
// @access Private
const updateGoal = asyncHandler(async (req,res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })
res.status(200).json(updateGoal)
    //res.status(200).json({message: `update goals ${req.params.id}`})
})

// @desc DELETE goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal =asyncHandler( async (req,res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    await goal.remove()
    res.status(200).json({id: req.params.id})
    // what i use to delete
    //const deleteGoal = await Goal.findByIdAndRemove(req.params.id)
    //res.status(200).json(deleteGoal)
    //res.status(200).json({message: `delete goals ${req.params.id}`})
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}