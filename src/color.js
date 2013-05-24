def ("Color") ({

    init: function() {
        this.r = 255;
        this.g = 255;
        this.b = 255;
    },
    toVec3: function() {
        return [this.r, this.g, this.b];
    },
});
