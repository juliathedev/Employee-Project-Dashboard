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

const employeesData = [
    { id: 101, firstName: 'John', lastName: 'Smith', dateOfBirth: '1990-05-15', position: 'Senior', salary: 5000 },
    { id: 102, firstName: 'Anna', lastName: 'Lee', dateOfBirth: '1995-08-22', position: 'Junior', salary: 3500 },
    { id: 103, firstName: 'Mike', lastName: 'Brown', dateOfBirth: '1985-11-02', position: 'Lead', salary: 6200 },
    { id: 104, firstName: 'Sarah', lastName: 'Davis', dateOfBirth: '1992-03-10', position: 'Middle', salary: 4800 },
    { id: 105, firstName: 'David', lastName: 'Wilson', dateOfBirth: '1988-07-19', position: 'Architect', salary: 2500 }
];

const fitCoefficients = {
    1: { // CRM Upgrade
        'Senior Developer': 1.2,
        'QA Engineer': 0.9,
        'Project Manager': 1.0,
        'Data Analyst': 0.8,
        'Junior Developer': 0.7
    },
    2: { // Analytics Platform
        'Senior Developer': 1.1,
        'QA Engineer': 0.8,
        'Project Manager': 1.0,
        'Data Analyst': 1.3,
        'Junior Developer': 0.6
    },
    3: { // Mobile App
        'Senior Developer': 1.0,
        'QA Engineer': 1.0,
        'Project Manager': 0.9,
        'Data Analyst': 0.7,
        'Junior Developer': 0.8
    },
    4: { // Cloud Migration
        'Senior Developer': 1.3,
        'QA Engineer': 0.9,
        'Project Manager': 1.1,
        'Data Analyst': 0.9,
        'Junior Developer': 0.7
    }
};

const assignments = [
    { projectId: 1, employeeId: 101, capacity: 0.8 },
    { projectId: 1, employeeId: 102, capacity: 0.5 },
    { projectId: 1, employeeId: 103, capacity: 0.3 },
    { projectId: 2, employeeId: 104, capacity: 0.7 },
    { projectId: 2, employeeId: 101, capacity: 0.4 },
    { projectId: 3, employeeId: 105, capacity: 0.6 },
    { projectId: 3, employeeId: 102, capacity: 0.4 },
    { projectId: 4, employeeId: 103, capacity: 0.5 },
    { projectId: 4, employeeId: 104, capacity: 0.6 },
    { projectId: 4, employeeId: 101, capacity: 0.7 }
];
let vacations = {};

// Функции работы с localStorage
function loadDataFromLocalStorage() {
    const savedEmployees = localStorage.getItem('employees');
    const savedAssignments = localStorage.getItem('assignments');
    const savedVacations = localStorage.getItem('vacations');
    const savedProjects = localStorage.getItem('projects');
    const savedFit = localStorage.getItem('fitCoefficients');
    
    if (savedEmployees) employeesData = JSON.parse(savedEmployees);
    if (savedAssignments) {
        const loaded = JSON.parse(savedAssignments);
        // Добавляем ID если их нет
        loaded.forEach((item, idx) => {
            if (!item.id) item.id = idx + 1;
        });
        assignments = loaded;
    }
    if (savedVacations) vacations = JSON.parse(savedVacations);
    if (savedProjects) projectsDataByMonth = JSON.parse(savedProjects);
    if (savedFit) fitCoefficients = JSON.parse(savedFit);
}

function saveDataToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(employeesData));
    localStorage.setItem('assignments', JSON.stringify(assignments));
    localStorage.setItem('vacations', JSON.stringify(vacations));
    localStorage.setItem('projects', JSON.stringify(projectsDataByMonth));
    localStorage.setItem('fitCoefficients', JSON.stringify(fitCoefficients));
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
            <td>
            <button class="employees-btn" data-project-id="${project.id}" data-project-name="${escapeHtml(project.projectName)}">
                Show Employees<br>
                <i class="fa-solid fa-users"></i> (${project.employees})
            </button>
            </td>
            <td>${project.employees}</td>
            <td>$${project.estimatedIncome.toLocaleString()}</td>
            <td>
                <button class="delete-btn" data-id="${project.id}">
                    <i class="fa-solid fa-trash"></i>
                    Delete
                </button>
            </td>
        </tr>
    `;
}

// ======= PROJECT DELETE =====
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = parseInt(btn.dataset.id);
        deleteProject(projectId);
    });
});

function deleteProject(projectId) {
    const confirmDelete = confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    const monthKey = getCurrentMonthKey();
    const monthData = projectsDataByMonth[monthKey];
    if (!monthData) return;

    const projects = monthData.projects;
    const index = projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
        projects.splice(index, 1);
        renderProjectsTable();
    }
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

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = parseInt(btn.dataset.id);
            deleteProject(projectId);
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

function getWorkingDaysInMonth(monthKey) {
    return 22;
}

// ========== FINANCIAL CALCULATIONS FOR EACH EMPLOYEE ==========
function calculateEmployeeDetails(employee, assignment, projectId, monthKey) {
    const capacity = assignment.capacity;
    const fit = fitCoefficients[projectId]?.[employee.position] || 1.0;
    
    const vacationDays = (vacations[monthKey]?.[employee.id]) || 0;
    const workingDays = getWorkingDaysInMonth(monthKey);
    const vacationFactor = 1 - (vacationDays / workingDays);
    
    const effectiveCapacity = capacity * fit * vacationFactor;
    const revenue = effectiveCapacity * employee.salary * 1.2;
    const cost = capacity * employee.salary;
    const profit = revenue - cost;
    
    return {
        employeeId: employee.id,
        name: employee.name,
        capacity: capacity,
        fit: fit,
        vacationDays: vacationDays,
        effectiveCapacity: effectiveCapacity,
        revenue: revenue,
        cost: cost,
        profit: profit
    };
}
function showEmployeesModal(projectId, projectName) {
    
    const monthKey = getCurrentMonthKey();
    const projectAssignments = assignments.filter(a => a.projectId == projectId);
    
    projectAssignments.forEach((assign, idx) => {
        if (!assign.id) {
            assign.id = idx + 1;
        }
    });
    
    projectAssignments.sort((a, b) => {
        const empA = employeesData.find(e => e.id === a.employeeId);
        const empB = employeesData.find(e => e.id === b.employeeId);
        return (empA?.name || '').localeCompare(empB?.name || '');
    });
    
    
    let rowsHtml = '';
    if (projectAssignments.length === 0) {
        rowsHtml = '<tr><td colspan="10" style="text-align:center; padding:40px;">No employees assigned to this project</td></tr>';
    } else {
        rowsHtml = projectAssignments.map(assignment => {
            const employee = employeesData.find(e => e.id === assignment.employeeId);
            if (!employee) return '';
            const details = calculateEmployeeDetails(employee, assignment, projectId, monthKey);
            const profitClass = details.profit >= 0 ? 'profit-positive' : 'profit-negative';
            return `
                <tr>
                    <td><a href="#" class="employee-name-link" data-id="${employee.id}">${escapeHtml(employee.firstName + ' ' + employee.lastName)}</a></td>
                    <td class="capacity-cell">${details.capacity.toFixed(2)}</td>
                    <td class="fit-cell">${details.fit.toFixed(2)}</td>
                    <td class="vacation-cell">${details.vacationDays}</td>
                    <td class="effective-cell">${details.effectiveCapacity.toFixed(3)}</td>
                    <td class="revenue-cell">$${details.revenue.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                    <td class="cost-cell">$${details.cost.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                    <td class="${profitClass}">${details.profit >= 0 ? '$' : '-$'}${Math.abs(details.profit).toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                    <td class="actions-cell">
                        <button class="edit-assignment-btn  btn__action" data-employee-id="${employee.id}" data-project-id="${projectId}" data-assignment-id="${assignment.id}">
                            <i class="fa-solid fa-pen"></i>
                            Edit
                        </button>
                        <button class="unassign-btn btn__action" data-employee-id="${employee.id}" data-project-id="${projectId}" data-assignment-id="${assignment.id}">
                            <i class="fa-solid fa-user-minus"></i>
                            Unassign
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    // Modal
    const modal = document.createElement('div');
    modal.className = 'employees-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h3><i class="fa-solid fa-users"></i> ${escapeHtml(projectName)} - Employee Details</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <table class="employees-details-table">
                        <thead class="modal-header__head">
                            <tr>
                                <th>Employee Name</th>
                                <th>Assigned Cap.</th>
                                <th>Fit Coeff.</th>
                                <th>Vacation Days</th>
                                <th>Effective Cap.</th>
                                <th>Revenue</th>
                                <th>Cost</th>
                                <th>Profit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="employeesModalBody">
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button class="btn-add-employee">+ Assign Employee</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    closeBtn.onclick = () => modal.remove();
    overlay.onclick = (e) => {
        if (e.target === overlay) modal.remove();
    };
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    
    modal.querySelectorAll('.employee-name-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const empId = link.dataset.id;
            alert(`Action menu for employee ${empId} – можно реализовать позже`);
        });
    });
    
    
    modal.querySelectorAll('.edit-assignment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const empId = parseInt(btn.dataset.employeeId);
            const projId = parseInt(btn.dataset.projectId);
            const assignId = parseInt(btn.dataset.assignmentId);
            
            console.log('Data:', { assignId, empId, projId });
        });
    });
    
    modal.querySelector('.btn-add-employee').addEventListener('click', () => {
    });
}
// ==========  Employees View ========
// ==== Employee Table Display ====
function calculateAge(birthDateStr) {
    const birth = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}

