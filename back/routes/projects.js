const { Router } = require("express");
const router = Router();
let id = 0;

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

         const confirmedProject = { title, content, id: String(++id) }
         projects.push(confirmedProject)
         console.log(confirmedProject);
         res.status(201).json(confirmedProject)
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
      console.log(3, id);
      if (id) {
         const foundProject = projects.find(found => found.id === id)
         console.log(1, foundProject);
         const changedProject = projects.splice(foundProject, 1)
         res.status(200).json(changedProject)
         console.log("mozhe");
         return
      }
      console.log("tyt");
      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/", async (req, res) => {
   try {
      const { content, id } = req.body

      if (content) {
         const foundProject = projects.find(found => found.id === id)
         const changedProject = { ...projects, content: content }
         projects.push(changedProject)
         res.status(201).json(confirmedProject)
         return
      }

      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})


module.exports = router;