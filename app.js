const baseURL = "http://127.0.0.1:8000";

// Handle Registration Form Submission
async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const groupType = document.getElementById("regGroupType").value;

    try {
        const response = await fetch(`${baseURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Ensure this is set to JSON
            },
            body: JSON.stringify({ username, password, group_type: groupType })
        });

        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            const result = await response.json();
            alert(result.error || 'Error occurred during registration');
        } else {
            const result = await response.json();
            alert(result.message || 'Registration successful!');
            // Optionally redirect to login page after successful registration
            window.location.href = "/login";  // Redirect to login page
        }
    } catch (error) {
        console.error('Error:', error);  // Log any errors to the console
        alert('An unexpected error occurred. Please try again.');
    }
}

// Handle Login Form Submission
async function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(`${baseURL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Ensure this is set to JSON
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            console.log(result.group_type);  // Example of accessing the group_type
            // Redirect to query page after successful login
            window.location.href = "/query";  // Redirect to query page
        } else {
            alert(result.error);  // Handle the error if any
        }
    } catch (error) {
        console.error('Error:', error);  // Handle errors that occur during the request
        alert('An error occurred. Please try again later.');
    }
}

// Handle Query Records Form Submission
async function handleQuery(e) {
    e.preventDefault();
    const username = document.getElementById("queryUsername").value;
    try {
        const response = await fetch(`${baseURL}/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username })
        });

        if (!response.ok) {
            const result = await response.json();
            alert(result.error || 'Error occurred');
        } else {
            const result = await response.json();
            const resultsDiv = document.getElementById("queryResults");
            resultsDiv.innerHTML = JSON.stringify(result.data || result.error, null, 2);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Check the console for details.');
    }
}

// Handle Add Record Form Submission
async function handleAddRecord(e) {
    e.preventDefault();

    const username = document.getElementById("recordUsername").value;
    const record = {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        gender: document.getElementById("gender").value,  // e.g., "true" or "false"
        age: document.getElementById("age").value,
        weight: document.getElementById("weight").value,
        height: document.getElementById("height").value,
        health_history: document.getElementById("healthHistory").value
    };

    try {
        const response = await fetch(`${baseURL}/add_record`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, record })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message); 
        } else {
            alert(result.error || 'Error occurred');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please check the console for details.');
    }
}

// Attach Event Listeners to Forms (for each HTML page)
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", handleRegister);
}

if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
}

if (document.getElementById("queryForm")) {
    document.getElementById("queryForm").addEventListener("submit", handleQuery);
}

if (document.getElementById("addRecordForm")) {
    document.getElementById("addRecordForm").addEventListener("submit", handleAddRecord);
}
