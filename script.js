
const projectsDataByMonth = {
    '2025-01': {
    projects: [
        { id: 1, companyName: 'TechCorp', projectName: 'CRM Upgrade', budget: 120000, employeeCapacity: 2.5, employees: 3, estimatedIncome: 45000 },
        { id: 2, companyName: 'DataFlow', projectName: 'Analytics Platform', budget: 200000, employeeCapacity: 3.0, employees: 4, estimatedIncome: 85000 }
    ]
    },
  '2025-02': { // February 2025
    projects: [
        { id: 1, companyName: 'TechCorp', projectName: 'CRM Upgrade', budget: 120000, employeeCapacity: 2.6, employees: 3, estimatedIncome: 48000 },
        { id: 2, companyName: 'DataFlow', projectName: 'Analytics Platform', budget: 200000, employeeCapacity: 3.2, employees: 4, estimatedIncome: 88000 }
    ]
    },
  '2026-01': { // January 2026
    projects: [
        { id: 1, companyName: 'TechCorp', projectName: 'CRM Upgrade', budget: 120000, employeeCapacity: 2.5, employees: 3, estimatedIncome: 45000 },
        { id: 2, companyName: 'DataFlow', projectName: 'Analytics Platform', budget: 200000, employeeCapacity: 3.0, employees: 4, estimatedIncome: 85000 },
        { id: 3, companyName: 'MobileSoft', projectName: 'Mobile App', budget: 80000, employeeCapacity: 1.5, employees: 2, estimatedIncome: 30000 }
    ]
    },
  '2026-02': { // February 2026
    projects: [
        { id: 1, companyName: 'TechCorp', projectName: 'CRM Upgrade', budget: 120000, employeeCapacity: 2.6, employees: 3, estimatedIncome: 48000 },
        { id: 2, companyName: 'DataFlow', projectName: 'Analytics Platform', budget: 200000, employeeCapacity: 3.2, employees: 4, estimatedIncome: 88000 },
        { id: 3, companyName: 'MobileSoft', projectName: 'Mobile App', budget: 80000, employeeCapacity: 1.6, employees: 2, estimatedIncome: 32000 },
        { id: 4, companyName: 'CloudNet', projectName: 'Cloud Migration', budget: 300000, employeeCapacity: 4.0, employees: 5, estimatedIncome: 120000 }
    ]
    },
  '2026-03': { // March 2026
    projects: [
        { id: 1, companyName: 'TechCorp', projectName: 'CRM Upgrade', budget: 120000, employeeCapacity: 2.8, employees: 4, estimatedIncome: 50000 },
        { id: 2, companyName: 'DataFlow', projectName: 'Analytics Platform', budget: 200000, employeeCapacity: 3.5, employees: 4, estimatedIncome: 90000 }
    ]
    }
};

const monthMap = {
    'january': '01',
    'february': '02',
    'march': '03',
    'april': '04',
    'may': '05',
    'june': '06',
    'july': '07',
    'august': '08',
    'september': '09',
    'october': '10',
    'november': '11',
    'december': '12'
};
let currentMonth = 'january';
let currentYear = '2026';

function getCurrentMonthKey() {
    const monthNum = monthMap[currentMonth];
    return `${currentYear}-${monthNum}`;
}

// ========== РАСЧЁТ TOTAL INCOME ==========
function calculateTotalIncome(projects) {
    if (!Array.isArray(projects)) return 0;
    return projects.reduce((sum, project) => sum + (project.estimatedIncome || 0), 0);
}
// ========== ОТОБРАЖЕНИЕ TOTAL INCOME ==========
function updateTotalIncomeDisplay(total) {
    const totalIncomeElement = document.querySelector('.total-income-value');
    if (totalIncomeElement) {
        totalIncomeElement.textContent = `$${total.toLocaleString()}`;
    }
}

