import Command from '../classes/Command';

import Dice from './dice';
import Tts from './tts';
import Say from './say';
import Changelang from './changelang';

const commands : Command[] = [
    Dice,
    Changelang,
    Tts,
    Say
]

export { commands };