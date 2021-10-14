const { Router } = require("express");
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = Router();
const jwtSecret = "oleg react project"

router.get("/user/:id", async (req, res) => {
   try {
      const { id } = req.params
      if (!id) {
         return res.status(400).json({ error: "invalid data" })
      }

      const user = await User.findOne({ _id: id })

      res.status(200).json(user)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.get("/people", async (req, res) => {
   try {
      const { page, count } = req.query
      const users = await User.find({})

      const lastUserIndex = page * count
      const firsUserIndex = lastUserIndex - count
      const currentUser = users.slice(firsUserIndex, lastUserIndex)

      const pageNumbers = []

      for (let i = 1; i <= Math.ceil(users.length / count); i++) {
         pageNumbers.push(i)
      }

      const userData = {
         pageNumbers,
         currentUser,
         allUsers: users.length
      }

      res.status(200).json(userData)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/sign-up", async (req, res) => {
   try {
      const { name, email, password } = req.body
      if (!name && !email && !password) {
         return res.status(400).json({ error: "invalid data" })
      }

      const candidate = await User.findOne({ email })

      if (candidate) {
         return res.status(400).json({ error: `This ${email} already using` })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({
         email, name,
         password: hashedPassword
      })


      await user.save()

      const currentUser = await User.findOne({ email })

      const token = jwt.sign(
         { userId: currentUser.id },
         jwtSecret,
         { expiresIn: "1h" }
      )

      const userData = {
         token,
         currentUser
      }

      return res.status(201).json(userData)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.post("/login", async (req, res) => {
   try {
      const { email, password } = req.body

      if (!email && !password) {
         return res.status(400).json({ error: "invalid data" })
      }

      const user = await User.findOne({ email })

      if (!user) {
         return res.status(400).json({ error: `Invalid username or password` })
      }

      const isСomparable = await bcrypt.compare(password, user.password)

      if (!isСomparable) {
         return res.status(400).json({ error: "invalid data" })
      }

      const token = jwt.sign(
         { userId: user.id },
         jwtSecret,
         { expiresIn: "1h" }
      )

      return res.json({ token, userId: user.id })

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

module.exports = router;