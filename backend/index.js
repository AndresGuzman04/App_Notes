require('dotenv').config()

const config = require('./config.json')
const mongoose = require('mongoose')

mongoose.connect(config.connectionString)

const User = require('./models/user.model')
const Note = require('./models/note.model')

const express = require('express')
const cors = require('cors')
const app = express()

const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./utilities')

app.use(express.json())

app.use(
    cors({
      origin: ['+'],
      credentials: true
    })
)
app.get('/', (req, res) => {
  res.json({data: 'Hello'})
})

// Create account
app.post('/create-account', async (req, res) => {
  const {name, email, password} = req.body

  if (!name) {
    return res
        .status(400)
        .json({error: true, message: 'Please enter your full name'})
  }

  if (!email) {
    return res
       .status(400)
       .json({error: true, message: 'Please enter your email address'})
  }

  if (!password) {
    return res
       .status(400)
       .json({error: true, message: 'Please enter your password'})
  }

  const isUser = await User.findOne({email: email})

  if (isUser) {
    return res.json({
      error: true,
      message: 'Email already exists.'
    })
  }

  const user = new User({
    name,
    email,
    password
  })

  await user.save()

  const accessToken = jwt.sign({user}, process.env.SECRET_KEY, {
    expiresIn: '36000m'
  })

  res.json({
    error: false,
    user,
    accessToken,
    message: 'User created successfully'
  })
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email) {
    return res.status(400).json({message: 'Email is required'})
  }

  if (!password) {
    return res.status(400).json({message: 'Password is required'})
  }

  const userInfo = await User.findOne({email: email})
  if (!userInfo) {
    return res.status(400).json({message: 'User not found'})
  }

  if (userInfo.email === email && userInfo.password === password) {
    const user = {user: userInfo}
    const accessToken = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: '36000m'
    })
    return res.json({
      error: false,
      email,
      accessToken,
      message: 'User logged in successfully'
    })
  } else {
    return res.status(400).json({
      error: true,
      message: 'Invalid email or password'
    })
  }
})

app.post('/add-note', authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body
  const { user } = req.user

  if (!title) {
    return res.status(400).json({message: 'Title is required'})
  }

  if (!content) {
    return res.status(400).json({message: 'Content is required'})
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id
    })

    await note.save()

    return res.json({
      error: false,
      note,
      message: 'Note added successfully'
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error
    })
  }
})

app.put('/edit-note/:noteId', authenticateToken, async (req, res) => {
  const noteId = req.params.noteId
  const { title, content, tags, isPinned } = req.body
  const {user} = req.user

  if (!title && !content && !tags && !isPinned) {
    return res.status(400).json({message: 'No changes provided'})
  }

  try {
    const note = await Note.findOne({_id: noteId, userId: user._id})
    if (!note) {
      return res.status(404).json({message: 'Note not found'})
    }

    if (title) note.title = title
    if (content) note.content = content
    if (tags) note.tags = tags
    if (isPinned) note.isPinned = isPinned

    await note.save()

    return res.json({
      error: false,
      note,
      message: 'Note updated successfully'
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: 'Internal server error'
    })
  }
})

app.get('/get-all-notes', authenticateToken, async (req, res) => {
  const {user} = req.user

  try {
    const notes = await Note.find({userId: user._id}).sort({isPinned: -1})
    return res.json({
      error: false,
      notes,
      message: 'Notes retrieved successfully'
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: 'Internal server error'
    })
  }
})

app.get('/get-note/:noteId', authenticateToken, async (req, res) => {
  const {user} = req.user
  const noteId = req.params.noteId
  const note = await Note.findOne({ _id: noteId, userId: user._id })
  return res.json(note)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
