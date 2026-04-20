// js/sermons.js

const sermons = [
  {
    id: 1,
    title: "Walking by Faith, Not by Sight",
    date: "2025-04-06",
    speaker: "Pastor John Doe",
    audioUrl: "#",           // ← Replace with real .mp3 path later
    duration: "45 min"
  },
  {
    id: 2,
    title: "The Power of the Resurrection",
    date: "2025-04-02",
    speaker: "Pastor John Doe",
    audioUrl: "#",
    duration: "52 min"
  },
  {
    id: 3,
    title: "Grace Upon Grace",
    date: "2025-03-23",
    speaker: "Evangelist Mark Smith",
    audioUrl: "#",
    duration: "38 min"
  },
  {
    id: 4,
    title: "The Just Shall Live by Faith",
    date: "2025-03-16",
    speaker: "Pastor John Doe",
    audioUrl: "#",
    duration: "41 min"
  }
];

let currentView = 'table';

function setView(view) {
  currentView = view;
  document.getElementById('card-view').classList.toggle('hidden', view !== 'card');
  document.getElementById('table-view').classList.toggle('hidden', view !== 'table');

  document.getElementById('card-btn').classList.toggle('active-view', view === 'card');
  document.getElementById('table-btn').classList.toggle('active-view', view === 'table');

  filterAndRender();
}

function renderCardView(filtered) {
  const container = document.getElementById('card-view');
  container.innerHTML = '';

  filtered.forEach(s => {
    const card = `
      <div class="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
        <div class="p-7">
          <div class="flex justify-between mb-4">
            <span class="text-sm text-amber-600">${s.date}</span>
            <span class="text-xs bg-amber-100 px-3 py-1 rounded-full">${s.duration}</span>
          </div>
          <h3 class="font-semibold text-xl leading-tight mb-3">${s.title}</h3>
          <p class="text-gray-600">${s.speaker}</p>

          <div class="mt-8">
            <audio controls class="w-full accent-amber-500">
              <source src="${s.audioUrl}" type="audio/mpeg">
            </audio>
          </div>
        </div>
      </div>`;
    container.innerHTML += card;
  });
}

function renderTableView(filtered) {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';

  const grouped = groupByMonthYear(filtered);

  Object.keys(grouped).forEach(monthYear => {
    // Month/Year Header
    const header = document.createElement('tr');
    header.className = "bg-amber-50";
    header.innerHTML = `<td colspan="4" class="px-8 py-4 font-semibold text-[#0A3D62]">${monthYear}</td>`;
    tbody.appendChild(header);

    // Sermons in this month
    grouped[monthYear].forEach(s => {
      const row = `
        <tr class="hover:bg-amber-50 transition">
          <td class="px-8 py-5">${s.date}</td>
          <td class="px-8 py-5">${s.speaker}</td>
          <td class="px-8 py-5 font-medium">${s.title}</td>
          <td class="px-8 py-5">
            <audio controls class="w-52 accent-amber-500">
              <source src="${s.audioUrl}" type="audio/mpeg">
            </audio>
          </td>
        </tr>`;
      tbody.innerHTML += row;
    });
  });
}

function groupByMonthYear(sermonsList) {
  const groups = {};
  sermonsList.forEach(s => {
    const [year, month] = s.date.split('-');
    const key = `${new Date(year, month-1).toLocaleString('default', { month: 'long' })} ${year}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(s);
  });
  return groups;
}

function filterAndRender() {
  const term = document.getElementById('search-input').value.toLowerCase().trim();
  
  const filtered = sermons.filter(s => 
    s.title.toLowerCase().includes(term) || 
    s.speaker.toLowerCase().includes(term)
  );

  if (currentView === 'card') renderCardView(filtered);
  else renderTableView(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setView('table');                    // Start with Table View
  document.getElementById('search-input').addEventListener('input', filterAndRender);
});