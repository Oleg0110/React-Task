const { Router } = require("express")
const Column = require("../models/dashboard-column")
const Task = require("../models/dashboard-task")
const User = require("../models/user")
const router = Router()
const auth = require("../middleware/auth.middleware");

const column = []

router.get("/column/:projectId", auth, async (req, res) => {
   try {
      const { projectId } = req.params

      const result = await Column.find({ projectOwner: projectId })

      res.status(200).json(result)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.get("/task/:columnId", auth, async (req, res) => {
   try {
      const { columnId } = req.params

      const task = await Task.find({ columnOwner: columnId })

      res.status(200).json(task.sort((a, b) => a.index-b.index ))

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/column", auth, async (req, res) => {
   try {
      const { title, projectId } = req.body

      if (!title && !projectId) {
         return res.status(400).json({ error: "invalid input" })
      }

      const column = new Column({
         title,
         projectOwner: projectId
      })
      await column.save()

      res.status(201).json(column)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/column", auth, async (req, res) => {
   try {
      const { title, id } = req.body

      if (!title) {
         return res.status(400).json({ error: "invalid input" })
      }

      const changedColumn = await Column.findOneAndUpdate(
         { _id: id },
         { $set: { title } },
         { new: true }
      )
      
      res.status(200).json(changedColumn.title)

      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.delete("/column/:id", auth, async (req, res) => {
   try {
      const { id } = req.params
      if (!id) {
         return res.status(400).json({ error: "invalid input" })
      }

      await Task.deleteMany({ columnOwner: id })

      const deletedColumn = await Column.findOneAndDelete(
         { _id: id }
      )

      res.status(200).json(deletedColumn)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/task-position", async (req, res) => {
   try {
      const { result } = req.body

      if (!result.destination) return;
      
      if(result.source.droppableId === result.destination.droppableId){

        if(result.source.index < result.destination.index){
          const sourceTask = await Task.findOne({columnOwner: result.source.droppableId, index:result.source.index})
          
          await Task.updateMany(
            { columnOwner: result.source.droppableId, index: {$lte: result.destination.index, $gt: result.source.index} },
            {$inc : { index : -1}}
            )
  
          await Task.findOneAndUpdate({_id: sourceTask._id},
            {$set:{index: result.destination.index}})
            
        }

        if(result.source.index > result.destination.index){
          const sourceTask = await Task.findOne({columnOwner: result.source.droppableId, index:result.source.index})
          
          await Task.updateMany(
            { columnOwner: result.source.droppableId, index: {$gte: result.destination.index, $lt: result.source.index} },
            {$inc : { index : +1}}
            )
  
           await Task.findOneAndUpdate({_id: sourceTask._id},
            {$set:{index: result.destination.index}})
            
  
        }

        const sortTask = await Task.find({columnOwner: result.source.droppableId})

        const sortResult = sortTask.sort((a, b) => a.index-b.index )
        
        res.status(200).json(sortResult)
        return
        }
        

      if(result.source.droppableId !== result.destination.droppableId){

        await Task.updateMany(
            { columnOwner: result.destination.droppableId, index: {$gte: result.destination.index} },
            {$inc : { index : 1}}
            )
          
        await Task.findOneAndUpdate({columnOwner: result.source.droppableId, index:result.source.index},
          {$set:{index: result.destination.index, columnOwner: result.destination.droppableId}})

        await Task.updateMany(
          { columnOwner: result.source.droppableId, index: {$gt: result.source.index} },
          {$inc : { index : -1}}
          )

          res.status(200).json('successfully')
        }

      return
   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/task", auth, async (req, res) => {
   try {
      const { text, id, projectId, indexNumber } = req.body

      if (!text && !id && !projectId && !indexNumber) {
         return res.status(400).json({ error: "invalid input" })
      }

      const task = new Task({
         text,
         columnOwner: id,
         projectOwner: projectId,
         index: indexNumber
      })

      await task.save()

      res.status(201).json(task)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/task", auth, async (req, res) => {
   try {
      const { text, id } = req.body

      if (!text && !id) {
         return res.status(400).json({ error: "invalid input" })
      }

      const changedTask = await Task.findOneAndUpdate(
         { _id: id },
         { $set: { text } },
         { new: true }
      )

      res.status(200).json(changedTask.text)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.delete("/task/:id/:columnId", auth, async (req, res) => {
   try {
      const { id,columnId } = req.params

      if (!id) {
         return res.status(400).json({ error: "invalid input" })
      }

      const foundDeletedTask = await Task.findOne(
         { _id: id }
      )
      
      await Task.updateMany(
        { columnOwner: columnId, index: {$gt: foundDeletedTask.index} },
        {$inc : { index : -1}}
        )

         await Task.findOneAndDelete(
           { _id: id }
        )
        
        const foundTask = await Task.find(
          { columnOwner: columnId }
          )

      res.status(200).json(foundTask)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/asignee-user", auth, async (req, res) => {
  try {
      const { userId,taskId,projectId } = req.body
      
      if (!userId && !taskId && !projectId) {
        return res.status(400).json({ error: "invalid input" })
     }

     await User.findOneAndUpdate(
      {_id:userId},
      {$addToSet:{notification:[{projectId,text:'notification-3'}]}}
     )

     const asigneeUser = await User.findOne({_id:userId})
     
     const updateTask = await Task.findOneAndUpdate(
        {_id:taskId},
        {$set:{asigneeUser:asigneeUser.email, asigneeUserId:userId}},
        {new:true}
     )

      res.status(201).json(updateTask)
      return

  } catch (error) {
     res.status(500).json({ error: "internal server error" })
  }
})

router.post("/no-asignee", auth, async (req, res) => {
  try {
      const { noAsignee, taskId, projectId, userId } = req.body
      
      if (!noAsignee && !taskId && !projectId && !userId) {
        return res.status(400).json({ error: "invalid input" })
     }

     await User.findOneAndUpdate(
      {_id:userId},
      {$addToSet:{notification:[{projectId,text:'notification-4'}]}}
     )

     const deletedAsignee = await Task.findOneAndUpdate(
        {_id:taskId},
        {$set:{asigneeUser:noAsignee, asigneeUserId: noAsignee}},
        {new:true}
     )

      res.status(201).json(deletedAsignee)
      return

  } catch (error) {
     res.status(500).json({ error: "internal server error" })
  }
})

module.exports = router;