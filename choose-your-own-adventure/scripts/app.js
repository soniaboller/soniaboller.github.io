//CREATE STORY
//accept 5 user inputs (confirm/prompt) at least 5 times
//based on user input, create storyboard
//you can modify and duplicate this function for various boards
//when done, add one final story board that is the end

//CHALLENGE: add class argument to accept classes to style each story board differently
//alt -- row:nth-child() in CSS if you're lazy

function createStoryBoard(header, subheader, blob){
    var divRow = document.createElement('div'); //creates div
    divRow.classList.add('row'); //adds class of row to created div
    var firstColumn = document.createElement('article'); //creates articles
    var secondColumn = document.createElement('article');
    var h2 = document.createElement('h2');
    var h3 = document.createElement('h3');
    var p = document.createElement('p');
    h2.innerHTML = header;
    h3.innerHTML = subheader;
    p.innerHTML = blob;
    firstColumn.appendChild(h2);
    firstColumn.appendChild(h3);
    secondColumn.appendChild(p);
    h2.classList.add('left-align');
    h3.classList.add('story');
    p.classList.add('story');
    firstColumn.classList.add('twelve');
    firstColumn.classList.add('columns');
    firstColumn.classList.add('center-align');
    secondColumn.classList.add('eleven');
    secondColumn.classList.add('columns');
    secondColumn.classList.add('center-align');
    divRow.appendChild(firstColumn);
    divRow.appendChild(secondColumn);
    var container = document.getElementById('game-board');
    var allRows = document.getElementsByClassName('row');
    container.insertBefore(divRow, container.firstChild);
    console.log('el fin');
}

window.onload = function() {
    var loadChapter = function () {
        var btn = document.getElementById('btn');
        var enterKeystroke = document.getElementById('enterKeystroke');
        enterKeystroke.addEventListener('keydown', function(event){
            if (event.keyCode === 13) {
                btn.click();
            }
        });
        btn.onclick = function () {
            console.log('buttonclicked');
            var input = document.getElementsByTagName('input')[0];
            var userInput = input.value.toLowerCase();
            var clearInput = document.getElementsByTagName('input')[0];
            console.log(userInput);
            //CHAPTER TWO
            if (userInput === 'befriend') {
                createStoryBoard(chapters.chapterTwo.befriend.header, chapters.chapterTwo.befriend.subheader, chapters.chapterTwo.befriend.blob);
                clearInput.value = '';
            }
            else if (userInput === 'run') {
                createStoryBoard(chapters.chapterTwo.run.header, chapters.chapterTwo.run.subheader, chapters.chapterTwo.run.blob);
                clearInput.value = '';
            }
            //CHAPTER THREE
            else if (userInput === 'hunt') {
                createStoryBoard(chapters.chapterThree.hunt.header, chapters.chapterThree.hunt.subheader, chapters.chapterThree.hunt.blob);
                clearInput.value = '';
            }
            else if (userInput === 'hide') {
                createStoryBoard(chapters.chapterThree.hide.header, chapters.chapterThree.hide.subheader, chapters.chapterThree.hide.blob);
                clearInput.value = '';
            }
            else if (userInput === 'smoke') {
                createStoryBoard(chapters.chapterThree.smoke.header, chapters.chapterThree.smoke.subheader, chapters.chapterThree.smoke.blob);
                clearInput.value = '';
            }
            else if (userInput === 'yell') {
                createStoryBoard(chapters.chapterThree.yell.header, chapters.chapterThree.yell.subheader, chapters.chapterThree.yell.blob);
                clearInput.value = '';
            }
            //CHAPTER FOUR
            else if (userInput === 'rejoin') {
                createStoryBoard(chapters.chapterFour.rejoin.header, chapters.chapterFour.rejoin.subheader, chapters.chapterFour.rejoin.blob);
                clearInput.value = '';
            }
            else if (userInput === 'flee') {
                createStoryBoard(chapters.chapterFour.flee.header, chapters.chapterFour.flee.subheader, chapters.chapterFour.flee.blob);
                clearInput.value = '';
            }
            else if (userInput === 'help') {
                createStoryBoard(chapters.chapterFour.help.header, chapters.chapterFour.help.subheader, chapters.chapterFour.help.blob);
                clearInput.value = '';
            }
            else if (userInput === 'solo') {
                createStoryBoard(chapters.chapterFour.solo.header, chapters.chapterFour.solo.subheader, chapters.chapterFour.solo.blob);
                clearInput.value = '';
            }
            //CHAPTER FIVE
            else if (userInput === 'eat') {
                createStoryBoard(chapters.chapterFive.eat.header, chapters.chapterFive.eat.subheader, chapters.chapterFive.eat.blob);
                clearInput.value = '';
            }
            else if (userInput === 'attack') {
                createStoryBoard(chapters.chapterFive.attack.header, chapters.chapterFive.attack.subheader, chapters.chapterFive.attack.blob);
                clearInput.value = '';
            }
            else if (userInput === 'drink') {
                createStoryBoard(chapters.chapterFive.drink.header, chapters.chapterFive.drink.subheader, chapters.chapterFive.drink.blob);
                clearInput.value = '';
            }
            else if (userInput === 'smash') {
                createStoryBoard(chapters.chapterFive.smash.header, chapters.chapterFive.smash.subheader, chapters.chapterFive.smash.blob);
                clearInput.value = '';
            }
            else {
                alert("please enter a valid response");
                clearInput.value = '';
            }

        }
    };
    loadChapter();
};

