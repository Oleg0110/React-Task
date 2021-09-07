const { Router } = require("express");
const router = Router();
let id = 0;

const projects = []

router.get("/", async (req, res) => {
   res.status(200).json(projects)
})

router.post("/", async (req, res) => {
   const { title, content } = req.body
   if (title && content) {
      const confirmedProject = { title, content, id: String(++id) }
      projects.push(confirmedProject)
      console.log(confirmedProject);
      res.status(200).json(confirmedProject)
   }
   res.status(400).json({ error: "invalid input" })
})

router.patch("/", async (req, res) => {
   const { title } = req.body
   if (title) {
      const changedTitle = { title }
   }
})


module.exports = router;