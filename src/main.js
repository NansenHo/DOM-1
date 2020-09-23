// 增
const div = dom.create("<div>newDiv</div>");
console.log(div);

dom.after(test, div);

const div3 = dom.create('<div id="parent"></div>');
dom.wrap(test, div3);

const nodes = dom.empty(window.empty);
console.log(nodes);

dom.attr(test, "title", "Hi, I am Nansen");
// 下面两行：读取 title 属性
const title = dom.attr(test, "title");
// JS 的一个函数可以接收多种参数
console.log(`title: ${title}`);

dom.text(test, "这是新的内容");
dom.text(test);

dom.style(test, { border: "1px solid red", color: "pink" });
console.log(dom.style(test, "border"));
dom.style(test, "border", "1px solid black");

dom.class.add(test, "background-color");
dom.class.remove(test, "background-color");
console.log(dom.class.has(test, "background-color"));

const fn = () => {
  console.log("点击了");
};
dom.on(test, "click", fn);
dom.off(test, "click", fn);

const testDiv = dom.find("#test")[0];
console.log(testDiv);
const test2 = dom.find("#test2")[0];
console.log(dom.find(".red", test2)[0]); // testDiv 是找的范围

console.log(dom.parent(test));

const s2 = dom.find("#s2")[0];
console.log(dom.siblings(s2));
console.log(dom.next(s2));
console.log(dom.previous(s2));

const t = dom.find("#travel")[0];
dom.each(dom.children(t), (n) => dom.style(n, "color", "red"));
// 每一个元素用 n 占位

console.log(dom.index(s2))