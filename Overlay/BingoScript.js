// Valid bingo numbers
const validBingoNumbers = [
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15',
    'I16', 'I17', 'I18', 'I19', 'I20', 'I21', 'I22', 'I23', 'I24', 'I25', 'I26', 'I27', 'I28', 'I29', 'I30',
    'N31', 'N32', 'N33', 'N34', 'N35', 'N36', 'N37', 'N38', 'N39', 'N40', 'N41', 'N42', 'N43', 'N44', 'N45',
    'G46', 'G47', 'G48', 'G49', 'G50', 'G51', 'G52', 'G53', 'G54', 'G55', 'G56', 'G57', 'G58', 'G59', 'G60',
    'O61', 'O62', 'O63', 'O64', 'O65', 'O66', 'O67', 'O68', 'O69', 'O70', 'O71', 'O72', 'O73', 'O74', 'O75'
];

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = true;

let currentBall = null;

recognition.onresult = function (event) {
    const spokenText = event.results[event.results.length - 1][0].transcript.trim();
    console.log('Spoken Text:', spokenText);

    const isFinalResult = event.results[event.results.length - 1].isFinal;

    if (isFinalResult) {
        const bingoNumber = parseBingoNumber(spokenText);
        console.log('Parsed Bingo Number:', bingoNumber);

        if (bingoNumber) {
            console.log('Updating Bingo Number Display:', bingoNumber);
            updateBingoNumberDisplay(bingoNumber);

            if (currentBall) {
                console.log('Moving Current Ball to Recently Called Container:', currentBall);
                updateRecentlyCalledBalls(currentBall);
            }

            currentBall = bingoNumber;
        }
    }
};

function parseBingoNumber(spokenText) {
    const matches = spokenText.match(/(B|I|N|G|0)(?:-)?(\d+)/i);
    if (matches) {
        const letter = matches[1].toUpperCase();
        const number = matches[2];
        const bingoNumber = letter === '0' ? 'O' + number : letter + number;
        console.log('Extracted Bingo Number:', bingoNumber);

        if (validBingoNumbers.includes(bingoNumber)) {
            console.log('Valid Bingo Number:', bingoNumber);
            return bingoNumber;
        }
    }

    console.log('Invalid Bingo Number');
    return null;
}

function updateBingoNumberDisplay(bingoNumber) {
    const currentBallElement = document.getElementById('current-ball');
    currentBallElement.textContent = bingoNumber;
    console.log('Current Ball Updated:', bingoNumber);
}


function updateRecentlyCalledBalls(bingoNumber) {
    const recentlyCalledContainer = document.getElementById('recently-called-container');
    const recentlyCalledBalls = recentlyCalledContainer.getElementsByClassName('recently-called-ball');

    // Remove the oldest recently called ball if there are already 5 balls
    if (recentlyCalledBalls.length >= 5) {
        recentlyCalledContainer.removeChild(recentlyCalledBalls[0]);
    }

    // Move the current ball to the recently called container
    const currentBall = document.getElementById('current-ball');
    const clonedBall = currentBall.cloneNode(true);
    clonedBall.textContent = bingoNumber;
    recentlyCalledContainer.appendChild(clonedBall);
}


recognition.start();
