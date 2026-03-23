document.querySelectorAll(".toggle-vision").forEach((button) => {
  button.addEventListener("click", function () {
    const codeBlock = this.closest(".code-block").querySelector(".inner");
    codeBlock.classList.toggle("hidden");
    this.textContent = codeBlock.classList.contains("hidden")
      ? "Show code"
      : "Hide code";
  });
});

document.querySelectorAll(".inner .cs-btn").forEach((button) => {
  let timeout = null;

  button.addEventListener("click", function () {
    const codeElement = this.closest(".inner").querySelector("code");
    const codeToCopy = codeElement.textContent;
    navigator.clipboard
      .writeText(codeToCopy)
      .then(() => {
        this.textContent = "Copied!";

        if (timeout !== null) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          this.textContent = "Copy";
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy code: ", err);
      });
  });
});





document.addEventListener("DOMContentLoaded", () => {

  const statsConfig = {
    ab: {
      base:     { one: 2, two: 2, onetwo: 1 },
      improved: { one: 2, two: 1, onetwo: 1 }
    },
    cc: {
      base:     { one: 4, two: 4, onetwo: 2 },
      improved: { one: 4, two: 4, onetwo: 0 }
    },
    shh:  { one: 1, two: 1, onetwo: 1 },
    ras:  { one: 2, two: 2, onetwo: 0 },
    rssb: { one: 2, two: 2, onetwo: 0 },
    ut:   { one: 2, two: 2, onetwo: 1 }
  };

  function calculate() {
    let one = 0;
    let two = 0;
    let onetwo = 0;

    const improved = document.getElementById("improved")?.checked;

    Object.keys(statsConfig).forEach(id => {
      const checkbox = document.getElementById(id);
      if (!checkbox?.checked) return;

      const config = statsConfig[id];

      const values = (config.base) ? (improved && config.improved ? config.improved : config.base) : config;

      one += values.one || 0;
      two += values.two || 0;
      onetwo += values.onetwo || 0;
    });

    const max = one + two + onetwo;

    const set = (id, val) =>
      document.getElementById(id).textContent = val;

    set("math-one", one);
    set("math-two", two);
    set("math-onetwo", onetwo);

    set("math-max-1", max);
    set("math-max-2", max);
    set("math-max-12", max);

    set("math-percent-1", max === 0 ? 0 : (one / max * 100).toFixed(1));
    set("math-percent-2", max === 0 ? 0 : (two / max * 100).toFixed(1));
    set("math-percent-12", max === 0 ? 0 : (onetwo / max * 100).toFixed(1));
  }

  document.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      calculate();
    }
  });

});