#include "MyMaze.h"
#include <stack>

using std::stack;

//finds the next coordinate on the closest path from (curX, curY) to home
bool MyMaze::GetNextCoordinate(int curX, int curY, int& newX, int& newY) {
	//return false if already at home location
	if (curX == GetMonsterStartX() && curY == GetMonsterStartY())
		return false;

	int& curDist = m_distGrid[curX][curY];

	//check for next coordinate starting from north, going clockwise
	if (m_distGrid[curX][curY+1] == curDist-1) { //north
		newX = curX;
		newY = curY + 1;
	} else if (m_distGrid[curX+1][curY] == curDist-1) { //east
		newX = curX + 1;
		newY = curY;
	} else if (m_distGrid[curX][curY-1] == curDist-1) { //south
		newX = curX;
		newY = curY - 1;
	} else if (m_distGrid[curX-1][curY] == curDist-1) { //west
		newX = curX - 1;
		newY = curY;
	} 

	return true;
}

bool MyMaze::LoadMaze(const std::string &sMazeFile) {
	if (!Maze::LoadMaze(sMazeFile))
		return false;

	determineDistances(GetMonsterStartX(), GetMonsterStartY());
	return true;
}

//populate the distance array
void MyMaze::determineDistances(int sr, int sc) {
	//Set every element of the distance array to 99.
	for (int i = 0; i < MAZE_WIDTH; i++)
		for (int j = 0; j < MAZE_HEIGHT; j++)
			m_distGrid[i][j] = 99;
	
	//Set position (sr,sc) of the distance array to 0.
	m_distGrid[sr][sc] = 0;

	//Push the starting coordinate (sr,sc) onto the coordinate stack.
	stack<COORD> CoordStack;
	CoordStack.push(COORD(sr, sc));

	while (!CoordStack.empty()) {
		COORD c = CoordStack.top();
		CoordStack.pop();

		//find the minimum distance of adjacent coordinates
		int m = (m_distGrid[c.x+1][c.y] < m_distGrid[c.x][c.y+1]) ? m_distGrid[c.x+1][c.y] : m_distGrid[c.x][c.y+1];
		m = (m_distGrid[c.x-1][c.y] < m) ? m_distGrid[c.x-1][c.y] : m;
		m = (m_distGrid[c.x][c.y-1] < m) ? m_distGrid[c.x][c.y-1] : m;

		if (m_distGrid[c.x][c.y] > m + 1)
			m_distGrid[c.x][c.y] = m + 1;

		int v = m_distGrid[c.x][c.y];

		//going clockwise, push each adjacent coordinate onto the stack and set the distance 
		//at that coordinate to v + 1 if the distance is greater than the current v + 1 and 
		//the coordinate is not a wall


		//north
		if (GetGridContents(c.x-1, c.y) != WALL && m_distGrid[c.x-1][c.y] > v + 1) {
			m_distGrid[c.x-1][c.y] = v + 1;
			CoordStack.push(COORD(c.x-1,c.y));
		}

		//east
		if (GetGridContents(c.x, c.y+1) != WALL && m_distGrid[c.x][c.y+1] > v + 1) {
			m_distGrid[c.x][c.y+1] = v + 1;
			CoordStack.push(COORD(c.x,c.y+1));
		}

		//south
		if (GetGridContents(c.x+1, c.y) != WALL && m_distGrid[c.x+1][c.y] > v + 1) {
			m_distGrid[c.x+1][c.y] = v + 1;
			CoordStack.push(COORD(c.x+1,c.y));
		}

		//west
		if (GetGridContents(c.x, c.y-1) != WALL && m_distGrid[c.x][c.y-1] > v + 1) {
			m_distGrid[c.x][c.y-1] = v + 1;
			CoordStack.push(COORD(c.x,c.y-1));
		}
	}
}