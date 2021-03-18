class Stuff {
    constructor() {
        this.a = 11;
        this.b = 22;
    }

    get backwards() {
        let i = 0;
        let self = this;
        return {
            next: function () {
                return {
                    done: i > 1,
                    value: self[i++ === 0 ? 'b' : 'a'],
                }
            },
            [Symbol.iterator] : function() {return this; }
        }
    }

    [Symbol.iterator]() {
        let i = 0;
        let self = this;
        return {
            next: function () {
                return {
                    done: i > 1,
                    value: self[i++ === 0 ? 'a' : 'b'],
                }
            }
        }
    }

}


let things = new Stuff();

for( let thing of things.backwards){
    console.log(thing);
}