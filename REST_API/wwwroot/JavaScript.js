const reset = () => {
    const form = document.forms["userForm"];
    form.reset();
    form.elements["id"].value = 0;
};

const getUser = async id => {
    const response = await fetch("/api/users/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        const user = await response.json();
        const form = document.forms["userForm"];
        form.elements["id"].value = user.id;
        form.elements["name"].value = user.name;
        form.elements["age"].value = user.age;
    } else {
        const error = await response.json();
        console.log(error.message);
    }
};

const deleteUser = async id => {
    const response = await fetch("/api/users/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        const user = await response.json();
        document.querySelector(`tr[data-rowid='${user.id}']`).remove();
    } else {
        const error = await response.json();
        console.log(error.message);
    }
};

const row = user => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);

    const nameTd = document.createElement("td");
    nameTd.append(user.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(user.age);
    tr.append(ageTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        getUser(user.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        deleteUser(user.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
};

const createUser = async (userName, userAge) => {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: userName,
            age: userAge
        })
    });

    if (response.ok === true) {
        const user = await response.json();
        reset();
        document.querySelector("tbody").append(row(user));
    } else {
        const error = await response.json();
        console.log(error.message);
    }
};

const getUsers = async () => {
    const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        const users = await response.json();
        const rows = document.querySelector("tbody");
        users.forEach(user => rows.append(row(user)));
    }
};

const editUser = async (userId, userName, userAge) => {
    const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: userId,
            name: userName,
            age: parseInt(userAge, 10)
        })
    });

    if (response.ok === true) {
        const user = await response.json();
        reset();
        document.querySelector(`tr[data-rowid='${user.id}']`)
            .replaceWith(row(user));
    } else {
        const error = await response.json();
        console.log(error.message);
    }
};

document.getElementById("reset").addEventListener("click", e => {
    e.preventDefault();
    reset();
});

document.forms["userForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["userForm"];
    const id = form.elements["id"].value;
    const name = form.elements["name"].value;
    const age = form.elements["age"].value;

    if (id == 0) {
        createUser(name, age);
    } else {
        editUser(id, name, age);
    }
});

getUsers();