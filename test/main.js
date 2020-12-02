import marked from 'marked'
import { readFileSync } from 'fs'
import { join } from 'path'
import ClipboardJS from 'clipboard'

// eslint-disable-next-line no-new
const clipboard = new ClipboardJS('.copy code', {
  text: (trigger) => trigger.innerHTML,
})

clipboard.on('success', (e) => {
  const { timeout } = e.trigger.dataset
  if (timeout) clearTimeout(parseInt(timeout, 10))
  e.trigger.classList.add('copied')
  e.trigger.dataset.timeout = setTimeout(() => {
    e.trigger.classList.remove('copied')
  }, 2e3)
})

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
