/* =========================================
   DELIVERY FORM LOGIC
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Check for Order ID in URL (Security Check)
    // The link in email will be: delivery-form.html?order_id=ORD-1234&token=xyz
    
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    
    if (!orderId) {
        // If accessed directly without a link, warn user (or redirect)
        console.warn("No Order ID found. This page should be accessed via email link.");
        // alert("Invalid Access: Please use the link sent to your email.");
    } else {
        document.getElementById('orderId').value = orderId;
    }
});

// 2. Handle Form Submission
document.getElementById('deliveryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "Verifying & Submitting...";
    submitBtn.disabled = true;

    // Collect Data
    const shippingData = {
        orderId: document.getElementById('orderId').value || 'TEST-ORDER',
        name: document.getElementById('ship-name').value,
        phone: document.getElementById('ship-phone').value,
        address: {
            line1: document.getElementById('ship-address1').value,
            line2: document.getElementById('ship-address2').value,
            city: document.getElementById('ship-city').value,
            pincode: document.getElementById('ship-pincode').value,
            state: document.getElementById('ship-state').value
        },
        timestamp: new Date().toISOString()
    };

    console.log("Submitting Data:", shippingData);

    // ---------------------------------------------------------
    // 🚧 TODO: FIREBASE INTEGRATION GOES HERE
    // In the next step, we will replace this setTimeout with
    // db.collection('orders').doc(orderId).update(shippingData)
    // ---------------------------------------------------------

    setTimeout(() => {
        // Mock Success Response
        alert("✅ Delivery Details Received!\n\nYour product will be shipped within 24 hours.");
        submitBtn.innerText = "Submitted Successfully";
        
        // Optional: Redirect to a "Thank You" or Home page
        window.location.href = "index.html";
    }, 2000);
});