function getTotalEmployeeCapacity(employeeId, monthKey) {
    const empAssignments = assignments.filter(a => a.employeeId === employeeId);
    return empAssignments.reduce((sum, a) => sum + a.capacity, 0);
}

function getEmployeeProjectedIncome(employeeId, monthKey) {
    const empAssignments = assignments.filter(a => a.employeeId === employeeId);
    let totalProfit = 0;
    for (const assign of empAssignments) {
        const project = findProjectById(assign.projectId, monthKey);
        if (!project) continue;
        const employee = employeesData.find(e => e.id === employeeId);
        if (!employee) continue;
        const fit = fitCoefficients[assign.projectId]?.[employee.position] || 1.0;
        const vacationDays = (vacations[monthKey]?.[employee.id]) || 0;
        const workingDays = 22; // или функция getWorkingDaysInMonth
        const vacationFactor = 1 - (vacationDays / workingDays);
        const effectiveCapacity = assign.capacity * fit * vacationFactor;
        const revenue = effectiveCapacity * employee.salary * 1.2;
        const cost = assign.capacity * employee.salary;
        totalProfit += (revenue - cost);
    }
    return totalProfit;
}

function findProjectById(projectId, monthKey) {
    const monthData = projectsDataByMonth[monthKey];
    if (!monthData) return null;
    return monthData.projects.find(p => p.id === projectId);
}

// Render Employees Table

function renderEmployeesTable() {
    const monthKey = getCurrentMonthKey();
    const tbody = document.querySelector('.employees__table tbody');
    if (!tbody) return;

    let employees = [...employeesData];

    
    if (empSortConfig.key) {
        employees = sortEmployees(employees, empSortConfig.key, empSortConfig.direction);
    }

    
    employees = filterEmployees(employees);

    if (employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No employees found</td></tr>';
        return;
    }

    tbody.innerHTML = employees.map(emp => {
        const age = calculateAge(emp.dateOfBirth);
        const totalCap = getTotalEmployeeCapacity(emp.id, monthKey);
        const isOverloaded = totalCap >= 1.5;
        const projectedIncome = getEmployeeProjectedIncome(emp.id, monthKey);
        const incomeClass = projectedIncome >= 0 ? 'profit-positive' : 'profit-negative';
        const assignmentsCount = assignments.filter(a => a.employeeId === emp.id).length;
        const capacityDisplay = `${totalCap.toFixed(1)}/1.5`;
        const estimatedPayment = getEmployeeEstimatedPayment(emp.id, monthKey);

        
        const showAssignmentsBtn = `
            <button class="show-assignments-btn" data-employee-id="${emp.id}">
                <i class="fa-solid fa-briefcase"></i> Show Assignments (${assignmentsCount})<br>${capacityDisplay}
            </button>
        `;

        return `
            <tr data-employee-id="${emp.id}">
                <td class="editable-firstname" data-id="${emp.id}" data-field="firstName">${escapeHtml(emp.firstName)}</td>
                <td class="editable-lastname" data-id="${emp.id}" data-field="lastName">${escapeHtml(emp.lastName)}</td>
                <td>${age}</td>
                <td class="editable-position" data-id="${emp.id}">
                    ${escapeHtml(emp.position)} <i class="fa-solid fa-pen" style="opacity:0; transition:opacity 0.2s; margin-left: 8px;"></i>
                </td>
                <td class="editable-salary" data-id="${emp.id}" data-field="salary">${formatCurrency(emp.salary)}</td>
                <td>${formatCurrency(estimatedPayment)}</td>
                <td>${showAssignmentsBtn}</td>
                <td class="${incomeClass}">${formatCurrency(projectedIncome)}</td>
                <td class="actions-cell cell-row">
                    <button class="availability-btn btn__action" data-id="${emp.id}">
                        <i class="fa-solid fa-calendar-alt"></i>
                        Availability
                    </button>
                    <button class="assign-btn btn__action" data-id="${emp.id}">
                        <i class="fa-solid fa-user-plus"></i>
                        Assign
                    </button>
                    <button class="delete-employee-btn btn__action" data-id="${emp.id}" onclick="deleteEmployee(101)">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    
    attachInlineEditing();
    
    attachEmployeeActionButtons();
}

// Estimated Payment

function getEmployeeEstimatedPayment(employeeId, monthKey) {
    const employee = employeesData.find(e => e.id == employeeId);
    if (!employee) return 0;
    const empAssignments = assignments.filter(a => a.employeeId == employeeId);
    if (empAssignments.length === 0) {
        
        return employee.salary * 0.5;
    }
    let total = 0;
    for (const assign of empAssignments) {
        const capacityForPay = Math.max(0.5, assign.capacity); // не меньше 0.5
        total += employee.salary * capacityForPay;
    }
    return total;
}

// Projected Income
function getEmployeeProjectedIncome(employeeId, monthKey) {
    const employee = employeesData.find(e => e.id == employeeId);
    if (!employee) return 0;
    const empAssignments = assignments.filter(a => a.employeeId == employeeId);
    let totalProfit = 0;
    for (const assign of empAssignments) {
        
        const costCapacity = Math.max(0.5, assign.capacity);
        const cost = costCapacity * employee.salary;
        
        // Effective capacity (c учётом fit и отпуска)
        const fit = fitCoefficients[assign.projectId]?.[employee.position] || 1.0;
        const vacationDays = (vacations[monthKey]?.[employeeId]) || 0;
        const workingDays = 22; // или более точное значение
        const vacationFactor = 1 - (vacationDays / workingDays);
        const effectiveCapacity = assign.capacity * fit * vacationFactor;
        
        const revenue = effectiveCapacity * employee.salary * 1.2;
        const profit = revenue - cost;
        totalProfit += profit;
    }
    return totalProfit;
}


let empSortConfig = { key: null, direction: 'asc' };
let empFilters = {
    firstName: '',
    lastName: '',
    position: '',
    projectId: ''
};

function sortEmployees(employees, key, direction) {
    const sorted = [...employees];
    sorted.sort((a, b) => {
        let aVal, bVal;
        if (key === 'age') {
            aVal = calculateAge(a.dateOfBirth);
            bVal = calculateAge(b.dateOfBirth);
        } else if (key === 'projectIncome') {
            aVal = getEmployeeProjectedIncome(a.id, getCurrentMonthKey());
            bVal = getEmployeeProjectedIncome(b.id, getCurrentMonthKey());
        } else if (key === 'estimatedPayment') {
            aVal = getEmployeeEstimatedPayment(a.id, monthKey);
            bVal = getEmployeeEstimatedPayment(b.id, monthKey);
        } else if (key === 'salary') {
            aVal = a.salary;
            bVal = b.salary;
        } else if (key === 'firstName') {
            aVal = a.firstName.toLowerCase();
            bVal = b.firstName.toLowerCase();
        } else if (key === 'lastName') {
            aVal = a.lastName.toLowerCase();
            bVal = b.lastName.toLowerCase();
        } else if (key === 'position') {
            aVal = a.position.toLowerCase();
            bVal = b.position.toLowerCase();
        } else {
            return 0;
        }
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
    return sorted;
}

function filterEmployees(employees) {
    return employees.filter(emp => {
        if (empFilters.firstName && !emp.firstName.toLowerCase().includes(empFilters.firstName.toLowerCase())) return false;
        if (empFilters.lastName && !emp.lastName.toLowerCase().includes(empFilters.lastName.toLowerCase())) return false;
        if (empFilters.position && emp.position !== empFilters.position) return false;
        if (empFilters.projectId) {
            const hasProject = assignments.some(a => a.employeeId === emp.id && a.projectId == empFilters.projectId);
            if (!hasProject) return false;
        }
        return true;
    });
}

function initEmployeeSorting() {
    const headers = document.querySelectorAll('.employees__table .sortable');
    headers.forEach(header => {
        const icon = header.querySelector('.fa-arrow-down-wide-short');
        if (!icon) return;
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const sortKey = header.dataset.sort;
            if (empSortConfig.key === sortKey) {
                empSortConfig.direction = empSortConfig.direction === 'asc' ? 'desc' : 'asc';
            } else {
                empSortConfig.key = sortKey;
                empSortConfig.direction = 'asc';
            }
            renderEmployeesTable();
        });
    });
}

function initEmployeeFilters() {
    const filterIcons = document.querySelectorAll('.employees__table .filterable .fa-magnifying-glass');
    filterIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const th = icon.closest('th');
            const filterKey = th.dataset.filter;
            createEmployeeFilterInput(filterKey, icon);
        });
    });
}

function createEmployeeFilterInput(filterKey, iconElement) {
    const existing = document.querySelector('.employee-filter-input');
    if (existing) existing.remove();

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Filter by ${filterKey}...`;
    input.className = 'employee-filter-input';
    input.value = empFilters[filterKey] || '';

    const rect = iconElement.getBoundingClientRect();
    input.style.position = 'absolute';
    input.style.left = `${rect.left}px`;
    input.style.top = `${rect.bottom + 5}px`;
    input.style.zIndex = '1000';
    input.style.padding = '6px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '6px';

    input.addEventListener('input', (e) => {
        empFilters[filterKey] = e.target.value;
        renderEmployeesTable();
    });

    document.body.appendChild(input);
    input.focus();

    const removeOnClickOutside = (event) => {
        if (!input.contains(event.target) && !iconElement.contains(event.target)) {
            input.remove();
            document.removeEventListener('click', removeOnClickOutside);
        }
    };
    setTimeout(() => document.addEventListener('click', removeOnClickOutside), 0);
}

function attachInlineEditing() {
    document.querySelectorAll('.editable-position').forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', async (e) => {
            e.stopPropagation();
            const employeeId = parseInt(cell.dataset.id);
            const currentValue = cell.innerText.trim();
            const select = document.createElement('select');
            const positions = ['Junior', 'Middle', 'Senior', 'Lead', 'Architect', 'BO'];
            positions.forEach(pos => {
                const option = document.createElement('option');
                option.value = pos;
                option.textContent = pos;
                if (pos === currentValue) option.selected = true;
                select.appendChild(option);
            });
            cell.innerHTML = '';
            cell.appendChild(select);
            select.focus();
            const update = () => {
                const newValue = select.value;
                if (newValue !== currentValue) {
                    const emp = employeesData.find(e => e.id === employeeId);
                    if (emp) emp.position = newValue;
                    renderEmployeesTable();
                } else {
                    cell.innerText = currentValue;
                }
            };
            select.addEventListener('blur', update);
            select.addEventListener('change', update);
        });
    });

    // Редактирование зарплаты
    document.querySelectorAll('.editable-salary').forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', (e) => {
            e.stopPropagation();
            const employeeId = parseInt(cell.dataset.id);
            const currentValue = parseFloat(cell.innerText.replace(/[^0-9.-]/g, ''));
            const input = document.createElement('input');
            input.type = 'number';
            input.value = currentValue;
            input.step = '100';
            input.min = '0';
            cell.innerHTML = '';
            cell.appendChild(input);
            input.focus();
            const update = () => {
                let newValue = parseFloat(input.value);
                if (isNaN(newValue) || newValue < 0) newValue = currentValue;
                if (newValue !== currentValue) {
                    const emp = employeesData.find(e => e.id === employeeId);
                    if (emp) emp.salary = newValue;
                    renderEmployeesTable();
                } else {
                    cell.innerText = formatCurrency(currentValue);
                }
            };
            input.addEventListener('blur', update);
            input.addEventListener('keypress', (e) => { if (e.key === 'Enter') update(); });
        });
    });
}
function attachEmployeeActionButtons() {
    
    const assignBtns = document.querySelectorAll('.assign-btn:not([disabled])');
    console.log('🟢 Found assign buttons:', assignBtns.length);
    
    assignBtns.forEach(btn => {
        // Убираем старые обработчики
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const empId = newBtn.dataset.id;
            console.log('➕ Assign clicked, empId:', empId);
            openAssignmentPopup(parseInt(empId));
        });
    });
    // Availability
    document.querySelectorAll('.availability-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const empId = btn.dataset.id;
            showAvailabilityCalendar(empId);
        });
    });

    // Assign
    document.querySelectorAll('.assign-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
            const empId = btn.dataset.id;
            openAssignmentPopup(empId);
        });
    });

    // Delete
    document.querySelectorAll('.delete-employee-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const empId = parseInt(btn.dataset.id);
            
            const employee = employeesData.find(e => e.id === empId);
            
            let fullName = `ID: ${empId}`;
            if (employee) {
                if (employee.firstName && employee.lastName) {
                    fullName = `${employee.firstName} ${employee.lastName}`;
                } else if (employee.name) {
                    fullName = employee.name;
                } else if (employee.fullName) {
                    fullName = employee.fullName;
                } else {
                    fullName = `Employee ${empId}`;
                }
            }
            
            const confirmMessage = `⚠️ Delete Employee\n\nAre you sure you want to delete "${fullName}"?\n\nAll assignments will be removed.`;
            
            if (!confirm(confirmMessage)) {
                return;
            }
            
            const index = employeesData.findIndex(e => e.id === empId);
            if (index !== -1) employeesData.splice(index, 1);
            
            for (let i = assignments.length - 1; i >= 0; i--) {
                if (assignments[i].employeeId === empId) assignments.splice(i, 1);
            }
            
            const monthKey = getCurrentMonthKey();
            if (vacations[monthKey] && vacations[monthKey][empId]) {
                delete vacations[monthKey][empId];
            }
            
            if (typeof saveDataToLocalStorage === 'function') saveDataToLocalStorage();
            
            renderEmployeesTable();
            renderProjectsTable();
            
            console.log(`✅ Employee deleted: ${fullName}`);
        });
});

    // Show Assignments
    document.querySelectorAll('.show-assignments-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const empId = btn.dataset.employeeId;
            showEmployeeAssignmentsModal(parseInt(empId));
        });
    });
}

