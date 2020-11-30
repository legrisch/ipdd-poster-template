/* eslint-disable no-unused-vars */
const iframe = document.getElementById('iframe')

function setSize(px) {
  iframe.width = px
  iframe.height = px
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    })
  })
})
