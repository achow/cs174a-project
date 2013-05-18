Pacman = new JS.Class(Actor, {
    initialize: function(id) {
        this.callSuper(id);
    },

    IsDead: function()
    {
    	return this.m_dead;
    }

    SetDead: function(dead)
    {
    	this.m_dead = dead;
    }

    GetNumLivesLeft: function()
    {
    	return this.m_lives;
    }

    DecrementNumLives: function()
    {
    	this.m_lives = this.m_lives - 1;
    }
});
