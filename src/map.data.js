MAPELEMENT = {
    WALL: '#',
    PELLET: '.',
    SUPERPELLET: '*',
    CAGEDOOR: '%',
    MONSTERSPAWN: '$',
    PACMANSPAWN: '@',
	EMPTY: ' ',
};

MapData = [
"#####################",
"#...................#",
"##.#.#.#######.#.#.##",
"#*.#.............#.*#",
"#.##.####.#.####.##.#",
"#.........#.........#",
"####.#.#######.#.####",
"#  #.#....@....#.#  #",
"####.#.#######.#.####",
"#......#  $  #......#",
"####.#.###%###.#.####",
"#....#.........#....#",
"#.##.#.#######.#.##.#",
"#*.................*#",
"#####################",
];

/*
    X
    ->
Y |
  v

 */

MAP_SIZE_H = MapData.length;
MAP_SIZE_W = MapData[0].length;
