#ifndef ACTOR_H
#define ACTOR_H

#include "BGIgraphics.h"
#include "constants.h"
#include "GraphManager.h"
#include "testdefines.h"

class Maze;
class World;

enum MonsterState { normal, vulnerable, monsterdie, returntohome };

class Actor {
	public:
		Actor(World* world, int x, int y, colors color);
		virtual ~Actor();

		int GetX() const;
		int GetY() const;
		void SetX(int newXCoord);
		void SetY(int newYCoord);
		Direction getDirection() const;
		void setDirection(Direction dir);
		colors GetDisplayColor() const;
		void setColor(colors color);
		World* getWorld() const;
		void checkCollision();

		virtual void DoSomething() = 0;
		virtual int getMyID() const = 0;
	private:
		Direction m_dir;
		int m_x, m_y;
		World* m_world;
		colors m_color;
};

class NachMan : public Actor {
	public:
		NachMan(World* world, int x, int y, int lives = 3);
		virtual ~NachMan();

		virtual void DoSomething();
		virtual int getMyID() const;
		int GetScore() const;
		void updateScore(int score);
		bool isDead() const;
		void setDead(bool dead = true);
		int GetNumLivesLeft() const;
		void DecrementNumLives();
	private:
		int m_score, m_lives;
		bool m_dead;
};

class Monster : public Actor {
	public:
		Monster(World* world, int x, int y, colors color);
		virtual ~Monster();

		MonsterState getState() const;
		void setState(MonsterState state);
		void updateColor(colors mcolor);
		void moveToward(int x, int y);
		void setVulnerable();
		void tickVulnerable();
		void goHome();
		void moveRandom();
		void chaseNachMan();
	private:
		MonsterState m_state;
		int m_vulnerableTicks;
};

class Inky : public Monster {
	public:
		Inky(World* world, int x, int y);
		virtual ~Inky();

		virtual void DoSomething();
		virtual int getMyID() const;
	private:
		int m_chaseTicks, m_cruiseTicks;
};

class Clyde : public Monster {
	public:
		Clyde(World* world, int x, int y);
		virtual ~Clyde();

		virtual void DoSomething();
		virtual int getMyID() const;
	private:
		enum Quadrant { UPPERLEFT, UPPERRIGHT, LOWERLEFT, LOWERRIGHT };
		Quadrant getNachQuadrant() const;
};

class Stinky : public Monster {
	public:
		Stinky(World* world, int x, int y);
		virtual ~Stinky();

		virtual void DoSomething();
		virtual int getMyID() const;
};

class Dinky : public Monster {
	public:
		Dinky(World* world, int x, int y);
		virtual ~Dinky();

		virtual void DoSomething();
		virtual int getMyID() const;
};

#endif
