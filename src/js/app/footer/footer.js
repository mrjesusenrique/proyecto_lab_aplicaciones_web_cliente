export const getCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  document.querySelector(
    "#current-date"
  ).innerText = `Copyright ${currentYear}`;
};
