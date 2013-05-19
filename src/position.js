Position = new JS.Class({

    initialize: function(name) {
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
});
