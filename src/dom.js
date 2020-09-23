window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  // 在 test 后面加一个节点
  after(node, node2) {
    // 没有 insertAfter API 只有 insertBefore API
    node.parentNode.insertBefore(node2, node.nextSibling); // 把 node2 插入到 node 后面那个节点的前面
    console.log(div.nextSibling);
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    // 把 parent 包在 node 的外面
    dom.before(node, parent); // 把 parent 插到 node 的前面
    dom.append(parent, node); // 然后把 node 插到 parent 里面
    // append 如果插入到别的地方，它就会将之前位置的删除
  },
  // 删
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    // const { childNodes } = node; // const childNodes = node.childNodes 的简写
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  // 改
  attr(node, name, value) {
    if (arguments.length === 3) {
      return node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    if (arguments.length === 3) {
      if ("innerText" in node) {
        node.innerText = string; // IE
      } else {
        node.textContent = string; // firefox / Chrome
      }
      // 适配：根据不同的条件，都能取得同样的执行效果。
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText; // IE
      } else {
        return node.textContent; // firefox / Chrome
      }
      // 适配：根据不同的条件，都能取得同样的执行效果。
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
    // 重载：根据参数的长度，实现不同的效果
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // 3个，一般是想把元素里的属性更改为某个值
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // 那它就是想获取元素里面的属性
        return node.style[name];
      } else if (name instanceof Object) {
        // 如果 name 是 Object 的实例，即 name 是一个对象时
        const object = name;
        for (let key in object) {
          // 把 object 里所有的 key 都读到
          // key 可能等于 border 也有可能等于 color。
          // 而 border 和 color 都是变量，而变量做 key ，必须放在 [] 里面。
          // 如果直接 node.style.key ，那它就会直接变成个字符串
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  // 查
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
    // 如果有 scope ，就在 scope 里调用 querySelectorAll ，如果没有就在 document 里来 querySelectorAll 。
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    // node.parentNode.children 是伪数组，用不了 filter
    return Array.from(node.parentNode.children).filter((n) => n !== node);
    // 只要元素不等于当前节点，就放数组里面
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      // x 存在且 x 的节点类型为 text，不存在就直接 return 了
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      // x 存在且 x 的节点类型为 text，不存在就直接 return 了
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
      // this 不传
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
