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

function renderProjectsTable() {
    const monthKey = getCurrentMonthKey();
    const monthData = projectsDataByMonth[monthKey];
    const projects = monthData ? monthData.projects : [];
    const tbody = document.querySelector('.projects__table tbody');

    if (!tbody) return;

    if (projects.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:40px;">No projects for this period</td></tr>';
    updateTotalIncome(0);
    return;
    }

    tbody.innerHTML = projects.map(project => `
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
    `).join('');

    updateTotalIncome(projects);

    document.querySelectorAll('.employees-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.dataset.projectId;
        const projectName = btn.dataset.projectName;
        showEmployeesModal(projectId, projectName);
    });
    });
}

// Toggle close
const toggleBtn = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});


function updateTotalIncome(total) {
    const totalIncomeElement = document.querySelector('.total-income-value');
    if (totalIncomeElement) {
    totalIncomeElement.textContent = `$${total.toLocaleString()}`;
    }
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

document.addEventListener('DOMContentLoaded', () => {
    initSelectors();
    renderProjectsTable();
});
function showEmployeesModal(projectId, projectName) {
  // Создаём модалку динамически
    const modal = document.createElement('div');
    modal.className = 'employees-modal';
    modal.innerHTML = `
    <div class="modal-overlay">
        <div class="modal-container">
        <div class="modal-header">
            <h3><i class="fa-solid fa-users"></i> ${projectName} - Employees</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <table class="employees-list-table">
            <thead>
                <tr><th>Name</th><th>Position</th><th>Capacity</th></tr>
            </thead>
            <tbody id="employeesListBody"></tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button class="btn-add-employee">+ Add Employee</button>
        </div>
        </div>
    </div>
    `;
    
    document.body.appendChild(modal);
    
  // Загружаем сотрудников для проекта
    loadEmployeesForProject(projectId);
    
  // Закрытие модалки
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.querySelector('.modal-overlay').onclick = (e) => {
    if (e.target === modal.querySelector('.modal-overlay')) modal.remove();
    };
}

function loadEmployeesForProject(projectId) {
  // Данные сотрудников на проекте
    const projectEmployees = {
    1: [
        { name: 'John Smith', position: 'Senior Developer', capacity: 0.8 },
        { name: 'Anna Lee', position: 'QA Engineer', capacity: 0.5 }
    ],
    2: [
        { name: 'Mike Brown', position: 'Project Manager', capacity: 1.0 },
        { name: 'Sarah Davis', position: 'Data Analyst', capacity: 0.7 }
    ]
    };
    
    const employees = projectEmployees[projectId] || [];
    const tbody = document.getElementById('employeesListBody');
    
    if (tbody) {
    tbody.innerHTML = employees.map(emp => `
        <tr>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
        <td>${emp.capacity}</td>
        </tr>
    `).join('');
    }
}

// total estimated income
function updateTotalIncome(projectsArray) {
    const totalIncomeElement = document.querySelector('.total-income-value');
    if (!totalIncomeElement) return;
    
    console.log('updateTotalIncome получил:', projectsArray);
    
    
    let total = 0;
    
    if (Array.isArray(projectsArray)) {
        for (let i = 0; i < projectsArray.length; i++) {
            const income = projectsArray[i].estimatedIncome;
            console.log(`Проект ${i}: estimatedIncome = ${income}`);
            total = total + (income || 0);
        }
    }
    
    console.log('Итоговая сумма:', total);
    totalIncomeElement.textContent = `$${total.toLocaleString()}`;
}

// Рендер таблицы с кнопкой в колонке Employees
function renderProjectsTable() {
    const monthKey = getCurrentMonthKey();
    const monthData = projectsDataByMonth[monthKey];
    const projects = monthData ? monthData.projects : [];
    
    const tbody = document.querySelector('.projects__table tbody');
    if (!tbody) return;

    tbody.innerHTML = projects.map(project => `
    <tr data-project-id="${project.id}">
        <td>${escapeHtml(project.companyName)}</td>
        <td>${escapeHtml(project.projectName)}</td>
        <td>$${project.budget.toLocaleString()}</td>
        <td>${project.employeeCapacity}</td>
        <td class="employees-cell">
        <button class="employees-btn" data-project-id="${project.id}" data-project-name="${escapeHtml(project.projectName)}">
            Show Employees<br>
            <i class="fa-solid fa-users"></i> (${project.employees})
        </button>
        </td>
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
    `).join('');
        
  // Добавляем обработчики на кнопки Employees
    document.querySelectorAll('.employees-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.dataset.projectId;
        const projectName = btn.dataset.projectName;
        showEmployeesModal(projectId, projectName);
    });
    });
    
    updateTotalIncome(projects);
}