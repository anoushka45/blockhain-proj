document.getElementById('upload-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('contract', file);

  document.getElementById('loading').classList.remove('d-none');
  document.getElementById('error-message').classList.add('d-none');
  document.getElementById('success-message').classList.add('d-none');
  document.getElementById('vulnerabilities').innerHTML = '';
  
  try {
    const response = await fetch('/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');
    
    const result = await response.json();
    const vulnerabilities = result.vulnerabilities;
    const fileType = result.fileType;

    document.getElementById('loading').classList.add('d-none');
    document.getElementById('success-message').classList.remove('d-none');

    if (vulnerabilities.length > 0) {
      const vulnList = document.createElement('ul');
      vulnerabilities.forEach(vuln => {
        const li = document.createElement('li');
        li.textContent = vuln;
        vulnList.appendChild(li);
      });
      document.getElementById('vulnerabilities').appendChild(vulnList);
    } else {
      document.getElementById('vulnerabilities').innerHTML = "<p>No vulnerabilities detected!</p>";
    }

    drawChart(vulnerabilities, fileType);
    
  } catch (error) {
    console.error(error);
    document.getElementById('loading').classList.add('d-none');
    document.getElementById('error-message').classList.remove('d-none');
  }
});

function drawChart(vulnerabilities, fileType) {
  const ctx = document.getElementById('vulnChart').getContext('2d');

  // Group vulnerabilities
  const counts = {};
  vulnerabilities.forEach(vuln => {
    counts[vuln] = (counts[vuln] || 0) + 1;
  });

  const labels = Object.keys(counts);
  const data = Object.values(counts);

  // Destroy previous chart if exists
  if (window.vulnChartInstance) {
    window.vulnChartInstance.destroy();
  }

  window.vulnChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: `Vulnerabilities found in ${fileType.toUpperCase()} contract`,
        data,
        backgroundColor: 'rgba(255, 16, 171, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Occurrences'
          }
        }
      }
    }
  });
}