var chapters = {

    //CHAPTER TWO
    chapterTwo: {
        befriend: {
            header: "Chapter 2: Joining the wolfpack",
            subheader: "The wolves happily welcome you into their pack. They even kindly initiate you by biting into your arm. The next full moon comes around and suddenly transform into a werewolf. HOLY SHIT.",
            blob: 'Do you HUNT other humans or HIDE from everyone?'
        },
        run: {
            header: "Chapter 2: Lost in the woods",
            subheader: "You run as fast as you can away from the wolves. You are exhausted when you feel like they finally stopped chasing you. You look around and realize you have no idea where you can",
            blob: 'Do you create a SMOKE signal or YELL?'
        }
    },

    //CHAPTER THREE
    chapterThree: {
        hunt: {
            header: "Chapter 3: Full-fledged werewolf",
            subheader: "You spend the entire night running around hunting other humans, attempting to convert someone else into a werewolf to join the pack. You were not successful and are worried the other wolves will shame you.",
            blob: 'Do you REJOIN the pack or FLEE and for good?'
        },
        hide: {
            header: "Chapter 3: Werewolf in hiding",
            subheader: "You are terrified of your new powers. You refuse to re-join the pack and are deeply disturbed by your abilities and never want to use them on anyone. You are completely at a loss and have no idea what your next step should be.",
            blob: 'Do you seek HELP or try to figure it out SOLO?'
        },
        smoke: {
            header: "Chapter 3: Forest on fire",
            subheader: "You attempt to make a smoke signal with the various branches you find laying around. Unfortunately, a big gust of wind rolls through and blows your embers everywhere, starting a giant forest fire.",
            blob: 'Do you seek HELP or try to figure it out SOLO?'
        },
        yell: {
            header: "Chapter 3: THE WOLVES ARE BACK",
            subheader: "You yell at the top of your lungs to see if anyone is around to help you. What a stupid idea. The wolves here you and come running back to hunt you. Suddenly 35 wolves jump on top of you and start ripping your limbs off.",
            blob: 'GAME OVER'
        }
    },

    //CHAPTER FOUR
    chapterFour: {
        rejoin: {
            header: "Chapter 4: Forest on fire",
            subheader: "You return to the wolf pack extremely dejected with your tail in between your legs. You apologize profusely to the pack about your failure to convert any new werewolves. They assign you another task: eat a newborn baby.",
            blob: 'Do you EAT the baby or ATTACK the wolves?'
        },
        flee: {
            header: "Chapter 4: THE WOLVES ARE BACK",
            subheader: "Out of fear that the wolves will kill you for not converting any new werewolves, you spend the next 5 months in hiding. One day you stumble upon a vial of liquid hidden deep within the grass.",
            blob: 'Do you DRINK the liquid or SMASH the vial?'
        },
        help: {
            header: "Chapter 4: Finding help",
            subheader: "You desperately run around trying to find help. In your frantic search you run into a friendly old man. The old man tells you that he is an old sage from the dawn of time. He claims to have a vial of magical elixir that can save you.",
            blob: 'Do you DRINK the liquid or SMASH the vial?'
        },
        solo: {
            header: "Chapter 4: The Fire Engulfs",
            subheader: "You attempt to put out the fire on your own. You try dumping water on it and covering with dirt -- nothing seems to help. The fire slowly grows larger and starts spreading all around you. You're suddenly surrounded on all sides by fire with no escape.",
            blob: 'GAME OVER'
        }
    },

    //CHAPTER FIVE
    chapterFive: {
        eat: {
            header: "Chapter 5: Baby powers",
            subheader: "You decide to eat the baby. Yummmm, dead babies. Surprise!! This baby was of the special variety and was really a magical potion that reversed time and now none of the past events happened. Twas all a dream.",
            blob: 'THE END!!'
        },
        attack: {
            header: "Chapter 5: Battle to the death",
            subheader: "You attack the wolves because it's so unbelievably unethical to ask someone to eat a baby. The wolves fight back and unfortunately you were greatly outnumbered. The wolves killed you. Better luck next time!",
            blob: 'GAME OVER'
        },
        drink: {
            header: "Chapter 5: Elixir fixer?",
            subheader: "You decide to drink the vial of liquid, hoping it will save you. But shit man, never drink unknown substances, no matter how safe you think they are. That magical looking elixir was actually a deadly poison soooooo u DEAD.",
            blob: 'GAME OVER'
        },
        smash: {
            header: "Chapter 5: Explosion",
            subheader: "You were skeptical of the elixir and decided to smash the vial. Smashing the vial released a special spell that that reversed time and now none of the past events happened. You never even woke up in the words. Twas all a dream.",
            blob: 'THE END!!'
        }
    }
};
