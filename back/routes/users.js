const { Router } = require("express")
const User = require("../models/user")
const router = Router()


// router.get("/sign-up", async (req, res) => {
//    try {
//       const user = await User.find({})
//       res.status(200).json(user)

//    } catch (error) {
//       res.status(500).json({ error: "internal server error" })
//    }
// })


router.post("/sign-up", async (req, res) => {
   try {
      const { name, email, password } = req.body

      if (name && email && password) {
         return res.status(400).json({ error: "invalid data" })
      }

      const candidate = await User.findOne({ email })

      if (candidate) {
         return res.status(400).json({ error: `This ${email} already using` })
      }

      const user = new User({
         email, name,
         password
      })

      await user.save()

      return res.status(201).json(user)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/log-in", async (req, res) => {
   try {
      const { name, password } = req.body

      if (name && password) {
         return res.status(400).json({ error: "invalid data" })
      }

      const user = await User.findOne({ name, password })

      if (!user) {
         return res.status(400).json({ error: `Invalid username or password` })
      }


      return res.status(201).json(user)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

module.exports = router;