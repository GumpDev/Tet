function dice(show, options){
    const Dice = document.getElementById("dice");
    const DiceTxt = document.getElementById("dice_txt");
    const DiceNumber = document.getElementById("dice_number");

    if(show){
        DiceTxt.innerText = options.label;
        DiceNumber.innerText = options.value;
        Dice.className = "active";

        if(options.timer)
            setTimeout(() => {
                Dice.className = "";
            }, options.timer);
    }else
        Dice.className = "";
}