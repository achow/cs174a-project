def ("Color") ({

    init: function() {
        this.r = 0;//255;
        this.g = 0;//255;
        this.b = 0;//255;
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
