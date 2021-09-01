const { Router } = require("express");
const router = Router();

const projects = []

router.get("", async (req, res) => {
   res.status(200).json(projects)
})

router.post("", async (req, res) => {
   const project = req.body
   projects.push(project)
   console.log(project);
   res.status(200).json({ message: "super" })
})


module.exports = router;