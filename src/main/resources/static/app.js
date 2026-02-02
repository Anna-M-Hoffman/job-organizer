document.getElementById('submitBtn').addEventListener('click', function() {
    const clientId = document.getElementById('clientId').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const location = document.getElementById('location').value.trim();
    const company = document.getElementById('company').value.trim();
    const salary = parseFloat(document.getElementById('salary').value);
    const desiredSalary = parseFloat(document.getElementById('desiredSalary').value);
    const status = document.getElementById('status').value.trim();

    // Build the request payload
    const requestData = {
        jobTitle,
        location,
        company,
        salary,
        desiredSalary,
        status
    };

    // Send POST request to Spring Boot API
    fetch('/api/jobs_saved', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': clientId
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (!response.ok) throw new Error("Request failed: " + response.status);
            return response.json();
        })
        .then(data => {
            document.getElementById('result').innerHTML = `
            <strong>Saved Jobs:</strong><br>
            ID: ${data.id}<br>
            Client ID: ${data.clientId}<br>
            Job Title: ${data.jobTitle}<br>
            Location: ${data.location}<br>
            Job Salary: $${data.salary.toLocaleString()}<br>
            Desired Salary: $${data.desiredSalary.toLocaleString()}<br>
            Status: ${data.status}<br>
            Salary Score: ${data.score.toFixed(2)}
        `;
        })
        .catch(err => {
            document.getElementById('result').innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
        });
});

// View all offers for a client
document.getElementById('viewBtn').addEventListener('click', function() {
    const clientId = document.getElementById('clientId').value.trim();
    if (!clientId) return alert("Please enter a valid Client ID (UUID).");

    fetch('/api/jobs_saved', {
        method: 'GET',
        headers: {
            'X-Client-Id': clientId
        }
    })
        .then(response => {
            if (!response.ok) throw new Error("Request failed: " + response.status);
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                document.getElementById('allOffers').innerHTML = "No offers found for this client.";
                return;
            }

            let html = '<strong>All Jobs:</strong><br><ul>';
            data.forEach(offer => {
                html += `<li>ID: ${offer.id}, Title: ${offer.jobTitle}, Location: ${offer.location}, Company: ${offer.company}, Salary: $${offer.salary.toLocaleString()}, Salary Score: ${offer.score.toFixed(2)}</li>`;
            });
            html += '</ul>';
            document.getElementById('allOffers').innerHTML = html;
        })
        .catch(err => {
            document.getElementById('allOffers').innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
        });
});