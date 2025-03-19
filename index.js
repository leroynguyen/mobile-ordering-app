import { menuArray } from "./menuItems.js"

const orderList = []
// Create payment Btn
const paymentBtn = document.createElement("button")
paymentBtn.id = "payment-btn"
paymentBtn.textContent = "Complete Order"

const paymentForm = document.getElementById("payment-form")

document.addEventListener("click", (e) => {
  if (e.target.dataset.addItem) {
    const matchedItem = menuArray.find(
      (item) => e.target.dataset.addItem == item.id
    )
    console.log(e)
    orderList.push(matchedItem)
  } else if (e.target.dataset.removeItem) {
    const matchedItem = menuArray.find(
      (item) => e.target.dataset.removeItem == item.id
    )
    orderList.pop(matchedItem)
  } else if (e.target.id === "modal-close-btn") {
    console.log("123123")
    closeModal()
  } else if (orderList.length >= 0) {
    return
  }
  renderOrders()
})

paymentBtn.addEventListener("click", () => {
  const paymentModal = document.getElementById("payment-modal")
  paymentModal.classList.remove("hidden")
  console.log("test 123 123")
  paymentModal.classList.add("visible")
  console.log("click click")
  document.body.appendChild(paymentModal)
})

paymentForm.addEventListener("submit", handlePaymentSubmit)

// Function to handle the payment form submission
function handlePaymentSubmit(e) {
  e.preventDefault() // Prevent the default form submission behavior
  console.log("submit payment form") // Log the submission event

  closeModal() // Close the payment modal
  displayThankYouMessage() // Display a thank you message to the user
  orderList.length = 0 // Clear the order list for a fresh start
}

// Function to display a thank you message after payment
function displayThankYouMessage() {
  // const checkoutContainer = document.getElementsByClassName("checkout")[0]
  const checkoutContainer = document.getElementById("checkout-container")

  const thankYouMessage = document.createElement("h2")
  thankYouMessage.innerHTML = `
    <p id="thank-you">Thanks, ${
      document.getElementById("name-input").value
    }! Your order is on its way!</p>
    `

  checkoutContainer.innerHTML = ""
  checkoutContainer.appendChild(thankYouMessage)
}

// Function to hide the payment modal
function closeModal() {
  const paymentModal = document.getElementById("payment-modal") // Get the payment modal element
  paymentModal.classList.add("hidden")
  paymentModal.classList.remove("visible")
  console.log("close close close")
}

function renderOrders() {
  const checkoutContainer = document.getElementById("checkout-container")

  // Clear existing content in the checkout container
  checkoutContainer.innerHTML = ""

  // Create a heading for the order section
  const heading = `<h2>Your Order</h2>`

  // Calculate the total price of the orders
  const totalPrice = orderList.reduce((total, order) => total + order.price, 0)
  const totalPriceHtml = `
    <div id="total-price">
      <p id="total-price-label">Total Price:</p>
      <p id="total-price-value">$${totalPrice}</p>
    </div>
  `

  // Check if there are any orders in the order list
  if (orderList.length > 0) {
    // Add heading to the checkout container
    checkoutContainer.innerHTML += heading

    // Generate and append HTML for each order item
    const orderItemsHtml = orderList
      .map((order) => {
        const { name, price, id } = order
        return `
          <div class="order-item">
              <p class="order-name">
                  ${name}
                  <button class="remove-item-btn" data-remove-item=${id}>remove</button>
              </p>
              <p class="order-price">
                  $${price}
              </p>
          </div>
        `
      })
      .join("")

    // Append the generated order items HTML to the checkout container
    checkoutContainer.innerHTML += orderItemsHtml

    // Add total price and append the payment button to the checkout container
    checkoutContainer.innerHTML += totalPriceHtml
    checkoutContainer.appendChild(paymentBtn) // Append the payment button
  }
}

// Function to generate HTML for menu items
function getMenuItemsHtml(items) {
  // Map through each item to create HTML structure for the menu
  return items
    .map((item) => {
      const { name, ingredients, id, price, emoji } = item

      // Return the HTML string for each menu item
      return `
      <div class="item-container">
          <p class="emoji">${emoji}</p>
          <div class="item-info">
              <h2 class="item-name">${name}</h2>
              <p class="item-ingredients">${ingredients.join(", ")}</p>
              <p class="item-price">$${price}</p>
          </div>
          <button class="add-item-btn" data-add-item=${id}>+</button> <!-- Button to add item to order -->
      </div>
    `
    })
    .join("")
}

// Set the inner HTML of the items container to the generated menu items
document.querySelector(".items-container").innerHTML =
  getMenuItemsHtml(menuArray) // Call the function with the menuArray

//refer back to add-item-btn whether id or class
// why is there .class and id
