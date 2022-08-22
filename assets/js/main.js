'use strict'

const body = document.getElementById('body')

const containerHeaders = document.createElement('div')
const clearHistory = document.createElement('button')
const wrapperHistory = document.createElement('div')
const headerHistory = document.createElement('h1')
const ulForHistory = document.createElement('ul')
const wrapperList = document.createElement('div')
const container = document.createElement('div')
const ulForList = document.createElement('ul')
const input = document.createElement('input')

containerHeaders.classList.add('containerHeaders')
headerHistory.classList.add('headerHistory')
ulForHistory.classList.add('ulForHistory')
clearHistory.classList.add('clearHistory')
container.classList.add('container')
ulForList.classList.add('ulForList')
input.classList.add('input')

clearHistory.innerHTML = 'Clear search history'
headerHistory.innerHTML = 'Search history'

wrapperList.appendChild(input)
wrapperList.appendChild(ulForList)

containerHeaders.appendChild(headerHistory)
containerHeaders.appendChild(clearHistory)

wrapperHistory.appendChild(containerHeaders)
wrapperHistory.appendChild(ulForHistory)

container.appendChild(wrapperList)
container.appendChild(wrapperHistory)

body.appendChild(container)

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
    const buttonForDelete = document.createElement('button')
    const wrapperTimestamp = document.createElement('span')
    const itemHistory = document.createElement('span')
    const liForHistory = document.createElement('li')
    const timestamp = document.createElement('span')

    buttonForDelete.classList.add('buttonForDeleteHistoryItems')
    liForHistory.classList.add('liForHistory')

    timestamp.innerHTML = `${new Date().toLocaleString('en')}`
    itemHistory.innerHTML = `${value}`
    buttonForDelete.innerHTML = 'X'

    liForHistory.id = id
    buttonForDelete.id = id
 
    liForHistory.appendChild(itemHistory)
    liForHistory.appendChild(wrapperTimestamp)

    wrapperTimestamp.appendChild(timestamp)
    wrapperTimestamp.appendChild(buttonForDelete)

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
