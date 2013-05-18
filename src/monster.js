var Monster = new JS.Class(Actor, {

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
