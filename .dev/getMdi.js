// Script to get all icon names from materialdesignicons.com
const getMdi = () => {
  const icons = document.querySelectorAll('#icons div span');
  const names = [...icons].map((icon) => icon.textContent.replace('mdi-', ''));
  const output = names.map((name) => ({ name }));
  output.pop();
  const json = JSON.stringify(output);
  console.log(json);
};
