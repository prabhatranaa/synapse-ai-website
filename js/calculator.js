/**
 * SYNAPSE ENTERPRISE AI - INTERACTIVE ROI CALCULATOR
 * Calculates real-time projected enterprise automation savings
 */

document.addEventListener('DOMContentLoaded', () => {
  const teamSlider = document.getElementById('roi-team-slider');
  const hoursSlider = document.getElementById('roi-hours-slider');
  const teamValEl = document.getElementById('roi-team-val');
  const hoursValEl = document.getElementById('roi-hours-val');
  const savingsResultEl = document.getElementById('roi-savings-result');
  const hoursReclaimedEl = document.getElementById('roi-hours-reclaimed');

  if (!teamSlider || !hoursSlider || !savingsResultEl) return;

  function calculateROI() {
    const teamSize = parseInt(teamSlider.value, 10);
    const weeklyHours = parseInt(hoursSlider.value, 10);
    const blendedHourlyRate = 115; // Realistic enterprise IT/ops blended rate
    const automationEfficiency = 0.78; // 78% average automation efficiency

    // Annual hours automated
    const annualTotalHours = teamSize * weeklyHours * 50;
    const hoursSaved = Math.round(annualTotalHours * automationEfficiency);
    const annualSavings = Math.round(hoursSaved * blendedHourlyRate);

    // Update UI text
    if (teamValEl) teamValEl.textContent = `${teamSize} Engineers / Ops`;
    if (hoursValEl) hoursValEl.textContent = `${weeklyHours} hrs / week`;
    
    // Format currency
    const formattedSavings = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(annualSavings);

    savingsResultEl.textContent = formattedSavings;
    if (hoursReclaimedEl) {
      hoursReclaimedEl.textContent = `${hoursSaved.toLocaleString()} hours saved/year`;
    }
  }

  teamSlider.addEventListener('input', calculateROI);
  hoursSlider.addEventListener('input', calculateROI);

  // Initial calculation
  calculateROI();
});
