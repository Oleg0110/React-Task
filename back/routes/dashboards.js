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

      res.status(200).json(task)

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

      res.status(200).json(changedColumn)
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

      const source = column.find(found => found.id === result.source.droppableId)
      const destination = column.find(found => found.id === result.destination.droppableId)

      const [reorderedItem] = source.tasks.splice(result.source.index, 1);
      destination.tasks.splice(result.destination.index, 0, reorderedItem);

      res.status(200).json(column)
      return
   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/task", auth, async (req, res) => {
   try {
      const { text, id, projectId } = req.body

      if (!text && !id && !projectId) {
         return res.status(400).json({ error: "invalid input" })
      }

      const task = new Task({
         text,
         columnOwner: id,
         projectOwner: projectId,
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

      res.status(200).json(changedTask)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.delete("/task/:id", auth, async (req, res) => {
   try {
      const { id } = req.params

      if (!id) {
         return res.status(400).json({ error: "invalid input" })
      }

      const deletedTask = await Task.findOneAndDelete(
         { _id: id }
      )

      res.status(200).json(deletedTask)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/asignee-user", auth, async (req, res) => {
  try {
      const { id,taskId } = req.body
      
      if (!id && !taskId) {
        return res.status(400).json({ error: "invalid input" })
     }

     const asigneeUser = await User.findOne({_id:id})
     
      await Task.findOneAndUpdate(
        {_id:taskId},
        {$set:{asigneeUser:asigneeUser.email }}
     )


  
      res.status(201).json(asigneeUser.email)
      return

  } catch (error) {
     res.status(500).json({ error: "internal server error" })
  }
})

router.post("/no-asignee", auth, async (req, res) => {
  try {
      const { noAsignee,taskId } = req.body
      
      if (!noAsignee && !taskId) {
        return res.status(400).json({ error: "invalid input" })
     }

      await Task.findOneAndUpdate(
        {_id:taskId},
        {$set:{asigneeUser:noAsignee }}
     )

      res.status(201).json(noAsignee)
      return

  } catch (error) {
     res.status(500).json({ error: "internal server error" })
  }
})

module.exports = router;