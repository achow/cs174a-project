Pacman = new JS.Class(Actor, {
    initialize: function(id) {
        this.callSuper(id);
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
