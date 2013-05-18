#ifndef OBJECT_H
#define OBJECT_H

#include <iostream>
#include "include/Angel.h"

typedef Angel::vec4  point4;
typedef Angel::vec4 color4;
using namespace std;

#include "color.h"

// generic

class Object {
public:
    point4 pos;
    float size;
    Color color;
    int mid;

    Object(int modelId, point4 position, float scaleSize) {
        mid = modelId;
        pos = position;
        size = scaleSize;
    }
    // for animation
    virtual void dt(double dt) {
    }

    virtual mat4 getSize() {
        return Scale(size, size, size);
    }

    virtual mat4 getCoord() {
        return Translate(pos.x, pos.y, pos.z);
    }
};

#endif
