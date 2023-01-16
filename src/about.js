const _about = document.querySelector('.about')
const _closeBtn = document.querySelector('.close-btn')
const _openBtn = document.querySelector('.more-informations')

_closeBtn.addEventListener('click', (e) => {
  e.preventDefault()
  _about.classList.toggle('open')
})

_openBtn.addEventListener('click', (e) => {
  e.preventDefault()
  _about.classList.toggle('open')
})
