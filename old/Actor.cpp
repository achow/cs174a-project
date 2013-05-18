#include "Actor.h"
#include "Maze.h"
#include "World.h"
#include <cmath>
#include <cstdlib>
#include <time.h>

//Actor

Actor::Actor(World* world, int x, int y, colors color)
	: m_world(world), m_x(x), m_y(y), m_color(color), m_dir(NONE) { 
	srand(time(NULL));
}

Actor::~Actor() { }

int Actor::GetX() const {
	return m_x;
}

int Actor::GetY() const {
	return m_y;
}

void Actor::SetX(int newXCoord) {
	m_x = newXCoord;
}

void Actor::SetY(int newYCoord) {
	m_y = newYCoord;
}

Direction Actor::getDirection() const {
	return m_dir;
}

void Actor::setDirection(Direction dir) {
	m_dir = dir;
}

colors Actor::GetDisplayColor() const {
	return m_color;
}

void Actor::setColor(colors color) {
	m_color = color;
}

World* Actor::getWorld() const {
	return m_world;
}

//checks for Monster-NachMan collision
void Actor::checkCollision() {
	NachMan* nach = m_world->GetNachMan();

	//check each monster if it shares the same coordinates as NachMan
	//if it does and the monster is vulnerable, 1000 points are awarded and the monster dies
	//if it does and the monster is normal, NachMan dies
	for (int i = 0; i < NUM_MONSTERS; i++) {
		Monster* monster = m_world->GetMonster(i);
		if (monster->GetX() == nach->GetX() && monster->GetY() == nach->GetY()) {
			if (monster->getState() == vulnerable) {
				nach->updateScore(1000);
				monster->setState(monsterdie);
			} else if (monster->getState() == normal) {
				nach->setDead();
			}
		}
	}
}

//NachMan

NachMan::NachMan(World* world, int x, int y, int lives)
	: Actor(world, x, y, YELLOW), m_score(0), m_lives(lives), m_dead(false) {
}

NachMan::~NachMan() { }

void NachMan::DoSomething() {
	//change direction according to input from directional keys, if any
	char ch;
	Maze* maze = getWorld()->GetMaze();
	if (getCharIfAny(ch)) {
		switch (ch)	{
			case ARROW_LEFT:
				if (maze->GetGridContents(GetX()-1, GetY()) != CAGEDOOR && maze->GetGridContents(GetX()-1, GetY()) != WALL)
					setDirection(WEST);
				break;
			case ARROW_RIGHT:
				if (maze->GetGridContents(GetX()+1, GetY()) != CAGEDOOR && maze->GetGridContents(GetX()+1, GetY()) != WALL)
					setDirection(EAST);
				break;
			case ARROW_UP:
				if (maze->GetGridContents(GetX(), GetY()-1) != CAGEDOOR && maze->GetGridContents(GetX(), GetY()-1) != WALL)
					setDirection(NORTH);
				break;
			case ARROW_DOWN:
				if (maze->GetGridContents(GetX(), GetY()+1) != CAGEDOOR && maze->GetGridContents(GetX(), GetY()+1) != WALL)
					setDirection(SOUTH);
				break;
		}
	}

	//move NachMan
	switch (getDirection()) {
		case WEST:
			if (maze->GetGridContents(GetX()-1, GetY()) != CAGEDOOR && maze->GetGridContents(GetX()-1, GetY()) != WALL)
				SetX(GetX()-1);
			break;
		case EAST:
			if (maze->GetGridContents(GetX()+1, GetY()) != CAGEDOOR && maze->GetGridContents(GetX()+1, GetY()) != WALL)
				SetX(GetX()+1);
			break;
		case NORTH:
			if (maze->GetGridContents(GetX(), GetY()-1) != CAGEDOOR && maze->GetGridContents(GetX(), GetY()-1) != WALL)
				SetY(GetY()-1);
			break;
		case SOUTH:
			if (maze->GetGridContents(GetX(), GetY()+1) != CAGEDOOR && maze->GetGridContents(GetX(), GetY()+1) != WALL)
				SetY(GetY()+1);
			break;
	}

	//check object collision
	//eating a pellet clears the pellet and increases player score by 10
	//eating a powerpellet clears the powerpellet, increases player score by 100, and sets all monsters to vulnerable
	if (maze->GetGridContents(GetX(), GetY()) == PELLET) {
		updateScore(10);
		maze->SetGridContents(GetX(), GetY(), EMPTY);
		SoundFX::playNachManSound(PAC_SOUND_SMALL_EAT);
	} else if (maze->GetGridContents(GetX(), GetY()) == POWERPELLET) {
		updateScore(100);
		maze->SetGridContents(GetX(), GetY(), EMPTY);
		SoundFX::playNachManSound(PAC_SOUND_BIG_EAT);
		for (int i = 0; i < NUM_MONSTERS; i++) {
			getWorld()->GetMonster(i)->setVulnerable();
		}
	}

	checkCollision();
}

