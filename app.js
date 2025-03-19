let submit = document.getElementById("submit");
let cancel = document.createElement("button");
cancel.textContent = "Cancel";
cancel.style.display = "none";
cancel.className = "btn btn-primary ms-2";
submit.parentNode.appendChild(cancel);
let editId = null;
let idCounter = 1;

let users = [
    { fname: 'Darshik', lname: 'Chovatiya', degree: 'B.sc IT', gender: 'Male', hobbies: ["Bowling"] }
];

function static() {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    users.forEach(user => {
        let newRow = tbody.insertRow();
        newRow.setAttribute("data-id", user.id);

        newRow.innerHTML = `<td>${user.fname}</td>
                            <td>${user.lname}</td>
                            <td>${user.degree}</td>
                            <td>${user.gender}</td>
                            <td>${user.hobbies.join(", ")}</td>
                            <td>
                                <button onclick="removes(this)" class="btn btn-danger">DELETE</button>
                                <button onclick="edit(this)" class="btn btn-success">EDIT</button>
                            </td>`;
    });
}

static();



submit.addEventListener("click", (e) => {
    e.preventDefault();

    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let degree = document.getElementById("degree").value;
    let gender = document.querySelector('input[name="gender"]:checked');
    gender = gender ? gender.value : "Not Selected";

    let hobbies = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map((hobby) => hobby.value);

    if (!fname || !lname || !degree || !gender) {
        alert("Please fill all required fields!");
        return;
    }

    if (editId !== null) {
        let userIndex = users.findIndex(user => user.id === editId);
        if (userIndex !== -1) {
            users[userIndex] = { id: editId, fname, lname, degree, gender, hobbies };
            let row = document.querySelector(`tr[data-id="${editId}"]`);
            row.cells[0].textContent = fname;
            row.cells[1].textContent = lname;
            row.cells[2].textContent = degree;
            row.cells[3].textContent = gender;
            row.cells[4].textContent = hobbies.join(", ");
        }
        editId = null;

        cancel.style.display = "none";
    } else {
        let userId = idCounter++;
        let user = { id: userId, fname, lname, degree, gender, hobbies };
        users.push(user);
        let tbody = document.getElementById("tbody");
        let newRow = tbody.insertRow();
        newRow.setAttribute("data-id", userId);

        newRow.innerHTML = `<td>${fname}</td>
                            <td>${lname}</td>
                            <td>${degree}</td>
                            <td>${gender}</td>
                            <td>${hobbies.join(", ")}</td>
                            <td>
                            <button onclick="removes(this)" class="btn btn-danger">DELETE</button>
                                <button onclick="edit(this)" class="btn btn-success">EDIT</button>
                            </td>`;
    }
    console.log("Users :", JSON.stringify(users));
    clear();
});

function edit(button) {

    let row = button.parentNode.parentNode;
    editId = parseInt(row.getAttribute("data-id"));
    let cells = row.getElementsByTagName("td");
    document.getElementById("fname").value = cells[0].textContent;
    document.getElementById("lname").value = cells[1].textContent;
    document.getElementById("degree").value = cells[2].textContent;
    let genderValue = cells[3].textContent;
    let genderRadio = document.querySelector(`input[name="gender"][value="${genderValue}"]`);
    if (genderRadio) {
        genderRadio.checked = true;
    }
    let hobbiesArray = cells[4].textContent.split(", ");
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = hobbiesArray.includes(checkbox.value);
    });
    submit.textContent = "Update";
    console.log('submit data', submit);
    submit.textContent = "Submit";
    cancel.style.display = "inline-block";
}

cancel.addEventListener("click", () => {
    editId = null;
    submit.textContent = "Submit";
    cancel.style.display = "none";
    clear();
});

function clear() {
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("degree").selectedIndex = 0;
    document.querySelectorAll('input[name="gender"]').forEach(gender => gender.checked = false);
    document.querySelectorAll('input[type="checkbox"]').forEach(check => check.checked = false);
}

function removes(button) {
    let row = button.parentNode.parentNode;
    let userId = parseInt(row.getAttribute("data-id"));
    users = users.filter(user => user.id !== userId);
    row.parentNode.removeChild(row);
    if (editId === userId) {
        cancel.click();
    }
}
