/* =========================================
   RAZORPAY INTEGRATION LOGIC
   ========================================= */

// ⚠️ REPLACE THIS WITH YOUR ACTUAL RAZORPAY TEST KEY ID
const RAZORPAY_KEY_ID = "rzp_test_YOUR_KEY_HERE"; 

function initiatePayment(e) {
    e.preventDefault();

    const name = document.getElementById('cust-name').value;
    const email = document.getElementById('cust-email').value;
    const phone = document.getElementById('cust-phone').value;
    const amount = 999 * 100; // Amount in Paise (999 INR)

    const payBtn = document.getElementById('payBtn');
    payBtn.innerText = "Processing...";
    payBtn.disabled = true;

    var options = {
        "key": RAZORPAY_KEY_ID, 
        "amount": amount, 
        "currency": "INR",
        "name": "OFFLEGACY",
        "description": "Order #ORD-" + Math.floor(Math.random() * 10000),
        "image": "assets/images/logo.png", // Ensure you have a logo image
        "handler": function (response){
            // ✅ Payment Success
            console.log("Payment ID: " + response.razorpay_payment_id);
            
            // Redirect to Success Page with Data
            // In a real backend, you would verify signature here first
            window.location.href = `success.html?payment_id=${response.razorpay_payment_id}&email=${email}&name=${encodeURIComponent(name)}`;
        },
        "prefill": {
            "name": name,
            "email": email,
            "contact": phone
        },
        "theme": {
            "color": "#000000"
        },
        "modal": {
            "ondismiss": function(){
                payBtn.innerText = "Pay Securely";
                payBtn.disabled = false;
                alert('Payment Cancelled');
            }
        }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
}