int NachMan::getMyID() const {
	return ITEM_NACHMAN;
}

int NachMan::GetScore() const {
	return m_score;
}

void NachMan::updateScore(int score) {
	m_score += score;
}

bool NachMan::isDead() const {
	return m_dead;
}

void NachMan::setDead(bool dead) {
	m_dead = dead;
}

int NachMan::GetNumLivesLeft() const {
	return m_lives;
}

void NachMan::DecrementNumLives() {
	m_lives--;
}

//Monster

Monster::Monster(World* world, int x, int y, colors color)
	: Actor(world, x, y, color), m_vulnerableTicks(0) { }

Monster::~Monster() { }

MonsterState Monster::getState() const {
	return m_state;
}

void Monster::setState(MonsterState state) {
	m_state = state;

	if (m_state == vulnerable)
		setColor(LIGHTBLUE);
	else if (m_state == returntohome)
		setColor(LIGHTGRAY);
}

//sets Monster color to LIGHTBLUE if vulnerable, LIGHTGRAY if returntohome, or its original color mcolor if normal
void Monster::updateColor(colors mcolor) {
	if (m_state == vulnerable)
		setColor(LIGHTBLUE);
	else if (m_state == returntohome)
		setColor(LIGHTGRAY);
	else
		setColor(mcolor);
}

//monster movement in normal or vulnerable state
void Monster::moveToward(int targetx, int targety) {
	Maze* maze = getWorld()->GetMaze();

	//check if movement toward the target is achievable without reversing direction
	//horizontal movement
	if (GetX() != targetx) {
		//west
		if (GetX() > targetx && maze->GetGridContents(GetX()-1, GetY()) != WALL && getDirection() != EAST) {
			SetX(GetX()-1);
			setDirection(WEST);
			return;
		}
		//east
		if (GetX() < targetx && maze->GetGridContents(GetX()+1, GetY()) != WALL && getDirection() != WEST) {
			SetX(GetX()+1);
			setDirection(EAST);
			return;
		}
	}

	//vertical movement
	if (GetY() != targety) {
		//north
		if (GetY() > targety && maze->GetGridContents(GetX(), GetY()-1) != WALL && getDirection() != SOUTH) {
			SetY(GetY()-1);
			setDirection(NORTH);
			return;
		}
		//south
		if (GetY() < targety && maze->GetGridContents(GetX(), GetY()+1) != WALL && getDirection() != NORTH) {
			SetY(GetY()+1);
			setDirection(SOUTH);
			return;
		}
	}

	//otherwise, check all directions, starting with a random direction
	int dirmove = rand() % 4;
	for (int i = 0; i < 4; i++) {
		switch (dirmove) {
			case 0: //north
				if (maze->GetGridContents(GetX(), GetY()-1) != WALL && getDirection() != SOUTH) {
					SetY(GetY()-1);
					setDirection(NORTH);
					return;
				}	
				break;
			case 1: //east
				if (maze->GetGridContents(GetX()+1, GetY()) != WALL && getDirection() != WEST) {
					SetX(GetX()+1);
					setDirection(EAST);
					return;
				}
				break;
			case 2:	//south
				if (maze->GetGridContents(GetX(), GetY()+1) != WALL && getDirection() != NORTH) {
					SetY(GetY()+1);
					setDirection(SOUTH);
					return;
				}
				break;
			case 3: //west
				if (maze->GetGridContents(GetX()-1, GetY()) != WALL && getDirection() != EAST) {
					SetX(GetX()-1);
					setDirection(WEST);
					return;
				}
				break;
		}
		dirmove = (dirmove + 1) % 4;
	}

	//last resort, reverse course
	switch (getDirection()) {
		case NORTH:
			SetY(GetY()+1);
			setDirection(SOUTH);
			break;
		case SOUTH:
			SetY(GetY()-1);
			setDirection(NORTH);
			break;
		case EAST:
			SetX(GetX()-1);
			setDirection(WEST);
			break;
		case WEST:
			SetX(GetX()+1);
			setDirection(EAST);
			break;
	}
}

