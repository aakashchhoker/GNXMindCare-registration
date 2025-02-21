document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const submitButton = document.getElementById("submitButton");
  const loader = document.getElementById("loader");
  const errorMessage = document.getElementById("errorMessage");
  const container = document.querySelector(".container");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    loader.classList.remove("hidden");
    submitButton.classList.add("hidden");
    errorMessage.classList.add("hidden");
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(
        "https://genericapi.gnx.one/workshop-registrations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formObject),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong on the server.");
      }
      const result = await response.json();
      console.log("API Response:", result);
      const successMessage =
        result.message || "🎉 Thank you for registering! Redirecting back...";
      form.style.display = "none";
      const thankYouMessage = document.createElement("div");
      thankYouMessage.className =
        "flex items-center justify-center text-2xl font-semibold text-green-600 bg-white p-6 rounded-lg shadow-md h-[100vh]";
      thankYouMessage.innerHTML = successMessage;
      container.appendChild(thankYouMessage);
      setTimeout(() => {
        form.reset();
        thankYouMessage.remove();
        form.style.display = "block";
      }, 4000);
    } catch (error) {
      errorMessage.textContent = error.message || "Something went wrong.";
      errorMessage.classList.remove("hidden");
    } finally {
      loader.classList.add("hidden");
      submitButton.classList.remove("hidden");
    }
  });
});
