// --- DATA STORE ---
const weeklyPlan = [
    {
        id: 'mon',
        day: 'Monday',
        emoji: '🍚',
        cost: 160,
        status: 'Under Budget (Save 190)',
        lunch: {
            title: 'Rice + Scrambled Eggs',
            drink: '500ml Yoghurt',
            drinkPrice: 100,
            tags: ['Quick', 'Protein', 'Starch']
        },
        dinner: {
            title: 'Rice + Ndengu + Cabbage',
            balanced: true,
            desc: 'Boil Ndengu in bulk today. Cabbage is cheap vitmains.',
            tags: ['Starch', 'Protein', 'Vitamins']
        },
        tip: 'Start the week cheap. The 190 bob you save today pays for Saturday.'
    },
    {
        id: 'tue',
        day: 'Tuesday',
        emoji: '🥩',
        cost: 320,
        status: 'On Budget',
        lunch: {
            title: 'Leftover Rice + Ndengu',
            drink: 'Box Juice (Pick N Peel)',
            drinkPrice: 80,
            tags: ['Leftovers', 'Free Lunch']
        },
        dinner: {
            title: 'Ugali + Beef Stew + Sukuma',
            balanced: true,
            desc: 'Buy 200 bob beef. Buy Sukuma fresh (20 bob).',
            tags: ['Hearty', 'Iron Rich']
        },
        tip: 'Use leftover rice from Monday for a free lunch.'
    },
    {
        id: 'wed',
        day: 'Wednesday',
        emoji: '🥘',
        cost: 320,
        status: 'On Budget',
        lunch: {
            title: '2 Chapatis + Beans',
            drink: 'Soda (300ml)',
            drinkPrice: 50,
            tags: ['Treat', 'Starch']
        },
        dinner: {
            title: 'Rice + Beef/Goat Stew + Spinach',
            balanced: true,
            desc: 'Hearty meat stew replaces the old yoghurt meal for better fullness.',
            tags: ['Protein Heavy', 'Balanced']
        },
        tip: 'Buy Chapatis (20 bob each) instead of cooking to save time.'
    },
    {
        id: 'thu',
        day: 'Thursday',
        emoji: '🥗',
        cost: 310,
        status: 'On Budget',
        lunch: {
            title: 'Rice + Beans',
            drink: 'Yoghurt or Mala',
            drinkPrice: 80,
            tags: ['Leftovers', 'Probiotics']
        },
        dinner: {
            title: 'Ugali + Pan Fried Liver + Spinach',
            balanced: true,
            desc: 'Liver cooks in 10 mins. High iron for brain power.',
            tags: ['Quick', 'Nutritious']
        },
        tip: 'Liver is cheaper and cooks faster than beef.'
    },
    {
        id: 'fri',
        day: 'Friday',
        emoji: '🌯',
        cost: 350,
        status: 'Max Budget Hit',
        lunch: {
            title: 'Rice + Banana',
            drink: 'None (Save for dinner)',
            drinkPrice: 0,
            tags: ['Light', 'Fruit']
        },
        dinner: {
            title: 'Chicken Wrap + Fries + Juice',
            balanced: true,
            desc: 'The Big Treat! The wrap contains salad, making it balanced.',
            tags: ['TREAT', 'Fun']
        },
        tip: 'This meal costs exactly 350. No extra snacks today!'
    },
    {
        id: 'sat',
        day: 'Saturday',
        emoji: '🍟',
        cost: 390,
        status: 'Over Budget (Use Savings)',
        lunch: {
            title: 'Bhajia or Fries',
            drink: 'Soda',
            drinkPrice: 60,
            tags: ['Comfort Food']
        },
        dinner: {
            title: 'Ugali + Fried Pork + Kachumbari',
            balanced: true,
            desc: 'Pork dry fry. Kachumbari is your veg.',
            tags: ['Weekend Feast']
        },
        tip: 'You are 40 bob over budget. Use Monday savings to cover this.'
    },
    {
        id: 'sun',
        day: 'Sunday',
        emoji: '🍲',
        cost: 120,
        status: 'Under Budget (Reset)',
        lunch: {
            title: 'Ugali + Leftover Pork',
            drink: 'Maziwa Mala',
            drinkPrice: 70,
            tags: ['Leftovers']
        },
        dinner: {
            title: 'Rice + Fresh Bean Stew + Cabbage',
            balanced: true,
            desc: 'Prep food for Monday. Use remaining half of Cabbage.',
            tags: ['Meal Prep']
        },
        tip: 'Cheap day. Prepare your beans and rice for the week ahead.'
    }
];

// --- STATE MANAGEMENT ---
let currentDayIndex = new Date().getDay() - 1; // 0 = Mon, 6 = Sun
if (currentDayIndex < 0) currentDayIndex = 6; // Fix Sunday

// --- CORE FUNCTIONS ---

function init() {
    renderDaySelector();
    renderDayDetails(currentDayIndex);
    initCharts();
}

function switchTab(tabId) {
    // Hide all sections
    document.getElementById('view-schedule').classList.add('hidden');
    document.getElementById('view-budget').classList.add('hidden');
    document.getElementById('view-guide').classList.add('hidden');
    
    // Reset tab styles
    document.getElementById('tab-schedule').className = "flex-1 py-4 text-center text-sm transition-colors tab-inactive";
    document.getElementById('tab-budget').className = "flex-1 py-4 text-center text-sm transition-colors tab-inactive";
    document.getElementById('tab-guide').className = "flex-1 py-4 text-center text-sm transition-colors tab-inactive";

    // Show selected
    document.getElementById(`view-${tabId}`).classList.remove('hidden');
    document.getElementById(`tab-${tabId}`).className = "flex-1 py-4 text-center text-sm transition-colors tab-active";
}

