document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();

  document.getElementById("myForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const user = {
      id: parseInt(formData.get("id")), // Convert ID to number
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
    };

    console.log("User", user);
    try {
      // Submit to JSON server
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Clear form
        e.target.reset();
        // Refresh table
        fetchUsers();
      } else {
        console.error("Failed to submit:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

// Fetch and display users
async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const tableBody = document.getElementById("tableBody");

    console.log("response ", response);
    console.log("users ", users);

    // Clear existing rows
    tableBody.innerHTML = "";

    // Populate table
    users.forEach((user) => {

      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.first_name}</td>
          <td>${user.last_name}</td>
          <td>${user.email}</td>
          <td><button onclick="deleteUser(${user.id})">Delete</button></td>
        `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Delete user
async function deleteUser(id) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchUsers(); // Refresh table
    } else {
      console.error("Failed to delete:", response.status);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
