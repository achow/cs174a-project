#ifndef _MYMAZE_H_
#define _MYMAZE_H_

#include "Maze.h"
#include <string>

class MyMaze: public Maze
{
	public:

		MyMaze(GraphManager* gm)
			: Maze(gm) { 
		}
	
		bool GetNextCoordinate(int curX, int curY, int& newX, int& newY);
		virtual bool LoadMaze(const std::string &sMazeFile);

	private:
		void MyMaze::determineDistances(int sr, int sc);

		int m_distGrid[MAZE_WIDTH][MAZE_HEIGHT];
};

#endif