// Render Project Row
function renderProjectRow(project) {
    return `
        <tr>
            <td>${escapeHtml(project.companyName)}</td>
            <td>${escapeHtml(project.projectName)}</td>
            <td>$${project.budget.toLocaleString()}</td>
            <td>${project.employeeCapacity}</td>
            <td>${project.employees}</td>
            <td>$${project.estimatedIncome.toLocaleString()}</td>
            <td>
                <button class="edit-btn" data-id="${project.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="delete-btn" data-id="${project.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
}

// Render Project Table
function renderProjectsTable() {
    const monthKey = getCurrentMonthKey();
    const monthData = projectsDataByMonth[monthKey];
    const projects = monthData ? monthData.projects : [];
    const tbody = document.querySelector('.projects__table tbody');

    if (!tbody) return;

    if (projects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:40px;">No projects for this period</td></tr>';
        updateTotalIncomeDisplay(0);
        return;
    }

    tbody.innerHTML = projects.map(project => renderProjectRow(project)).join('');

    const total = calculateTotalIncome(projects);
    updateTotalIncomeDisplay(total);

    document.querySelectorAll('.employees-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.dataset.projectId;
        const projectName = btn.dataset.projectName;
        showEmployeesModal(projectId, projectName);
    });
    });
}

function initSelectors() {
    const monthSelect = document.getElementById('months');
    const yearSelect = document.getElementById('years');

    if (monthSelect) {
    monthSelect.addEventListener('change', (e) => {
        currentMonth = e.target.value;
        renderProjectsTable();
    });
    }

    if (yearSelect) {
    yearSelect.addEventListener('change', (e) => {
        currentYear = e.target.value;
        renderProjectsTable();
    });
    }
}

function initSorting() {
    const sortableHeaders = document.querySelectorAll('.sortable');
    
    sortableHeaders.forEach(header => {
        const icon = header.querySelector('.fa-arrow-down-wide-short');
        if (!icon) return;
        
        icon.style.cursor = 'pointer';
        icon.style.transition = 'all 0.2s';
        
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const sortKey = header.dataset.sort;
            
            
            if (sortConfig.key === sortKey) {
                sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
            } else {
                sortConfig.key = sortKey;
                sortConfig.direction = 'asc';
            }
            
            renderProjectsTable();
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSelectors();
    initSorting();
    renderProjectsTable();
});

// Toggle close
const toggleBtn = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// ========== ADD PROJECT PANEL ==========
const panel = document.getElementById('addProjectPanel');
const openPanelBtn = document.querySelector('.project-btn');
const closePanelBtns = [document.getElementById('closeProjectPanelBtn'), document.getElementById('cancelProjectBtn')];
const projectForm = document.getElementById('addProjectForm');

// Form inputs
const projNameInput = document.getElementById('projectName');
const companyNameInput = document.getElementById('companyName');
const budgetInput = document.getElementById('budget');
const capacityInput = document.getElementById('employeeCapacity');

// Errors
const projNameErr = document.getElementById('projectNameError');
const companyNameErr = document.getElementById('companyNameError');
const budgetErr = document.getElementById('budgetError');
const capacityErr = document.getElementById('employeeCapacityError');

// Validation state
let validation = {
    projectName: false,
    companyName: false,
    budget: false,
    capacity: false
};

// Btn update
function updateSubmitButton() {
    const submitBtn = document.getElementById('submitProjectBtn');
    const allValid = Object.values(validation).every(v => v === true);
    if (submitBtn) submitBtn.disabled = !allValid;
}

// Validates
function validateProjectName() {
    const value = projNameInput.value.trim();
    const regex = /^[a-zA-Z0-9\s]{3,}$/;
    if (!value) {
        projNameErr.textContent = 'Project name is required';
        projNameInput.classList.add('error');
        projNameInput.classList.remove('valid');
        return false;
    }
    if (!regex.test(value)) {
        projNameErr.textContent = 'Must be at least 3 characters, letters/numbers only';
        projNameInput.classList.add('error');
        projNameInput.classList.remove('valid');
        return false;
    }
    projNameErr.textContent = '';
    projNameInput.classList.remove('error');
    projNameInput.classList.add('valid');
    return true;
}

function validateCompanyName() {
    const value = companyNameInput.value.trim();
    const regex = /^[a-zA-Z0-9\s]{2,}$/;
    if (!value) {
        companyNameErr.textContent = 'Company name is required';
        companyNameInput.classList.add('error');
        companyNameInput.classList.remove('valid');
        return false;
    }
    if (!regex.test(value)) {
        companyNameErr.textContent = 'Must be at least 2 characters, letters/numbers only';
        companyNameInput.classList.add('error');
        companyNameInput.classList.remove('valid');
        return false;
    }
    companyNameErr.textContent = '';
    companyNameInput.classList.remove('error');
    companyNameInput.classList.add('valid');
    return true;
}

function validateBudget() {
    const value = budgetInput.value.trim();
    if (!value) {
        budgetErr.textContent = 'Budget is required';
        budgetInput.classList.add('error');
        budgetInput.classList.remove('valid');
        return false;
    }
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
        budgetErr.textContent = 'Budget must be a positive number';
        budgetInput.classList.add('error');
        budgetInput.classList.remove('valid');
        return false;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        budgetErr.textContent = 'Budget can have up to 2 decimal places';
        budgetInput.classList.add('error');
        budgetInput.classList.remove('valid');
        return false;
    }
    budgetErr.textContent = '';
    budgetInput.classList.remove('error');
    budgetInput.classList.add('valid');
    return true;
}

function validateCapacity() {
    const value = capacityInput.value.trim();
    if (!value) {
        capacityErr.textContent = 'Employee capacity is required';
        capacityInput.classList.add('error');
        capacityInput.classList.remove('valid');
        return false;
    }
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 1 || !Number.isInteger(num)) {
        capacityErr.textContent = 'Must be an integer ≥ 1';
        capacityInput.classList.add('error');
        capacityInput.classList.remove('valid');
        return false;
    }
    capacityErr.textContent = '';
    capacityInput.classList.remove('error');
    capacityInput.classList.add('valid');
    return true;
}


projNameInput.addEventListener('input', () => { validation.projectName = validateProjectName(); updateSubmitButton(); });
projNameInput.addEventListener('blur', () => { validation.projectName = validateProjectName(); updateSubmitButton(); });
companyNameInput.addEventListener('input', () => { validation.companyName = validateCompanyName(); updateSubmitButton(); });
companyNameInput.addEventListener('blur', () => { validation.companyName = validateCompanyName(); updateSubmitButton(); });
budgetInput.addEventListener('input', () => { validation.budget = validateBudget(); updateSubmitButton(); });
budgetInput.addEventListener('blur', () => { validation.budget = validateBudget(); updateSubmitButton(); });
capacityInput.addEventListener('input', () => { validation.capacity = validateCapacity(); updateSubmitButton(); });
capacityInput.addEventListener('blur', () => { validation.capacity = validateCapacity(); updateSubmitButton(); });


function openProjectPanel() {
    panel.classList.add('open');
    projectForm.reset();
    
    [projNameInput, companyNameInput, budgetInput, capacityInput].forEach(inp => {
        inp.classList.remove('error', 'valid');
    });
    [projNameErr, companyNameErr, budgetErr, capacityErr].forEach(err => err.textContent = '');
    validation = { projectName: false, companyName: false, budget: false, capacity: false };
    updateSubmitButton();
}


function closeProjectPanel() {
    panel.classList.remove('open');
}


if (openPanelBtn) openPanelBtn.addEventListener('click', openProjectPanel);
closePanelBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', closeProjectPanel);
});

const overlay = document.querySelector('.panel-overlay');
if (overlay) overlay.addEventListener('click', closeProjectPanel);


projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateProjectName();
    const isCompanyValid = validateCompanyName();
    const isBudgetValid = validateBudget();
    const isCapacityValid = validateCapacity();
    if (isNameValid && isCompanyValid && isBudgetValid && isCapacityValid) {
        const newProject = {
            id: Date.now(),
            companyName: companyNameInput.value.trim(),
            projectName: projNameInput.value.trim(),
            budget: parseFloat(budgetInput.value),
            employeeCapacity: parseInt(capacityInput.value, 10),
            employees: 0,
            estimatedIncome: 0
        };
        
        const monthKey = getCurrentMonthKey();
        if (projectsDataByMonth[monthKey]) {
            projectsDataByMonth[monthKey].projects.push(newProject);
        } else {
            projectsDataByMonth[monthKey] = { projects: [newProject] };
        }
        
        renderProjectsTable();
        closeProjectPanel();
        
        alert(`Project "${newProject.projectName}" added successfully!`);
    }
});



// Employes Modal
// function showEmployeesModal(projectId, projectName) {

//     const modal = document.createElement('div');
//     modal.className = 'employees-modal';
//     modal.innerHTML = `
//     <div class="modal-overlay">
//         <div class="modal-container">
//         <div class="modal-header">
//             <h3><i class="fa-solid fa-users"></i> ${projectName} - Employees</h3>
//             <button class="modal-close">&times;</button>
//         </div>
//         <div class="modal-body">
//             <table class="employees-list-table">
//             <thead>
//                 <tr><th>Name</th><th>Position</th><th>Capacity</th></tr>
//             </thead>
//             <tbody id="employeesListBody"></tbody>
//             </table>
//         </div>
//         <div class="modal-footer">
//             <button class="btn-add-employee">+ Add Employee</button>
//         </div>
//         </div>
//     </div>
//     `;
    
//     document.body.appendChild(modal);
    
//   // Загружаем сотрудников для проекта
//     loadEmployeesForProject(projectId);
    
//   // Закрытие модалки
//     modal.querySelector('.modal-close').onclick = () => modal.remove();
//     modal.querySelector('.modal-overlay').onclick = (e) => {
//     if (e.target === modal.querySelector('.modal-overlay')) modal.remove();
//     };
// }

// function loadEmployeesForProject(projectId) {
//   // Данные сотрудников на проекте
//     const projectEmployees = {
//     1: [
//         { name: 'John Smith', position: 'Senior Developer', capacity: 0.8 },
//         { name: 'Anna Lee', position: 'QA Engineer', capacity: 0.5 }
//     ],
//     2: [
//         { name: 'Mike Brown', position: 'Project Manager', capacity: 1.0 },
//         { name: 'Sarah Davis', position: 'Data Analyst', capacity: 0.7 }
//     ]
//     };
    
//     const employees = projectEmployees[projectId] || [];
//     const tbody = document.getElementById('employeesListBody');
    
//     if (tbody) {
//     tbody.innerHTML = employees.map(emp => `
//         <tr>
//         <td>${emp.name}</td>
//         <td>${emp.position}</td>
//         <td>${emp.capacity}</td>
//         </tr>
//     `).join('');
//     }
// }

// // Рендер таблицы с кнопкой в колонке Employees
// function renderProjectsTable() {
//     const monthKey = getCurrentMonthKey();
//     const monthData = projectsDataByMonth[monthKey];
//     const projects = monthData ? monthData.projects : [];
    
//     const tbody = document.querySelector('.projects__table tbody');
//     if (!tbody) return;

//     tbody.innerHTML = projects.map(project => `
//     <tr data-project-id="${project.id}">
//         <td>${escapeHtml(project.companyName)}</td>
//         <td>${escapeHtml(project.projectName)}</td>
//         <td>$${project.budget.toLocaleString()}</td>
//         <td>${project.employeeCapacity}</td>
//         <td class="employees-cell">
//         <button class="employees-btn" data-project-id="${project.id}" data-project-name="${escapeHtml(project.projectName)}">
//             Show Employees<br>
//             <i class="fa-solid fa-users"></i> (${project.employees})
//         </button>
//         </td>
//         <td>$${project.estimatedIncome.toLocaleString()}</td>
//         <td>
//         <button class="edit-btn" data-id="${project.id}">
//             <i class="fa-solid fa-pen"></i>
//         </button>
//         <button class="delete-btn" data-id="${project.id}">
//             <i class="fa-solid fa-trash"></i>
//         </button>
//         </td>
//     </tr>
//     `).join('');
        
//   // Добавляем обработчики на кнопки Employees
//     document.querySelectorAll('.employees-btn').forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         e.stopPropagation();
//         const projectId = btn.dataset.projectId;
//         const projectName = btn.dataset.projectName;
//         showEmployeesModal(projectId, projectName);
//     });
//     });
    
//     updateTotalIncome(projects);
// }

// // Sorted

// // Состояние сортировки
// let sortConfig = {
//     key: null,      // поле для сортировки
//     direction: 'asc' // 'asc' или 'desc'
// };

// // Функция сортировки
// function sortProjects(projects, sortKey, direction) {
//     const sorted = [...projects];
    
//     sorted.sort((a, b) => {
//         let aVal = a[sortKey];
//         let bVal = b[sortKey];
        
//         // Для строк
//         if (typeof aVal === 'string') {
//             aVal = aVal.toLowerCase();
//             bVal = bVal.toLowerCase();
//         }
        
//         if (aVal < bVal) return direction === 'asc' ? -1 : 1;
//         if (aVal > bVal) return direction === 'asc' ? 1 : -1;
//         return 0;
//     });
    
//     return sorted;
// }

// // Рендер таблицы с сортировкой
// function renderProjectsTable() {
//     const monthKey = getCurrentMonthKey();
//     const monthData = projectsDataByMonth[monthKey];
//     let projects = monthData ? monthData.projects : [];
    
//     // ПРИМЕНЯЕМ СОРТИРОВКУ
//     if (sortConfig.key) {
//         projects = sortProjects(projects, sortConfig.key, sortConfig.direction);
//     }
    
//     const tbody = document.querySelector('.projects__table tbody');
//     if (!tbody) return;
    
//     if (projects.length === 0) {
//         tbody.innerHTML = '<tr><td colspan="7">No projects for this period</td></tr>';
//         updateTotalIncome(0);
//         return;
//     }
    
//     tbody.innerHTML = projects.map(project => `
//         <tr>
//             <td>${escapeHtml(project.companyName)}</td>
//             <td>${escapeHtml(project.projectName)}</td>
//             <td>$${project.budget.toLocaleString()}</td>
//             <td>${project.employeeCapacity}</td>
//             <td>
//                 <button class="employees-btn" data-project-id="${project.id}" data-project-name="${escapeHtml(project.projectName)}">
//                     Show Employees<br>
//                     <i class="fa-solid fa-users"></i> (${project.employees})
//                 </button>
//             </td>
//             <td>$${project.estimatedIncome.toLocaleString()}</td>
//             <td>
//                 <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
//                 <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
//             </td>
//         </tr>
//     `).join('');
// }