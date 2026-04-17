// Group elements separated by <hr> into <section> elements
function slidify(container) {
  
  const sections = [];
  let current = document.createElement('section');

  for (const node of [...container.childNodes]) {
    if (node.nodeName === 'HR') {
      sections.push(current);
      current = document.createElement('section');
    } else {
      current.append(node);
    }
  }

  if (current.hasChildNodes()) {
    sections.push(current);
  }

  container.replaceChildren(...sections);
}

const main = document.querySelector('main');

slidify(main);