'use strict'

const body = document.getElementById('body')
const ulForHistory = document.createElement('ul')
ulForHistory.classList.add('ulForHistory')
const ulForList = document.createElement('ul')
const input = document.createElement('input')
const containerHeaders = document.createElement('div')
const headerHistory = document.createElement('h1')
headerHistory.innerHTML = 'Search history'
const clearHistory = document.createElement('button')
clearHistory.innerHTML = 'Clear search history'
clearHistory.classList.add('clearHistory')

containerHeaders.appendChild(headerHistory)
containerHeaders.appendChild(clearHistory)

body.appendChild(input)
body.appendChild(ulForList)
body.appendChild(containerHeaders)
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
    buttonForDelete.classList.add('buttonForDeleteHistoryItems')
    liForHistory.id = id
    buttonForDelete.id = id
    buttonForDelete.innerHTML = 'X'
    liForHistory.innerHTML = `${value} ${new Date().toLocaleString('en')}`
    liForHistory.appendChild(buttonForDelete)
    ulForHistory.appendChild(liForHistory)
  }

  document.querySelectorAll('.buttonForDeleteHistoryItems').forEach(button => button.addEventListener('click', ({ target: { id } }) => document.getElementById(id).remove()))
})

document.querySelector('.clearHistory').addEventListener('click', () => {
  const containerHistory = document.querySelector('.ulForHistory')
  while (containerHistory.firstChild) {
    containerHistory.removeChild(containerHistory.firstChild)
  }
})
