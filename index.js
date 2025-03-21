import { menuArray } from "./menuItems.js"

const orderList = []

// Create payment button
const paymentBtn = document.createElement("button")
paymentBtn.id = "payment-btn"
paymentBtn.textContent = "Complete Order"

const paymentForm = document.getElementById("payment-form")
const paymentModal = document.getElementById("payment-modal")
const checkoutContainer = document.getElementById("checkout-container")

// Handle click events on the document
document.addEventListener("click", (e) => {
  // Add item to order if add button is clicked
  if (e.target.dataset.addItem) {
    addItemToOrder(e.target.dataset.addItem)
    renderOrders()
    return // Exit after adding an item
  }

  // Handle item removal or modal close if order list is not empty
  if (orderList.length > 0) {
    if (e.target.dataset.removeItem) {
      removeItemFromOrder(e.target.dataset.removeItem)
      renderOrders()
    } else if (e.target.id === "modal-close-btn") {
      closeModal()
    }
  }
  // Close modal if click is outside and modal is visible
  if (
    !paymentModal.contains(e.target) &&
    !paymentBtn.contains(e.target) &&
    !paymentModal.classList.contains("hidden")
  ) {
    closeModal()
  }
})

// Add item to order based on item ID
function addItemToOrder(itemId) {
  const matchedItem = menuArray.find((item) => itemId == item.id)
  if (matchedItem) {
    orderList.push(matchedItem)
    console.log("Item added:", matchedItem.name)
  }
}

// Remove item from order based on item ID
function removeItemFromOrder(itemId) {
  const itemIndex = orderList.findIndex((item) => itemId == item.id)
  if (itemIndex !== -1) {
    orderList.splice(itemIndex, 1)
    console.log("Item removed:", itemId)
  }
}

// Open the payment modal when payment button is clicked
paymentBtn.addEventListener("click", () => {
  paymentModal.classList.remove("hidden")
  paymentModal.classList.add("visible")
  document.body.appendChild(paymentModal)
  console.log("Payment modal opened.")
})

// Handle payment form submission
paymentForm.addEventListener("submit", handlePaymentSubmit)

// Prevent default form submission, close modal, show thank you message, and reset order list
function handlePaymentSubmit(e) {
  e.preventDefault()
  console.log("Processing payment...")
  closeModal()
  displayThankYouMessage()
  orderList.length = 0 // Clear the order list
}

// Display a thank you message dynamically inserting the user's name
function displayThankYouMessage() {
  const thankYouMessage = document.createElement("h2")
  thankYouMessage.innerHTML = `<p id="thank-you">Thanks, ${
    document.getElementById("name-input").value
  }! Your order is on its way!</p>`
  checkoutContainer.innerHTML = ""
  checkoutContainer.appendChild(thankYouMessage)
}

// Close the payment modal
function closeModal() {
  paymentModal.classList.add("hidden")
  paymentModal.classList.remove("visible")
  console.log("Payment modal closed.")
}

// Render orders in the checkout container
function renderOrders() {
  // Clear existing content
  checkoutContainer.innerHTML = ""

  // Heading for the order section
  const heading = `<h2>Your Order</h2>`

  // Calculate the total price of all items
  const totalPrice = orderList.reduce((total, order) => total + order.price, 0)
  const totalPriceHtml = `
    <div id="total-price">
      <p id="total-price-label">Total Price:</p>
      <p id="total-price-value">$${totalPrice}</p>
    </div>
  `

  // Check if there are any items in the order list
  if (orderList.length > 0) {
    checkoutContainer.innerHTML += heading

    // Generate and append HTML for each order item
    const orderItemsHtml = orderList
      .map(
        ({ name, price, id }) => `
      <div class="order-item">
        <p class="order-name">${name}<button class="remove-item-btn" data-remove-item=${id}>remove</button></p>
        <p class="order-price">$${price}</p>
      </div>
    `
      )
      .join("")

    checkoutContainer.innerHTML += orderItemsHtml
    checkoutContainer.innerHTML += totalPriceHtml
    checkoutContainer.appendChild(paymentBtn)
  }
}

// Function to generate HTML for menu items
function getMenuItemsHtml(items) {
  return items
    .map((item) => {
      return `
      <div class="item-container">
        <p class="emoji">${item.emoji}</p>
        <div class="item-info">
          <h2 class="item-name">${item.name}</h2>
          <p class="item-ingredients">${item.ingredients.join(", ")}</p>
          <p class="item-price">$${item.price}</p>
        </div>
        <button class="add-item-btn" data-add-item=${item.id}>+</button>
      </div>
    `
    })
    .join("")
}

// Set the inner HTML of the items container to the generated menu items
document.querySelector(".items-container").innerHTML =
  getMenuItemsHtml(menuArray)
