/**
 * FifthKeys Admin - Main JavaScript
 * Handles interactions, charts, and functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize sidebar toggle
    initSidebarToggle();
    
    // Initialize charts
    initCharts();
    
    // Initialize animations
    initAnimations();
});

/**
 * Initialize theme toggle
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use OS preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        // Reinitialize charts with new theme colors
        initCharts();
    });
}

/**
 * Initialize sidebar toggle for mobile
 */
function initSidebarToggle() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebar = document.querySelector('.sidebar');
    
    // Toggle sidebar on mobile
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
    
    // Close sidebar on mobile
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

/**
 * Initialize charts
 */
function initCharts() {
    // Get theme colors based on current mode
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#f9fafb' : '#111827';
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
    const primaryColor = '#3b82f6';
    const secondaryColor = '#10b981';
    
    // Lead Conversion Chart
    const leadConversionCtx = document.getElementById('leadConversionChart');
    if (leadConversionCtx) {
        // Destroy existing chart if it exists
        if (leadConversionCtx.chart) {
            leadConversionCtx.chart.destroy();
        }
        
        leadConversionCtx.chart = new Chart(leadConversionCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'New Leads',
                        data: [120, 145, 132, 158, 180, 195, 210, 240, 225, 260, 278, 295],
                        borderColor: primaryColor,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Conversions',
                        data: [20, 25, 22, 30, 35, 40, 45, 50, 48, 55, 60, 65],
                        borderColor: secondaryColor,
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: textColor
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor
                        }
                    },
                    y: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor
                        }
                    }
                }
            }
        });
    }
    
    // Lead Sources Chart
    const leadSourcesCtx = document.getElementById('leadSourcesChart');
    if (leadSourcesCtx) {
        // Destroy existing chart if it exists
        if (leadSourcesCtx.chart) {
            leadSourcesCtx.chart.destroy();
        }
        
        leadSourcesCtx.chart = new Chart(leadSourcesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Website', 'Referrals', 'Social Media', 'Email', 'Events'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: textColor,
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Team Performance Chart
    const teamPerformanceCtx = document.getElementById('teamPerformanceChart');
    if (teamPerformanceCtx) {
        // Destroy existing chart if it exists
        if (teamPerformanceCtx.chart) {
            teamPerformanceCtx.chart.destroy();
        }
        
        teamPerformanceCtx.chart = new Chart(teamPerformanceCtx, {
            type: 'bar',
            data: {
                labels: ['Sarah', 'Michael', 'Elena', 'David', 'Alex'],
                datasets: [{
                    label: 'Demos Booked',
                    data: [65, 59, 80, 81, 56],
                    backgroundColor: 'rgba(59, 130, 246, 0.7)'
                }, {
                    label: 'Deals Closed',
                    data: [28, 32, 40, 38, 25],
                    backgroundColor: 'rgba(16, 185, 129, 0.7)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor
                        }
                    },
                    y: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor
                        }
                    }
                }
            }
        });
    }
}

/**
 * Initialize animations
 */
function initAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.metric-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.chart-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${0.4 + (index * 0.1)}s`;
    });
    
    document.querySelectorAll('.card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${0.7 + (index * 0.1)}s`;
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all animation elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Handle demo preparation
 * This would typically open a modal with demo details
 */
function prepareDemo(demoId) {
    console.log('Preparing for demo:', demoId);
    // Implementation would depend on specific requirements
}

/**
 * Handle joining demo meeting
 * This would typically open the video conferencing tool
 */
function joinDemo(demoId) {
    console.log('Joining demo:', demoId);
    // Implementation would depend on specific requirements
}

/**
 * Handle date range selection
 */
function selectDateRange(range) {
    console.log('Selected date range:', range);
    // Implementation would depend on specific requirements
}