//sets the monster to a vulnerable state if monster state is normal or vulnerable
//sets vulnerable ticks defined by:
//	100 - nLevel * 10  if nLevel <= 8
//	20                 if nLevel > 8
void Monster::setVulnerable() {
	if (getState() != monsterdie && getState() != returntohome) {
		setState(vulnerable);
		if (getWorld()->GetLevel() <= 8)
			m_vulnerableTicks = 100 - (getWorld()->GetLevel() * 10);
		else m_vulnerableTicks = 20;
	}
}

//decreases vulnerable ticks by 1
//if vulnerable ticks hits 0, the monster reverts to the normal state
void Monster::tickVulnerable() {
	m_vulnerableTicks--;
	if (m_vulnerableTicks <= 0)
		setState(normal);
}

//takes the most efficient path back to monster's starting location
//if the monster is at its starting location, its state is changed to normal
void Monster::goHome() {
	int nextx, nexty;
	if (getWorld()->GetMaze()->GetNextCoordinate(GetX(), GetY(), nextx, nexty)) {
		SetX(nextx);
		SetY(nexty);
	} else {
		setState(normal);
	}
}

//moves the monster toward a random location on the maze
void Monster::moveRandom() {
	moveToward(rand() % MAZE_WIDTH, rand() % MAZE_HEIGHT);
}

//moves the monster toward NachMan
void Monster::chaseNachMan() {
	moveToward(getWorld()->GetNachMan()->GetX(), getWorld()->GetNachMan()->GetY());
}

//Inky

Inky::Inky(World* world, int x, int y)
	: Monster(world, x, y, LIGHTRED), m_chaseTicks(0), m_cruiseTicks(0) { 
	//initial Inky behavior
	if (rand() % 100 < 80)
		m_chaseTicks = 10;
	else m_cruiseTicks = 10;
}

Inky::~Inky() { }

void Inky::DoSomething() {
	if (getState() == normal) {
		//every 10 ticks, generate Inky's action for the next 10 ticks
		//80% chance that Inky chases NachMan, 20% chance he cruises aimlessly through the maze
		if (m_chaseTicks == 0 && m_cruiseTicks == 0) {
			if (rand() % 100 < 80)
				m_chaseTicks = 10;
			else m_cruiseTicks = 10;
		}

		//chase NachMan
		if (m_chaseTicks > 0) {
			chaseNachMan();
			m_chaseTicks--;
		}

		//cruise the maze
		if (m_cruiseTicks > 0) {
			moveRandom();
			m_cruiseTicks--;
		}
	} else if (getState() == vulnerable) {
		moveRandom();
		tickVulnerable();
	} else if (getState() == monsterdie) {
		SoundFX::playNachManSound(PAC_SOUND_BIG_EAT);
		setState(returntohome);
	} else if (getState() == returntohome) {
		goHome();
	}

	checkCollision();
	updateColor(LIGHTRED);
}

int Inky::getMyID() const {
	return ITEM_MONSTER1;
}

//Clyde

Clyde::Clyde(World* world, int x, int y)
	: Monster(world, x, y, LIGHTCYAN) { }

Clyde::~Clyde() { }

void Clyde::DoSomething() {
	if (getState() == normal) {
		moveRandom();
	} else if (getState() == vulnerable) {
		//moves toward the corner of the opposite quadrant than the one NachMan is in
		switch (getNachQuadrant()) {
			case UPPERLEFT:
				moveToward(MAZE_WIDTH, MAZE_HEIGHT);
				break;
			case UPPERRIGHT:
				moveToward(0, MAZE_HEIGHT);
				break;
			case LOWERLEFT:
				moveToward(MAZE_WIDTH, 0);
				break;
			case LOWERRIGHT:
				moveToward(0, 0);
				break;
		}
		tickVulnerable();
	} else if (getState() == monsterdie) {
		SoundFX::playNachManSound(PAC_SOUND_BIG_EAT);
		setState(returntohome);
	} else if (getState() == returntohome) {
		goHome();
	}

	checkCollision();
	updateColor(LIGHTCYAN);
}

