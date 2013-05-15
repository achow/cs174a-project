#ifndef CAM_H
#define CAM_H

#include <iostream>
#include "include/Angel.h"
using namespace std;

typedef Angel::vec4  color4;
typedef Angel::vec4  point4;


class Cam
{
public:
    static const float step = 10;
    static const float step_degree = 10;

    // for reset
    point4 opos;
    float otheta;
    float ophi;

    // for transition
    point4 tpos;
    float ttheta;
    float tphi;

    // real class var
    point4 pos;
    float theta;
    float phi;

    Object * attachObj;

    Cam (point4 position, float thetaAngle, float phiAngle) {
        tpos = opos = pos = position;
        ttheta = otheta = theta = thetaAngle;
        tphi = ophi = phi = phiAngle;
        attachObj = NULL;
    }

    Cam () {
        tpos = opos = pos = point4(0, 0, 0, 0);
        ttheta = otheta = theta = 0;
        tphi = ophi = phi = 0;
        attachObj = NULL;
    }

    void turnLeft() {
        ttheta += step_degree;
    }
    void turnRight() {
        ttheta -= step_degree;
    }

    void turnUp() {
        tphi += step_degree;
    }

    void turnDown() {
        tphi -= step_degree;
    }

    void goForward() {
        tpos.z -= step;
    }

    void goBackward() {
        tpos.z += step;
    }

    void goLeft() {
        tpos.x -= step;
    }

    void goRight() {
        tpos.x += step;
    }

    void goUp() {
        tpos.y += step;
    }

    void goDown() {
        tpos.y -= step;
    }

    void dt(double dt) {
        if (attachObj != NULL) {
            tpos = attachObj-> getCoord() * attachObj->pos;
        }
        pos += (tpos - pos) * dt;
        theta += (ttheta - theta) * dt;
        phi += (tphi - phi) * dt;
    }

    /*
     * return model view matrix
     */
    mat4 getView() {
        // 0 0 50
        vec4    up( 0.0, 1.0, 0.0, 0.0 );

        // we face negative z
        point4  at(
            sin(theta * DegreesToRadians)*cos(phi * DegreesToRadians),
            -sin(phi * DegreesToRadians),
            cos(theta * DegreesToRadians)*cos(phi * DegreesToRadians),
            1 );

        point4 t = pos - at;
        t.w = 1; // the library sucks
        return LookAt( pos, t , up );
    }

    void reset() {
        tpos = opos;
        ttheta = otheta;
        tphi = ophi;
    }

    void attach(Object * o) {
        attachObj = o;
    }

    void detach() {
        attachObj = NULL;
    }

};

#endif
