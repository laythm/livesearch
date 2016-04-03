(function ($) {
    $.fn.livesearch = function (options) {
        var settings = $.extend({
            highlightStyle: 'background-color:yellow;'
        }, options);

        function innerHighlight(node, pat) {
            var skip = 0;
            if (node.nodeType == 3) {
                var pos = node.data.toUpperCase().indexOf(pat);
                pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
                if (pos >= 0) {
                    var spannode = document.createElement('span');
                    spannode.style = settings.highlightStyle;
                    spannode.className = 'highlight';
                    var middlebit = node.splitText(pos);
                    var endbit = middlebit.splitText(pat.length);
                    var middleclone = middlebit.cloneNode(true);
                    spannode.appendChild(middleclone);
                    middlebit.parentNode.replaceChild(spannode, middlebit);
                    skip = 1;
                }
            }
            else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                for (var i = 0; i < node.childNodes.length; ++i) {
                    i += innerHighlight(node.childNodes[i], pat);
                }
            }
            return skip;
        }
        //    return this.length && pat && pat.length ? this.each(function () {
        //        innerHighlight(this, pat.toUpperCase());
        //    }) : this;
        //};

        function removeHighlight(el) {
            try{
                $(el).find("span.highlight").each(function () {
                    this.parentNode.firstChild.nodeName;
                    with (this.parentNode) {
                        replaceChild(this.firstChild, this);
                        normalize();
                    }
                });
            }catch(ex){
                alert(ex)
            }
       
        }

        var elements = this.each(function (i, element) {

            $(element).keyup(function () {
                // Retrieve the input field text and reset the count to zero
                var filter = $(this).val(), count = 0;

                // Loop through the comment list
                $("body > *").each(function () {
                    removeHighlight(this);
                    if ($(this).text().search(new RegExp(filter, "i")) > 0) {
                        innerHighlight(this, filter.toUpperCase());
                        count++;
                    }
                });
            });
        });

        return elements;
    };


    /* $.fn.parte.update = function (options) {
         var settings = $.extend({
             // These are the defaults.
             color: "#556b2f",
             backgroundColor: "white",
             onChange: function (element, checked) { }
         }, options);
    
         return this.each(function () {
             // Do something to each element here.
         });
    
         return this;
     };*/

}(jQuery));
