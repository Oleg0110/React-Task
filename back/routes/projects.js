const { Router } = require("express");
const idGenerator = require("../utils/idGenerator");
const router = Router();

const projects = []

router.get("/", async (req, res) => {
   try {
      res.status(200).json(projects)
   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})


router.post("/", async (req, res) => {
   try {
      const { title, content } = req.body

      if (title && content) {

         const confirmedProject = { title, content, id: idGenerator() }
         projects.unshift(confirmedProject)
         res.status(201).json(confirmedProject)
         return
      }

      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/", async (req, res) => {
   try {
      const { title, id } = req.body
      if (title) {
         const foundProjectIndex = projects.findIndex(found => found.id === 1)
         const foundProject = projects.find(found => found.id === id)
         const changedProject = { ...foundProject, title, }
         projects.splice(foundProjectIndex, 1, changedProject)
         res.status(200).json(projects)
         return
      }

      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.delete("/", async (req, res) => {
   try {
      const { id } = req.body
      if (id) {
         const foundProject = projects.findIndex(found => found.id === id)
         const changedProject = projects.splice(foundProject, 1)
         res.status(200).json(changedProject)
         return
      }
      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})




module.exports = router;