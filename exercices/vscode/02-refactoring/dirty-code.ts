const items = [
  { name: "laptop", price: 999 },
  { name: "mouse", price: 29 },
  { name: "keyboard", price: 79 },
];

function processOrder(items: { name: string; price: number }[]) {
  let x = 0;
  for (const item of items) {
    x = x + item.price;
  }

  const taxRate = 0.2;
  let y = x * taxRate;

  for (const item of items) {
    const name = capitalize(item.name);
    console.log("-", name, ":", item.price, "€");
  }

  console.log("Sous-total:", x);
  console.log("Taxe:", y);
  console.log("Total:", x + y);

  return { subtotal: x, tax: y, total: x + y };
}

processOrder(items);
