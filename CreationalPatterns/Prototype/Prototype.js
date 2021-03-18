class Address {
    constructor(streetAdress, city, country){
        this.streetAdress = streetAdress;
        this.city = city;
        this.country = country;
    }
}

class Person {
    constructor(name, address){
        this.name = name;
        this.address = address;
    }

    greet() {
        console.log(`Hi, my name is ${this.name}!`)
    }

}

class Serializer {
    constructor(types) {
        this.types = types;
    }

    markRecursive(object){
        let idx = this.types.findIndex( t => {
            return t.name === object.constructor.name;
        });

        if(idx !== -1){
            object['typeIndex'] = idx;

            for (let key in object) {
                if(object.hasOwnProperty(key)){
                    this.markRecursive(object[key]);
                }
            }

        }
    }

    unmarkRecursive(object){
        if(object.hasOwnProperty('typeIndex')){
            delete object.typeIndex;
            for (let key in object){
                if(object.hasOwnProperty(key)){
                    this.unmarkRecursive(object[key])
                }
            }
        }
    }

    reconstructRecursive(object){
        if(object.hasOwnProperty('typeIndex')){
            let type = this.types[object.typeIndex];
            let obj = new type();
            for (let key in object){
                if(object.hasOwnProperty(key) && object[key] !== null){
                    obj[key] = this.reconstructRecursive(object[key]);
                }
            }
            delete obj.typeIndex;
            return obj;
        }    
        return object;
    }

    clone(object){
        this.markRecursive(object);
        let copy = JSON.parse(JSON.stringify(object));
        this.unmarkRecursive(object)
        return this.reconstructRecursive(copy);

    }

}

let john = new Person('John',
    new Address('123 London Road', 'London', 'UK'));

let s = new Serializer([Person, Address]);

let jane = s.clone(john);

jane.name = 'Jane';
jane.address.streetAdress = '321 Angel ST';

console.log(john);
console.log(jane);

jane.greet();
