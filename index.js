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
    orderList.push(matchedItem)
  } else if (e.target.dataset.removeItem) {
    const matchedItem = menuArray.find(
      (item) => e.target.dataset.removeItem == item.id
    )
    orderList.pop(matchedItem)
  } else if (orderList.length === 0) {
    return
  }
  renderOrders()
})

paymentBtn.addEventListener("click", () => {
  const paymentModal = document.getElementById("payment-modal")
  paymentModal.style.display = "inline"
  console.log("click click")
  document.body.appendChild(paymentModal)
})

paymentForm.addEventListener("submit", handlePaymentSubmit)

// Function to handle the payment form submission
function handlePaymentSubmit(e) {
  e.preventDefault() // Prevent the default form submission behavior
  console.log("submit payment form") // Log the submission event

  hidePaymentModal() // Hide the payment modal
  displayThankYouMessage() // Display a thank you message to the user
}

// Function to display a thank you message after payment
function displayThankYouMessage() {
  const checkoutContainer = document.getElementsByClassName("checkout")[0]

  const thankYouMessage = document.createElement("h2")
  thankYouMessage.textContent = "Thanks"

  // Clear the order list permanently
  orderList.length = 0 // Clear the orderList array

  checkoutContainer.innerHTML = ""
  checkoutContainer.appendChild(thankYouMessage)
}

// Function to hide the payment modal
function hidePaymentModal() {
  const paymentModal = document.getElementById("payment-modal") // Get the payment modal element
  paymentModal.style.display = "none" // Set the display style to none to hide the modal
}

function renderOrders() {
  const checkoutContainer = document.getElementById("checkout-container")
  
  // Clear existing content
  checkoutContainer.innerHTML = ""

  // Create elements
  const heading = document.createElement("h2")
  heading.textContent = "Your Order"
  
  const totalPrice = orderList.reduce((total, order) => total + order.price, 0)
  const totalPriceEl = document.createElement("div")
  totalPriceEl.id = "total-price"
  
  const totalPriceLabel = document.createElement("p")
  totalPriceLabel.id = "total-price-label"
  totalPriceLabel.textContent = "Total Price:"
  
  const totalPriceValue = document.createElement("p")
  totalPriceValue.id = "total-price-value"
  totalPriceValue.textContent = `$${totalPrice}`

  // Check if there are any orders
  if (orderList.length > 0) {
    // Add heading first
    checkoutContainer.appendChild(heading)

    // Generate and append order items
    const orderItems = orderList
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
    
    checkoutContainer.innerHTML += orderItems

    // Add total price and payment button
    totalPriceEl.appendChild(totalPriceLabel)
    totalPriceEl.appendChild(totalPriceValue)
    checkoutContainer.appendChild(totalPriceEl)
    checkoutContainer.appendChild(paymentBtn)
  }
}

// Function to generate HTML for menu items
function getMenuItemsHtml(items) {
  // Map through each item to create HTML structure
  const menuList = items.map((item) => {
    // Destructure item properties for easier access
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

  // Join the array of HTML strings into a single string
  return menuList.join("")
}

// Set the inner HTML of the items container to the generated menu items
document.querySelector(".items-container").innerHTML =
  getMenuItemsHtml(menuArray) // Call the function with the menuArray

//refer back to add-item-btn whether id or class
// why is there .class and id-
