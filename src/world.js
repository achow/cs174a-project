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
        _.each(this.box, function(obj) {
            obj.dt();
        });
    },
    /*
     * run all object's render
     */
    renderScene: function() {
        _.each(this.box, function(obj) {
            obj.draw();
        });
    },
    /*
     * make a map
     */
    initMap: function() {
        _.each(MapData, function(row, h) {
            _.each(row.split(), function(entry, w) {
                // this is a wall
                if (entry === "#") {
                    var block = new Block(MODEL_ID.BLOCK);
                    block.position.x = w;
                    block.position.y = h;
                    block.position.z = 1;
                    this.add(block);
                }
            });
        }); 
    },
});
