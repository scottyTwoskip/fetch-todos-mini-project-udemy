const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

const getToDos = () => {
    fetch(apiUrl + '?_limit=10')
        .then(res => res.json())
        .then(data => {
            data.forEach((toDo) => {
                addToDoToDOM(toDo)

            })
        })
}

const addToDoToDOM = (toDo) => {
    const div = document.createElement('div')
    div.classList.add('toDo')
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

const toggleCompleted = (e) => {
    if (e.target.classList.contains('toDo'))
        e.target.classList.toggle('done')

    updateToDo(e.target.dataset.id, e.target.classList.contains('done'))
}

const updateToDo = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const deleteToDo = (e) => {
    if (e.target.classList.contains('toDo')) {
        const id = e.target.dataset.id
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json)
            .then(() => e.target.remove())
    }
}
const init = () => {
    document.addEventListener('DOMContentLoaded', getToDos)
    document.querySelector('#todo-form').addEventListener('submit', createToDo)
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted)
    document.querySelector('#todo-list').addEventListener('dblclick', deleteToDo)
}

init()
