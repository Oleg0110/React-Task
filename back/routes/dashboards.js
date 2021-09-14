const { Router } = require("express")
const idGenerator = require("../utils/idGenerator")
const router = Router()

const lists = []

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
      const { title, id } = req.body

      if (title) {
         const foundListIndex = lists.findIndex(found => found.id === id)
         const foundList = lists.find(found => found.id === id)
         const chengedList = { ...foundList, title }

         lists.splice(foundListIndex, 1, chengedList)
         res.status(200).json(chengedList)
         return
      }
      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.delete("/list/:id", async (req, res) => {
   try {
      const { id } = req.params
      if (id) {
         const foundListIndex = lists.findIndex(found => found.id === id)

         lists.splice(foundListIndex, 1)

         res.status(200).json(foundListIndex)
         return
      }
      res.status(400).json({ error: "invalid input" })

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
      const { text, id, listId } = req.body

      if (text, id, listId) {

         const foundList = lists.find(found => found.id === listId)
         const foundTask = foundList.tasks.findIndex(found => found.id === id)

         const changedTask = { ...foundTask, text }

         foundList.tasks.splice(foundTask, 1, changedTask)

         res.status(200).json(changedTask)
         return
      }

      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.delete("/task/:id/:listId", async (req, res) => {
   try {
      const { listId, id } = req.params

      if (listId, id) {
         const foundListId = lists.find(found => found.id === listId)

         const foundTask = foundListId.tasks.findIndex(found => found.id === id)

         foundListId.tasks.splice(foundTask, 1)

         res.status(200).json(foundTask)
         return
      }
      res.status(400).json({ error: "invalid input" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

module.exports = router;