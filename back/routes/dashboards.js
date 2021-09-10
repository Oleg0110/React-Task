const { Router } = require("express")
const idGenerator = require("../utils/idGenerator")
const router = Router()

const lists = []

let Id = 0

router.get("/", async (req, res) => {
   try {
      res.status(200).json(lists)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/list", async (req, res) => {
   try {
      const { title } = req.body

      if (title) {
         const confirmedList = { id: idGenerator(), title, tasks: [] }

         lists.push(confirmedList)
         res.status(201).json(confirmedList)
         return
      }

      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/list", async (req, res) => {
   try {
      const { title, id } = res.body

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.get("/list", async (req, res) => {
   try {
      res.status(200).json(lists.tasks)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/task", async (req, res) => {
   try {
      const { text, id } = req.body

      if (text && id) {

         const confirmedList = { text: text, id: idGenerator() }
         const foundListId = lists.find(find => find.id === id)
         foundListId.tasks.push(confirmedList)
         res.status(201).json(confirmedList)
         return
      }

      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/task", async (req, res) => {
   try {
      const { title, id } = res.body

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})


module.exports = router;