MONSTER_STATE = {
    DEAD: 1,
    GO_HOME: 2,
    ALIVE: 3,
    STOP: 4,
};

Monster = new JS.Class(Actor, {
    initialize: function(id) {
        this.callSuper(id);
        this.m_state = MONSTER_STATE.ALIVE;
    },
    getState: function()
    {
        return this.m_state;
    },

    setState: function(state)
    {
        this.m_state = state;

        /*
            change color depending on state


        */
    },

    moveToward: function()
    {
        //logic to move toward pacman
    },

    goHome: function()
    {
        //logic to make monster go home after death
    },

});
