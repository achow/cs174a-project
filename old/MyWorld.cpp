#include "MyWorld.h"

GameStatus MyWorld::RunLevel() {
	// NachMan initialization:
	// 1. Set NachMan’s state to ALIVE and
	// 2. Set NachMan’s current location to the
	// specified NachMan-start-location in the Maze
	// 3. Reset the NachMan’s direction to none so he
	// doesn’t move until the player hits a key
	NachMan* nach = GetNachMan();
	nach->setDead(false);
	nach->SetX(GetMaze()->GetNachManStartX());
	nach->SetY(GetMaze()->GetNachManStartY());
	nach->setDirection(NONE);

	// Monster initialization:
	// 1. Set all four monsters’ states to normal
	// 2. Set each monster’s start location in the maze
	// to the monster home square in the Maze
	// Redisplay every cell on the screen before
	// game play begins (true means redraw every grid cell)
	for (int i = 0; i < NUM_MONSTERS; i++) {
		Monster* monster = GetMonster(i);
		monster->setState(normal);
		monster->SetX(GetMaze()->GetMonsterStartX());
		monster->SetY(GetMaze()->GetMonsterStartY());
	}
	DisplayScreen(true); // use this exact function call

	// Define your main game loop
	// Each iteration of the loop is one game tick
	while (!nach->isDead() && GetMaze()->GetRemainingFood() != 0) {
		// Ask the NachMan object to move itself
		// Check if NachMan has died as a result of
		// moving itself. If NachMan has not died,
		// then ask each of the four monsters to move itself
		// Now update the graphical display, only redrawing
		// those sqares on the grid that changed due to
		// movement (That’s what the false means)
		nach->DoSomething();
		if (!nach->isDead()) {
			for (int i = 0; i < NUM_MONSTERS; i++)
				GetMonster(i)->DoSomething();
		}
		DisplayScreen(false); // use this exact function call
	}

	if (GetMaze()->GetRemainingFood() == 0) {
		// you must return finishedlevel if NachMan
		// has eaten all of the pellets on this level
		// and therefore has completed the level
		return FINISHED_LEVEL;
	}

	// otherwise, NachMan died; you must return playerdied
	// in this case.
	return PLAYER_DIED;
}
