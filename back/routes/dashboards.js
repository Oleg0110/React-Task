const { Router } = require("express")
const router = Router()

const lists = [{
   tasks: [{ id: "", text: '' }]
}]

let listId = 0
let taskId = 0

router.get("/", async (req, res) => {
   res.status(200).json(lists)
})

router.post("/list", async (req, res) => {
   const { title } = req.body
   console.log(3, title);
   if (title) {
      const confirmedList = { id: String(++listId), title, tasks: [] }
      lists.push(confirmedList)
      console.log(1, confirmedList);
      res.status(200).json(confirmedList)
   }
   res.status(400).json({ error: "invalid input" })
})

router.patch("/list", async (req, res) => {
   const { title } = res.body
})

router.post("/task", async (req, res) => {
   const { text, id } = req.body
   console.log(4, text, id);
   if (text && id) {
      const confirmedList = { text: text, id: String(++taskId) }
      lists[id].tasks.push(confirmedList)
      res.status(200).json(confirmedList)
   }
   res.status(400).json({ error: "invalid input" })
})

router.patch("/task", async (req, res) => {
   const { title } = res.body
})


module.exports = router