function showEmployeeAssignmentsModal(employeeId) {
    // Добавляем ID если нет
    assignments.forEach((assign, idx) => {
        if (!assign.id) assign.id = idx + 1;
    });
    
    const employee = employeesData.find(e => e.id === employeeId);
    if (!employee) return;
    
    const monthKey = getCurrentMonthKey();
    const empAssignments = assignments.filter(a => a.employeeId === employeeId);
    
    let rowsHtml = '';
    if (empAssignments.length === 0) {
        rowsHtml = '<tr><td colspan="9">No projects assigned</td></tr>';
    } else {
        rowsHtml = empAssignments.map(assign => {
            const project = findProjectById(assign.projectId, monthKey);
            if (!project) return '';
            const fit = fitCoefficients[assign.projectId]?.[employee.position] || 1.0;
            const vacationDays = (vacations[monthKey]?.[employeeId]) || 0;
            const workingDays = 22;
            const vacationFactor = 1 - (vacationDays / workingDays);
            const effectiveCapacity = assign.capacity * fit * vacationFactor;
            const revenue = effectiveCapacity * employee.salary * 1.2;
            const cost = assign.capacity * employee.salary;
            const profit = revenue - cost;
            const profitClass = profit >= 0 ? 'profit-positive' : 'profit-negative';
            return `
                <tr>
                    <td>${escapeHtml(project.projectName)}</td>
                    <td>${assign.capacity.toFixed(2)}</td>
                    <td>${fit.toFixed(2)}</td>
                    <td>${vacationDays}</td>
                    <td>${effectiveCapacity.toFixed(3)}</td>
                    <td>$${revenue.toFixed(2)}</td>
                    <td>$${cost.toFixed(2)}</td>
                    <td class="${profitClass}">${formatCurrency(profit)}</td>
                    <td class="actions-cell">
                        <button class="edit-assignment-btn btn__action" 
                                data-employee-id="${employee.id}" 
                                data-project-id="${assign.projectId}" 
                                data-assignment-id="${assign.id}">
                            <i class="fa-solid fa-pen"></i> Edit
                        </button>
                        <button class="unassign-btn btn__action" 
                                data-employee-id="${employee.id}" 
                                data-project-id="${assign.projectId}" 
                                data-assignment-id="${assign.id}">
                            <i class="fa-solid fa-user-minus"></i> Unassign
                        </button>
                    </td>
                 </tr>
            `;
        }).join('');
    }

    const modalHtml = `
        <div class="employees-modal" id="empAssignModal">
            <div class="modal-overlay"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h3>${escapeHtml(employee.firstName)} ${escapeHtml(employee.lastName)} - Assignments</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <table class="assignments-table">
                        <thead class="modal-header__head">
                            <tr>
                                <th>Project</th>
                                <th>Capacity</th>
                                <th>Fit</th>
                                <th>Vacation</th>
                                <th>Effective</th>
                                <th>Revenue</th>
                                <th>Cost</th>
                                <th>Profit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    const oldModal = document.getElementById('empAssignModal');
    if (oldModal) oldModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('empAssignModal');
    
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.querySelector('.modal-overlay').onclick = () => modal.remove();
    
    modal.querySelectorAll('.edit-assignment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const empId = parseInt(btn.dataset.employeeId);
            const projId = parseInt(btn.dataset.projectId);
            const assignId = parseInt(btn.dataset.assignmentId);
            openEditAssignment(assignId, empId, projId);
        });
    });
    
    modal.querySelectorAll('.unassign-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const empId = parseInt(btn.dataset.employeeId);
            const projId = parseInt(btn.dataset.projectId);
            const assignId = parseInt(btn.dataset.assignmentId);
            openUnassignConfirmation(assignId, empId, projId);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    initSelectors();
    initSorting();
    initEmployeeSorting();
    initEmployeeFilters();
    renderProjectsTable();
    renderEmployeesTable();
});

function initViewToggle() {
    const projectsSection = document.querySelector('.projects');
    const employeesSection = document.querySelector('.employees');
    const toggleBtns = document.querySelectorAll('.toggle-btn');

    if (!projectsSection || !employeesSection) return;

    function setActiveView(view) {
        if (view === 'projects') {
            projectsSection.classList.remove('hidden');
            employeesSection.classList.add('hidden');
            renderProjectsTable();
        } else {
            projectsSection.classList.add('hidden');
            employeesSection.classList.remove('hidden');
            renderEmployeesTable();
        
            if (!window.employeeTableInitialized) {
                initEmployeeSorting();
                initEmployeeFilters();
                window.employeeTableInitialized = true;
            }
        }
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            if (view === 'projects') setActiveView('projects');
            else if (view === 'employees') setActiveView('employees');
    
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    
    setActiveView('projects');
}

function initSelectors() {
    const monthSelect = document.getElementById('months');
    const yearSelect = document.getElementById('years');

    function refreshCurrentView() {
        const projectsVisible = !document.querySelector('.projects')?.classList.contains('hidden');
        if (projectsVisible) {
            renderProjectsTable();
        } else {
            renderEmployeesTable();
        }
    }

    if (monthSelect) {
        monthSelect.addEventListener('change', (e) => {
            currentMonth = e.target.value;
            refreshCurrentView();
        });
    }

    if (yearSelect) {
        yearSelect.addEventListener('change', (e) => {
            currentYear = e.target.value;
            refreshCurrentView();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initSelectors();
    initSorting();            
    initViewToggle();         
    
});

function initSidebarNavigation() {
    const projectsSection = document.querySelector('.projects');
    const employeesSection = document.querySelector('.employees');
    const menuLinks = document.querySelectorAll('.menu__link');

    
    function switchToView(view) {
        
        if (projectsSection) projectsSection.classList.add('hidden');
        if (employeesSection) employeesSection.classList.add('hidden');

        // Показываем нужную
        if (view === 'projects') {
            if (projectsSection) projectsSection.classList.remove('hidden');
            renderProjectsTable(); 
        } else if (view === 'employees') {
            if (employeesSection) employeesSection.classList.remove('hidden');
            renderEmployeesTable(); 
            
            if (!window.employeeTableInitialized) {
                if (typeof initEmployeeSorting === 'function') initEmployeeSorting();
                if (typeof initEmployeeFilters === 'function') initEmployeeFilters();
                window.employeeTableInitialized = true;
            }
        } else if (view === 'home') {
            if (projectsSection) projectsSection.classList.remove('hidden');
            renderProjectsTable();
        }

        
        menuLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (view === 'home' && (href === '#' || href === '#home')) {
                link.classList.add('active');
            } else if (view === 'projects' && href === '#projects') {
                link.classList.add('active');
            } else if (view === 'employees' && href === '#employees') {
                link.classList.add('active');
            }
        });
    }

    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href === '#projects') {
                switchToView('projects');
            } else if (href === '#employees') {
                switchToView('employees');
            } else {
                
                switchToView('home');
            }
        });
    });

    
    switchToView('projects');
}
function formatCurrency(value) {
    if (value === undefined || value === null) return '$0';
    return value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
}

document.addEventListener('DOMContentLoaded', () => {
    initSelectors();
    initSorting();          
    initSidebarNavigation(); 
    
});

// ===== EMPLOYEE SLIDE PANEL =====
// Panel elements
const empPanel = document.getElementById('addEmployeePanel');
const openEmpPanelBtn = document.querySelector('.employee-btn'); // кнопка "Add Employee"
const closeEmpBtns = [document.getElementById('closeEmployeePanelBtn'), document.getElementById('cancelEmployeeBtn')];
const empForm = document.getElementById('addEmployeeForm');

// Form inputs
const firstNameInput = document.getElementById('empFirstName');
const lastNameInput = document.getElementById('empLastName');
const dobInput = document.getElementById('empDob');
const positionSelect = document.getElementById('empPosition');
const salaryInput = document.getElementById('empSalary');

// Errors
const firstNameErr = document.getElementById('empFirstNameError');
const lastNameErr = document.getElementById('empLastNameError');
const dobErr = document.getElementById('empDobError');
const positionErr = document.getElementById('empPositionError');
const salaryErr = document.getElementById('empSalaryError');

let empValidation = {
    firstName: false,
    lastName: false,
    dob: false,
    position: false,
    salary: false
};

function updateEmployeeSubmitButton() {
    const submitBtn = document.getElementById('submitEmployeeBtn');
    const allValid = Object.values(empValidation).every(v => v === true);
    if (submitBtn) submitBtn.disabled = !allValid;
}

// Validates
function validateFirstName() {
    const value = firstNameInput.value.trim();
    const regex = /^[A-Za-z]{3,}$/;
    if (!value) {
        firstNameErr.textContent = 'First name is required';
        firstNameInput.classList.add('error');
        firstNameInput.classList.remove('valid');
        return false;
    }
    if (!regex.test(value)) {
        firstNameErr.textContent = 'Only letters, min 3 characters';
        firstNameInput.classList.add('error');
        firstNameInput.classList.remove('valid');
        return false;
    }
    firstNameErr.textContent = '';
    firstNameInput.classList.remove('error');
    firstNameInput.classList.add('valid');
    return true;
}

function validateLastName() {
    const value = lastNameInput.value.trim();
    const regex = /^[A-Za-z]{3,}$/;
    if (!value) {
        lastNameErr.textContent = 'Last name is required';
        lastNameInput.classList.add('error');
        lastNameInput.classList.remove('valid');
        return false;
    }
    if (!regex.test(value)) {
        lastNameErr.textContent = 'Only letters, min 3 characters';
        lastNameInput.classList.add('error');
        lastNameInput.classList.remove('valid');
        return false;
    }
    lastNameErr.textContent = '';
    lastNameInput.classList.remove('error');
    lastNameInput.classList.add('valid');
    return true;
}

function validateDob() {
    const value = dobInput.value;
    if (!value) {
        dobErr.textContent = 'Date of birth is required';
        dobInput.classList.add('error');
        dobInput.classList.remove('valid');
        return false;
    }
    const birth = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    if (age < 18) {
        dobErr.textContent = `Age must be 18+. Current age: ${age}`;
        dobInput.classList.add('error');
        dobInput.classList.remove('valid');
        return false;
    }
    dobErr.textContent = `✓ Valid (${age} years)`;
    dobErr.style.color = '#10b981';
    dobInput.classList.remove('error');
    dobInput.classList.add('valid');
    return true;
}

function validatePosition() {
    const value = positionSelect.value;
    if (!value) {
        positionErr.textContent = 'Position is required';
        positionSelect.classList.add('error');
        positionSelect.classList.remove('valid');
        return false;
    }
    positionErr.textContent = '';
    positionSelect.classList.remove('error');
    positionSelect.classList.add('valid');
    return true;
}

function validateSalary() {
    const value = salaryInput.value.trim();
    if (!value) {
        salaryErr.textContent = 'Salary is required';
        salaryInput.classList.add('error');
        salaryInput.classList.remove('valid');
        return false;
    }
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
        salaryErr.textContent = 'Salary must be a positive number';
        salaryInput.classList.add('error');
        salaryInput.classList.remove('valid');
        return false;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        salaryErr.textContent = 'Max 2 decimal places';
        salaryInput.classList.add('error');
        salaryInput.classList.remove('valid');
        return false;
    }
    salaryErr.textContent = '';
    salaryInput.classList.remove('error');
    salaryInput.classList.add('valid');
    return true;
}

// Event Listeners
firstNameInput.addEventListener('input', () => { empValidation.firstName = validateFirstName(); updateEmployeeSubmitButton(); });
firstNameInput.addEventListener('blur', () => { empValidation.firstName = validateFirstName(); updateEmployeeSubmitButton(); });
lastNameInput.addEventListener('input', () => { empValidation.lastName = validateLastName(); updateEmployeeSubmitButton(); });
lastNameInput.addEventListener('blur', () => { empValidation.lastName = validateLastName(); updateEmployeeSubmitButton(); });
dobInput.addEventListener('input', () => { empValidation.dob = validateDob(); updateEmployeeSubmitButton(); });
dobInput.addEventListener('blur', () => { empValidation.dob = validateDob(); updateEmployeeSubmitButton(); });
positionSelect.addEventListener('change', () => { empValidation.position = validatePosition(); updateEmployeeSubmitButton(); });
salaryInput.addEventListener('input', () => { empValidation.salary = validateSalary(); updateEmployeeSubmitButton(); });
salaryInput.addEventListener('blur', () => { empValidation.salary = validateSalary(); updateEmployeeSubmitButton(); });

// Open panel
function openEmployeePanel() {
    empPanel.classList.add('open');
    empForm.reset();
    // Сброс классов и ошибок
    [firstNameInput, lastNameInput, dobInput, positionSelect, salaryInput].forEach(inp => {
        inp.classList.remove('error', 'valid');
    });
    [firstNameErr, lastNameErr, dobErr, positionErr, salaryErr].forEach(err => err.textContent = '');
    empValidation = { firstName: false, lastName: false, dob: false, position: false, salary: false };
    updateEmployeeSubmitButton();
}

// Close panel
function closeEmployeePanel() {
    empPanel.classList.remove('open');
}


if (openEmpPanelBtn) openEmpPanelBtn.addEventListener('click', openEmployeePanel);
closeEmpBtns.forEach(btn => { if (btn) btn.addEventListener('click', closeEmployeePanel); });
document.querySelector('.add-employee-panel .panel-overlay')?.addEventListener('click', closeEmployeePanel);

// Add employee
empForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isDobValid = validateDob();
    const isPositionValid = validatePosition();
    const isSalaryValid = validateSalary();
    
    if (isFirstNameValid && isLastNameValid && isDobValid && isPositionValid && isSalaryValid) {
        const newEmployee = {
            id: Date.now(),
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            dateOfBirth: dobInput.value,
            position: positionSelect.value,
            salary: parseFloat(salaryInput.value)
        };
        employeesData.push(newEmployee);
        renderEmployeesTable();
        closeEmployeePanel();
        alert(`Employee ${newEmployee.firstName} ${newEmployee.lastName} added!`);
    }
});

// Assign Employee to Project
let currentAssignEmployee = null;

function openAssignmentPopup(employeeId) {
    const employee = employeesData.find(e => e.id == employeeId);
    if (!employee) return;
    currentAssignEmployee = employee;
    
    const monthKey = getCurrentMonthKey();
    const currentCapacity = getTotalEmployeeCapacity(employee.id, monthKey);
    const availableCapacity = Math.max(0, 1.5 - currentCapacity);
    
    
    document.getElementById('assignEmployeeName').textContent = `${employee.firstName} ${employee.lastName}`;
    document.getElementById('assignCurrentCapacity').textContent = currentCapacity.toFixed(2);
    document.getElementById('assignAvailableCapacity').textContent = availableCapacity.toFixed(2);
    
    
    const projectSelect = document.getElementById('assignProjectSelect');
    const projects = projectsDataByMonth[monthKey]?.projects || [];
    projectSelect.innerHTML = '<option value="">Select project...</option>';
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.projectName;
        projectSelect.appendChild(option);
    });
    
    
    const capacitySlider = document.getElementById('assignCapacity');
    capacitySlider.value = 0;
    capacitySlider.max = Math.min(1.5, availableCapacity + currentCapacity);
    document.getElementById('capacityValue').textContent = '0.0';
    document.getElementById('assignFit').value = 1;
    document.getElementById('fitValue').textContent = '1.0';
    
    
    projectSelect.onchange = updateAssignmentPopup;
    capacitySlider.oninput = function(e) {
        document.getElementById('capacityValue').textContent = parseFloat(e.target.value).toFixed(1);
        updateAssignmentPopup();
    };
    document.getElementById('assignFit').oninput = function(e) {
        document.getElementById('fitValue').textContent = parseFloat(e.target.value).toFixed(1);
        updateAssignmentPopup();
    };
    
    
    document.getElementById('assignPopup').style.display = 'block';
    updateAssignmentPopup();
}

function updateAssignmentPopup() {
    const projectId = document.getElementById('assignProjectSelect').value;
    if (!projectId) return;
    
    const monthKey = getCurrentMonthKey();
    const project = projectsDataByMonth[monthKey].projects.find(p => p.id == projectId);
    if (!project) return;
    
    const capacity = parseFloat(document.getElementById('assignCapacity').value);
    const fit = parseFloat(document.getElementById('assignFit').value);
    const effectiveCapacity = capacity * fit;
    
    document.getElementById('effectiveCapacity').textContent = effectiveCapacity.toFixed(3);
    
    
    const currentCapacity = getTotalEmployeeCapacity(currentAssignEmployee.id, monthKey);
    const totalAfter = currentCapacity + capacity;
    document.getElementById('totalAfterAssign').textContent = totalAfter.toFixed(2);
    
    
    const usedBefore = getProjectUsedCapacity(project.id, monthKey);
    const projectAfter = usedBefore + capacity;
    document.getElementById('projectCapacityAfter').textContent = projectAfter.toFixed(2);
    document.getElementById('projectCapacityRequired').textContent = project.employeeCapacity;
    
    
    const messageEl = document.getElementById('assignValidationMessage');
    const submitBtn = document.getElementById('assignSubmitBtn');
    
    if (totalAfter > 1.5) {
        messageEl.className = 'validation-message error';
        messageEl.textContent = '⚠️ Employee capacity limit (1.5) will be exceeded!';
        submitBtn.disabled = true;
    } else if (projectAfter > project.employeeCapacity) {
        messageEl.className = 'validation-message warning';
        messageEl.textContent = `⚠️ Project capacity will be exceeded by ${(projectAfter - project.employeeCapacity).toFixed(2)} FTE`;
        submitBtn.disabled = false;
    } else {
        messageEl.className = 'validation-message success';
        messageEl.textContent = '✓ Valid assignment';
        submitBtn.disabled = false;
    }
    
    
    document.getElementById('projectCapacityInfo').innerHTML = `Currently used: ${usedBefore.toFixed(2)} / ${project.employeeCapacity} FTE`;
}

function getProjectUsedCapacity(projectId, monthKey) {
    const projectAssignments = assignments.filter(a => a.projectId == projectId);
    return projectAssignments.reduce((sum, a) => sum + a.capacity, 0);
}

document.getElementById('assignCancelBtn').onclick = () => {
    document.getElementById('assignPopup').style.display = 'none';
};
document.querySelector('.assign-popup__close').onclick = () => {
    document.getElementById('assignPopup').style.display = 'none';
};

document.getElementById('assignSubmitBtn').onclick = () => {
    const projectId = document.getElementById('assignProjectSelect').value;
    const capacity = parseFloat(document.getElementById('assignCapacity').value);
    const fit = parseFloat(document.getElementById('assignFit').value);
    
    if (!projectId || capacity <= 0) {
        alert('Please select project and capacity');
        return;
    }
    
    const monthKey = getCurrentMonthKey();
    const employeeId = currentAssignEmployee.id;
    
    const currentCap = getTotalEmployeeCapacity(employeeId, monthKey);
    if (currentCap + capacity > 1.5) {
        alert('Cannot exceed employee capacity limit (1.5)');
        return;
    }
    
    
    assignments.push({
        projectId: parseInt(projectId),
        employeeId: employeeId,
        capacity: capacity
    });
    
    
    if (!fitCoefficients[projectId]) fitCoefficients[projectId] = {};
    fitCoefficients[projectId][currentAssignEmployee.position] = fit;
    
    
    renderProjectsTable();
    renderEmployeesTable();
    
    
    document.getElementById('assignPopup').style.display = 'none';
    alert('Employee assigned successfully');
};

// ======= AVAILABILITY CALENDAR =======
let currentCalendarDate = new Date();
let selectedVacationDays = new Set();
let currentCalendarEmployeeId = null;

function showAvailabilityCalendar(employeeId) {
    const modal = document.getElementById('availabilityModal');

    currentCalendarEmployeeId = employeeId;
    const employee = employeesData.find(e => e.id === employeeId);
    if (!employee) return;
    
    currentMonthKey = getCurrentMonthKey();
    
    
    const savedVacations = vacations[currentMonthKey]?.[employeeId] || [];
    selectedVacationDays.clear();
    savedVacations.forEach(dateStr => {
        selectedVacationDays.add(dateStr);
    });
    
    document.getElementById('calendarEmployeeName').textContent = employee.name;
    
    renderCalendar();
    updateVacationRanges();
    updateWorkingDaysInfo();
    
    modal.style.display = 'flex';
    initModalHandlers();
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    let gridHtml = '';
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => {
        gridHtml += `<div class="calendar-weekday">${day}</div>`;
    });
    
    const today = new Date();
    const todayDate = today.getDate();
    const isCurrentMonthForToday = today.getMonth() === month && today.getFullYear() === year;
    
    for (let i = 0; i < 42; i++) {
        let dayNum;
        let isThisMonth = true;
        
        if (i < startWeekday) {
            // Предыдущий месяц
            dayNum = prevMonthDays - (startWeekday - i) + 1;
            isThisMonth = false;
        } else if (i >= startWeekday + daysInMonth) {
            // Следующий месяц
            dayNum = i - (startWeekday + daysInMonth) + 1;
            isThisMonth = false;
        } else {
            // Текущий месяц
            dayNum = i - startWeekday + 1;
        }
        
        // Формируем строку даты напрямую (без вызова функции)
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(dayNum).padStart(2, '0');
        const dateStr = `${year}-${monthStr}-${dayStr}`;
        
        // Создаём объект Date для проверки дня недели
        let tempDate = new Date(year, month, dayNum);
        if (!isThisMonth) {
            if (i < startWeekday) {
                tempDate = new Date(year, month - 1, dayNum);
            } else {
                tempDate = new Date(year, month + 1, dayNum);
            }
        }
        
        const isWeekend = (tempDate.getDay() === 0 || tempDate.getDay() === 6);
        const isTodayHighlight = (isThisMonth && dayNum === todayDate && isCurrentMonthForToday);
        const isVacation = selectedVacationDays.has(dateStr);
        
        let classes = [];
        if (!isThisMonth) classes.push('other-month');
        if (isWeekend) classes.push('weekend');
        if (isTodayHighlight) classes.push('today');
        if (isVacation) classes.push('vacation');
        
        const onClick = isThisMonth ? `onclick="toggleVacationDay('${dateStr}')"` : '';
        
        gridHtml += `<div class="calendar-day ${classes.join(' ')}" ${onClick}>${dayNum}</div>`;
    }
    
    document.getElementById('calendarGrid').innerHTML = gridHtml;
}

function toggleVacationDay(dateStr) {
    console.log('toggleVacationDay called with:', dateStr);
    if (selectedVacationDays.has(dateStr)) {
        selectedVacationDays.delete(dateStr);
    } else {
        selectedVacationDays.add(dateStr);
    }
    
    renderCalendar();
    updateVacationRanges();
    updateWorkingDaysInfo();
}

function updateVacationRanges() {
    if (selectedVacationDays.size === 0) {
        document.getElementById('vacationRanges').textContent = '-';
        return;
    }
    
    // Сортируем даты
    const sortedDates = Array.from(selectedVacationDays).sort();
    
    // Группируем в диапазоны
    const ranges = [];
    let start = sortedDates[0];
    let prev = sortedDates[0];
    
    for (let i = 1; i <= sortedDates.length; i++) {
        const current = sortedDates[i];
        if (current) {
            const prevDate = new Date(prev);
            const currentDate = new Date(current);
            const diffDays = (currentDate - prevDate) / (1000 * 60 * 60 * 24);
            
            if (diffDays > 1) {
                // Конец диапазона
                ranges.push({ start, end: prev });
                start = current;
            }
        } else {
            // Последний диапазон
            ranges.push({ start, end: prev });
        }
        prev = current;
    }
    
    // Форматируем диапазоны
    const formattedRanges = ranges.map(range => {
        const startDate = new Date(range.start);
        const endDate = new Date(range.end);
        const startStr = `${String(startDate.getDate()).padStart(2, '0')}.${String(startDate.getMonth() + 1).padStart(2, '0')}`;
        
        if (startDate.toDateString() === endDate.toDateString()) {
            return startStr;
        } else {
            const endStr = `${String(endDate.getDate()).padStart(2, '0')}.${String(endDate.getMonth() + 1).padStart(2, '0')}`;
            return `${startStr}-${endStr}`;
        }
    });
    
    document.getElementById('vacationRanges').textContent = formattedRanges.join(', ');
}

function updateWorkingDaysInfo() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Получаем все рабочие дни месяца (пн-пт)
    const workingDaysList = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Не воскресенье и не суббота
            workingDaysList.push(day);
        }
    }
    
    const totalWorkingDays = workingDaysList.length;
    
    // Подсчитываем отпускные дни, которые приходятся на рабочие дни
    let vacationWorkingDays = 0;
    selectedVacationDays.forEach(dateStr => {
        const date = new Date(dateStr);
        if (date.getMonth() === month && date.getFullYear() === year) {
            const dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                vacationWorkingDays++;
            }
        }
    });
    
    const actualWorkingDays = totalWorkingDays - vacationWorkingDays;
    document.getElementById('workingDaysCount').textContent = actualWorkingDays;
    document.getElementById('totalWorkingDays').textContent = totalWorkingDays;
}

function setVacationDays() {
    if (!currentCalendarEmployeeId) return;
    
    const monthKey = getCurrentMonthKey();
    
    
    if (!vacations[monthKey]) {
        vacations[monthKey] = {};
    }
    
    
    vacations[monthKey][currentCalendarEmployeeId] = Array.from(selectedVacationDays);
    
    saveDataToLocalStorage();
    
    closeAvailabilityModal();
    
    refreshAllTables();
}

function closeAvailabilityModal() {
    document.getElementById('availabilityModal').style.display = 'none';
}

function refreshAllTables() {
    // Обновляем все таблицы на странице
    if (typeof showProjectsOverview === 'function') {
        showProjectsOverview();
    }
    if (typeof showEmployeesList === 'function') {
        showEmployeesList();
    }
    
}

function prevMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar();
    updateVacationRanges();
    updateWorkingDaysInfo();
}

function nextMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar();
    updateVacationRanges();
    updateWorkingDaysInfo();
}

// В событии слушателе
document.body.addEventListener('click', function(e) {
    const btn = e.target.closest('.availability-btn');
    if (btn && btn.dataset.id) {  // ← было employeeId, стало id
        console.log('✅ Клик по Availability, ID:', btn.dataset.id);
        e.preventDefault();
        showAvailabilityCalendar(parseInt(btn.dataset.id));  // ← тоже id
    }
});

function closeAvailabilityModal() {
    const modal = document.getElementById('availabilityModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function initModalHandlers() {
    const modal = document.getElementById('availabilityModal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.modal-close-btn');
    
    if (closeBtn) closeBtn.onclick = closeAvailabilityModal;
    if (cancelBtn) cancelBtn.onclick = closeAvailabilityModal;
    
    modal.onclick = (e) => {
        if (e.target === modal) closeAvailabilityModal();
    };
    
    document.onkeydown = (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeAvailabilityModal();
        }
    };
}
// ====== Edit Assignment ======
// Глобальные переменные для редактирования
let currentEditAssignment = null;
let currentEditEmployee = null;
let currentEditProject = null;

function openEditAssignment(assignmentId, employeeId, projectId) {
    const monthKey = getCurrentMonthKey();
    
    // Находим данные
    currentEditAssignment = assignments.find(a => a.id === assignmentId);
    if (!currentEditAssignment) return;
    
    currentEditEmployee = employeesData.find(e => e.id === employeeId);
    currentEditProject = findProjectById(projectId, monthKey);
    
    if (!currentEditEmployee || !currentEditProject) return;
    
    // Заполняем информацию
    document.getElementById('editEmployeeName').textContent = 
        `${currentEditEmployee.firstName} ${currentEditEmployee.lastName}`;
    document.getElementById('editProjectName').textContent = currentEditProject.projectName;
    
    // Настраиваем слайдеры
    const capacitySlider = document.getElementById('capacitySlider');
    const fitSlider = document.getElementById('fitSlider');
    const capacityValue = document.getElementById('capacityValue');
    const fitValue = document.getElementById('fitValue');
    
    // Получаем текущий fit коэффициент
    const currentFit = fitCoefficients[projectId]?.[currentEditEmployee.position] || 1.0;
    
    capacitySlider.value = currentEditAssignment.capacity;
    fitSlider.value = currentFit;
    capacityValue.textContent = currentEditAssignment.capacity;
    fitValue.textContent = currentFit;
    
    // Добавляем обработчики
    capacitySlider.oninput = () => {
        capacityValue.textContent = capacitySlider.value;
        validateAndPreview();
    };
    
    fitSlider.oninput = () => {
        fitValue.textContent = parseFloat(fitSlider.value).toFixed(2);
        validateAndPreview();
    };
    
    // Показываем модалку
    document.getElementById('editAssignmentModal').style.display = 'flex';
    validateAndPreview();
}

function validateAndPreview() {
    const capacity = parseFloat(document.getElementById('capacitySlider').value);
    const fit = parseFloat(document.getElementById('fitSlider').value);
    
    let isValid = true;
    
    // Валидация capacity
    const capacityValidation = document.getElementById('capacityValidation');
    const employeeTotalAssigned = getEmployeeTotalAssigned(currentEditEmployee.id, currentEditAssignment.projectId);
    const availableCapacity = currentEditEmployee.salary / 100; // Пример: 100 hours = 10000 salary
    
    if (capacity < 0 || capacity > 176) {
        capacityValidation.textContent = '❌ Capacity must be between 0 and 176 hours';
        capacityValidation.className = 'validation-message error';
        isValid = false;
    } else if (employeeTotalAssigned + capacity > 176) {
        capacityValidation.textContent = `⚠️ Employee would exceed capacity (${employeeTotalAssigned + capacity}/176)`;
        capacityValidation.className = 'validation-message error';
        isValid = false;
    } else {
        capacityValidation.textContent = '✅ Valid capacity';
        capacityValidation.className = 'validation-message success';
    }
    
    // Валидация fit
    const fitValidation = document.getElementById('fitValidation');
    if (fit < 0 || fit > 1) {
        fitValidation.textContent = '❌ Fit must be between 0 and 1.0';
        fitValidation.className = 'validation-message error';
        isValid = false;
    } else {
        fitValidation.textContent = '✅ Valid fit coefficient';
        fitValidation.className = 'validation-message success';
    }
    
    // Обновляем preview
    updateFinancialPreview(capacity, fit);
    
    // Включаем/выключаем кнопку сохранения
    document.getElementById('saveAssignmentBtn').disabled = !isValid;
}

function updateFinancialPreview(capacity, fit) {
    const vacationDays = vacations[getCurrentMonthKey()]?.[currentEditEmployee.id] || 0;
    const workingDays = 22;
    const vacationFactor = 1 - (vacationDays / workingDays);
    const effectiveCapacity = capacity * fit * vacationFactor;
    const revenue = effectiveCapacity * currentEditEmployee.salary * 1.2;
    const cost = capacity * currentEditEmployee.salary;
    const profit = revenue - cost;
    
    document.getElementById('previewRevenue').textContent = `$${revenue.toFixed(2)}`;
    document.getElementById('previewCost').textContent = `$${cost.toFixed(2)}`;
    const profitEl = document.getElementById('previewProfit');
    profitEl.textContent = `$${profit.toFixed(2)}`;
    profitEl.className = profit >= 0 ? 'profit-positive' : 'profit-negative';
}

function saveAssignment() {
    const newCapacity = parseFloat(document.getElementById('capacitySlider').value);
    const newFit = parseFloat(document.getElementById('fitSlider').value);
    
    // Обновляем assignment
    currentEditAssignment.capacity = newCapacity;
    
    // Обновляем fit coefficient
    const monthKey = getCurrentMonthKey();
    if (!fitCoefficients[currentEditAssignment.projectId]) {
        fitCoefficients[currentEditAssignment.projectId] = {};
    }
    fitCoefficients[currentEditAssignment.projectId][currentEditEmployee.position] = newFit;
    
    // Сохраняем
    saveDataToLocalStorage();
    
    // Обновляем таблицы
    renderEmployeesTable();
    renderProjectsTable();
    if (typeof showProjectsOverview === 'function') showProjectsOverview();
    
    // Закрываем модалку
    closeEditAssignmentModal();
}

function closeEditAssignmentModal() {
    document.getElementById('editAssignmentModal').style.display = 'none';
}

function getEmployeeTotalAssigned(employeeId, excludeProjectId = null) {
    return assignments
        .filter(a => a.employeeId === employeeId && a.projectId !== excludeProjectId)
        .reduce((sum, a) => sum + a.capacity, 0);
}
let currentUnassignData = null;

function openUnassignConfirmation(employeeId, projectId) {
    
    const monthKey = getCurrentMonthKey();
    const assignment = assignments.find(a => a.employeeId === employeeId && a.projectId === projectId);
    const employee = employeesData.find(e => e.id === employeeId);
    
    const project = findProjectById(projectId, monthKey);
    
    if (!assignment || !employee || !project) {
        console.error('6. Данные не найдены, выход');
        return;
    }

    currentUnassignData = { assignment, employee, project };
    
    const fit = fitCoefficients[projectId]?.[employee.position] || 1.0;
    
    const vacationDays = vacations[monthKey]?.[employeeId] || 0;
    
    const workingDays = 22;
    const vacationFactor = 1 - (vacationDays / workingDays);
    
    const effectiveCapacity = assignment.capacity * fit * vacationFactor;
    
    const revenue = effectiveCapacity * employee.salary * 1.2;
    
    const cost = assignment.capacity * employee.salary;
    
    const profit = revenue - cost;
    
    const currentProjectCapacity = getProjectTotalCapacity(projectId);
    
    const currentProjectRevenue = getProjectTotalRevenue(projectId);
    
    const afterProjectCapacity = currentProjectCapacity - assignment.capacity;
    
    const afterProjectRevenue = currentProjectRevenue - revenue;
    
    const summaryHtml = `
        <div>
            <p><span class="highlight">Employee:</span> ${employee.firstName} ${employee.lastName}</p>
            <p><span class="highlight">Project:</span> ${project.projectName}</p>
            <hr>
            <p><span class="highlight">Assigned Capacity:</span> ${assignment.capacity} hours</p>
            <p><span class="highlight">Employee Salary Share:</span> $${cost.toFixed(2)}</p>
            <p><span class="highlight">Budget Share:</span> $${(project.budget * (assignment.capacity / 176)).toFixed(2)}</p>
            <p><span class="highlight">Employee Income from this assignment:</span> $${revenue.toFixed(2)}</p>
            <hr>
            <p><strong>Project Impact:</strong></p>
            <p>Current Project Capacity: ${currentProjectCapacity} hours</p>
            <p>After Removal: ${afterProjectCapacity} hours ${afterProjectCapacity < 0 ? '⚠️' : ''}</p>
            <p>Current Project Revenue: $${currentProjectRevenue.toFixed(2)}</p>
            <p>After Removal: <span class="${afterProjectRevenue >= 0 ? 'positive' : 'negative'}">$${afterProjectRevenue.toFixed(2)}</span></p>
            <hr>
            <p>This assignment ${profit >= 0 ? 'contributes' : 'loses'} 
                <span class="${profit >= 0 ? 'positive' : 'negative'}">$${Math.abs(profit).toFixed(2)}</span> 
                to overall profit ${profit >= 0 ? '' : '(loss)'}</p>
        </div>
    `;
    
    const summaryDiv = document.getElementById('unassignSummary');
    
    if (summaryDiv) {
        summaryDiv.innerHTML = summaryHtml;
    } else {
        return;
    }
    
    const modal = document.getElementById('unassignModal');
    
    if (modal) {
        modal.style.display = 'flex';
    } else {
    }
}

function confirmUnassign() {
    if (!currentUnassignData) return;
    
    const { assignment, employee, project } = currentUnassignData;
    
    const index = assignments.findIndex(a => a.id === assignment.id);
    if (index !== -1) assignments.splice(index, 1);
    
    saveDataToLocalStorage();
    renderEmployeesTable();
    renderProjectsTable();
    if (typeof showProjectsOverview === 'function') showProjectsOverview();
    
    closeUnassignModal();
    
    console.log(`✅ Employee ${employee.firstName} ${employee.lastName} unassigned from project ${project.projectName}`);
}

function closeUnassignModal() {
    document.getElementById('unassignModal').style.display = 'none';
    currentUnassignData = null;
}

function getProjectTotalCapacity(projectId) {
    return assignments
        .filter(a => a.projectId === projectId)
        .reduce((sum, a) => sum + a.capacity, 0);
}

function getProjectTotalRevenue(projectId) {
    const monthKey = getCurrentMonthKey();
    let totalRevenue = 0;
    
    assignments
        .filter(a => a.projectId === projectId)
        .forEach(a => {
            const employee = employeesData.find(e => e.id === a.employeeId);
            if (employee) {
                const fit = fitCoefficients[projectId]?.[employee.position] || 1.0;
                const vacationDays = vacations[monthKey]?.[employee.id] || 0;
                const workingDays = 22;
                const vacationFactor = 1 - (vacationDays / workingDays);
                const effectiveCapacity = a.capacity * fit * vacationFactor;
                totalRevenue += effectiveCapacity * employee.salary * 1.2;
            }
        });
    
    return totalRevenue;
}
// Инициализация обработчиков модалок
document.addEventListener('DOMContentLoaded', () => {
    // Edit Assignment
    document.querySelector('#editAssignmentModal .modal-close')?.addEventListener('click', closeEditAssignmentModal);
    document.querySelector('#editAssignmentModal .modal-close-btn')?.addEventListener('click', closeEditAssignmentModal);
    document.getElementById('saveAssignmentBtn')?.addEventListener('click', saveAssignment);
    
    // Unassign
    document.querySelector('#unassignModal .modal-close')?.addEventListener('click', closeUnassignModal);
    document.querySelector('#unassignModal .modal-close-btn')?.addEventListener('click', closeUnassignModal);
    document.getElementById('confirmUnassignBtn')?.addEventListener('click', confirmUnassign);
    
    // Клик по фону
    document.getElementById('editAssignmentModal')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeEditAssignmentModal();
    });
    document.getElementById('unassignModal')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeUnassignModal();
    });
});
// ============ ОБРАБОТЧИК КНОПКИ EDIT ============
document.addEventListener('click', function(e) {
    const editBtn = e.target.closest('.edit-assignment-btn');
    if (!editBtn) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Получаем данные из атрибутов
    const assignmentId = editBtn.dataset.assignmentId;
    const employeeId = editBtn.dataset.employeeId;
    const projectId = editBtn.dataset.projectId;
    
    console.log('📝 Edit button clicked:', {
        assignmentId: assignmentId,
        employeeId: employeeId,
        projectId: projectId,
        allData: editBtn.dataset
    });
    
    // Проверяем наличие всех данных
    if (!assignmentId || !employeeId || !projectId) {
        console.error('❌ Missing data:', { assignmentId, employeeId, projectId });
        alert('Error: Missing assignment data');
        return;
    }
    
    // Вызываем функцию редактирования
    if (typeof openEditAssignment === 'function') {
        openEditAssignment(parseInt(assignmentId), parseInt(employeeId), parseInt(projectId));
    } else {
        console.error('❌ openEditAssignment function not found!');
        alert('Edit function not available');
    }
});


// function showUnassignConfirmation(employeeId, projectId) {
//     const assignment = assignments.find(a => 
//         a.employeeId === employeeId && a.projectId === projectId
//     );
//     const employee = employeesData.find(e => e.id === employeeId);
//     const project = findProjectById(projectId, getCurrentMonthKey());
    
//     if (!assignment || !employee || !project) {
//         alert('Данные не найдены');
//         return;
//     }
    
//     // Создаём модалку с деталями
//     const modalHtml = `
//         <div id="unassignModal" style="
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0,0,0,0.5);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             z-index: 100000;
//         ">
//             <div style="
//                 background: white;
//                 border-radius: 12px;
//                 width: 450px;
//                 max-width: 90%;
//                 box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//             ">
//                 <div style="
//                     padding: 16px 20px;
//                     border-bottom: 1px solid #e0e0e0;
//                     font-size: 18px;
//                     font-weight: bold;
//                     color: #dc3545;
//                 ">
//                     ⚠️ Unassign Employee
//                 </div>
//                 <div style="padding: 20px;">
//                     <div style="margin-bottom: 12px;">
//                         <strong>Employee:</strong> ${employee.firstName} ${employee.lastName}
//                     </div>
//                     <div style="margin-bottom: 12px;">
//                         <strong>Project:</strong> ${project.projectName}
//                     </div>
//                     <div style="margin-bottom: 12px;">
//                         <strong>Capacity:</strong> ${assignment.capacity} hours
//                     </div>
//                     <hr style="margin: 16px 0; border-color: #e0e0e0;">
//                     <div style="margin-bottom: 12px;">
//                         <strong>Financial Impact:</strong>
//                     </div>
//                     <div style="margin-bottom: 8px;">
//                         Revenue lost: <span style="color: #dc3545;">-$${(assignment.capacity * employee.salary * 1.2).toFixed(2)}</span>
//                     </div>
//                     <div style="margin-bottom: 8px;">
//                         Cost saved: <span style="color: #28a745;">+$${(assignment.capacity * employee.salary).toFixed(2)}</span>
//                     </div>
//                 </div>
//                 <div style="padding: 16px 20px; border-top: 1px solid #e0e0e0; display: flex; justify-content: flex-end; gap: 10px;">
//                     <button id="unassignCancelBtn" style="
//                         padding: 8px 16px;
//                         background: #6c757d;
//                         color: white;
//                         border: none;
//                         border-radius: 6px;
//                         cursor: pointer;
//                     ">Cancel</button>
//                     <button id="unassignConfirmBtn" style="
//                         padding: 8px 16px;
//                         background: #dc3545;
//                         color: white;
//                         border: none;
//                         border-radius: 6px;
//                         cursor: pointer;
//                     ">Unassign</button>
//                 </div>
//             </div>
//         </div>
//     `;
    
