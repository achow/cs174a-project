#ifndef WORLD_H
#define WORLD_H

#include <iostream>
#include "include/Angel.h"
using namespace std;

#include <vector>
#include "object.h"
#include "cam.h"

class World {

public:
    Cam cam;

    vector<Object *> box;
    virtual bool add(Object * o) {
        box.push_back(o);
    }

    World(Cam camera) {
        cam = camera;
    }

    World() {

    }
    virtual void dt(double dt) {
        for (int i= 0; i < box.size(); i++) {
            box[i]->dt(dt);
        }
    }

    virtual ~World() {
        for (int i= 0; i < box.size(); i++) {
            delete[] box[i];
        }
    }
};

#endif
