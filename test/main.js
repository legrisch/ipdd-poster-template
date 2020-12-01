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

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    })
  })
})
