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

         projects.push(confirmedProject)
         res.status(201).json(confirmedProject)
         return
      }

      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/title", async (req, res) => {
   try {
      const { title, id } = req.body
      if (title) {

         const foundProjectIndex = projects.findIndex(found => found.id === id)
         const foundProject = projects.find(found => found.id === id)
         const changedProject = { ...foundProject, title }

         projects.splice(foundProjectIndex, 1, changedProject)

         res.status(200).json(changedProject)
         return
      }

      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/content", async (req, res) => {
   try {
      const { content, id } = req.body
      if (content) {
         const foundProjectIndex = projects.findIndex(found => found.id === id)
         const foundProject = projects.find(found => found.id === id)
         const changedProject = { ...foundProject, content, }

         projects.splice(foundProjectIndex, 1, changedProject)

         res.status(200).json(changedProject)
         return
      }

      res.status(400).json({ error: "invalid input" })

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
      if (id) {
         const foundProjectIndex = projects.findIndex(found => found.id === id)

         projects.splice(foundProjectIndex, 1)

         res.status(200).json(foundProjectIndex)
         return
      }
      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})




module.exports = router;