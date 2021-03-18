class Address {
    constructor(suite, streetAdress, city){
        this.streetAdress = streetAdress;
        this.city = city;
        this.suite = suite;
    }
}


class Employee {
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
        if(object !== null){
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
        
    }

    unmarkRecursive(object){
        if(object!== null && object.hasOwnProperty('typeIndex')){
            delete object.typeIndex;
            for (let key in object){
                if(object.hasOwnProperty(key)){
                    this.unmarkRecursive(object[key])
                }
            }
        }
    }

    reconstructRecursive(object){
        if(object!==null && object.hasOwnProperty('typeIndex')){
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


class EmployeeFactory {
    static _newEmployee(proto, name, suite) {
        let copy = EmployeeFactory.serializer.clone(proto);
        copy.name = name;
        copy.address.suite = suite;
        return copy;
    }

    static newMainOfficeEmployee(name, suite){
        return this._newEmployee(EmployeeFactory.main, name, suite);
    }

    
    static newAuxOfficeEmployee(name, suite){
        return this._newEmployee(EmployeeFactory.aux, name, suite);
    }
}

EmployeeFactory.serializer = new Serializer([Employee, Address])
EmployeeFactory.main = new Employee(null, new Address(null, '123 East Dr', 'London'));
EmployeeFactory.aux = new Employee(null, new Address(null, '200 London Rd', 'Oxford'))

let john = EmployeeFactory.newMainOfficeEmployee('John', 4321);
let jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 222);

console.log(john);
console.log(jane)