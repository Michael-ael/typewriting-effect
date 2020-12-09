const TypeWriter = function(txtElement, words, wait = 500) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    //GetFull text of current word
    const fullTxt = this.words[current];

    //chech if deleting
    if(this.isDeleting) {
        //remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else{
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Type Speed
    let typeSpeed = 100;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    //if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        //Move to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 200;
    }

    setTimeout(() => this.type(), 500)
}

//Init on DOM load
document.addEventListener('DOMContentLoaded', init);
//init app
function init() {
    const txtElement = document.querySelector('.text');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}
