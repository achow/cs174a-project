World = new JS.Class({

    initialize: function(id) {
        this.box = [];
        this.initMap();
    },
    /*
     * add object to the box
     */
    add: function(obj) {
        this.box.push(obj);
    },
    /*
     * run all object's dt
     */
    dt: function() {
        for (var i in this.box) {
            this.box[i].dt();
        }
    },
    /*
     * run all object's render
     */
    renderScene: function() {
        for (var i in this.box) {
            this.box[i].draw();
        }
    },
    /*
     * make a map
     */
    initMap: function() {
        
    },
});
