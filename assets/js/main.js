'use strict'

const body = document.getElementById('body')
const ulForHistory = document.createElement('ul')
const ulForList = document.createElement('ul')
const input = document.createElement('input')

body.appendChild(input)
body.appendChild(ulForList)
body.appendChild(ulForHistory)

const history = []

;(async () => {
  const obj = await fetch('https://jsonplaceholder.typicode.com/albums')
  const data = await obj.json()

  const posts = []

  for (let i = 0; i < data.length; i++) {
    posts.push(data[i].title)
  }

  posts.forEach(post => {
    const liForList = document.createElement('li')
    liForList.classList.add('liForList')
    liForList.innerHTML = post
    ulForList.appendChild(liForList)
  })
})()

input.addEventListener('change', ({ target: { value } }) => {
  const list = document.querySelectorAll('.liForList')
  const id = Date.now()

  for (let i = 0; i < list.length; i++) {
    list[i].textContent.toLowerCase().indexOf(value.toLowerCase()) === 0 ? (list[i].style.display = 'block') : (list[i].style.display = 'none')
  }

  history.push({ id, value })

  if (value.length) {
    const liForHistory = document.createElement('li')
    const buttonForDelete = document.createElement('button')
    buttonForDelete.classList.add('buttonForDelete')
    liForHistory.id = id
    buttonForDelete.id = id
    buttonForDelete.innerHTML = 'X'
    liForHistory.innerHTML = `${value} ${new Date().toLocaleString('en')}`
    liForHistory.appendChild(buttonForDelete)
    ulForHistory.appendChild(liForHistory)
  }

  document.querySelectorAll('.buttonForDelete').forEach(button => button.addEventListener('click', ({ target: { id } }) => document.getElementById(id).remove()))
})
