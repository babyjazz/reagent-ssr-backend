const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use(cors())

app.get('/', (req, res) => {
  const resp = {
    success: true,
    data: 'some data'
  }
  console.log(resp)
  res.status(200).json(resp)
})
app.post('/', (req, res) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization === 'bearer yoyo') {
    res.status(200).json({
      success: true,
      idToken: req.headers.authorization

    })
  } else {
    res.status(401).json({
      success: false,
      idToken: req.headers.authorization

    })
  }
})
app.get('/post', (req, res) => {
  console.log("qs: ", req.params.id)
  res.status(200).json({
    success: true,
    data: null
  })
})
app.get('/post/:id', (req, res) => {
  console.log("qs: ", req.params.id)
  res.status(200).json({
    success: true,
    data: req.params.id
  })
})
app.post('/post', (req, res) => {
  console.log("body: ", req.body)
  console.log("headers: ", req.headers.authorization)
  res.status(200).json({
    success: true,
    data: {
      ...req.body
    }
  })
})

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))
