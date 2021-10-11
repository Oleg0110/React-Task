const jwt = require('jsonwebtoken')
const jwtSecret = "oleg react project"

module.exports = (req, res, next) => {
   // console.log(1, req.method);
   if (req.method === 'OPTIONS') {
      return next()
   }

   try {

      const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

      if (!token) {
         return res.status(401).json({ message: 'No authorization' })
      }

      const decoded = jwt.verify(token, jwtSecret)
      req.user = decoded
      next()

   } catch (e) {
      res.status(401).json({ message: 'No authorization' })
   }
}