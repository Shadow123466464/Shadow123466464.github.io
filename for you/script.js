document.addEventListener('DOMContentLoaded', function() {
    const envelopesContainer = document.getElementById('envelopes');
    const modal = document.getElementById('modal');
    const paper = document.getElementById('paper');
    const galaxyAnimation = document.querySelector('.galaxy-animation');
    const body = document.body;

    const backgrounds = [
        { class: 'galaxy-bg', url: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)' },
        { class: 'nebula-bg', url: 'linear-gradient(to bottom, #4b6cb7, #182848)' },
        { class: 'night-bg', url: 'linear-gradient(to bottom, #0a0e2a, #1a1f3a)' },
        { class: 'cosmic-bg', url: 'linear-gradient(to bottom, #000428, #004e92)' },
        { class: 'twilight-bg', url: 'linear-gradient(to bottom, #1e3c72, #2a5298)' },
        { class: 'aurora-bg', url: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)' },
        { class: 'mystic-bg', url: 'linear-gradient(to bottom, #2c3e50, #4ca1af)' },
        { class: 'void-bg', url: 'linear-gradient(to bottom, #111, #333)' },
        { class: 'dream-bg', url: 'linear-gradient(to bottom, #2980b9, #6dd5fa, #ffffff)' },
        { class: 'eternity-bg', url: 'linear-gradient(to bottom, #0f2027, #2c5364)' },
        { class: 'infinity-bg', url: 'linear-gradient(to bottom, #141e30, #243b55)' },
        { class: 'horizon-bg', url: 'linear-gradient(to bottom, #000000, #434343)' },
        { class: 'paradise-bg', url: 'linear-gradient(to bottom, #16222a, #3a6073)' },
        { class: 'ocean-bg', url: 'linear-gradient(to bottom, #005c97, #363795)' },
        { class: 'sunset-bg', url: 'linear-gradient(to bottom, #36d1dc, #5b86e5)' },
        { class: 'dawn-bg', url: 'linear-gradient(to bottom, #ff758c, #ff7eb3)' },
        { class: 'magic-bg', url: 'linear-gradient(to bottom, #5433ff, #20bdff, #a5fecb)' },
        { class: 'enchant-bg', url: 'linear-gradient(to bottom, #7b4397, #dc2430)' },
        { class: 'whisper-bg', url: 'linear-gradient(to bottom, #3a7bd5, #00d2ff)' },
        { class: 'echo-bg', url: 'linear-gradient(to bottom, #000000, #0f0c29)' },
        { class: 'radiance-bg', url: 'linear-gradient(to bottom, #f12711, #f5af19)' },
        { class: 'serenity-bg', url: 'linear-gradient(to bottom, #8e2de2, #4a00e0)' },
        { class: 'harmony-bg', url: 'linear-gradient(to bottom, #4facfe, #00f2fe)' },
        { class: 'tranquil-bg', url: 'linear-gradient(to bottom, #48cae4, #0077b6)' },
        { class: 'velvet-bg', url: 'linear-gradient(to bottom, #ad5389, #3c1053)' },
        { class: 'bliss-bg', url: 'linear-gradient(to bottom, #360033, #0b8793)' },
        { class: 'celestial-bg', url: 'linear-gradient(to bottom, #0c3483, #a2b6df, #6b8cff, #a8c0ff)' },
        { class: 'luminous-bg', url: 'linear-gradient(to bottom, #654ea3, #eaafc8)' },
        { class: 'ethereal-bg', url: 'linear-gradient(to bottom, #108dc7, #ef8e38)' },
        { class: 'mystique-bg', url: 'linear-gradient(to bottom, #2b5876, #4e4376)' },
        { class: 'aurora-boreal-bg', url: 'linear-gradient(to bottom, #000428, #004e92)' }
    ];

    const allLoveWords = [
        { word: "Resilience", message: "Resilience is the quiet strength that helps you rise every time you fall. It’s the voice inside you that whispers, ‘Try one more time.’", bg: backgrounds },
        { word: "Empathy", message: "Empathy is the bridge that connects hearts. It’s the ability to feel with others, to understand their pain as your own, and to offer kindness without judgment.", bg: backgrounds },
        { word: "Perseverance", message: "'If you want to keep a secret, you must also hide it from yourself.' — The Cruel Prince, Holly Black", bg: backgrounds },
        { word: "Compassion", message: "'We are all villains in the right story.' — The Darkest Part of the Forest, Holly Black", bg: backgrounds },
        { word: "Gratitude", message: "Gratitude turns what we have into enough. It’s the art of counting blessings instead of burdens, and finding joy in the little things.", bg: backgrounds },
        { word: "Wisdom", message: "'The world is full of monsters with friendly faces and angels full of scars.' — The Book Thief, Markus Zusak", bg: backgrounds },
        { word: "Hope", message: "'Hope can be a powerful force. Maybe there’s no actual magic in it, but when you know what you hope for most and hold it like a light within you, you can make things happen, almost like magic.' — Daughter of Smoke & Bone, Laini Taylor", bg: backgrounds },
        { word: "Courage", message: "'It takes ten times as much courage to appear weak as it does to be strong.' — Throne of Glass, Sarah J. Maas", bg: backgrounds },
        { word: "Forgiveness", message: "'Forgiveness is me giving up my right to hurt you for hurting me.' — The Sun Is Also a Star, Nicola Yoon", bg: backgrounds },
        { word: "Unity", message: "'No one is useless in this world who lightens the burdens of another.' — Charles Dickens", bg: backgrounds },
        { word: "Serenity", message: "'Peace is not absence of conflict, it is the ability to handle conflict by peaceful means.' — Ronald Reagan", bg: backgrounds },
        { word: "Integrity", message: "'Integrity is doing the right thing, even when no one is watching.' — C.S. Lewis", bg: backgrounds },
        { word: "Humility", message: "'Humility is not thinking less of yourself, it’s thinking of yourself less.' — C.S. Lewis", bg: backgrounds },
        { word: "Generosity", message: "'No one has ever become poor by giving.' — Anne Frank", bg: backgrounds },
        { word: "Trust", message: "'Trust is the glue of life. It’s the most essential ingredient in effective communication.' — Stephen Covey", bg: backgrounds },
        { word: "Patience", message: "'Patience is not simply the ability to wait - it's how we behave while we're waiting.' — Joyce Meyer", bg: backgrounds },
        { word: "Faith", message: "'Faith is taking the first step even when you don’t see the whole staircase.' — Martin Luther King Jr.", bg: backgrounds },
        { word: "Joy", message: "'Joy does not simply happen to us. We have to choose joy and keep choosing it every day.' — Henri Nouwen", bg: backgrounds },
        { word: "Love", message: "'Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.' — Maya Angelou", bg: backgrounds },
        { word: "Strength", message: "'Strength does not come from winning. Your struggles develop your strengths.' — Arnold Schwarzenegger", bg: backgrounds },
        { word: "Kindness", message: "'No act of kindness, no matter how small, is ever wasted.' — Aesop", bg: backgrounds },
        { word: "Inspiration", message: "'Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.' — Deepak Chopra", bg: backgrounds },
        { word: "Harmony", message: "'Harmony makes small things grow, lack of it makes great things decay.' — Sallust", bg: backgrounds },
        { word: "Passion", message: "'Passion is energy. Feel the power that comes from focusing on what excites you.' — Oprah Winfrey", bg: backgrounds },
        { word: "Dreams", message: "'Dreams are the touchstones of our character.' — Henry David Thoreau", bg: backgrounds },
        { word: "Creativity", message: "'Creativity is intelligence having fun.' — Albert Einstein", bg: backgrounds },
        { word: "Freedom", message: "'Freedom is the oxygen of the soul.' — Moshe Dayan", bg: backgrounds },
        { word: "Peace", message: "'Peace begins with a smile.' — Mother Teresa", bg: backgrounds },
        { word: "Adventure", message: "'Adventure is worthwhile in itself.' — Amelia Earhart", bg: backgrounds },
        { word: "Beauty", message: "'Beauty begins the moment you decide to be yourself.' — Coco Chanel", bg: backgrounds },
        { word: "Growth", message: "'Growth is the only evidence of life.' — John Henry Newman", bg: backgrounds },
        { word: "Magic", message: "'Magic’s just science that we don’t understand yet.' — Arthur C. Clarke", bg: backgrounds },
        { word: "Destiny", message: "'Destiny is not a matter of chance; it is a matter of choice.' — William Jennings Bryan", bg: backgrounds },
        { word: "Courageous", message: "'Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.' — Lao Tzu", bg: backgrounds },
        { word: "Wanderlust", message: "'Because in the end, we only regret the chances we didn’t take.' — Lewis Carroll", bg: backgrounds },
        { word: "Mystery", message: "'The oldest and strongest emotion of mankind is fear, and the oldest and strongest kind of fear is fear of the unknown.' — H.P. Lovecraft", bg: backgrounds },
        { word: "Enchantment", message: "'There are some things you learn best in calm, and some in storm.' — Willa Cather", bg: backgrounds },
        { word: "Whisper", message: "'Listen with curiosity. Speak with honesty. Act with integrity.' — Unknown", bg: backgrounds },
        { word: "Echo", message: "'What we do echoes in eternity.' — Gladiator", bg: backgrounds },
        { word: "Radiance", message: "'You are the light. You are one of a kind, irreplaceable, and more beautiful than you know.' — Steve Maraboli", bg: backgrounds },
        { word: "Serendipity", message: "'Serendipity is the art of making an unsought finding.' — Pek Van Andel", bg: backgrounds },
        { word: "Ethereal", message: "'The most beautiful things in the world cannot be seen or touched, they are felt with the heart.' — Antoine de Saint-Exupéry", bg: backgrounds },
        { word: "Mystique", message: "'Mystery creates wonder and wonder is the basis of man's desire to understand.' — Neil Armstrong", bg: backgrounds },
        { word: "Aurora", message: "'Every day may not be good, but there is something good in every day.' — Alice Morse Earle", bg: backgrounds },
        { word: "Celestial", message: "'We are all in the gutter, but some of us are looking at the stars.' — Oscar Wilde", bg: backgrounds },
        { word: "Luminous", message: "'There are two ways of spreading light: to be the candle or the mirror that reflects it.' — Edith Wharton", bg: backgrounds },
        { word: "Eternal", message: "'What we do in life echoes in eternity.' — Marcus Aurelius", bg: backgrounds },
        { word: "Tranquil", message: "'Peace is not absence of conflict, it is the ability to handle conflict by peaceful means.' — Ronald Reagan", bg: backgrounds },
        { word: "Velvet", message: "'Softness is not weakness. It takes courage to stay delicate in a world this cruel.' — Beau Taplin", bg: backgrounds },
        { word: "Bliss", message: "'Bliss is not the absence of any pain, but the presence of profound love.' — Debasish Mridha", bg: backgrounds },
        { word: "Enigma", message: "'The universe is full of magical things patiently waiting for our wits to grow sharper.' — Eden Phillpotts", bg: backgrounds },
        { word: "Rhapsody", message: "'Music is the divine way to tell beautiful, poetic things to the heart.' — Pablo Casals", bg: backgrounds },
        { word: "Solitude", message: "'In solitude, the mind gains strength and learns to lean upon itself.' — Laurence Sterne", bg: backgrounds },
        { word: "Eclipse", message: "'Even the darkest night will end and the sun will rise.' — Victor Hugo", bg: backgrounds },
        { word: "Infinity", message: "'We are all infinite beings having a human experience.' — Deepak Chopra", bg: backgrounds },
        { word: "Horizon", message: "'The horizon leans forward, offering you space to place new steps of change.' — Maya Angelou", bg: backgrounds },
        { word: "Paradise", message: "'Paradise is not a place; it’s a state of consciousness.' — Sri Chinmoy", bg: backgrounds },
        { word: "Ocean", message: "'You are not a drop in the ocean. You are the entire ocean in a drop.' — Rumi", bg: backgrounds },
        { word: "Sunset", message: "'Every sunset is an opportunity to reset.' — Richie Norton", bg: backgrounds },
        { word: "Dawn", message: "'With the new day comes new strength and new thoughts.' — Eleanor Roosevelt", bg: backgrounds },
        { word: "Enchanted", message: "'The world is full of magic things, patiently waiting for our senses to grow sharper.' — W.B. Yeats", bg: backgrounds },
        { word: "Whimsy", message: "'A little whimsy can go a long way.' — Unknown", bg: backgrounds },
        { word: "Echoes", message: "'What we do echoes in eternity.' — Marcus Aurelius", bg: backgrounds },
        { word: "Radiant", message: "'You are a child of the universe, no less than the trees and the stars.' — Max Ehrmann", bg: backgrounds },
        { word: "Serene", message: "'Serenity comes when you trade expectations for acceptance.' — Unknown", bg: backgrounds },
        { word: "Harmonious", message: "'Harmony is one phase of the law whose spiritual expression is love.' — James Allen", bg: backgrounds },
        { word: "Tranquility", message: "'Tranquility is the mark of greatness.' — Seneca", bg: backgrounds },
        { word: "Velvety", message: "'Softness is strength disguised.' — Unknown", bg: backgrounds },
        { word: "Blissful", message: "'Bliss is the joy we feel when we align with our true nature.' — Unknown", bg: backgrounds },
        { word: "Enigmatic", message: "'Mystery is at the heart of creativity. That’s why we’re drawn to it.' — Don Roff", bg: backgrounds },
        { word: "Rhapsodic", message: "'Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife.' — Kahlil Gibran", bg: backgrounds },
        { word: "Solitudinous", message: "'Solitude is where I place my chaos to rest and calm my angst.' — Nikki Rowe", bg: backgrounds },
        { word: "Eclipsed", message: "'Even in the darkest times, there is light to be found.' — Unknown", bg: backgrounds },
        { word: "Infinite", message: "'You are not a drop in the ocean. You are the entire ocean in a drop.' — Rumi", bg: backgrounds },
        { word: "Horizonal", message: "'The horizon is always ahead of you, a reminder that there is always more to discover.' — Unknown", bg: backgrounds },
        { word: "Paradisiacal", message: "'Paradise is wherever you feel at peace.' — Unknown", bg: backgrounds },
        { word: "Oceanic", message: "'The ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul.' — Wyland", bg: backgrounds },
        { word: "Twilight", message: "'Twilight drops her curtain down and pins it with a star.' — Lucy Maud Montgomery", bg: backgrounds },
        { word: "Dawnlight", message: "'Morning is an important time of day because how you spend your morning can often tell you what kind of day you are going to have.' — Lemony Snicket", bg: backgrounds },
        { word: "Enchanted", message: "'The pure and simple truth is rarely pure and never simple.' — Oscar Wilde", bg: backgrounds },
        { word: "Whimsical", message: "'Whimsy is serious.' — Unknown", bg: backgrounds },
        { word: "Echoing", message: "'The echoes of our actions follow us forever.' — Unknown", bg: backgrounds },
        { word: "Luminosity", message: "'Shine with all you have. When someone tries to blow you out, just take their oxygen and burn brighter.' — Kaci Diane", bg: backgrounds },
        { word: "Ethereality", message: "'The most beautiful things in life are not just things. They’re feelings, moments, and memories.' — Unknown", bg: backgrounds },
        { word: "Mystical", message: "'Magic exists. Who can doubt it, when there are rainbows and wildflowers, the music of the wind and the silence of the stars?' — Nora Roberts", bg: backgrounds },
        { word: "Auroral", message: "'Every day may not be good, but there is something good in every day.' — Alice Morse Earle", bg: backgrounds },
        { word: "Celestially", message: "'The stars are the apex of the night, silent poets, and keepers of ancient secrets.' — Unknown", bg: backgrounds },
        { word: "Luminance", message: "'Light is meaningful only in relation to darkness, and truth presupposes error.' — Denis Diderot", bg: backgrounds },
        { word: "Eternity", message: "'What we do in life echoes in eternity.' — Marcus Aurelius", bg: backgrounds },
        { word: "Tranquility", message: "'Tranquility is the mark of greatness.' — Seneca", bg: backgrounds },
        { word: "Velvetine", message: "'Softness is not weakness. It takes courage to stay delicate in a world this cruel.' — Beau Taplin", bg: backgrounds },
        { word: "Blissfulness", message: "'Bliss is the joy we feel when we align with our true nature.' — Unknown", bg: backgrounds },
        { word: "Enigmaticity", message: "'Mystery creates wonder and wonder is the basis of man's desire to understand.' — Neil Armstrong", bg: backgrounds },
        { word: "Rhapsodical", message: "'Music is the divine way to tell beautiful, poetic things to the heart.' — Pablo Casals", bg: backgrounds },
        { word: "Solitudinously", message: "'Solitude is where I place my chaos to rest and calm my angst.' — Nikki Rowe", bg: backgrounds },
        { word: "Ecliptic", message: "'Even in the darkest times, there is light to be found.' — Unknown", bg: backgrounds },
        { word: "Infinitesimal", message: "'You are not a drop in the ocean. You are the entire ocean in a drop.' — Rumi", bg: backgrounds },
        { word: "Horizonally", message: "'The horizon is always ahead of you, a reminder that there is always more to discover.' — Unknown", bg: backgrounds },
        { word: "Paradisiacally", message: "'Paradise is wherever you feel at peace.' — Unknown", bg: backgrounds },
        { word: "Oceanically", message: "'The ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul.' — Wyland", bg: backgrounds }
    ];

    function getRandomWords(count) {
        const shuffled = [...allLoveWords].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function getTodayLetter() {
        const today = new Date().toISOString().split('T')[0];
        const storedLetter = localStorage.getItem(`todayLetter_${today}`);

        if (storedLetter) {
            return JSON.parse(storedLetter);
        }

        let availableLetters = [...allLoveWords];
        const randomIndex = Math.floor(Math.random() * availableLetters.length);
        const selectedLetter = availableLetters[randomIndex];
        const randomBgIndex = Math.floor(Math.random() * backgrounds.length);
        selectedLetter.bg = backgrounds[randomBgIndex];

        localStorage.setItem(`todayLetter_${today}`, JSON.stringify(selectedLetter));

        return selectedLetter;
    }

    function createEnvelope(letter, index) {
        const envelope = document.createElement('div');
        envelope.className = 'envelope';
        envelope.innerHTML = `<div class="flap"></div><div class="letter">${letter.word}</div>`;
        envelope.addEventListener('click', () => openLetter(letter));
        return envelope;
    }

    function openLetter(letter) {
        body.style.backgroundImage = letter.bg.url;
        paper.innerHTML = `<h2>Today's Love from Me</h2><h3>${letter.word}</h3><p>${letter.message}</p><button id="close-btn"><i class="fas fa-heart"></i> Close</button>`;
        modal.style.display = 'flex';
        document.getElementById('close-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            body.style.backgroundImage = 'linear-gradient(135deg, #fff8f8 0%, #fff0f5 100%)';
        });
    }

    function initializeEnvelopes() {
        envelopesContainer.innerHTML = '';
        const randomWords = getRandomWords(31);
        randomWords.forEach((letter, index) => {
            const randomBgIndex = Math.floor(Math.random() * backgrounds.length);
            letter.bg = backgrounds[randomBgIndex];
            envelopesContainer.appendChild(createEnvelope(letter, index));
        });
    }

    function createGalaxyAnimation() {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.width = `${Math.random() * 2}px`;
            star.style.height = star.style.width;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            galaxyAnimation.appendChild(star);
        }

        for (let i = 0; i < 5; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.top = `${Math.random() * 50}vh`;
            shootingStar.style.left = `${Math.random() * 100}vw`;
            shootingStar.style.width = `${Math.random() * 100 + 50}px`;
            shootingStar.style.animationDuration = `${Math.random() * 5 + 3}s`;
            shootingStar.style.animationDelay = `${Math.random() * 5}s`;
            galaxyAnimation.appendChild(shootingStar);
        }
    }

    initializeEnvelopes();
    createGalaxyAnimation();

    const todayLetter = getTodayLetter();
    if (todayLetter) {
        openLetter(todayLetter);
    }
});
