// Bobot Indeks
const indexToGrade = {
    'A': 4.00,
    'AB': 3.50,
    'B': 3.00,
    'BC': 2.50,
    'C': 2.00,
    'D': 1.00,
    'E': 0.00
};

// Fungsi untuk menambahkan baris IP
function addIPRow() {
    const ipRows = document.getElementById('ipRows');
    const newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.innerHTML = `
        <select class="index-input">
            <option value="A">A</option>
            <option value="AB">AB</option>
            <option value="B">B</option>
            <option value="BC">BC</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
        </select>
        <input type="number" class="sks-input" placeholder="SKS" />
    `;
    ipRows.appendChild(newRow);
}

// Fungsi untuk menghitung IP
function calculateIP() {
    const rows = document.querySelectorAll('#ipRows .row');
    let totalBobot = 0;
    let totalSks = 0;

    rows.forEach(row => {
        const index = row.querySelector('.index-input').value;
        const sks = parseFloat(row.querySelector('.sks-input').value);

        if (isNaN(sks) || sks <= 0) return; // Pastikan SKS valid
        totalBobot += indexToGrade[index] * sks;
        totalSks += sks;
    });

    const ip = totalSks > 0 ? (totalBobot / totalSks).toFixed(2) : 0.00;
    document.getElementById('ipResult').textContent = `IP: ${ip}`;
}

// Fungsi untuk menambahkan baris IPK (Tanpa SKS)
function addIPKRow() {
    const ipkRows = document.getElementById('ipkRows');
    const newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.innerHTML = `
        <input type="number" class="ip-input" step="0.01" min="0.00" max="4.00" placeholder="Masukkan IP (0.00 - 4.00)" />
    `;
    ipkRows.appendChild(newRow);
}

// Fungsi untuk menghitung IPK (Hanya berdasarkan IP per semester)
function calculateIPK() {
    const rows = document.querySelectorAll('#ipkRows .row');
    let totalIP = 0;
    let totalSemester = 0;

    rows.forEach(row => {
        const ip = parseFloat(row.querySelector('.ip-input').value);

        if (isNaN(ip) || ip < 0 || ip > 4) return; // Validasi input IP
        totalIP += ip;
        totalSemester += 1;
    });

    const ipk = totalSemester > 0 ? (totalIP / totalSemester).toFixed(2) : 0.00;
    document.getElementById('ipkResult').textContent = `IPK: ${ipk}`;
}

// Inisialisasi 5 baris untuk masing-masing kalkulator
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 5; i++) {
        addIPRow();
        addIPKRow();
    }
});
