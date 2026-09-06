const encryptBtn = document.getElementById("encryptBtn");
const privateInput = document.getElementById("privateInput");
const result = document.getElementById("result");
const encryptedOutput = document.getElementById("encryptedOutput");

encryptBtn.addEventListener("click", async () => {
  const input = privateInput.value.trim();

  if (!input) {
    alert("Please enter some private data first.");
    return;
  }

  // Convert the user's input into bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  // Generate a SHA-256 cryptographic hash locally
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const output = hashArray
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");

  // Display the cryptographic output
  encryptedOutput.textContent = "0x" + output;

  // Show the result section
  result.classList.remove("hidden");

  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});
