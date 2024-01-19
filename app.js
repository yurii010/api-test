// вивід нотаток

fetch('./notes.json')
    .then(response => response.json())
    .then(notes => {
        notes.forEach(item => {
            let newNote = document.createElement('div');
            let headerNote = document.createElement('div');
            let iconsBlock = document.createElement('div');
            let title = document.createElement('p');
            let text = document.createElement('p');
            let notesContainer = document.getElementById("notes");
            let changeIcon = document.createElement("img");
            let deleteIcon = document.createElement("img");
            changeIcon.src = "./icons/edit.svg";
            deleteIcon.src = "./icons/delete.svg";
            headerNote.setAttribute('class', 'header-note-div');
            newNote.setAttribute('class', 'note-div');
            title.setAttribute('class', 'note-title');
            text.setAttribute('class', 'note-text');
            title.textContent = item.title;
            text.textContent = item.text;
            headerNote.appendChild(title);
            iconsBlock.appendChild(changeIcon);
            iconsBlock.appendChild(deleteIcon);
            headerNote.appendChild(iconsBlock);
            newNote.appendChild(headerNote);
            newNote.appendChild(text);
            notesContainer.appendChild(newNote);

            deleteIcon.addEventListener('click', function () {
                fetch(`http://localhost:3000/notes/${item.id}`, {
                    method: 'DELETE',
                }).then(response => response.json())
                    .then(data => {
                        console.log('Note deleted:', data);
                    })
            })
        })
    });