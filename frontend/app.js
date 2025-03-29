document.addEventListener("DOMContentLoaded", () => {
  console.log("Frontend is connected!");

  let ctx = document.getElementById("vulnChart").getContext("2d");
  let vulnChart = new Chart(ctx, {
      type: "bar",
      data: { labels: [], datasets: [{ label: "Vulnerability Count", data: [], backgroundColor: "red" }] },
      options: { responsive: true }
  });

  document.querySelector("button").addEventListener("click", async () => {
      const fileInput = document.getElementById("fileInput");
      if (!fileInput.files.length) {
          alert("Please select a file!");
          return;
      }

      const formData = new FormData();
      formData.append("contract", fileInput.files[0]);

      const response = await fetch("http://localhost:5000/detect", { method: "POST", body: formData });
      const result = await response.json();

      document.getElementById("output").innerText = result.message;

      // Update Chart
      vulnChart.data.labels = Object.keys(result.vulnerabilities || {});
      vulnChart.data.datasets[0].data = Object.values(result.vulnerabilities || {});
      vulnChart.update();
  });
});
