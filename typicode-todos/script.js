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
getToDos()