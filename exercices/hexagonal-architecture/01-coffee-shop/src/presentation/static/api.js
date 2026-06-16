import { API_BASE } from "./config.js";
import { showToast, formatTime } from "./utils.js";

export async function loadStock() {
  try {
    const response = await fetch(`${API_BASE}/stock`);
    if (!response.ok) throw new Error("Failed to load stock");

    const ingredients = await response.json();
    const stockDiv = document.getElementById("stock");

    if (ingredients.length === 0) {
      stockDiv.innerHTML =
        '<p class="text-base-content/50">No ingredients in stock</p>';
      return;
    }

    stockDiv.innerHTML = ingredients
      .map(
        (ing) => `
        <div class="flex justify-between items-center p-3 bg-base-200 rounded-lg">
          <span class="font-semibold">${ing.name}</span>
          <span class="badge badge-lg">${ing.quantity} units</span>
        </div>
      `,
      )
      .join("");
  } catch (error) {
    console.error("Stock loading error:", error);
    document.getElementById("stock").innerHTML =
      '<p class="text-error">Failed to load stock</p>';
  }
}

export async function loadRecipes() {
  try {
    const response = await fetch(`${API_BASE}/recipes`);
    if (!response.ok) throw new Error("Failed to load recipes");

    const recipes = await response.json();
    const recipesDiv = document.getElementById("recipes");
    const recipeSelect = document.getElementById("recipeSelect");

    if (recipes.length === 0) {
      recipesDiv.innerHTML =
        '<p class="text-base-content/50">No recipes available</p>';
      return;
    }

    recipesDiv.innerHTML = recipes
      .map(
        (recipe) => `
        <div class="flex justify-between items-center p-3 bg-base-200 rounded-lg">
          <span class="font-semibold">${recipe.name}</span>
          <span class="badge badge-primary">${recipe.estimatedPrice}¢</span>
        </div>
      `,
      )
      .join("");

    recipeSelect.innerHTML =
      "<option disabled selected>Choose a recipe...</option>" +
      recipes
        .map(
          (recipe) =>
            `<option value="${recipe.name}">${recipe.name} (${recipe.estimatedPrice}¢)</option>`,
        )
        .join("");
  } catch (error) {
    console.error("Recipes loading error:", error);
    document.getElementById("recipes").innerHTML =
      '<p class="text-error">Failed to load recipes</p>';
  }
}

export async function loadSalesHistory() {
  try {
    const response = await fetch(`${API_BASE}/sales`);
    if (!response.ok) throw new Error("Failed to load sales");

    const sales = await response.json();
    const tableBody = document.getElementById("salesTableBody");

    if (sales.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="3" class="text-center text-base-content/50">No sales yet</td></tr>';
      return;
    }

    tableBody.innerHTML = sales
      .map(
        (sale) => `
        <tr>
          <td class="font-semibold">${sale.beverage.name}</td>
          <td>${sale.beverage.price}¢</td>
          <td>${formatTime(sale.timestamp)}</td>
        </tr>
      `,
      )
      .join("");
  } catch (error) {
    console.error("Sales history loading error:", error);
    document.getElementById("salesTableBody").innerHTML =
      '<tr><td colspan="3" class="text-error">Failed to load sales</td></tr>';
  }
}