//     // Удаляем старую модалку если есть
//     const oldModal = document.getElementById('unassignModal');
//     if (oldModal) oldModal.remove();
    
//     // Добавляем новую
//     document.body.insertAdjacentHTML('beforeend', modalHtml);
    
//     // Кнопка Cancel
//     document.getElementById('unassignCancelBtn').onclick = () => {
//         document.getElementById('unassignModal').remove();
//     };
    
//     // Кнопка Confirm
//     document.getElementById('unassignConfirmBtn').onclick = () => {
//         const index = assignments.findIndex(a => 
//             a.employeeId === employeeId && a.projectId === projectId
//         );
//         if (index !== -1) assignments.splice(index, 1);
        
//         renderEmployeesTable();
//         renderProjectsTable();
        
//         // Закрываем все открытые модалки
//         document.querySelectorAll('#empAssignModal, #projectEmployeesModal, .employees-modal').forEach(m => m.remove());
        
//         document.getElementById('unassignModal').remove();
//         alert(`✅ ${employee.firstName} ${employee.lastName} unassigned from ${project.projectName}`);
//     };
    
//     // Закрытие по клику на фон
//     document.getElementById('unassignModal').onclick = (e) => {
//         if (e.target === e.currentTarget) {
//             e.currentTarget.remove();
//         }
//     };
// }

