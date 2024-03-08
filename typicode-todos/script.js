const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

const getToDos = () => {
    fetch(apiUrl + '?_limit=5')
        .then(res => res.json())
        .then(data => {
            data.forEach((toDo) => {
                addToDoToDOM(toDo)

            })
        })
}

const addToDoToDOM = (toDo) => {
    const div = document.createElement('div')
    div.appendChild(document.createTextNode(toDo.title))
    div.setAttribute('data-id', toDo.id)

    if (toDo.completed) {
        div.classList.add('done')
    }

    document.getElementById('todo-list').appendChild(div)
}

const createToDo = (e) => {
    e.preventDefault()

    const newToDo = {
        title: e.target.firstElementChild.value,
        completed: false
    }

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newToDo),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => addToDoToDOM(data))
}

const init = () => {
    document.addEventListener('DOMContentLoaded', getToDos)
    document.querySelector('#todo-form').addEventListener('submit', createToDo)
}

init()
