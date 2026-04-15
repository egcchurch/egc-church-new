// js/sermons.js

// Sample sermons data - you can later move this to Firebase Firestore
const sermons = [
  {
    id: 1,
    title: "Walking by Faith, Not by Sight",
    date: "2025-04-06",
    speaker: "Pastor John Doe",
    scripture: "2 Corinthians 5:7",
    audioUrl: "assets/audio/sermon1.mp3",   // Add your MP3 files here later
    duration: "45 min"
  },
  {
    id: 2,
    title: "The Power of the Resurrection",
    date: "2025-03-30",
    speaker: "Pastor John Doe",
    scripture: "1 Corinthians 15:12-20",
    audioUrl: "assets/audio/sermon2.mp3",
    duration: "52 min"
  },
  {
    id: 3,
    title: "Grace Upon Grace",
    date: "2025-03-23",
    speaker: "Evangelist Mark Smith",
    scripture: "John 1:16",
    audioUrl: "assets/audio/sermon3.mp3",
    duration: "38 min"
  }
  // Add more sermons here
];

// Render sermons
function renderSermons(filteredSermons) {
  const grid = document.getElementById('sermons-grid');
  grid.innerHTML = '';

  filteredSermons.forEach(sermon => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition";
    card.innerHTML = `
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="text-amber-600 text-sm font-medium">${sermon.date}</p>
            <h3 class="font-semibold text-lg leading-tight mt-1">${sermon.title}</h3>
          </div>
        </div>
        
        <p class="text-gray-600 text-sm mb-2">${sermon.speaker}</p>
        <p class="text-amber-700 text-sm font-medium">${sermon.scripture}</p>
        
        <div class="mt-6 flex items-center gap-3">
          <audio controls class="w-full accent-amber-500">
            <source src="${sermon.audioUrl}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Simple search and filter
function filterSermons() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  
  const filtered = sermons.filter(sermon => 
    sermon.title.toLowerCase().includes(searchTerm) ||
    sermon.speaker.toLowerCase().includes(searchTerm) ||
    sermon.scripture.toLowerCase().includes(searchTerm)
  );
  
  renderSermons(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderSermons(sermons);
  
  // Live search
  document.getElementById('search-input').addEventListener('input', filterSermons);
});