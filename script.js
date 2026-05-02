
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
const vacations = {
    '2026-01': {
        101: 2,
        102: 0,
        103: 5,
        104: 1,
        105: 3
    },
    '2026-02': {
        101: 0,
        102: 3,
        103: 0,
        104: 0,
        105: 2
    }
};



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
                        <button class="edit-assignment-btn  btn__action" data-employee-id="${employee.id}" data-project-id="${projectId}">
                            <i class="fa-solid fa-pen"></i>
                            Edit
                        </button>
                        <button class="unassign-btn btn__action" data-employee-id="${employee.id}" data-project-id="${projectId}">
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
                        <thead>
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
        btn.addEventListener('click', () => {
            const empId = btn.dataset.employeeId;
            const projId = btn.dataset.projectId;
            alert(`Edit assignment for employee ${empId} on project ${projId} – будет реализовано`);
        });
    });
    modal.querySelectorAll('.unassign-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const empId = btn.dataset.employeeId;
            const projId = btn.dataset.projectId;
            if (confirm(`Unassign employee ${empId} from project?`)) {
                
                const index = assignments.findIndex(a => a.employeeId == empId && a.projectId == projId);
                if (index !== -1) assignments.splice(index, 1);
                modal.remove();
                
                showEmployeesModal(projectId, projectName);
            }
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
                    <button class="assign-btn btn__action" data-id="${emp.id}" ${isOverloaded ? 'disabled' : ''}>
                        <i class="fa-solid fa-user-plus"></i>
                        Assign
                    </button>
                    <button class="delete-employee-btn btn__action" data-id="${emp.id}">
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
        // бенч
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
    // Availability
    document.querySelectorAll('.availability-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const empId = btn.dataset.id;
            openVacationCalendar(empId);
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
            if (confirm('Delete employee permanently? All assignments will be lost.')) {
                const index = employeesData.findIndex(e => e.id === empId);
                if (index !== -1) employeesData.splice(index, 1);
                // удаляем назначения
                for (let i = assignments.length-1; i >= 0; i--) {
                    if (assignments[i].employeeId === empId) assignments.splice(i,1);
                }
                renderEmployeesTable();
                renderProjectsTable(); // обновить таблицу проектов (могли измениться Employee count)
            }
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
    const employee = employeesData.find(e => e.id === employeeId);
    if (!employee) return;
    const monthKey = getCurrentMonthKey();
    const empAssignments = assignments.filter(a => a.employeeId === employeeId);
    
    let rowsHtml = '';
    if (empAssignments.length === 0) {
        rowsHtml = '<tr><td colspan="6">No projects assigned</td></tr>';
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
                    <td class="${profitClass}">${formatCurrency(profit)}</td>
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
                        <thead>
                            <tr><th>Project</th><th>Capacity</th><th>Fit</th><th>Vacation Days</th><th>Effective Cap.</th><th>Profit</th></tr>
                        </thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('empAssignModal');
    const closeModal = () => modal.remove();
    modal.querySelector('.modal-close').onclick = closeModal;
    modal.querySelector('.modal-overlay').onclick = closeModal;
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