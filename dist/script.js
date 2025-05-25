const predefinedData = [
            { name: "Hotbit", url: "PXQN 2M4K NGFP", logo: "icon/ex.png" },
            

];

const iconContainer = document.getElementById('iconContainer');
const detailsContainer = document.getElementById('detailsContainer');
const detailsContent = document.getElementById('detailsContent');
const closeDetailsButton = document.getElementById('closeDetailsButton');
const viewDialog = document.getElementById('viewDialog');
const backButton = document.getElementById('backButton');
const copyTextButton = document.getElementById('copyTextButton');
const closeDialogButton = document.getElementById('closeDialogButton');
const toggleMode = document.getElementById('toggleMode');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
let selectedItem = null;

// Verificar el modo inicial
const isDarkMode = localStorage.getItem('theme') === 'dark';
toggleMode.checked = isDarkMode;
document.body.classList.toggle('dark-mode', isDarkMode);
sunIcon.classList.toggle('hidden', isDarkMode);
moonIcon.classList.toggle('hidden', !isDarkMode);
console.log('Initial theme:', isDarkMode ? 'dark' : 'light', 'Body class:', document.body.className);

toggleMode.addEventListener('change', (event) => {
    const isDarkMode = event.target.checked;
    console.log('Toggle changed, theme:', isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    sunIcon.classList.toggle('hidden', isDarkMode);
    moonIcon.classList.toggle('hidden', !isDarkMode);
    console.log('Body class after toggle:', document.body.className);
});

function loadIcons() {
    iconContainer.innerHTML = '';
    predefinedData.forEach((item, index) => {
        const iconCard = document.createElement('div');
        iconCard.className = 'card';
        iconCard.innerHTML = `
            <img src="${item.logo}" alt="${item.name}" class="card-icon">
            <h2 class="text-lg font-semibold text-gray-800">${item.name}</h2>
            <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded view-details" data-index="${index}">Ver Detalles</button>
        `;
        iconContainer.appendChild(iconCard);
    });

    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            showDetails(index);
        });
    });
}

function showDetails(index) {
    selectedItem = predefinedData[index];
    detailsContent.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${selectedItem.name}</h2>
        <p class="text-gray-700 mb-4">Código: ${selectedItem.url}</p>
        <button class="px-4 py-2 bg-blue-500 text-white rounded" id="viewQRButton">Ver QR</button>
    `;
    detailsContainer.classList.remove('hidden');

    document.getElementById('viewQRButton').addEventListener('click', () => {
        detailsContainer.classList.add('hidden'); // Cerrar el modal de detalles antes de abrir el QR
        showQRCode(selectedItem.url);
    });
}

closeDetailsButton.addEventListener('click', () => {
    detailsContainer.classList.add('hidden');
});

function showQRCode(text) {
    viewDialog.classList.remove('hidden');
    const qrCodeContainer = document.getElementById('qrcode');
    qrCodeContainer.innerHTML = '';
    new QRCode(qrCodeContainer, {
        text: text,
        width: 180,
        height: 180,
    });
}

copyTextButton.addEventListener('click', () => {
    if (selectedItem) {
        navigator.clipboard.writeText(selectedItem.url).then(() => {
            alert('Texto copiado al portapapeles');
        });
    }
});

closeDialogButton.addEventListener('click', () => {
    viewDialog.classList.add('hidden');
});

// Inicializar los íconos
loadIcons();