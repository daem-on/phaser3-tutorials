function AJAX(request, callback, method="GET") {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
		if (this.status == 404) {
			missing();
		}
    };
    xhttp.open(method, request, true);

    if (method == "GET") {
        xhttp.send();
    } else if (method == "POST") {
        //xhttp.setRequestHeader("Content-type", type);
        xhttp.send(data);
    }
    return true;
}

function currentPage() {
    if (window.location.hash != "") {
    	loadPage(window.location.hash.slice(1));
    } else {
    	loadPage("main");
    }
}

currentPage();

window.onhashchange = () => {
    currentPage();
}


//main page loader function
function loadPage(id) {
	AJAX("content/" + id + ".html", showPage);
	window.location.hash = id;

	switch (id) {
		case "search":
			onContentLoad = function() {setupSearchPage()};
			break;
		default:
			onContentLoad = function() {};
			break;
	}
}

function showPage(resource) {
	document.getElementById("loadTo").innerHTML = resource;
	onContentLoad();
	hljs.initHighlighting();
}

function setupSearchPage() {
	var content = document.getElementById("searchDiv");
	var input = document.createElement("input");
	input.id = "search";
	var result = document.createElement("div");
	result.id = "searchResult";
	var button = document.createElement("button");
	button.innerHTML = "Search";

	button.onclick = function() {
		var results = search(document.getElementById("search").value.split(","));
		var content = document.getElementById("searchResult");
		content.innerHTML = "";
		results.forEach(function(result) {
			var a = document.createElement("a");
			a.href = result.href;
			a.innerHTML = result.name;

			content.appendChild(document.createElement("br"));
			content.appendChild(a);
		});
	}


	content.appendChild(input);
	content.appendChild(button);
	content.appendChild(result);
}

function missing() {
	document.getElementById("loadTo").innerHTML = "404 - Not found :(";
}

//search function to find tutorial matching all tags
//will be used later
function search(tags) {
	result = [];
	list.forEach(function(item) {
		for (i = 0; i < tags.length; i++) {
			if (!item.tags.includes(tags[i])) {
				return 0;
			}
		}
		result.push(item);
	})
	return result;
}
