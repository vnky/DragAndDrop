(function(){
    /** DragNdrop function - constructor function (We can use class as well)
     *  which takes an element HTML element.
     */ 
    function DragNdrop(element){
        this.element = element;
        let initElementLeft, initElementTop, mouseDownX, mouseDownY;

        /** draggingElement takes event object as default as first agrument
         * 
         *  mousemove event will take current clientX, clientY  values.
         *  setting style properties of the element to move element according the clientX, clientY. 
         */
        const draggingElement = (event) => {
            event.stopPropagation();
            const clientX = event.clientX;
            const clientY = event.clientY;

            if(clientX > 0 && clientY > 0) {
                this.element.style.left = initElementLeft + clientX - mouseDownX + "px";
                this.element.style.top = initElementTop + clientY - mouseDownY + "px";
            }
        }

        /** droppingElement takes event object as default as first agrument
         * 
         *  Removing mousemove, mouseup eventListners and it's handlers As mouseup event.
         */
        const droppingElement = (event) => {
            event.stopPropagation();
            document.removeEventListener('mousemove',draggingElement,true);
            document.removeEventListener('mouseup',droppingElement,true);
        }

        /** onElement takes event object as default as first agrument
         * 
         *  Calucalting the element initial postitions details left, top
         *  Taking current clientX, clientY values on mousedown event on element
         *  Adding mouseup, mousemove eventListener's and its handlers with event capturing phrase true
         */
        const onElement = (event) => {
            event.stopPropagation();
            event.preventDefault();
            initElementLeft = parseInt(window.getComputedStyle(this.element).left);
            initElementTop = parseInt(window.getComputedStyle(this.element).top);
            mouseDownX = event.clientX;
            mouseDownY = event.clientY;

            // Adding mouseup, mousemove eventListener's and it's handler's. 
            // event capturing is true
            document.addEventListener('mouseup', droppingElement, true);
            document.addEventListener('mousemove', draggingElement, true);

        };
        // Adding mousedown eventListener when mousedown on element and it's handler.
        this.element.addEventListener('mousedown', onElement);

    }

    // creating an instance for DragNdrop function and passing required element which need to move.
    // const element will help to extend the functionality.
    // By constructor pattern - we can use it for muliple element
    const element = new DragNdrop(document.getElementById('squareEle'));
})();