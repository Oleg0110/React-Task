const { Router, json } = require("express")
const router = Router()
let id = 0

const user = []

router.get("/", async (req, res) => {
   res.status(200).json({ message: "yes" })
})

router.post("/", async (req, res) => {
   const { name, email, password } = req.body
   if (name && email && password) {
      if (email) {
         res.status(400).json({ error: `This ${email} already using` })
      } else {
         const confirmedUser = {
            name: String(name), email: String(name),
            password: String(password), id: String(++id)
         }
         user.push(confirmedUser)
         res.status(200).json(confirmedUser)
      }
   }
   res.status(400).json({ error: "invalid data" })
})