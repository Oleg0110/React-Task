const { Router } = require("express")
const List = require("../models/dashboard-list")
const Task = require("../models/dshboard-task")
const router = Router()

const lists = []

router.get("/list/:projectId", async (req, res) => {
   try {
      const { projectId } = req.params

      const result = await List.find({ projectOwner: projectId })

      res.status(200).json(result)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.get("/task/:listId", async (req, res) => {
   try {
      const { listId } = req.params

      const task = await Task.find({ listOwner: listId })

      res.status(200).json(task)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/list", async (req, res) => {
   try {
      const { title, projectId } = req.body

      if (!title && !projectId) {
         return res.status(400).json({ error: "invalid input" })
      }

      const list = new List({
         title,
         projectOwner: projectId
      })
      await list.save()

      res.status(201).json(list)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/list", async (req, res) => {
   try {
      const { title, id } = req.body

      if (!title) {
         return res.status(400).json({ error: "invalid input" })
      }

      const changedList = await List.findOneAndUpdate(
         { _id: id },
         { $set: { title } },
         { new: true }
      )

      res.status(200).json(changedList)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.delete("/list/:id", async (req, res) => {
   try {
      const { id } = req.params
      if (!id) {
         return res.status(400).json({ error: "invalid input" })
      }

      const deletedList = await List.findOneAndDelete(
         { _id: id }
      )

      res.status(200).json(deletedList)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/task-position", async (req, res) => {
   try {
      const { result } = req.body
      if (!result.destination) return;

      const source = lists.find(found => found.id === result.source.droppableId)
      const destination = lists.find(found => found.id === result.destination.droppableId)

      const [reorderedItem] = source.tasks.splice(result.source.index, 1);
      destination.tasks.splice(result.destination.index, 0, reorderedItem);

      res.status(200).json(lists)
      return
   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/task", async (req, res) => {
   try {
      const { text, id } = req.body

      if (!text && !id) {
         return res.status(400).json({ error: "invalid input" })
      }

      const task = new Task({
         text,
         listOwner: id
      })

      await task.save()

      res.status(201).json(task)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/task", async (req, res) => {
   try {
      const { text, id, listId } = req.body

      if (text, id, listId) {

         const changedTask = await Task.findOneAndUpdate(
            { _id: id },
            { $set: { text } },
            { new: true }
         )

         res.status(200).json(changedTask)
         return
      }

      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.delete("/task/:id", async (req, res) => {
   try {
      const { id } = req.params

      if (!id) {
         return res.status(400).json({ error: "invalid input" })
      }

      const deletedList = await Task.findOneAndDelete(
         { _id: id }
      )

      res.status(200).json(deletedList)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

module.exports = router;