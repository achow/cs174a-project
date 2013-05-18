Camera = new JS.Class({

    initialize: function() {
        this.position = new Position();
        this.theta = 0;
        this.phi = 0;
        this.attachObject = null;
    },

    /*
     * return view matrix
     */
    view: function() {
        return null;
    },

    /*
     *  for animation
     */
    dt: function() {
        if (this.attachObject) {
            // attach
            this.position = this.attachObject.position;
        }
    },
});
