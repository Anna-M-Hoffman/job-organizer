// -------- UUID Cookie Setup Functions --------
function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days*24*60*60*1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// --------------Function to delete jobs -----------
function deleteJob(id, button) {

    const clientId = getCookie("clientId");

    fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
            "X-Client-Id": clientId
        }
    })
        .then(response => {
            if (!response.ok) throw new Error("Delete failed");

            const row = button.closest("tr");
            row.remove();
        })
        .catch(err => {
            alert(err.message);
        });
}

// Ensure clientId cookie exists
let clientId = getCookie('clientId');
if (!clientId) {
    clientId = crypto.randomUUID(); // generates a UUID
    setCookie('clientId', clientId, 365); // valid for 1 year
}




document.getElementById('submitBtn').addEventListener('click', function() {
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const location = document.getElementById('location').value.trim();
    const company = document.getElementById('company').value.trim();

    const salaryInput = document.getElementById('salary').value.trim();
    const desiredSalaryInput = document.getElementById('desiredSalary').value.trim();

    const salary = salaryInput ? parseFloat(salaryInput) : null;
    const desiredSalary = desiredSalaryInput ? parseFloat(desiredSalaryInput) : null;

    const status = document.getElementById('status').value.trim();
    const resultDiv = document.getElementById('result');

    if (!jobTitle) {
        resultDiv.innerHTML = `<span class="error-message">Job title is required.</span>`;
        return;
    }

    if (!status) {
        resultDiv.innerHTML = `<span class="error-message">Status is required.</span>`;
        return;
    }


    // Build the request payload
    const requestData = { jobTitle }; // always include jobTitle

    if (location) requestData.location = location;
    if (company) requestData.company = company;
    if (!isNaN(salary)) requestData.salary = salary;
    if (!isNaN(desiredSalary)) requestData.desiredSalary = desiredSalary;
    if (status) requestData.status = status;


    // Send POST request to Spring Boot API
    fetch('/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': clientId
        },
        body: JSON.stringify(requestData)
    })
        .then(data => {
            const resultDiv = document.getElementById('result');

            resultDiv.innerHTML = `
        <span class="success-message">
            Job successfully submitted!
        </span>
    `;

            // Optional: clear form fields after success
            document.getElementById('jobTitle').value = "";
            document.getElementById('location').value = "";
            document.getElementById('company').value = "";
            document.getElementById('salary').value = "";
            document.getElementById('desiredSalary').value = "";
            document.getElementById('status').value = "PENDING";
        })
        .catch(err => {
            document.getElementById('result').innerHTML = `
        <span class="error-message">
            Submission failed. ${err.message}
        </span>
    `;
        });
});


function loadJobs() {

    const clientId = getCookie("clientId");

    if (!clientId) {
        document.getElementById('allJobs').innerHTML =
            "<span style='color:red;'>No client ID found.</span>";
        return;
    }

    fetch(`/api/jobs?clientId=${clientId}`)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {

            if (!data.length) {
                document.getElementById('allJobs').innerHTML = "No jobs found.";
                return;
            }

            let html = `
                <table border="1" id="jobTable">
                    <thead>
                        <tr>
                            <th><i class="fa-solid fa-circle-user"></i>Title</th>
                            <th><i class="fa-solid fa-users"></i>Company</th>
                            <th><i class="fa-solid fa-city"></i>Location</th>
                            <th><i class="fa-solid fa-money-bill"></i>Salary</th>
                            <th><i class="fa-solid fa-dollar-sign"></i>Desired</th>
                            <th><i class="fa-solid fa-sliders"></i>Salary Score</th>
                            <th><i class="fa-solid fa-gears"></i>Status</th>
                            <th><i class="fa-solid fa-circle-xmark"></i>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(job => {
                html += `
                    <tr>
                        <td>${job.jobTitle}</td>
                        <td>${job.company ?? 'N/A'}</td>
                        <td>${job.location ?? 'N/A'}</td>
                        <td>${job.salary != null ? `$${job.salary.toLocaleString()}` : 'N/A'}</td>
                        <td>${job.desiredSalary != null ? `$${job.desiredSalary.toLocaleString()}` : 'N/A'}</td>
                        <td>${job.score != null ? `${Math.round(job.score * 100)}%` : 'N/A'}</td>
                        <td>${job.status ?? 'N/A'}</td>
                        <td>
                            <button class="delete-btn" onclick="deleteJob(${job.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });

            html += `
                    </tbody>
                </table>
            `;

            document.getElementById('allJobs').innerHTML = html;

        })
        .catch(err => {
            document.getElementById('allJobs').innerHTML =
                `<span style="color:red;">${err.message}</span>`;
        });
}

document.addEventListener("DOMContentLoaded", function () {
    loadJobs();
});

