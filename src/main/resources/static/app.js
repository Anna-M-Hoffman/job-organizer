document.getElementById('submitBtn').addEventListener('click', function() {
    const clientId = document.getElementById('clientId').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const country = document.getElementById('country').value.trim();
    const location = document.getElementById('location').value.trim();
    const offerSalary = parseFloat(document.getElementById('offerSalary').value);
    const salaryWeight = parseFloat(document.getElementById('salaryWeight').value);
    const growthWeight = parseFloat(document.getElementById('growthWeight').value);
    const locationWeight = parseFloat(document.getElementById('locationWeight').value);

    // Build the request payload
    const requestData = {
        jobTitle,
        location,
        offerSalary,
        salaryWeight,
        growthWeight,
        locationWeight
    };

    // Send POST request to Spring Boot API
    fetch('/api/job-offers', {
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
            <strong>Saved Job Offer:</strong><br>
            ID: ${data.id}<br>
            Client ID: ${data.clientId}<br>
            Job Title: ${data.jobTitle}<br>
            Location: ${data.location}<br>
            Offer Salary: $${data.offerSalary.toLocaleString()}<br>
            Normalized Salary: $${data.normalizedSalary.toFixed(2)}<br>
            Score: ${data.score.toFixed(2)}
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

    fetch('/api/job-offers', {
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

            let html = '<strong>All Job Offers:</strong><br><ul>';
            data.forEach(offer => {
                html += `<li>ID: ${offer.id}, Title: ${offer.jobTitle}, Location: ${offer.location}, Salary: $${offer.offerSalary.toLocaleString()}, Score: ${offer.score.toFixed(2)}</li>`;
            });
            html += '</ul>';
            document.getElementById('allOffers').innerHTML = html;
        })
        .catch(err => {
            document.getElementById('allOffers').innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
        });
});