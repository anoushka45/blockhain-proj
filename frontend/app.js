// frontend/app.js
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    const fileInput = document.getElementById('file-input');
    formData.append('contract', fileInput.files[0]);

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayVulnerabilities(data.vulnerabilities);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function displayVulnerabilities(vulnerabilities) {
    const vulnerabilitiesDiv = document.getElementById('vulnerabilities');
    vulnerabilitiesDiv.innerHTML = ''; // Clear previous results

    if (vulnerabilities.length === 0) {
        vulnerabilitiesDiv.innerHTML = 'No vulnerabilities detected.';
        return;
    }

    const ul = document.createElement('ul');
    vulnerabilities.forEach(vuln => {
        const li = document.createElement('li');
        li.textContent = vuln;
        ul.appendChild(li);
    });

    vulnerabilitiesDiv.appendChild(ul);
}
