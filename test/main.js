import marked from 'marked'
import { readFileSync } from 'fs'
import { join } from 'path'

const readme = readFileSync(join(__dirname, '..', 'README.md'), 'utf-8')

document.getElementById('readme').innerHTML = marked(readme)

/* eslint-disable no-unused-vars */
const iframe = document.getElementById('iframe')

const resizeButtons = Array.from(document.getElementsByClassName('resize-button'))
resizeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const width = parseInt(e.target.dataset.width, 10)
    iframe.width = width
    iframe.height = width
  })
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()

    document.querySelector(e.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    })
  })
})
