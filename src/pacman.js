Pacman = new JS.Class(Actor, {

    initialize: function(id, world) {
        this.callSuper(id, world);
        this.m_dead = false;
        this.m_lives = 3;
		this.initSphere();
    },
	
    /*
     * drawing function
     */
    draw: function() {
        this.drawSphere();
    },
	
    isDead: function()
    {
        return this.m_dead;
    },

    setDead: function(dead)
    {
        this.m_dead = dead;
    },

    getNumLivesLeft: function()
    {
        return this.m_lives;
    },

    decrementNumLives: function()
    {
        this.m_lives = this.m_lives - 1;
    }
});
