class Image {
    constructor(url){
        this.url = url;
        console.log(`Loading image from ${url}`);
    }

    draw(){
        console.log(`Drawing image from ${this.url}`);
    }

}


class LazyImage {
    constructor(url){
        this.url = url;
    }

    draw(){
        if (!this.image){
            this.image = new Image(this.url);
        }
        this.image.draw();
    }

}


function drawImage(img){
    console.log('About to drawthe image');
    img.draw();
    console.log('Done drawing the image');
}

let img = new Image('http://pokemon.com/pikachu.png');
drawImage(img);

let img2 = new Image('http://pokemon.com/pikachu.png');
drawImage(img);