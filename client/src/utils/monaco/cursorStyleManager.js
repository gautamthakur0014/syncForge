const injected = new Set();

export const ensureCursorStyle = (userName, color) => {
  const className = `cursor-${userName}`;

  if (injected.has(className)) return className;

  const style = document.createElement("style");

  style.innerHTML = `
      .${className} {
        border-left: 2px solid ${color};
      }
  `;

  document.head.appendChild(style);

  injected.add(className);

  return className;
};
