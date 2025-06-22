// Sidebar dashboard link click handler
document.getElementById('dashboardLink').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('categoriesManagementContent').classList.add('hidden');
  document.getElementById('subjectManagementContent').classList.add('hidden');
  document.getElementById('dashboardContent').classList.remove('hidden');
  document.getElementById('pageTitle').textContent = 'Dashboard';

  // Update sidebar active classes
  document.getElementById('dashboardLink').classList.add('bg-blue-100', 'text-blue-700', 'font-medium');
  document.getElementById('categoriesLink').classList.remove('bg-blue-100', 'text-blue-700', 'font-medium');
  document.getElementById('subjectLink').classList.remove('bg-indigo-100', 'text-indigo-700', 'font-medium');
});

// Sidebar categories link click handler
document.getElementById('categoriesLink').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('dashboardContent').classList.add('hidden');
  document.getElementById('subjectManagementContent').classList.add('hidden');
  document.getElementById('categoriesManagementContent').classList.remove('hidden');
  document.getElementById('pageTitle').textContent = 'Manage Categories & Subcategories';

  // Update sidebar active classes
  document.getElementById('categoriesLink').classList.add('bg-blue-100', 'text-blue-700', 'font-medium');
  document.getElementById('dashboardLink').classList.remove('bg-blue-100', 'text-blue-700', 'font-medium');
  document.getElementById('subjectLink').classList.remove('bg-indigo-100', 'text-indigo-700', 'font-medium');
});

// Sidebar subject link click handler
document.getElementById('subjectLink').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('dashboardContent').classList.add('hidden');
  document.getElementById('categoriesManagementContent').classList.add('hidden');
  document.getElementById('subjectManagementContent').classList.remove('hidden');
  document.getElementById('pageTitle').textContent = 'Subject Management';

  // Update sidebar active classes
  document.getElementById('subjectLink').classList.add('bg-indigo-100', 'text-indigo-700', 'font-medium');
  document.getElementById('dashboardLink').classList.remove('bg-blue-100', 'text-blue-700', 'font-medium');
  document.getElementById('categoriesLink').classList.remove('bg-blue-100', 'text-blue-700', 'font-medium');
});

// Quick action categories link click handler
document.getElementById('categoriesQuickLink').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('dashboardContent').classList.add('hidden');
  document.getElementById('subjectManagementContent').classList.add('hidden');
  document.getElementById('categoriesManagementContent').classList.remove('hidden');
  document.getElementById('pageTitle').textContent = 'Manage Categories & Subcategories';

  // Update sidebar active classes
  document.getElementById('categoriesLink').classList.add('bg-blue-100', 'text-blue-700', 'font-medium');
  document.getElementById('dashboardLink').classList.remove('bg-blue-100', 'text-blue-700', 'font-medium');
  document.getElementById('subjectLink').classList.remove('bg-indigo-100', 'text-indigo-700', 'font-medium');
});

// Quick action subject link click handler
document.getElementById('subjectQuickLink').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('dashboardContent').classList.add('hidden');
  document.getElementById('categoriesManagementContent').classList.add('hidden');
  document.getElementById('subjectManagementContent').classList.remove('hidden');
  document.getElementById('pageTitle').textContent = 'Subject Management';

  // Update sidebar active classes
  document.getElementById('subjectLink').classList.add('bg-indigo-100', 'text-indigo-700', 'font-medium');
  document.getElementById('dashboardLink').classList.remove('bg-blue-100', 'text-blue-700', 'font-medium');
  document.getElementById('categoriesLink').classList.remove('bg-blue-100', 'text-blue-700', 'font-medium');
});

// Functions from categories_managment.html for modals and alerts
let deleteType = null;
let deleteName = null;

function showAlert(message) {
  const alertBox = document.getElementById("alertBox");
  const alertMessage = document.getElementById("alertMessage");
  alertMessage.textContent = message;
  alertBox.classList.remove("hidden");
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 3000);
}
function closeAlert() {
  document.getElementById("alertBox").classList.add("hidden");
}

function openCategoryModal() {
  document.getElementById("categoryModal").classList.remove("hidden");
  document.getElementById("categoryModalTitle").innerText = "Add Category";
  document.getElementById("categoryNameInput").value = "";
}
function closeCategoryModal() {
  document.getElementById("categoryModal").classList.add("hidden");
}
function saveCategory() {
  const name = document.getElementById("categoryNameInput").value;
  if (name) {
    // TODO: AJAX call to save category
    showAlert(`Category "${name}" saved.`);
    closeCategoryModal();
  }
}

function openSubcategoryModal(category) {
  document.getElementById("subcategoryModal").classList.remove("hidden");
  document.getElementById("subcategoryModalTitle").innerText = "Add Subcategory";
  document.getElementById("subcategoryNameInput").value = "";
  document.getElementById("subcategoryCategory").value = category;
}
function closeSubcategoryModal() {
  document.getElementById("subcategoryModal").classList.add("hidden");
}
function saveSubcategory() {
  const name = document.getElementById("subcategoryNameInput").value;
  const category = document.getElementById("subcategoryCategory").value;
  if (name && category) {
    // TODO: AJAX call to save subcategory under given category
    showAlert(`Subcategory "${name}" added to "${category}".`);
    closeSubcategoryModal();
  }
}

function openDeleteConfirm(type, name) {
  deleteType = type;
  deleteName = name;
  document.getElementById("deleteConfirmTitle").innerText = `Confirm Delete ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  document.getElementById("deleteConfirmMessage").innerText = `Are you sure you want to delete the ${type} "${name}"?`;
  document.getElementById("deleteConfirmModal").classList.remove("hidden");
}
function closeDeleteConfirm() {
  document.getElementById("deleteConfirmModal").classList.add("hidden");
  deleteType = null;
  deleteName = null;
}
function confirmDelete() {
  // TODO: AJAX call to delete the category or subcategory
  showAlert(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} "${deleteName}" deleted.`);
  closeDeleteConfirm();
}

function editCategory(name) {
  openCategoryModal();
  document.getElementById("categoryModalTitle").innerText = "Edit Category";
  document.getElementById("categoryNameInput").value = name;
  // Store ID or name if needed for update
}

function editSubcategory(name) {
  openSubcategoryModal("IT"); // For now, assuming from IT
  document.getElementById("subcategoryModalTitle").innerText = "Edit Subcategory";
  document.getElementById("subcategoryNameInput").value = name;
}

// Initialize DataTables for subject table
$(document).ready(function() {
  $('#subjectTable').DataTable();
});
