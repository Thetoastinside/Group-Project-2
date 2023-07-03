const addItemButton = document.querySelector('#add-item-button');
const addItemForm = document.querySelector('#add-item-form');

addItemButton.addEventListener('click', () => {
  // Show the form when the button is clicked
  addItemForm.style.display = 'block';
});

addItemForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Gather the data from the form
  const formData = new FormData(addItemForm);
  const data = Object.fromEntries(formData);

  // Send the data to the server
  const response = await fetch('/api/vault', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  // Handle the server's response
  if (response.ok) {
    // Refresh the page to show the new item
    location.reload();
  } else {
    alert('Failed to add item');
  }
});
