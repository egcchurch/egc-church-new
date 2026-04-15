// js/sermons.js

const sermons = [
  {
    id: 1,
    title: "Walking by Faith, Not by Sight",
    date: "2025-04-06",
    speaker: "Pastor John Doe",
    scripture: "2 Corinthians 5:7",
    audioUrl: "#",                    // Replace with real MP3 path later
    duration: "45 min"
  },
  {
    id: 2,
    title: "The Power of the Resurrection",
    date: "2025-03-30",
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

function renderSermons(filteredSermons) {
  const grid = document.getElementById('sermons-grid');
  grid.innerHTML = '';

  if (filteredSermons.length === 0) {
    grid.innerHTML = `
      <div class="col-span-3 text-center py-20">
        <p class="text-gray-500 text-lg">No sermons found matching your search.</p>
      </div>`;
    return;
  }

  filteredSermons.forEach(sermon => {
    const cardHTML = `
      <div class="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
        <div class="p-7">
          <div class="flex justify-between mb-4">
            <span class="text-sm text-amber-600 font-medium">${sermon.date}</span>
            <span class="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">${sermon.duration}</span>
          </div>
          
          <h3 class="font-semibold text-xl leading-tight mb-3">${sermon.title}</h3>
          
          <p class="text-gray-600 mb-1">${sermon.speaker}</p>
          <p class="text-amber-700 text-sm">${sermon.scripture}</p>

          <div class="mt-8">
            <audio controls class="w-full accent-amber-500 rounded-2xl">
              <source src="${sermon.audioUrl}" type="audio/mpeg">
              Your browser does not support audio playback.
            </audio>
          </div>
        </div>
      </div>
    `;
    grid.innerHTML += cardHTML;
  });
}

// Filter function
function filterSermons() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
  const yearFilter = document.getElementById('year-filter').value;
  const speakerFilter = document.getElementById('speaker-filter').value;

  let filtered = sermons;

  if (searchTerm) {
    filtered = filtered.filter(s => 
      s.title.toLowerCase().includes(searchTerm) ||
      s.speaker.toLowerCase().includes(searchTerm) ||
      s.scripture.toLowerCase().includes(searchTerm)
    );
  }

  if (speakerFilter) {
    filtered = filtered.filter(s => s.speaker === speakerFilter);
  }

  renderSermons(filtered);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderSermons(sermons);

  // Live filtering
  document.getElementById('search-input').addEventListener('input', filterSermons);
  document.getElementById('year-filter').addEventListener('change', filterSermons);
  document.getElementById('speaker-filter').addEventListener('change', filterSermons);
});