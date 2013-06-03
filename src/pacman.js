def ("Pacman") << Actor ({

    init: function(world, id) {
        this._super(world, id);
        this.m_dead = false;
        this.m_lives = 3;
		this.m_eater = false;
        this.color.setColor(1,1,0);
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
	
	isEater: function() {
		return this.m_eater;
	},
	
	setEater: function(eater) {
		this.m_eater = eater;
	},
});
