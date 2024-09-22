function elementCreator(types, props, ...children) {
  if (typeof types === "function") {
    return types()
  }
  return {
    "type": types,
    "props": {
      ...props, "children": children.map((child) => {
        return typeof child === "object" ? child : { "type": "TEXT_ELEMENT", "props": { nodeValue: child } }
      })
    }
  }
}

function Test() {
  return <div>hello</div>
}
const a = <div onclick={() => { console.log("hello") }} title="Hello" color="red">hello <Test /></div>;
console.log(a)

function render(element, container) {
  if (element.type === "TEXT_ELEMENT") {
    return container.appendChild(document.createTextNode(element.props.nodeValue))
  }
  const domObj = document.createElement(element.type)

  if (element.props) {
    Object.keys(element.props)
      .forEach(key => {
        if (key !== "children") {
          domObj[key] = element.props[key]
        }
      }
      )
  }
  if (element.props.children) {
    element.props.children.forEach(child => render(child, domObj))
  }

  return container.appendChild(domObj)

}

let previous = null

function reconciliate(element, container) {
  // TODO: This code is too slow
  if (!previous) {
    render(element, container)
    return
  }
  if (element.type !== previous.type) {
    container.replaceChild(render(element, container), container.firstChild)
    return
  }
  if (element.type !== "TEXT_ELEMENT") {
    updateProps(container.firstChild, previous.props, element.props)
  } else {
    if (element.props.nodeValue !== previous.props.nodeValue) {
      container.firstChild.nodeValue = element.props.nodeValue;
    }
  }
  function updateProps(dom, oldProps, newProps) {
    for (const name in oldProps) {
      if (name !== "children") {
        if (!(name in newProps)) {
          dom[name] = "";
        } else if (oldProps[name] !== newProps[name]) {
          dom[name] = newProps[name];
        }
      }
    }
    for (const name in newProps) {
      if (name !== "children" && !(name in oldProps)) {
        dom[name] = newProps[name];
      }
    }
  }

  const oldChildren = previous.props.children;
  const newChildren = element.props.children;

  const maxChildrenLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxChildrenLength; i++) {
    reconciliate(
      newChildren[i],
      container.firstChild,
      oldChildren[i]
    );
  }

  while (oldChildren.length > newChildren.length) {
    container.firstChild.removeChild(container.firstChild.lastChild);
    oldChildren.pop();
  }
  previous = element
}

function App() {
  return (
    <div>
      <button
        onclick={() => {
          setCounter(counter + 1);
        }}
      >
        Click Me!
      </button>
      <div>{counter}</div>
    </div>
  );
}

let counter = 1;
function setCounter(val) {
  counter = val;

  reconciliate(<App />, rootElement);
}

const rootElement = document.getElementById("app")
render(<App />, rootElement);