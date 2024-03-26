// Sample student data array
let students = [];

// Function to handle student registration
function registerStudent(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const classAssignment = document.getElementById('classAssignment').value;

    const student = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        classAssignment: classAssignment
    };

    students.push(student);
    console.log('Student Registered:', student);
    document.getElementById('studentForm').reset();
}

// Function to handle student search
function searchStudent() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const searchResult = students.filter(student => {
        return student.firstName.toLowerCase().includes(searchQuery) || student.lastName.toLowerCase().includes(searchQuery);
    });

    displaySearchResult(searchResult);
}

// Function to display search result
function displaySearchResult(result) {
    const searchResultDiv = document.getElementById('searchResult');
    searchResultDiv.innerHTML = '';

    if (result.length === 0) {
        searchResultDiv.innerText = 'No matching student found.';
    } else {
        result.forEach(student => {
            const studentInfo = document.createElement('div');
            studentInfo.innerHTML = `
                <p><strong>Name:</strong> ${student.firstName} ${student.lastName}</p>
                <p><strong>Age:</strong> ${student.age}</p>
                <p><strong>Class Assignment:</strong> ${student.classAssignment}</p>
            `;
            searchResultDiv.appendChild(studentInfo);
        });
    }
}

document.getElementById('studentForm').addEventListener('submit', registerStudent);


// Function to assign student to a class and group
function assignClassAndGroup(firstName, lastName, className, group) {
    const studentIndex = students.findIndex(student => student.firstName === firstName && student.lastName === lastName);
    if (studentIndex !== -1) {
        students[studentIndex].classAssignment = className;
        students[studentIndex].group = group;
        console.log(`${firstName} ${lastName} assigned to ${className} - Group ${group}`);
    } else {
        console.log('Student not found!');
    }
}

// Function to store class assignments and grades
function storeGrades(firstName, lastName, subject, grade) {
    const studentIndex = students.findIndex(student => student.firstName === firstName && student.lastName === lastName);
    if (studentIndex !== -1) {
        if (!students[studentIndex].grades.hasOwnProperty(subject)) {
            students[studentIndex].grades[subject] = [];
        }
        students[studentIndex].grades[subject].push(grade);
        console.log(`Grade ${grade} stored for ${subject} for ${firstName} ${lastName}`);
    } else {
        console.log('Student not found!');
    }
}

// Function to calculate average grade
function calculateAverageGrade(firstName, lastName) {
    const studentIndex = students.findIndex(student => student.firstName === firstName && student.lastName === lastName);
    if (studentIndex !== -1) {
        const grades = Object.values(students[studentIndex].grades).flat();
        const totalGrades = grades.reduce((total, grade) => total + grade, 0);
        const averageGrade = totalGrades / grades.length;
        console.log(`Average grade for ${firstName} ${lastName}: ${averageGrade.toFixed(2)}`);
    } else {
        console.log('Student not found!');
    }
}

document.getElementById('studentForm').addEventListener('submit', registerStudent);