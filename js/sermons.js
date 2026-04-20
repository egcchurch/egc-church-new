// js/sermons.js

const sermons = [
  {
    id: 1,
    title: "Walking by Faith, Not by Sight",
    date: "2025-04-06",
    speaker: "Pastor John Doe",
    scripture: "2 Corinthians 5:7",
    audioUrl: "#",
    duration: "45 min"
  },
  {
    id: 2,
    title: "The Power of the Resurrection",
    date: "2025-04-02",
    speaker: "Pastor John Doe",
    scripture: "1 Corinthians 15:12-20",
    audioUrl: "#",
    duration: "52 min"
  },
  {
    id: 3,
    title: "Grace Upon Grace",
    date: "2025-03-23",
    speaker: "Evangelist Mark Smith",
    scripture: "John 1:16",
    audioUrl: "#",
    duration: "38 min"
  },
  {
    id: 4,
    title: "The Just Shall Live by Faith",
    date: "2025-03-16",
    speaker: "Pastor John Doe",
    scripture: "Habakkuk 2:4",
    audioUrl: "#",
    duration: "41 min"
  }
];

// Group sermons by month/year for table view
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

function renderTableView(filtered) {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';

  const grouped = groupByMonthYear(filtered);

  Object.keys(grouped).forEach(monthYear => {
    // Month header row
    const headerRow = document.createElement('tr');
    headerRow.className = "bg-amber-50";
    headerRow.innerHTML = `<td colspan="5" class="px-8 py-4 font-semibold text-[#0A3D62]">${monthYear}</td>`;
    tbody.appendChild(headerRow);

    // Sermon rows
    grouped[monthYear].forEach(s => {
      const row = `
        <tr class="hover:bg-amber-50 transition">
          <td class="px-8 py-5">${s.date}</td>
          <td class="px-8 py-5">${s.speaker}</td>
          <td class="px-8 py-5 font-medium">${s.title}</td>
          <td class="px-8 py-5 text-amber-700">${s.scripture}</td>
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
          <p class="text-amber-700 text-sm mt-1">${s.scripture}</p>
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

function filterAndRender() {
  const term = document.getElementById('search-input').value.toLowerCase().trim();
  const filtered = sermons.filter(s => 
    s.title.toLowerCase().includes(term) ||
    s.speaker.toLowerCase().includes(term) ||
    s.scripture.toLowerCase().includes(term)
  );

  if (currentView === 'card') renderCardView(filtered);
  else renderTableView(filtered);
}

let currentView = 'table';   // Default to Table View

function setView(view) {
  currentView = view;
  document.getElementById('card-view').classList.toggle('hidden', view !== 'card');
  document.getElementById('table-view').classList.toggle('hidden', view !== 'table');

  document.getElementById('card-btn').classList.toggle('active-view', view === 'card');
  document.getElementById('table-btn').classList.toggle('active-view', view === 'table');

  filterAndRender();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setView('table');                    // Start with Table View
  document.getElementById('search-input').addEventListener('input', filterAndRender);
});