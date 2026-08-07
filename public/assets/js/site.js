(function () {
  const printButton = document.querySelector("[data-print]");
  printButton?.addEventListener("click", () => window.print());

  const copyButton = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector("[data-copy-status]");

  const showCopiedState = (email) => {
    copyButton.textContent = "Email copied";
    if (copyStatus) copyStatus.textContent = `${email} copied to clipboard.`;
  };

  const selectEmailAddress = () => {
    const emailAddress = document.querySelector("[data-email-address]");
    const selection = window.getSelection();
    if (!emailAddress || !selection) return false;

    const range = document.createRange();
    range.selectNodeContents(emailAddress);
    selection.removeAllRanges();
    selection.addRange(range);
    return true;
  };

  copyButton?.addEventListener("click", async () => {
    const email = copyButton.getAttribute("data-email");
    if (!email) return;

    let copied = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (copied) {
      showCopiedState(email);
    } else if (selectEmailAddress()) {
      copyButton.textContent = "Email selected";
      if (copyStatus) copyStatus.textContent = `Press Command+C to copy ${email}.`;
    } else if (copyStatus) {
      copyStatus.textContent = `Copy this address manually: ${email}`;
    }
  });
})();
