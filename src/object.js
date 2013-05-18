var Obj = new JS.Class({

    initialize: function(id) {
        this.modelId = id;
        this.position = new Position();
        this.size = 1;
    },
    /*
     * drawing function
     */
    draw: function() {
        // stub
    },
    /*
     * return scale matrix
     *
     */
    size: function() {
        return null;
    },

    /*
     * return world matrix
     */
    where: function() {
        return null;
    },

    /*
     *  for animation
     */
    dt: function() {

    }
});
