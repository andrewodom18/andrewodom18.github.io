(function () {
  const printButton = document.querySelector("[data-print]");
  printButton?.addEventListener("click", () => window.print());

  const copyButton = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector("[data-copy-status]");

  const showCopiedState = (email) => {
    copyButton.textContent = "Email copied";
    if (copyStatus) copyStatus.textContent = `${email} copied to clipboard.`;
  };

  copyButton?.addEventListener("click", async () => {
    const email = copyButton.getAttribute("data-email");
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      showCopiedState(email);
    } catch {
      window.location.href = `mailto:${email}`;
      if (copyStatus) copyStatus.textContent = `Opening your email app for ${email}.`;
    }
  });
})();
