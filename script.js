let resumes = [];
let validatedResumes = [];

// Function to handle resume uploads
function uploadResumes() {
  const files = document.getElementById('resumeUpload').files;

  // Check if any files were selected
  if (files.length === 0) {
    showAlert('No files selected. Please choose resumes to upload.', 'danger');
    return;
  }

  // Add file names to the resumes array
  for (let i = 0; i < files.length; i++) {
    resumes.push(files[i].name);
  }

  // Render updated resumes table and show success alert
  renderResumesTable();
  showAlert('Resumes uploaded successfully!', 'success');
}

// Function to validate selected resumes
function validateResumes() {
  const selectedResumes = getSelectedResumes();

  // Check if any resumes were selected
  if (selectedResumes.length === 0) {
    showAlert('Please select at least one resume to validate.', 'warning');
    return;
  }

  // Move selected resumes from resumes array to validatedResumes array
  for (const resume of selectedResumes) {
    const index = resumes.indexOf(resume);
    if (index !== -1) {
      validatedResumes.push(resume);
      resumes.splice(index, 1);
    }
  }

  // Render updated resumes and validatedResumes tables and show success alert
  renderResumesTable();
  renderValidatedResumesTable();
  showAlert('Resumes validated successfully!', 'success');
}

// Function to handle communication with selected validated resumes
function communicateWithResumes() {
  const selectedValidatedResumes = getSelectedValidatedResumes();

  // Check if any validated resumes were selected
  if (selectedValidatedResumes.length === 0) {
    showAlert('Please select at least one validated resume to communicate.', 'warning');
    return;
  }

  // Remove selected validated resumes from validatedResumes array
  for (const resume of selectedValidatedResumes) {
    const index = validatedResumes.indexOf(resume);
    if (index !== -1) {
      validatedResumes.splice(index, 1);
    }
  }

  // Render updated validatedResumes table and show success alert
  renderValidatedResumesTable();
  showAlert('Communication with resumes completed successfully!', 'success');
}

// Function to get selected resumes from the resumes table
function getSelectedResumes() {
  const checkboxes = document.querySelectorAll('#resumesTable input[type="checkbox"]:checked');
  const selectedResumes = [];
  
  checkboxes.forEach((checkbox) => {
    const resumeName = checkbox.parentNode.parentNode.firstChild.textContent;
    selectedResumes.push(resumeName);
  });
  
  return selectedResumes;
}

// Function to get selected validated resumes from the validated resumes table
function getSelectedValidatedResumes() {
  const checkboxes = document.querySelectorAll('#validatedResumesTable input[type="checkbox"]:checked');
  const selectedResumes = [];
  
  checkboxes.forEach((checkbox) => {
    const resumeName = checkbox.parentNode.parentNode.firstChild.textContent;
    selectedResumes.push(resumeName);
  });
  
  return selectedResumes;
}

// Function to render the resumes table
function renderResumesTable() {
  const tableBody = document.querySelector('#resumesTable tbody');
  tableBody.innerHTML = '';
  
  resumes.forEach((resume) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = resume;
    
    const actionCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    actionCell.appendChild(checkbox);
    
    row.appendChild(nameCell);
    row.appendChild(actionCell);
    tableBody.appendChild(row);
  });
}

// Function to render the validated resumes table
function renderValidatedResumesTable() {
  const tableBody = document.querySelector('#validatedResumesTable tbody');
  tableBody.innerHTML = '';
  
  validatedResumes.forEach((resume) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = resume;
    
    const actionCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    actionCell.appendChild(checkbox);
    
    row.appendChild(nameCell);
    row.appendChild(actionCell);
    tableBody.appendChild(row);
  });
}

// Function to show an alert message
function showAlert(message, type) {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type} mt-3`;
  alert.textContent = message;
  document.body.appendChild(alert);
  
  // Automatically remove the alert after 3 seconds
  setTimeout(() => {
    alert.remove();
  }, 3000);
}
