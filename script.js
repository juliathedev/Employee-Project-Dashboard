
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
    { id: 101, name: 'John Smith', position: 'Senior Developer', salary: 5000 },
    { id: 102, name: 'Anna Lee', position: 'QA Engineer', salary: 3500 },
    { id: 103, name: 'Mike Brown', position: 'Project Manager', salary: 6200 },
    { id: 104, name: 'Sarah Davis', position: 'Data Analyst', salary: 4800 },
    { id: 105, name: 'David Wilson', position: 'Junior Developer', salary: 2500 }
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
                    <td><a href="#" class="employee-name-link" data-id="${employee.id}">${escapeHtml(employee.name)}</a></td>
                    <td class="capacity-cell">${details.capacity.toFixed(2)}</td>
                    <td class="fit-cell">${details.fit.toFixed(2)}</td>
                    <td class="vacation-cell">${details.vacationDays}</td>
                    <td class="effective-cell">${details.effectiveCapacity.toFixed(3)}</td>
                    <td class="revenue-cell">$${details.revenue.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                    <td class="cost-cell">$${details.cost.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                    <td class="${profitClass}">${details.profit >= 0 ? '$' : '-$'}${Math.abs(details.profit).toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                    <td class="actions-cell">
                        <button class="edit-assignment-btn" data-employee-id="${employee.id}" data-project-id="${projectId}">
                            <i class="fa-solid fa-pen"></i>
                            Edit
                        </button>
                        <button class="unassign-btn" data-employee-id="${employee.id}" data-project-id="${projectId}">
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