import Command from '../classes/Command';

import Help from './help';
import Dice from './dice';
import Tts from './tts';
import Say from './say';
import Changelang from './changelang';

const commands : Command[] = [
    Help,
    Dice,
    Changelang,
    Tts,
    Say
]

export { commands };