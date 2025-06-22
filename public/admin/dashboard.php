
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>PrepPoint Admin Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <!-- DataTables CSS -->
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css" />
  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body class="bg-gray-100 text-gray-800">

<div class="flex h-screen overflow-hidden">
  <!-- Sidebar -->
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <div class="h-16 flex items-center justify-center border-b">
      <h1 class="text-xl font-bold text-blue-600">PrepPoint</h1>
    </div>
    <nav class="p-4 space-y-2 flex-1 overflow-y-auto text-sm">
      <a href="#" id="dashboardLink" class="flex items-center p-2 bg-blue-100 text-blue-700 rounded font-medium">
        <i class="fas fa-tachometer-alt mr-3"></i> Dashboard
      </a>

      <a href="#" id="categoriesLink" class="flex items-center p-2 hover:bg-gray-100 rounded">
        <i class="fas fa-folder-tree mr-3"></i> Categories & Subcategories  
      </a>

      <a href="#" id="subjectLink" class="flex items-center p-2 hover:bg-gray-100 rounded">
        <i class="fas fa-book-open mr-3"></i> Subject Management
      </a>

      <a href="manage-mcqs.html" class="flex items-center p-2 hover:bg-gray-100 rounded">
        <i class="fas fa-question-circle mr-3"></i> Manage MCQs
      </a>

      <a href="user-submitted-mcqs.html" class="flex items-center p-2 hover:bg-gray-100 rounded">
        <i class="fas fa-user-edit mr-3"></i> User Submitted MCQs
      </a>

      <a href="static-pages.html" class="flex items-center p-2 hover:bg-gray-100 rounded">
        <i class="fas fa-file-alt mr-3"></i> Static Pages
      </a>

      <a href="manage-admins.html" class="flex items-center p-2 hover:bg-gray-100 rounded">
        <i class="fas fa-users-cog mr-3"></i> Admin Users
      </a>
    </nav>
    <div class="p-4 border-t">
      <button class="w-full text-left text-red-600 hover:text-red-800 flex items-center">
        <i class="fas fa-sign-out-alt mr-2"></i> Logout
      </button>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="flex-1 flex flex-col">
    <!-- Header -->
    <header class="h-16 bg-white flex items-center justify-between px-6 border-b shadow-sm">
      <h2 class="text-xl font-semibold" id="pageTitle">Dashboard</h2>
      <div class="flex items-center gap-4">
        <a href="admin-profile.html" title="Edit Profile" class="text-sm text-gray-600 hover:text-blue-600 flex items-center">
          <img src="https://ui-avatars.com/api/?name=Admin&background=0A5EB0&color=fff" alt="avatar"
            class="h-9 w-9 rounded-full border border-gray-300 shadow-sm" />
          <span class="ml-2 hidden md:inline">My Profile</span>
        </a>
      </div>
    </header>

    <!-- Dashboard Content -->
    <main class="p-6 overflow-y-auto bg-gray-50 flex-1" id="dashboardContent">
      <!-- Stats Cards -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div class="bg-white shadow p-6 rounded-lg">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm text-gray-500">Total MCQs</h3>
              <p class="text-2xl font-bold text-blue-600">12,584</p>
            </div>
            <i class="fas fa-question-circle text-3xl text-blue-500"></i>
          </div>
        </div>

        <div class="bg-white shadow p-6 rounded-lg">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm text-gray-500">User-Submitted MCQs</h3>
              <p class="text-2xl font-bold text-yellow-500">342</p>
            </div>
            <i class="fas fa-user-edit text-3xl text-yellow-500"></i>
          </div>
        </div>

        <div class="bg-white shadow p-6 rounded-lg">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm text-gray-500">Categories & Subcategories</h3>
              <p class="text-2xl font-bold text-green-600">64</p>
            </div>
            <i class="fas fa-layer-group text-3xl text-green-500"></i>
          </div>
        </div>

        <div class="bg-white shadow p-6 rounded-lg">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm text-gray-500">Admins</h3>
              <p class="text-2xl font-bold text-purple-600">5</p>
            </div>
            <i class="fas fa-users-cog text-3xl text-purple-500"></i>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mb-8 grid grid-cols-4 gap-6 text-sm">
        <a href="add-mcq.html" class="p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
          <h4 class="font-medium text-blue-700">➕ Add New MCQ</h4>
          <p class="text-blue-600 mt-1">Create MCQ for any subtopic</p>
        </a>

        <a href="#" id="categoriesQuickLink" class="p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition">
          <h4 class="font-medium text-green-700">🧭 Manage Categories</h4>
          <p class="text-green-600 mt-1">Add/Edit domain, subject & topics</p>
        </a>

        <a href="#" id="subjectQuickLink" class="p-6 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition">
          <h4 class="font-medium text-indigo-700">📚 Manage Subjects</h4>
          <p class="text-indigo-600 mt-1">Add/Edit subjects across categories</p>
        </a>

        <a href="static-pages.html" class="p-6 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <h4 class="font-medium text-gray-800">📄 Edit Static Pages</h4>
          <p class="text-gray-600 mt-1">Update About Us / Privacy Policy</p>
        </a>
      </div>

      <!-- Activity Logs -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul class="space-y-3 text-sm text-gray-600">
          <li>✔️ Umesh approved 20 MCQs in “Java → Arrays” (2 mins ago)</li>
          <li>➕ New Topic added: C++ → Pointers (15 mins ago)</li>
          <li>⚠️ Sheetal rejected 5 spam MCQs submitted by user (1 hour ago)</li>
          <li>🧾 Privacy Policy page updated by Admin Neha (Yesterday)</li>
        </ul>
      </div>
    </main>

    <!-- Embedded Categories Management Section (hidden by default) -->
    <main class="p-6 overflow-y-auto bg-gray-50 flex-1 hidden" id="categoriesManagementContent">
      <!-- Begin categories_managment.html body content -->
      <div class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h2 class="text-2xl font-semibold">Manage Categories & Subcategories</h2>
        <button onclick="openCategoryModal()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <i class="fas fa-plus mr-1"></i> Add Category
        </button>
      </div>

      <div class="p-6 space-y-6">
        <div class="bg-white rounded shadow p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-xl font-semibold text-blue-700">IT</h3>
            <div>
              <button onclick="editCategory('IT')" class="text-yellow-600 hover:text-yellow-800 mr-2">
                <i class="fas fa-edit"></i>
              </button>
              <button onclick="openDeleteConfirm('category', 'IT')" class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>

          <div class="ml-4 space-y-2">
            <div class="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>Programming</span>
              <div>
                <button onclick="editSubcategory('Programming')" class="text-yellow-600 hover:text-yellow-800 mr-2">
                  <i class="fas fa-edit"></i>
                </button>
                <button onclick="openDeleteConfirm('subcategory', 'Programming')" class="text-red-600 hover:text-red-800">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            <div class="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>Core Subjects</span>
              <div>
                <button onclick="editSubcategory('Core Subjects')" class="text-yellow-600 hover:text-yellow-800 mr-2">
                  <i class="fas fa-edit"></i>
                </button>
                <button onclick="openDeleteConfirm('subcategory', 'Core Subjects')" class="text-red-600 hover:text-red-800">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            <button onclick="openSubcategoryModal('IT')" class="mt-3 text-sm text-blue-600 hover:text-blue-800">
              <i class="fas fa-plus-circle"></i> Add Subcategory
            </button>
          </div>
        </div>
      </div>

      <!-- CATEGORY Modal -->
      <div id="categoryModal" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-[400px]">
          <h3 class="text-xl font-semibold mb-4" id="categoryModalTitle">Add Category</h3>
          <input type="text" id="categoryNameInput" class="w-full border border-gray-300 p-2 rounded mb-4" placeholder="Category Name" />
          <div class="text-right space-x-2">
            <button onclick="closeCategoryModal()" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button onclick="saveCategory()" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </div>
      </div>

      <!-- SUBCATEGORY Modal -->
      <div id="subcategoryModal" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-[400px]">
          <h3 class="text-xl font-semibold mb-4" id="subcategoryModalTitle">Add Subcategory</h3>
          <input type="text" id="subcategoryNameInput" class="w-full border border-gray-300 p-2 rounded mb-4" placeholder="Subcategory Name" />
          <input type="hidden" id="subcategoryCategory" />
          <div class="text-right space-x-2">
            <button onclick="closeSubcategoryModal()" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button onclick="saveSubcategory()" class="px-4 py-2 bg-green-600 text-white rounded">Save</button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div id="deleteConfirmModal" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-[400px]">
          <h3 class="text-xl font-semibold mb-4" id="deleteConfirmTitle">Confirm Delete</h3>
          <p id="deleteConfirmMessage" class="mb-6"></p>
          <div class="text-right space-x-2">
            <button onclick="closeDeleteConfirm()" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button onclick="confirmDelete()" class="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
          </div>
        </div>
      </div>

      <!-- Alert Box -->
      <div id="alertBox" class="hidden fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-30 z-50 flex items-center justify-center">
        <div class="bg-blue-600 text-white px-6 py-4 rounded shadow-lg flex items-center space-x-4">
          <span id="alertMessage"></span>
          <button onclick="closeAlert()" class="font-bold text-xl leading-none">×</button>
        </div>
      </div>
      <!-- End categories_managment.html content -->
    </main>

    <!-- Embedded Subject Management Section (hidden by default) -->
    <main class="p-6 overflow-y-auto bg-gray-50 flex-1 hidden" id="subjectManagementContent">
      <!-- Begin subject_managment.html body content -->
      <div class="p-6">

        <!-- Page Header -->
        <div class="mb-6 flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Subject Management</h2>
            <p class="text-sm text-gray-500">Add, filter, and manage all subjects across categories and subcategories.</p>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white p-4 rounded shadow mb-6 flex flex-col lg:flex-row lg:items-center gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-600 mb-1">Filter by Category</label>
            <select class="w-full border border-gray-300 rounded px-3 py-2" name="filter_category" id="filter_category">
              <option value="">-- All Categories --</option>
              <option value="it">IT</option>
              <option value="government">Government</option>
              <option value="bank">Bank</option>
              <option value="school">School</option>
            </select>
          </div>

          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-600 mb-1">Filter by Subcategory</label>
            <select class="w-full border border-gray-300 rounded px-3 py-2" name="filter_subcategory" id="filter_subcategory">
              <option value="">-- All Subcategories --</option>
              <option value="programming">Programming</option>
              <option value="core-subjects">Core Subjects</option>
              <option value="aptitude">Aptitude</option>
              <option value="reasoning">Reasoning</option>
              <option value="language">Language</option>
            </select>
          </div>

          <div class="mt-2 lg:mt-6">
            <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              Filter
            </button>
          </div>
        </div>

        <!-- Add New Subject Form -->
        <div class="bg-white p-6 rounded shadow mb-10 max-w-3xl">
          <h3 class="text-lg font-semibold mb-4">Add New Subject</h3>
          <form action="#" method="POST" class="space-y-4">

            <div>
              <label class="block font-medium mb-1">Select Category</label>
              <select name="category" class="w-full border border-gray-300 rounded px-3 py-2" required>
                <option value="">-- Select Category --</option>
                <option value="it">IT</option>
                <option value="government">Government</option>
                <option value="bank">Bank</option>
                <option value="school">School</option>
              </select>
            </div>

            <div>
              <label class="block font-medium mb-1">Select Subcategory</label>
              <select name="subcategory" class="w-full border border-gray-300 rounded px-3 py-2" required>
                <option value="">-- Select Subcategory --</option>
                <option value="programming">Programming</option>
                <option value="core-subjects">Core Subjects</option>
                <option value="aptitude">Aptitude</option>
              </select>
            </div>

            <div>
              <label class="block font-medium mb-1">Subject Name</label>
              <input type="text" name="subject" placeholder="e.g. Java, HTML, DBMS"
                class="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>

            <button type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Add Subject
            </button>
          </form>
        </div>

        <!-- Subject Table -->
        <div class="bg-white p-6 rounded shadow">
          <h3 class="text-lg font-semibold mb-4">Subjects List</h3>
          <div class="overflow-x-auto">
            <table id="subjectTable" class="min-w-full table-auto border border-gray-200">
              <thead class="bg-gray-100 text-gray-700">
                <tr>
                  <th class="px-4 py-2 border text-sm">#</th>
                  <th class="px-4 py-2 border text-sm">Category</th>
                  <th class="px-4 py-2 border text-sm">Subcategory</th>
                  <th class="px-4 py-2 border text-sm">Subject Name</th>
                  <th class="px-4 py-2 border text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-2 border text-sm">1</td>
                  <td class="px-4 py-2 border text-sm">IT</td>
                  <td class="px-4 py-2 border text-sm">Programming</td>
                  <td class="px-4 py-2 border text-sm">Java</td>
                  <td class="px-4 py-2 border text-sm space-x-2">
                    <button class="bg-yellow-400 text-white px-2 py-1 rounded text-xs hover:bg-yellow-500">Edit</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Delete</button>
                  </td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-2 border text-sm">2</td>
                  <td class="px-4 py-2 border text-sm">IT</td>
                  <td class="px-4 py-2 border text-sm">Core Subjects</td>
                  <td class="px-4 py-2 border text-sm">Operating Systems</td>
                  <td class="px-4 py-2 border text-sm space-x-2">
                    <button class="bg-yellow-400 text-white px-2 py-1 rounded text-xs hover:bg-yellow-500">Edit</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <!-- End subject_managment.html content -->
    </main>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
<script src="assets/js/scripts.js"></script>

</body>
</html>
