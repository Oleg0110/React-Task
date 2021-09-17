const { Router } = require("express");
const idGenerator = require("../utils/idGenerator");
const router = Router();
const Project = require("../models/project")

const projects = []

router.get("/", async (req, res) => {
   try {
      res.status(200).json(await Project.find({}))

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})


router.post("/", async (req, res) => {
   try {
      const { title, content } = req.body

      if (!title && !content) {
         return res.status(400).json({ error: "invalid input" })
      }

      const project = new Project({
         title,
         content,
      })

      await project.save()

      res.status(201).json(project)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/title", async (req, res) => {
   try {
      const { title, id } = req.body

      if (title) {
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

router.patch("/content", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
   try {
      const { id } = req.params

      if (!id) {
         return res.status(400).json({ error: "invalid input" })
      }

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