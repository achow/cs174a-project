def ("Pacman") << Actor ({

    init: function(world, id) {
        this._super(world, id);
        this.m_dead = false;
        this.m_lives = 3;
    },

    isDead: function() {
        return this.m_dead;
    },

    setDead: function(dead) {
        this.m_dead = dead;
    },

    getNumLivesLeft: function() {
        return this.m_lives;
    },

    decrementNumLives: function() {
        this.m_lives = this.m_lives - 1;
    },

    doAction: function() {
        this.move();
    },
});
