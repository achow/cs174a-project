def ("GL") ({
    init: function (setup) {
        console.log("gl setup", setup);
        this.canvas = [];
        var self = this;
        _.each(setup, function(canvasData) {
            self.canvas.push(new Canvas(canvasData));
        });
    }
});
