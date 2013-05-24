Position = new JS.Class({

    initialize: function() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
    },
    toVec3: function() {
        return [this.x, this.y, this.z];
    },
    toVec4: function() {
        return [this.x, this.y, this.z, this.w];
    },
    /*
     * get distance difference
     */
    diff: function(pos) {
        return Math.sqrt(Math.pow(this.x - pos.x, 2) +
               Math.pow(this.y - pos.y, 2) +
               Math.pow(this.z - pos.z, 2));
    },
});
