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

            let modal = document.createElement('div');
            let modalContent = document.createElement('div');
            let modalTitleBlock = document.createElement('div');
            let newTitle = document.createElement('p');
            let span = document.createElement('span');
            let modalForm = document.createElement('div');
            let modalTextOne = document.createElement('p');
            let modalTextTwo = document.createElement('p');
            let textareaChangeTitle = document.createElement('textarea');
            let textareaChangeText = document.createElement('textarea');
            let buttonDiv = document.createElement('div');
            let buttonSave = document.createElement('button');
            modal.setAttribute('id', 'myModal');
            modalContent.setAttribute('class', 'modal-content');
            modalTitleBlock.setAttribute('class', 'modal-title-block');
            newTitle.setAttribute('class', 'modal-title');
            span.setAttribute('id', 'close');
            newTitle.innerText = "Change note";
            span.innerText = "X";
            modalForm.setAttribute('class', 'modal-form');
            modalTextOne.setAttribute('class', 'modal-text');
            modalTextOne.innerText = "Change title of note";
            textareaChangeTitle.setAttribute('id', 'changeTitle');
            textareaChangeTitle.setAttribute('cols', '76');
            textareaChangeTitle.setAttribute('rows', '4');
            modalTextTwo.setAttribute('class', 'modal-text');
            modalTextTwo.innerText = "Change text of note";
            textareaChangeText.setAttribute('id', 'changeText');
            textareaChangeText.setAttribute('cols', '76');
            textareaChangeText.setAttribute('rows', '10');
            buttonDiv.setAttribute('class', 'button-div');
            buttonSave.setAttribute('id', 'button-save');
            buttonSave.innerText = "Save";
            document.body.appendChild(modal);
            modal.appendChild(modalContent);
            modalContent.appendChild(modalTitleBlock);
            modalTitleBlock.appendChild(newTitle);
            modalTitleBlock.appendChild(span);
            modalContent.appendChild(modalForm);
            modalForm.appendChild(modalTextOne);
            modalForm.appendChild(textareaChangeTitle);
            modalForm.appendChild(modalTextTwo);
            modalForm.appendChild(textareaChangeText);
            buttonDiv.appendChild(buttonSave)
            modalForm.appendChild(buttonDiv);

            deleteIcon.addEventListener('click', function () {
                fetch(`http://localhost:3000/notes/${item.id}`, {
                    method: 'DELETE',
                }).then(response => response.json())
                    .then(data => {
                        console.log('Note deleted:', data);
                    })
            });

            changeIcon.addEventListener('click', function () {
                modal.style.display = "block";
                textareaChangeTitle.value = item.title;
                textareaChangeText.value = item.text;
            });

            span.onclick = function () {
                modal.style.display = "none";
                textareaChangeTitle.value = "";
                textareaChangeText.value = "";
            };

            buttonSave.addEventListener('click', function () {
                if (textareaChangeTitle.value !== "" && textareaChangeText.value !== "") {
                    fetch(`http://localhost:3000/notes/${item.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: item.id, title: textareaChangeTitle.value, text: textareaChangeText.value })
                    }).then(response => response.json())
                        .then(data => {
                            console.log('Note changed:', data);
                        })
                }
            });
        })
    });