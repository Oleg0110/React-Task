const { Router } = require("express")
const router = Router()

const lists = []

router.get("", async (req, res) => {
   res.status(200).json(lists)
})

router.post("", async (req, res) => {
   const list = req.body
   lists.push(list)
   console.log(list);
})

module.exports = router