function renderDaySelector() {
    const container = document.getElementById('day-selector');
    container.innerHTML = '';
    
    weeklyPlan.forEach((day, index) => {
        const isSelected = index === currentDayIndex;
        const btn = document.createElement('button');
        btn.className = `flex-shrink-0 w-14 h-14 md:w-full md:h-12 rounded-lg flex flex-col md:flex-row items-center justify-center md:justify-start md:px-4 transition-all duration-200 ${isSelected ? 'bg-slate-800 text-white shadow-md transform scale-105' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`;
        btn.onclick = () => {
            currentDayIndex = index;
            renderDaySelector();
            renderDayDetails(index);
        };
        
        // Mobile content (Day letter) vs Desktop content (Full Name)
        btn.innerHTML = `
            <span class="md:hidden font-bold text-lg">${day.day.substring(0, 1)}</span>
            <span class="hidden md:inline font-semibold mr-2">${day.day}</span>
            <span class="text-xs ${isSelected ? 'text-green-300' : 'text-gray-400'}">${day.emoji}</span>
        `;
        container.appendChild(btn);
    });
}

function renderDayDetails(index) {
    const day = weeklyPlan[index];
    const card = document.getElementById('day-detail-card');
    
    // Animation reset
    card.classList.remove('opacity-100');
    card.classList.add('opacity-0');

    setTimeout(() => {
        const balanceBadge = day.cost <= 350 
            ? `<span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">✅ On Budget</span>` 
            : `<span class="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">⚠️ Over Limit</span>`;

        card.innerHTML = `
            <div class="bg-slate-800 p-4 text-white flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-bold flex items-center gap-2">${day.emoji} ${day.day}</h2>
                    <p class="text-slate-400 text-xs mt-0.5">${day.status}</p>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold">${day.cost} <span class="text-sm font-normal text-slate-400">KSH</span></div>
                    ${balanceBadge}
                </div>
            </div>
            
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- LUNCH -->
                <div class="relative pl-6 border-l-2 border-amber-200">
                    <span class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-200 border-2 border-white"></span>
                    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Lunch</h3>
                    <p class="text-lg font-semibold text-gray-800">${day.lunch.title}</p>
                    ${day.lunch.drink !== 'None' ? `<div class="flex items-center mt-2 text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">🥤 ${day.lunch.drink} (${day.lunch.drinkPrice} bob)</div>` : ''}
                    <div class="mt-2 flex flex-wrap gap-1">
                        ${day.lunch.tags.map(t => `<span class="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">${t}</span>`).join('')}
                    </div>
                </div>

                <!-- DINNER -->
                <div class="relative pl-6 border-l-2 border-green-500">
                    <span class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
                    <div class="flex items-center gap-2 mb-1">
                        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Dinner</h3>
                        ${day.dinner.balanced ? '<span class="text-[10px] bg-green-100 text-green-700 px-1.5 rounded border border-green-200">Balanced ✅</span>' : ''}
                    </div>
                    <p class="text-lg font-semibold text-gray-800">${day.dinner.title}</p>
                    <p class="text-sm text-gray-500 mt-1 italic">"${day.dinner.desc}"</p>
                    <div class="mt-2 flex flex-wrap gap-1">
                        ${day.dinner.tags.map(t => `<span class="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">${t}</span>`).join('')}
                    </div>
                </div>
            </div>

            <div class="bg-amber-50 px-6 py-4 text-sm text-amber-800 border-t border-amber-100 flex items-start gap-2">
                <span>💡</span>
                <p><strong>Tip:</strong> ${day.tip}</p>
            </div>
        `;
        
        card.classList.remove('opacity-0');
        card.classList.add('opacity-100');
    }, 100);
}

function toggleRecipe(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.innerText = '-';
    } else {
        content.classList.add('hidden');
        icon.innerText = '+';
    }
}

// --- CHARTS CONFIG ---
function initCharts() {
    // Data prep
    const labels = weeklyPlan.map(d => d.day.substring(0, 3));
    const dataCost = weeklyPlan.map(d => d.cost);
    const limit = weeklyPlan.map(() => 350);

    // Chart 1: Daily Cost
    const ctxCost = document.getElementById('dailyCostChart').getContext('2d');
    new Chart(ctxCost, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Daily Limit (350)',
                    data: limit,
                    type: 'line',
                    borderColor: '#ef4444',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    order: 0
                },
                {
                    label: 'Your Spend',
                    data: dataCost,
                    backgroundColor: dataCost.map(c => c > 355 ? '#fbbf24' : '#3b82f6'), // Amber if over, Blue if under
                    borderRadius: 4,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.raw} KSH`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { display: false }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // Chart 2: Category Breakdown (Estimated from prompt data)
    const ctxCat = document.getElementById('categoryChart').getContext('2d');
    new Chart(ctxCat, {
        type: 'doughnut',
        data: {
            labels: ['Proteins (Meat/Eggs)', 'Staples (Rice/Unga)', 'Treats (Wrap/Fries)', 'Drinks', 'Veggies'],
            datasets: [{
                data: [800, 200, 450, 420, 100], // Rough estimates based on the weekly items
                backgroundColor: ['#ef4444', '#fcd34d', '#8b5cf6', '#3b82f6', '#22c55e'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

// Start App
init();
