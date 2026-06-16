import { API_BASE } from "./config.js";
import { showToast } from "./utils.js";
import { loadStock, loadSalesHistory } from "./api.js";

export async function prepareBeverage() {
  const recipeName = document.getElementById("recipeSelect").value;
  const amountPaid = parseInt(document.getElementById("amountInput").value);

  if (!recipeName || !amountPaid) {
    showToast("❌ Please fill in all fields", "error");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/prepare`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeName, amountPaid }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      showToast(
        `✅ ${data.beverage.name} prepared! Change: ${data.changeReturned}¢`,
        "success",
      );

      document.getElementById("recipeSelect").value = "";
      document.getElementById("amountInput").value = "";

      loadStock();
      loadSalesHistory();

      document.getElementById("orderResult").innerHTML = `
        <div class="alert alert-success">
          <span>🎉 ${data.beverage.name} ready! Price: ${data.beverage.price}¢, Change: ${data.changeReturned}¢</span>
        </div>
      `;
    } else {
      showToast(`❌ ${data.message || "Failed to prepare beverage"}`, "error");
    }
  } catch (error) {
    console.error("Prepare error:", error);
    showToast("❌ Error preparing beverage", "error");
  }
}

export async function restockIngredient() {
  const ingredientName = document.getElementById("ingredientInput").value;
  const quantity = parseInt(document.getElementById("quantityInput").value);

  if (!ingredientName || !quantity) {
    showToast("❌ Please fill in all fields", "error");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/restock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredientName, quantity }),
    });

    if (response.ok) {
      showToast(`✅ ${ingredientName} restocked (+${quantity})`, "success");

      document.getElementById("ingredientInput").value = "";
      document.getElementById("quantityInput").value = "";

      loadStock();

      document.getElementById("restockResult").innerHTML = `
        <div class="alert alert-success">
          <span>✅ ${ingredientName} restocked successfully</span>
        </div>
      `;
    } else {
      showToast("❌ Failed to restock ingredient", "error");
    }
  } catch (error) {
    console.error("Restock error:", error);
    showToast("❌ Error restocking ingredient", "error");
  }
}
