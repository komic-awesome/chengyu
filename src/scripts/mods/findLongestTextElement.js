// Copy from https://github.com/ZachSaucier/Just-Read/blob/master/content_script.js

export default function() {
  // Keep track of the element with the most ps in it
  var globalMostPs = document.body,
      globalMostPCount = 0;

  // Count the number of ps in the children using recursion
  function countPs(container) {
    var count = container.querySelectorAll("p").length;

    for(var i = 0; i < container.children.length; i++)
    count += countPs(container.children[i]);

    return count;
  }

  // Check a given element and all of its child nodes to see if it has the most ps
  function checkLongestTextElement(container) {
    container = container || document.body; // Default to the whole page

    // Count the number of p direct children
    var pChildren = container.querySelectorAll(":scope > p");

    // Compare total to the largest total so far
    if(pChildren.length > globalMostPCount) {
      globalMostPCount = pChildren.length;
      globalMostPs = container;
    }

    // Check the children to see if they have more ps
    for(var i = 0; i < container.children.length; i++)
    checkLongestTextElement(container.children[i]);
  }

  function getLongestArticle() {
    var articles = document.querySelectorAll("article");
    if(articles.length < 1)
      return null;

    var largestArticle = articles[0],
    mostPCount = countPs(largestArticle);
    for(var i = 1; i < articles.length; i++) {
      var pCount = countPs(articles[i]);
      if(pCount > mostPCount) {
        largestArticle = articles[i];
        mostPCount = pCount;
      }
    }

    if(mostPCount > 0)
      return {"article": largestArticle, "pCount": mostPCount};
    else
      return null;
  }


  // Check given item against blacklist, return null if in blacklist
  var blacklist = ["comment"];
  function checkAgainstBlacklist(elem) {
    if(typeof elem != "undefined" && elem != null) {
      var className = elem.className;
      for(var i = 0; i < blacklist.length; i++) {
        if(typeof className != "undefined" && className.indexOf(blacklist[i]) >= 0) {
          return null;
        }
      }
    }
    return elem;
  }

  var pattern =  new RegExp ("<br/?>[ \r\n\s]*<br/?>", "g");
  var pageContent = document.createElement("div");
  pageContent.innerHTML = document.body.innerHTML.replace(pattern, "</p><p>");

  checkLongestTextElement(pageContent);
  // globalMostPs is now updated, as is globalMostPCount
  globalMostPs = checkAgainstBlacklist(globalMostPs);

  // Compare the longest article to the element with the most ps
  var articleObj = checkAgainstBlacklist(getLongestArticle());

  if(articleObj !== null
     && articleObj.pCount > globalMostPCount - 3) {
    globalMostPs = articleObj.article;
    globalMostPCount = articleObj.pCount;
  }

  return globalMostPs
}