int Clyde::getMyID() const {
	return ITEM_MONSTER4;
}

//returns the quadrant that NachMan is in
Clyde::Quadrant Clyde::getNachQuadrant() const {
	int nachx = getWorld()->GetNachMan()->GetX();
	int nachy = getWorld()->GetNachMan()->GetY();

	if (nachx <= MAZE_HEIGHT / 2) {
		if (nachy <= MAZE_WIDTH / 2)
			return UPPERLEFT;
		else return LOWERLEFT;
	}

	if (nachy <= MAZE_WIDTH / 2)
		return UPPERRIGHT;
	else return LOWERRIGHT;
}

//Stinky

Stinky::Stinky(World* world, int x, int y)
	: Monster(world, x, y, LIGHTGREEN) { }

Stinky::~Stinky() { }

void Stinky::DoSomething() {
	if (getState() == normal) {
		//chases NachMan if NachMan is within 5 rows and 5 columns of Stinky
		//otherwise Stinky cruises the map aimlessly
		if (abs(GetX() - getWorld()->GetNachMan()->GetX()) <= 5 && abs(GetY() - getWorld()->GetNachMan()->GetY()) <= 5) {
			chaseNachMan();
		} else {
			moveRandom();
		}
	} else if (getState() == vulnerable) {
		moveRandom();
		tickVulnerable();
	} else if (getState() == monsterdie) {
		SoundFX::playNachManSound(PAC_SOUND_BIG_EAT);
		setState(returntohome);
	} else if (getState() == returntohome) {
		goHome();
	}

	checkCollision();
	updateColor(LIGHTGREEN);
}

int Stinky::getMyID() const {
	return ITEM_MONSTER2;
}

//Dinky

Dinky::Dinky(World* world, int x, int y)
	: Monster(world, x, y, LIGHTMAGENTA) { }

Dinky::~Dinky() { }

void Dinky::DoSomething() {
	if (getState() == normal) {
		int nachx = getWorld()->GetNachMan()->GetX();
		int nachy = getWorld()->GetNachMan()->GetY();

		//Dinky chases NachMan if it has horizonal or vertical vision of NachMan
		if (GetY() == nachy) { //Dinky is on the same row as NachMan
			bool hasVision = true;
			//look for walls between Dinky and NachMan
			int dx = (getWorld()->GetNachMan()->GetX() < GetX()) ? -1 : 1;
			for (int i = GetX(); i != nachx; i += dx) {
				if (getWorld()->GetMaze()->GetGridContents(i, nachy) == WALL)
					hasVision = false;
			}
			//if no walls encountered, chase NachMan
			//otherwise cruise the maze aimlessly
			if (hasVision)
				moveToward(nachx, nachy);
			else moveRandom();
		} else if (GetX() == nachx) { //Dinky is on the same column as NachMan
			bool hasVision = true;
			//look for walls between Dinky and Nachman
			int dy = (getWorld()->GetNachMan()->GetY() < GetY()) ? -1 : 1;
			for (int i = GetY(); i != nachy; i += dy)
				if (getWorld()->GetMaze()->GetGridContents(nachx, i) == WALL)
					hasVision = false;
			//if no walls encountered, chase NachMan
			//otherwise cruise the maze aimlessly
			if (hasVision)
				moveToward(nachx, nachy);
			else moveRandom();
		} else {
			moveRandom();
		}
	} else if (getState() == vulnerable) {
		moveRandom();
		tickVulnerable();
	} else if (getState() == monsterdie) {
		SoundFX::playNachManSound(PAC_SOUND_BIG_EAT);
		setState(returntohome);
	} else if (getState() == returntohome) {
		goHome();
	}

	checkCollision();
	updateColor(LIGHTMAGENTA);
}

int Dinky::getMyID() const {
	return ITEM_MONSTER3;
}