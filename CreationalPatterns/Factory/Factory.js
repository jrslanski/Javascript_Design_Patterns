
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class PointFactory{

     //method in charge of creating a point
     static newCartesianPoint(x,y){
        return new Point(x,y)
    }

    //method in charge of creating a point
    static newPolarPoint(rho, theta) {
        return new Point(
            rho * Math.cos(theta),
            rho * Math.sin(theta)
        )
    }

}