function createListItem(name, position, email, phone) {
    const userName = document.createElement('div');
    userName.className = 'app-list__item-name';
    userName.innerText = name;

    const userPosition = document.createElement('div');
    userPosition.className = 'app-list__item-position';
    userPosition.innerText = position;

    const emaillBox = document.createElement('div');
    emaillBox.className = 'app-list__item-box';
    emaillBox.innerText = 'Email: ';
    
    const emaill = document.createElement('span');
    emaill.className = 'app-list__item-email';
    emaill.textContent = email;
    emaillBox.appendChild(emaill);

    const phoneBox = document.createElement('div');
    phoneBox.className = 'app-list__item-box'
    phoneBox.textContent = '| Phone: ';

    const phoneNumber = document.createElement('span');
    phoneNumber.className = 'app-list__item-phone';
    phoneNumber.textContent = phone;
    phoneBox.appendChild(phoneNumber);

    const editButton = document.createElement('button');
    editButton.className = 'edit';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';

    const itemList = document.createElement('li');
    itemList.className = 'app-list__item';

    itemList.appendChild(userName);
    itemList.appendChild(userPosition);
    itemList.appendChild(emaillBox);
    itemList.appendChild(phoneBox);
    itemList.appendChild(editButton);
    itemList.appendChild(deleteButton);

    bindEvents(itemList);

    return itemList;
};

function bindEvents(listItem) {
    const editBtn = listItem.querySelector('button.edit'), 
        deleteBtn = listItem.querySelector('button.delete');

    editBtn.addEventListener('click', editListItem);
    deleteBtn.addEventListener('click', deleteListItem);
};

const validateElem = (elem) => {
    if (elem.name == 'username') {
        if(!regExpName.test(elem.value)) {
            elem.nextElementSibling.textContent = 'Введите коректное имя пользователя!';
        } else {
            elem.nextElementSibling.textContent = '';
            isValidate++;
        }
    }
    if (elem.name == 'position') {
        if(!regExpPosition.test(elem.value)) {
            elem.nextElementSibling.textContent = 'Введите минимум 5 символов!';
        } else {
            elem.nextElementSibling.textContent = '';
            isValidate++;
        }
    }
    if (elem.name == 'email') {
        if(!regExpEmail.test(elem.value)) {
            elem.nextElementSibling.textContent = 'Введите коректный email!';
        } else {
            elem.nextElementSibling.textContent = '';
            isValidate++;
        }
    }
    if (elem.name == 'phone') {
        if(!regExpPhone.test(elem.value)) {
            elem.nextElementSibling.textContent = 'Введите коректный номер телефона!';
        } else {
            elem.nextElementSibling.textContent = '';
            isValidate++;
        }
    }
};

function addListItem(e) {
    e.preventDefault();

    for(let elem of appForm.elements) {
        if (elem.tagName !== "BUTTON") {
            if (elem.value == '') {
                elem.nextElementSibling.textContent = 'Данное поле не заполнено'
            } else {
                elem.nextElementSibling.textContent = '';
                validateElem(elem);
            }
        }
    }

    if (isValidate ===  4 && !editRecord) {
        const listItem = createListItem(nameInput.value, positionInput.value, emailInput.value, phoneInput.value); 
        appList.appendChild(listItem);
    
        appForm.reset();

    } else if (isValidate ===  4 && editRecord) {

        const name = target.querySelector('.app-list__item-name'),
            position = target.querySelector('.app-list__item-position'),
            email = target.querySelector('.app-list__item-email'),
            phone = target.querySelector('.app-list__item-phone');

        name.innerText = nameInput.value,
        position.innerText = positionInput.value,
        email.innerText = emailInput.value,
        phone.innerText = phoneInput.value;

        appForm.reset();
        editRecord = false;
        target = null;
        deleteBtn.disabled = '';
        addBtn.textContent = 'Сохранить';
    } else {
        isValidate = 0;
    }
};

function editListItem(e) {
    const itemList = this.parentNode
         name = itemList.querySelector('.app-list__item-name').textContent,
         position = itemList.querySelector('.app-list__item-position').textContent,
         email = itemList.querySelector('.app-list__item-email').textContent,
         phone = itemList.querySelector('.app-list__item-phone').textContent,
         deleteBtn = itemList.querySelector('.delete');
   
    nameInput.value = name;
    positionInput.value = position;
    emailInput.value = email
    phoneInput.value = phone;

    target = e.target.parentNode;
    addBtn.textContent = 'Изменить';
    deleteBtn.disabled = 'disabled';
    editRecord = true;

    return addListItem(e);
};

function deleteListItem() {
    const itemList = this.parentNode;
    appList.removeChild(itemList);
};

const appForm = document.getElementById('app-form'),
    nameInput = document.getElementById('name-input'),
    positionInput = document.getElementById('position-input'),
    emailInput = document.getElementById('email-input'),
    phoneInput = document.getElementById('phone-input'),
    appList = document.getElementById('app-list'),
    addBtn = document.getElementById('add-button');

let editRecord = false,
    isValidate = 0,
    target;

const regExpName = /^[a-zA-Z0-9]*\s[a-zA-Z0-9]|[а-яА-Я0-9]*\s[а-яА-Я0-9]*$/,
    regExpPosition = /^[a-zA-Z]{5,16}|[а-яА-Я]{5,16}$/,
    regExpEmail = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;  
    regExpPhone = /^(\+380|80|0)\d{9}$/,

appForm.addEventListener('submit', addListItem);

