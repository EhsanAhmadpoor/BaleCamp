---
sidebar_position: 4
---

<div dir="ltr">
# Write your own ReactJS

## createElement

### What is JSX

---

📝 **Practice 1**: What JSX really is

1. Go To [https://swc.rs/playground](https://swc.rs/playground)

   _SWC_ can compile JSX to raw javascript which browser can understand

2. Enable Tsx option from left panel side

3. write some JSX

   For example `const a = <div></div>`

4. see what JSX would compile to

5. Add some props to your JSX and see what happens

---

JSX is transformed to JS by build tools like Babel or SWC. It's simply replaces the code inside the tags with a call to createElement, passing the tag name, the props and the children as parameters.

> 💡 _Element_ is a lightweight object representation of an actual DOM. It holds node type, attributes and children list

### Make your own createElement

---

📝 **Practice 2**: Setup Project and implement createElement

1. Create project by copying project template from `exercises/create-your-own-react-template`.

   Then run `yarn` to install dependencies.

   Then start porject by `yarn dev`

   You should see `Hello world` in your browser console

2. Modify `index.js` as follow

   ```javascript
   function createElement(...args) {
     /** Implement your createElement HERE */
   }

   const a = <div/ color="red">hello</div>;
   console.log(a);
   ```

3. Now you should see an error in your conosle.
   Take look a the error at your browser console.

   The JSX transformed to `React.createElement` which is not defined. we should tell build tool (in this case vite) to use our own version of `createElement`.

   To do that modify `vite.config.ts` as follow

   ```javascript
   // vite.config.js
   import { defineConfig } from "vite";

   export default defineConfig({
     esbuild: {
       jsxFactory: "<your custom createElement name>",
     },
   });
   ```

   then create your own createElemnt function in `index.jsx`. You can call it whatever you want.

4. Implement createElement

   It should have following sinature

   ```js
   function createElement(type, props, ...children) {
     // ...
   }
   ```

   As we saw in the previous step, an element is an object with type and props. The only thing that our function needs to do is create that object.

   For example, `createElement("div")` returns:

   ```json
   {
     "type": "div",
     "props": { "children": [] }
   }
   ```

   `createElement("div", null, a)` returns:

   ```json
   {
       "type": "div",
       "props": { "children": [a] }
   }
   ```

   and `createElement("div", null, a, b)` returns:

   ```json
   {
       "type": "div",
       "props": { "children": [a, b] }
   }
   ```

---

## render

Next, we need to write our version of the ReactDOM.render function. For now, we only care about adding stuff to the DOM.

---

📝**Practice 3**: Implement render function

It should have following sinature

```javascript
render(element, container);
```

- Container is your root element from your `index.html` file.

- element is the object comes from `createElemnt` which contains `type` and `props`.

- It should convert your element to DOM and append it to root container.

> 💡 _hint_: Render function would have a recursive implementation.

> 💡 _hint_: For text content we will have an element with "TEXT_ELEMENT" type you should convert it to a text node with `createTextNode`.

---

🎉 Congradulation Now you should see the rendered JSX in your browser.

## Virtual DOM and Reconciliation

So far we only added stuff to the DOM, but what about updating or deleting nodes?

---

📝**Practice 4**: Implement Basic Reconciliation

Consider following code:

```javascript
function createElement(type, props, ...childrens) {
  //...
}

function render(element, container) {
  //...
}

function reconciliate(element, container) {
  // TODO: This code is too slow
  rootElement.innerHTML = "";
  render(element, container);
}

// My App
//#######
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

render(<App />, rootElement);
```

In this code we have reactvity (By changing the state UI updates automatically). There is a _Huge_ Problem with this code. Each time user clicks on the `button` whole DOM will be recreated. **This is Bad :(**. Browser DOM objects are big objects it's _expensive to create_. So we need to avoid creating unnecessary DOM element as far as possible.

Your task is to implement a reconciliation function that updates only the changed DOM elements instead of re-rendering the entire app.

> 💡 Reconciliation Algorithm:
>
> - Compare the type and key properties of the new and old virtualDom.
> - If they match, update the existing DOM node with new props.
> - If the type doesn't match, remove the old node and create a new one.
> - If the key doesn't match, reorder the children.
> - Recursively reconcile the children.

> 🛠️ Performance Optimization:
>
> - Use key prop to efficiently identify and update elements.
> - Implement techniques like list reconciliation for performance improvements.
> - Avoid unnecessary DOM manipulations.

---

## Some Quick Notes

- Fiber and Concurrent mode

  - Concurrent mode is a React feature that allows React to interrupt rendering and prioritize updates.

  - Fiber is a data structure in React that allows React to break down the rendering process into smaller units.

- React is not web framework but it's a UI Libraries.
- React Provides reactivity at runtime There are some tools and fraemwroks which attempt to make your app reactive by using a compiler.
  - What is react 20 compiler ?
  - What are the props of using a compiler instead of runtime Reactivity.
  - What is _fine grain reactivity_ ?
  - What is Observable pattern and signal ?

## Read More

- https://medium.com/@sweetpalma/gooact-react-in-160-lines-of-javascript-44e0742ad60f
- https://pomb.us/build-your-own-react/
</div>
