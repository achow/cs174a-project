def ("Color") ({

    init: function() {
        this.r = 1;//255;
        this.g = 1;//255;
        this.b = 1;//255;
    },
    
    setColor: function(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    },
    
    toVec3: function() {
        return [this.r, this.g, this.b];
    },
});
