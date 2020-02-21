var form = document.getElementById("todo-box");
var uList = document.getElementById("list");
var todoList = [];

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addListItem();
    }
});
function addListItem() {
  todoList.push("<li class='list-item' onclick='deleteItem(this)'>" + form.value + "</li>");
  uList.innerHTML = todoList.join("");
}
function deleteItem(e){
  var i = 0;
  while ((e=e.previousSibling)!=null)
  i++;
  console.log(i);
  todoList.splice(i,1);
  uList.childNodes[i].remove();
}
