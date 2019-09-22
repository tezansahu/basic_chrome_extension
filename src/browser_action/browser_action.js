function loadItems(){
    chrome.storage.sync.get(["todo"], function(result){
        var todo = []

        if(result && result.todo && result.todo.trim() != ""){
            todo = JSON.parse(result.todo)
        }
        console.log("todo_length: ", todo.length)

        for(var i = 0; i<todo.length; i++){
            item = todo[i]
            if(item && item.trim() != ""){
                var list = document.getElementById('list')
                var entry = document.createElement("li")
                var text = document.createTextNode(item)

                entry.appendChild(text)
                list.appendChild(entry)
            }
        }
    })
}

document.addEventListener('DOMContentLoaded', function(){
    console.log("Inside doc.loaded()")

    loadItems()
})

document.getElementById('btn').addEventListener('click', function(ev){
    console.log("Inside button.click()")

    text = document.getElementById('txt').value

    if(text && text.trim() != ""){
        chrome.storage.sync.get(["todo"], function(result){
            var todo = []
    
            if(result && result.todo && result.todo.trim() != ""){
                todo = JSON.parse(result.todo)
            }

            todo.push(text)

            chrome.storage.sync.set({"todo": JSON.stringify(todo), function(){
                var list = document.getElementById('list')
                while(list.firstChild){
                    list.removeChild(list.firstChild)
                }

                loadItems()
            }})
        })
    }
})