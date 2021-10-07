const { Router } = require("express");
const router = Router();
const List = require("../models/dashboard-list")
const Task = require("../models/dshboard-task")
const Project = require("../models/project")
const auth = require("../middleware/auth.middleware");

const projects = []

router.get("/:id", auth, async (req, res) => {
   try {
      const { id } = req.params

      if (!id) {
         return res.status(400).json({ error: "invalid data" })
      }

      const projects = await Project.find({ userOwner: id })

      res.status(200).json(projects)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})


router.post("/", auth, async (req, res) => {
   try {
      const { title, content, userId } = req.body

      if (!title && !content && !userId) {
         return res.status(400).json({ error: "invalid input" })
      }

      const project = new Project({
         title,
         content,
         userOwner: userId
      })

      await project.save()

      res.status(201).json(project)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/title", auth, async (req, res) => {
   try {
      const { title, id } = req.body

      if (!title) {
         return res.status(400).json({ error: "invalid input" })
      }

      const changedProject = await Project.findOneAndUpdate(
         { _id: id },
         { $set: { title } },
         { new: true }
      )

      res.status(200).json(changedProject)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/content", auth, async (req, res) => {
   try {
      const { content, id } = req.body

      if (!content) {
         return res.status(400).json({ error: "invalid input" })
      }

      const changedProject = await Project.findOneAndUpdate(
         { _id: id },
         { $set: { content } },
         { new: true }
      )

      res.status(200).json(changedProject)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/position", async (req, res) => {
   try {
      const { result } = req.body
      if (!result.destination) return;

      const [reorderedItem] = projects.splice(result.source.index, 1);
      projects.splice(result.destination.index, 0, reorderedItem);

      res.status(200).json(projects)

      return
   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.delete("/:id", auth, async (req, res) => {
   try {
      const { id } = req.params

      if (!id) {
         return res.status(400).json({ error: "invalid input" })
      }

      await List.deleteMany({ projectOwner: id })
      await Task.deleteMany({ projectOwner: id })

      const deletedProject = await Project.findOneAndDelete(
         { _id: id }
      )

      res.status(200).json(deletedProject)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})




module.exports = router;