const { Router } = require("express")
const idGenerator = require("../utils/idGenerator")
const router = Router()
let id = 0

const users = []

router.get("/sign-up", async (req, res) => {
   try {
      res.status(200).json(users)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/sign-up", async (req, res) => {
   try {
      const { name, email, password } = req.body
      const candidate = users.find(find => find.email === email)

      if (name && email && password) {

         if (candidate) {
            res.status(400).json({ error: `This ${email} already using` })
         } else {
            const confirmedUser = {
               email: email, name: name,
               password: password, id: idGenerator()
            }

            users.push(confirmedUser)
            res.status(201).json(confirmedUser)
         }
         return
      }

      res.status(400).json({ error: "invalid data" })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

module.exports = router;