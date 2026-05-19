document.addEventListener('DOMContentLoaded', function() {
    initMainContent();
});

function initMainContent() {
    var envelopesContainer = document.querySelector('.envelopes');
    var modal = document.getElementById('letterModal');
    var letterContent = document.getElementById('letterContent');
    var galaxyAnimation = document.querySelector('.galaxy-animation');
    var body = document.body;
    var currentOpenEnvelope = null;

    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    function getLetterKey(letter) {
        return letter && letter.message ? letter.message.toLowerCase().trim() : '';
    }

    function cloneLetter(letter) {
        var copy = {};
        for (var key in letter) {
            if (Object.prototype.hasOwnProperty.call(letter, key)) {
                copy[key] = letter[key];
            }
        }
        return copy;
    }

    function addRandomBackground(letter) {
        var copy = cloneLetter(letter);
        var randomBgIndex = Math.floor(Math.random() * backgrounds.length);
        copy.bg = backgrounds[randomBgIndex];
        return copy;
    }

    function shuffleLetters(letters) {
        var shuffled = letters.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    function getStoredTodayLetter(todayKey) {
        var storedTodayLetter = localStorage.getItem('todayLetter_' + todayKey);
        if (!storedTodayLetter) return null;

        try {
            var letter = JSON.parse(storedTodayLetter);
            return getLetterKey(letter) ? letter : null;
        } catch (e) {
            localStorage.removeItem('todayLetter_' + todayKey);
            return null;
        }
    }

    function getUniqueLetterPool(reservedLetter) {
        var seen = {};
        var pool = [];
        var reservedKey = getLetterKey(reservedLetter);

        if (reservedKey) {
            seen[reservedKey] = true;
        }

        for (var i = 0; i < allLoveWords.length; i++) {
            var key = getLetterKey(allLoveWords[i]);
            if (key && !seen[key]) {
                seen[key] = true;
                pool.push(allLoveWords[i]);
            }
        }

        return shuffleLetters(pool);
    }

    function isAzzaProfile() {
        var saved = localStorage.getItem('userProfile');
        if (!saved) return false;

        try {
            var profile = JSON.parse(saved);
            var first = profile && profile.firstName ? profile.firstName.toLowerCase().trim() : '';
            var last = profile && profile.lastName ? profile.lastName.toLowerCase().trim() : '';
            return (first === 'azza' && last === 'chouikh') || (first === 'chouikh' && last === 'azza');
        } catch (e) {
            return false;
        }
    }

function updateSecretButtonVisibility() {
    var secretLetterButton = document.getElementById('secretLetterButton');
    if (!secretLetterButton) return;

    if (isAzzaProfile()) {
        secretLetterButton.classList.add('show');
    } else {
        secretLetterButton.classList.remove('show');
    }
}

    function createEnvelopes() {
        if (!envelopesContainer) return;

        var now = new Date();
        var month = now.getMonth();
        var year = now.getFullYear();
        var daysInMonth = getDaysInMonth(month, year);
        var today = now.getDate();
        var todayKey = now.toISOString().split('T')[0];
        var todayLetter = getStoredTodayLetter(todayKey);
        var shuffledLetters = getUniqueLetterPool(todayLetter);

        envelopesContainer.innerHTML = '';

        for (var i = 1; i <= daysInMonth; i++) {
            var envelope = document.createElement('div');
            envelope.className = 'envelope';
            envelope.innerHTML = '<div class="flap"></div><div class="letter">❤️</div>';
            envelope.dataset.day = i;

            var sourceLetter;
            if (todayLetter && i === today) {
                sourceLetter = todayLetter;
            } else {
                sourceLetter = shuffledLetters.shift();
            }

            if (!sourceLetter) {
                sourceLetter = allLoveWords[(i - 1) % allLoveWords.length];
            }

            var letter = sourceLetter.bg ? cloneLetter(sourceLetter) : addRandomBackground(sourceLetter);
            envelope.dataset.letter = JSON.stringify(letter);

            (function(env, dayNum) {
                env.addEventListener('click', function() {
                    if (currentOpenEnvelope && currentOpenEnvelope !== env) {
                        currentOpenEnvelope.classList.remove('open');
                    }

                    env.classList.toggle('open');
                    currentOpenEnvelope = env.classList.contains('open') ? env : null;

                    if (env.classList.contains('open')) {
                        var letterData = JSON.parse(env.dataset.letter);
                        openLetter(letterData, dayNum);
                    }
                });
            })(envelope, i);

            envelopesContainer.appendChild(envelope);
        }

        showTodaysLetter(todayKey);
    }

    function showTodaysLetter(todayKey) {
        var today = new Date().getDate();
        var todayEnvelope = document.querySelector('.envelope[data-day="' + today + '"]');
        if (!todayEnvelope) return;

        var letter = JSON.parse(todayEnvelope.dataset.letter);
        localStorage.setItem('todayLetter_' + todayKey, JSON.stringify(letter));
        openLetter(letter, today);

        if (todayEnvelope) {
            todayEnvelope.classList.add('open');
            currentOpenEnvelope = todayEnvelope;
        }
    }

    function openLetter(letter) {
        if (!letter || !letter.bg) return;

        body.style.backgroundImage = letter.bg.url;
        letterContent.innerHTML = '<h2>A special message for you</h2><h3>' + letter.word + '</h3><p>' + letter.message + '</p>';
        modal.style.display = 'flex';

        if (typeof ProfileManager !== 'undefined') {
            ProfileManager.incrementLettersOpened();
        }
    }

    var closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            body.style.backgroundImage = 'linear-gradient(135deg, #fff8f8 0%, #fff0f5 100%)';
            if (currentOpenEnvelope) {
                currentOpenEnvelope.classList.remove('open');
                currentOpenEnvelope = null;
            }
        });
    }

    function createGalaxyAnimation() {
        if (!galaxyAnimation) return;

        galaxyAnimation.innerHTML = '';

        for (var i = 0; i < 100; i++) {
            var star = document.createElement('div');
            star.className = 'star';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.width = Math.random() * 2 + 'px';
            star.style.height = star.style.width;
            star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            galaxyAnimation.appendChild(star);
        }

        for (var j = 0; j < 5; j++) {
            var shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.top = Math.random() * 50 + 'vh';
            shootingStar.style.left = Math.random() * 100 + 'vw';
            shootingStar.style.width = (Math.random() * 100 + 50) + 'px';
            shootingStar.style.setProperty('--duration', (Math.random() * 5 + 3) + 's');
            shootingStar.style.animationDuration = (Math.random() * 5 + 3) + 's';
            shootingStar.style.animationDelay = Math.random() * 5 + 's';
            galaxyAnimation.appendChild(shootingStar);
        }
    }

    var secretLetterButton = document.getElementById('secretLetterButton');
    if (secretLetterButton) {
        secretLetterButton.addEventListener('click', function() {
            if (!isAzzaProfile()) return;

            var secretModal = document.getElementById('secretLetterModal');
            var textContainer = document.getElementById('secretLetterText');

            if (!secretModal || !textContainer) return;

            textContainer.innerHTML = '';
            textContainer.classList.remove('typewriter-container');

            secretModal.style.display = 'flex';

            var cursor = document.createElement('span');
            cursor.className = 'typewriter-cursor';

            var secretLetterContent = "This page was created by Baheeddine Dahen as a small, heartfelt gift for Azza.\n\nIt contains daily letters and little surprises meant to brighten your day. The number of envelopes matches the days in the current month; each time you refresh the page the selected letters and their special backgrounds may change. Letters can include one of several visual effects chosen at random.\n\nThere is also a Wordle-style game: each day a word or phrase is chosen from the existing messages — your streak is tracked, and you can skip and play later if you prefer. Every time you open or refresh the page it selects a daily message for you.\n\nI created this because when life felt heavy and colorless, thinking of you brought light back into my world. I hope these little notes do the same for you — to remind you that someone cares, that you're not alone, and that you are deeply cherished.\n\nI'm sorry for the mistakes I've made. I made this hoping you'll understand how much you mean to me and how grateful I am for every moment we shared.\n\nFor you, and only you.\n因为你是那种值得被写进书里的女孩。(Yīnwèi nǐ shì nà zhǒng zhídé bèi xiě jìn shū lǐ de nǚhái.) 💕";

            textContainer.classList.add('typewriter-container');
            textContainer.appendChild(cursor);

            var charIndex = 0;
            var typingInterval = setInterval(function() {
                if (charIndex < secretLetterContent.length) {
                    if (secretLetterContent.charAt(charIndex) === '\n') {
                        cursor.insertAdjacentHTML('beforebegin', '<br>');
                    } else {
                        cursor.insertAdjacentHTML('beforebegin', secretLetterContent.charAt(charIndex));
                    }
                    charIndex++;
                    textContainer.scrollTop = textContainer.scrollHeight;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50);
        });
    }

    var returnButton = document.getElementById('returnButton');
    if (returnButton) {
        returnButton.addEventListener('click', function() {
            var secretModal = document.getElementById('secretLetterModal');
            if (secretModal) {
                secretModal.style.display = 'none';
            }
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                body.style.backgroundImage = 'linear-gradient(135deg, #fff8f8 0%, #fff0f5 100%)';
                if (currentOpenEnvelope) {
                    currentOpenEnvelope.classList.remove('open');
                    currentOpenEnvelope = null;
                }
            }
        });
    }

    var secretLetterModal = document.getElementById('secretLetterModal');
    if (secretLetterModal) {
        secretLetterModal.addEventListener('click', function(e) {
            if (e.target === secretLetterModal) {
                secretLetterModal.style.display = 'none';
            }
        });
    }

    createEnvelopes();
    createGalaxyAnimation();
    updateSecretButtonVisibility();

    window.addEventListener('storage', function() {
        updateSecretButtonVisibility();
    });

    setInterval(function() {
        updateSecretButtonVisibility();
    }, 1000);
}
