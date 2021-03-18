class Person {
    constructor(name){
        this.name = name;
        this.chatLog = [];
    }  

    receive(sender, message) {
        let s = `${sender}: '${message}'`;
        this.chatLog.push(s);
        console.log( `[ ${this.name}'s chat session]  ${s}`);
    }

    say(message){
        this.room.broadcast(this.name, message);
    }

    pm(who, message){
        this.room.message(this.name, who, message);
    }

}


class ChatRoom {

    constructor() {
        this.people = [];
    }

    join(p){
        let joinMsg = `${p.name} joins the chat`;
        this.broadcast('room', joinMsg);
        p.room = this;
        this.people.push(p);
    }

    broadcast(source, message){
        for (let p of this.people ){
            if (p.name !== source){
                p.receive(source, message);
            }
        }
    }

    message(source, destination, message){
        for (let p of this.people ){
            if (p.name === destination){
                p.receive(source, message);
            }
        }
    }

}


let room = new ChatRoom();

let john = new Person('John');
let jane = new Person('Jane');

room.join(john);
room.join(jane);

john.say('Hi room!');
jane.say('oh, hey john!');

let simon = new Person('Simon');
room.join(simon);
simon.say('Hi everyone!');

jane.pm('Simon', 'glad you could join us!')