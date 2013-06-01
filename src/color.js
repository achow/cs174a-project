def ("Color") ({

    init: function() {
        this.r = 0;//255;
        this.g = 0;//255;
        this.b = 0;//255;
    },
    toVec3: function() {
        return [this.r, this.g, this.b];
    },
});
