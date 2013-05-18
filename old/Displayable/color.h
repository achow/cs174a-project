#ifndef COLOR_H
#define COLOR_H

#include <iostream>
#include "include/Angel.h"

typedef Angel::vec4 color4;
using namespace std;

class Color {
public:
    color4 amb;
    color4 dif;
    color4 spc;
    float shi;
    Color (color4 ambient, color4 diffuse, color4 specular, float shininess) {
        amb = ambient;
        dif = diffuse;
        spc = specular;
        shi = shininess;
    }
    Color () {
        amb = color4(1, 1, 1, 1);
        dif = color4(1, 1, 1, 1);
        spc = color4(1, 1, 1, 1);
        shi = 10;
    }
};

#endif
