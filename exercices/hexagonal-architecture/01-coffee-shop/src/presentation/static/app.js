import { loadStock, loadRecipes, loadSalesHistory } from "./api.js";
import { prepareBeverage, restockIngredient } from "./commands.js";

// ============ INIT ============

// Expose functions to window for inline onclick handlers
document.addEventListener("DOMContentLoaded", () => {
  window.prepareBeverage = prepareBeverage;
  window.restockIngredient = restockIngredient;

  loadStock();
  loadRecipes();
  loadSalesHistory();

  // Refresh data every 5 seconds
  setInterval(() => {
    loadStock();
    loadSalesHistory();
  }, 5000);
});
