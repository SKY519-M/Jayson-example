document.addEventListener("DOMContentLoaded", () => {
   fetchUsers();

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  document.getElementById("myForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);

    const user = {
      id: getRandomNumber(1, 1000),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
    };


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

        alert(user.firstName + " saved successfully")
        await fetchUsers();
      } else {
        console.error("Failed to submit:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });


});

async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:3000/users");

    const users = await response.json();

    // console.log(users);

    const tableBody = document.getElementById("tableBody");

    // Populate table

    if(users){
        for(const user of users){
            const row = document.createElement('tr')
            row.innerHTML = `
            <td>${user.id}</td>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td>${user.email}</td>
              <td><button onclick="deleteUser(${user.id})">Delete</button></td>
            `
            tableBody.appendChild(row)
    
        }
    }
    
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

async function deleteUser(id) {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        await fetchUsers(); // Refresh table
      } else {
        console.error("Failed to delete:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

