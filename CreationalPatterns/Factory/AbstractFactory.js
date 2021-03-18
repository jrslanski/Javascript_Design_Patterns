class Hotdrink {
    consume() {}

}

class Tea extends Hotdrink {

    consume() {
        console.log('This tea is nice with lemon!');
    }
}

class Coffe extends Hotdrink{
    consume() {
        console.log('This coffe is delicious!');
    }
}

class HotDrinkFactory {

    prepare(amount) {/* abstract */}

}

class TeaFactory extends HotDrinkFactory {

    prepare(amount) {
        console.log(`Put in tea bag, boil water, pour ${amount}ml`);
        return new Tea();
    }

}

class CoffeFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Grind some beans, boil water, pour ${amount}ml`);
        return new Coffe();
    }
}

class HotDrinkMachine {

    makeDrink(type) {
        switch (type){
            case 'tea':
                return new TeaFactory().prepare(200);
            case 'coffe': 
                return new CoffeFactory().prepare(50);
            default: 
                throw new Error('')
        }
    }
}


let machine = new HotDrinkMachine();

const readline = require('readline');

let rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
})

rl.question('Which drink?  ', function(answer) {
    let drink = machine.makeDrink(answer);
    drink.consume();

    rl.close();
})