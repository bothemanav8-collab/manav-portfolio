document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const res = await fetch('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });

  const data = await res.json();
  const status = document.getElementById('form-status');

  if (data.success) {
    status.textContent = "✅ Message sent successfully!";
    e.target.reset();
  } else {
    status.textContent = "❌ Failed to send message.";
  }
});