// Вспомогательные функции
function getProjectTotalCapacity(projectId) {
    return assignments
        .filter(a => a.projectId === projectId)
        .reduce((sum, a) => sum + a.capacity, 0);
}

function getProjectTotalRevenue(projectId) {
    const monthKey = getCurrentMonthKey();
    let total = 0;
    assignments
        .filter(a => a.projectId === projectId)
        .forEach(a => {
            const emp = employeesData.find(e => e.id === a.employeeId);
            if (emp) {
                const fit = fitCoefficients[projectId]?.[emp.position] || 1.0;
                const vacationDays = (vacations[monthKey]?.[emp.id]) || 0;
                const workingDays = 22;
                const vacationFactor = 1 - (vacationDays / workingDays);
                const effectiveCapacity = a.capacity * fit * vacationFactor;
                total += effectiveCapacity * emp.salary * 1.2;
            }
        });
    return total;
}

function getProjectTotalCost(projectId) {
    return assignments
        .filter(a => a.projectId === projectId)
        .reduce((sum, a) => {
            const emp = employeesData.find(e => e.id === a.employeeId);
            return sum + (emp ? a.capacity * emp.salary : 0);
        }, 0);
}
// ============ ОБРАБОТЧИК ДЛЯ КНОПОК UNASSIGN ============
// Глобальный обработчик для кнопок Unassign
document.body.addEventListener('click', function(e) {
    const btn = e.target.closest('.unassign-btn');
    if (!btn) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔴 Кнопка Unassign нажата!');
    
    const empId = parseInt(btn.dataset.employeeId);
    const projId = parseInt(btn.dataset.projectId);
    
    console.log('Данные с кнопки:', { empId, projId });
    
    if (empId && projId) {
        openUnassignConfirmation(empId, projId);
    } else {
        console.error('Нет данных на кнопке');
    }
});