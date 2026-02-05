document.addEventListener('DOMContentLoaded', function() {
    const envelopesContainer = document.querySelector('.envelopes');
    const modal = document.getElementById('letterModal');
    const letterContent = document.getElementById('letterContent');
    const galaxyAnimation = document.querySelector('.galaxy-animation');
    const body = document.body;
    let currentOpenEnvelope = null;

    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

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
        { word: "Devotion", message: "Devotion is the quiet promise of forever, whispered in every glance and touch." },
        { word: "Passion", message: "'Passion is the fire that ignites the soul and burns away the shadows of doubt.' — The Cruel Prince, Holly Black" },
        { word: "Tenderness", message: "Tenderness is the gentle touch that heals the heart and soothes the soul." },
        { word: "Adoration", message: "Adoration is the silent song of the heart, sung only for the one who holds it." },
        { word: "Romance", message: "'Romance is the art of turning ordinary moments into something magical.' — The Star-Touched Queen, Roshani Chokshi" },
        { word: "Affection", message: "Affection is the warmth that wraps around you like a comforting embrace." },
        { word: "Intimacy", message: "'Intimacy is not just about closeness, but about sharing the deepest parts of yourself.' — The Night Circus, Erin Morgenstern" },
        { word: "Desire", message: "'Desire is the spark that lights the flame of love.' — A Court of Thorns and Roses, Sarah J. Maas" },
        { word: "Comfort", message: "Comfort is the quiet assurance that you are loved, just as you are." },
        { word: "Trust", message: "'Trust is the glue of life. It's the most essential ingredient in effective communication.' — Stephen Covey" },
        { word: "Longing", message: "'Longing is the ache that reminds us of what we hold dear.' — The Song of Achilles, Madeline Miller" },
        { word: "Joy", message: "Joy is the light that dances in your eyes when you see the one you love." },
        { word: "Hope", message: "'Hope is the anchor that keeps love steady in the storm.' — The Fault in Our Stars, John Green" },
        { word: "Serenity", message: "Serenity is the peace that comes from knowing you are loved unconditionally." },
        { word: "Belonging", message: "'Belonging is the feeling of finally finding where you are meant to be.' — The Raven Boys, Maggie Stiefvater" },
        { word: "Cherish", message: "To cherish is to hold someone so dear that their happiness becomes your own." },
        { word: "Enchantment", message: "'Enchantment is the magic woven into every moment spent with the one you love.' — Uprooted, Naomi Novik" },
        { word: "Whisper", message: "'A whisper of love can be louder than the noisiest crowd.' — The Cruel Prince, Holly Black" },
        { word: "Promise", message: "A promise is the thread that ties hearts together through time and distance." },
        { word: "Dream", message: "'Dreams are the seeds of love, waiting to bloom in the garden of reality.' — The Night Circus, Erin Morgenstern" },
        { word: "Heartbeat", message: "A heartbeat in sync with another is the purest rhythm of love." },
        { word: "Surrender", message: "'To surrender to love is to find strength in vulnerability.' — A Court of Mist and Fury, Sarah J. Maas" },
        { word: "Eternity", message: "'Eternity is not about time, but about the moments that last forever in the heart.' — The Time Traveler's Wife, Audrey Niffenegger" },
        { word: "Sacrifice", message: "Sacrifice is the silent language of love, spoken in actions rather than words." },
        { word: "Fidelity", message: "'Fidelity is the quiet vow that echoes in every choice made for love.' — The Bronze Horseman, Paullina Simons" },
        { word: "Passionate", message: "'Passionate love is the fire that warms even the coldest of hearts.' — Wuthering Heights, Emily Brontë" },
        { word: "Tender", message: "Tenderness is the gentle hand that wipes away tears and soothes the soul." },
        { word: "Devoted", message: "'To be devoted is to find your purpose in the happiness of another.' — Jane Eyre, Charlotte Brontë" },
        { word: "Enamored", message: "To be enamored is to see the world through the colors of love." },
        { word: "Yearning", message: "'Yearning is the heart's way of calling out to what it loves.' — The Song of Achilles, Madeline Miller" },
        { word: "Rapture", message: "Rapture is the breathless moment when love feels like flying." },
        { word: "Admire", message: "'To admire is to see the beauty in someone that the world may overlook.' — Pride and Prejudice, Jane Austen" },
        { word: "Caring", message: "Caring is the quiet strength that holds love together through every storm." },
        { word: "Endearment", message: "'Endearment is the sweet language of love, spoken in every little gesture.' — Little Women, Louisa May Alcott" },
        { word: "Fondness", message: "Fondness is the warmth that lingers long after the moment has passed." },
        { word: "Infatuation", message: "'Infatuation is the spark that can light the fire of a lifetime.' — The Great Gatsby, F. Scott Fitzgerald" },
        { word: "Loyalty", message: "'Loyalty is love's steadfast companion, unwavering through time and trial.' — The Count of Monte Cristo, Alexandre Dumas" },
        { word: "Ardor", message: "Ardor is the fiery passion that fuels the journey of love." },
        { word: "Affinity", message: "'Affinity is the invisible thread that draws two souls together.' — The Alchemist, Paulo Coelho" },
        { word: "Romantic", message: "'Romantic love is the poetry written on the heart's pages.' — The Notebook, Nicholas Sparks" },
        { word: "Sincerity", message: "Sincerity is the honest voice of love, speaking without fear or pretense." },
        { word: "Attraction", message: "'Attraction is the magnetism that pulls hearts closer together.' — Romeo and Juliet, William Shakespeare" },
        { word: "Companionship", message: "Companionship is the quiet joy of walking through life hand in hand." },
        { word: "Empathy", message: "'Empathy is the bridge that connects hearts, allowing love to flow freely.' — The Book Thief, Markus Zusak" },
        { word: "Intimacy", message: "Intimacy is the sacred space where two souls meet and understand each other completely." },
        { word: "Kindness", message: "'Kindness is love in action, a gentle touch on the world's wounds.' — To Kill a Mockingbird, Harper Lee" },
        { word: "Respect", message: "Respect is the foundation that allows love to grow strong and true." },
        { word: "Support", message: "'Support is the hand that lifts you up when the world tries to pull you down.' — The Help, Kathryn Stockett" },
        { word: "Understanding", message: "Understanding is the light that banishes the shadows of misunderstanding." },
        { word: "Patience", message: "'Patience is love's quiet strength, waiting without complaint.' — Jane Eyre, Charlotte Brontë" },
        { word: "Compassion", message: "Compassion is the heart's response to the pain of others, wrapped in kindness." },
        { word: "Encouragement", message: "'Encouragement is the voice of love, whispering 'you can' when the world says 'you can't.'' — Wonder, R.J. Palacio" },
        { word: "Gratitude", message: "Gratitude is the echo of love, thanking the universe for the gift of each other." },
        { word: "Hopefulness", message: "'Hopefulness is the dawn that follows the darkest night of the soul.' — The Hobbit, J.R.R. Tolkien" },
        { word: "Contentment", message: "Contentment is the peace that comes from loving and being loved in return." },
        { word: "Joyfulness", message: "'Joyfulness is the song of the heart when love fills its every corner.' — Anne of Green Gables, L.M. Montgomery" },
        { word: "Reassurance", message: "Reassurance is the gentle reminder that you are not alone, and never will be." },
        { word: "Solace", message: "'Solace is the comfort found in the arms of the one who loves you unconditionally.' — The Fault in Our Stars, John Green" },
        { word: "Tranquility", message: "Tranquility is the calm that comes from knowing you are loved beyond measure." },
        { word: "Warmth", message: "'Warmth is the glow of love, lighting up even the coldest of days.' — Little Women, Louisa May Alcott" },
        { word: "Acceptance", message: "Acceptance is the embrace that says, 'I love you as you are.'" },
        { word: "Admiration", message: "'Admiration is the spark that ignites the flame of love.' — Pride and Prejudice, Jane Austen" },
        { word: "Affectionate", message: "Affectionate love is the tender touch that heals and comforts." },
        { word: "Amity", message: "'Amity is the peaceful bond that unites hearts in harmony.' — The Giver, Lois Lowry" },
        { word: "Bond", message: "A bond is the unbreakable tie that connects hearts across time and distance." },
        { word: "Charity", message: "'Charity is love in its purest form, given freely and without expectation.' — Les Misérables, Victor Hugo" },
        { word: "Closeness", message: "Closeness is the sweet comfort of knowing you are never alone." },
        { word: "Comforting", message: "'Comforting love is the shelter that guards against life's storms.' — The Secret Garden, Frances Hodgson Burnett" },
        { word: "Connection", message: "Connection is the invisible thread that binds hearts together." },
        { word: "Delight", message: "'Delight is the laughter that bubbles up when love fills your heart.' — Emma, Jane Austen" },
        { word: "Devoted", message: "To be devoted is to give your heart completely and without reservation." },
        { word: "Endearing", message: "'Endearing love is the sweetness that lingers in every memory.' — Winnie-the-Pooh, A.A. Milne" },
        { word: "Fond", message: "Fond love is the warmth that wraps around you like a favorite blanket." },
        { word: "Gentle", message: "'Gentle love is the soft touch that heals and soothes the soul.' — The Velveteen Rabbit, Margery Williams" },
        { word: "Harmony", message: "Harmony is the melody that hearts create when they beat as one." },
        { word: "Inspiration", message: "'Inspiration is the spark that love ignites in the darkest of times.' — The Alchemist, Paulo Coelho" },
        { word: "Kindred", message: "Kindred spirits are the hearts that recognize each other across any distance." },
        { word: "Loyal", message: "'Loyal love is the anchor that holds fast in the stormiest seas.' — The Odyssey, Homer" },
        { word: "Nurturing", message: "Nurturing love is the care that helps hearts grow strong and true." },
        { word: "Passionate", message: "'Passionate love is the fire that burns brightest in the coldest nights.' — Jane Eyre, Charlotte Brontë" },
        { word: "Reverence", message: "Reverence is the deep respect that honors the soul of the one you love." },
        { word: "Security", message: "'Security is the peace that comes from knowing you are loved unconditionally.' — The Little Prince, Antoine de Saint-Exupéry" },
        { word: "Sympathy", message: "Sympathy is the heart's echo, feeling with another in their joy and pain." },
        { word: "Tenderness", message: "'Tenderness is the gentle hand that wipes away tears and soothes the soul.' — The Notebook, Nicholas Sparks" },
        { word: "Trusting", message: "Trusting love is the courage to open your heart completely." },
        { word: "Unity", message: "'Unity is the strength found in standing together, heart to heart.' — The Four Agreements, Don Miguel Ruiz" },
        { word: "Warmth", message: "Warmth is the glow of love, lighting up even the coldest of days." },
        { word: "Yearning", message: "'Yearning is the heart's call to the one it loves, across any distance.' — The Time Traveler's Wife, Audrey Niffenegger" }
    ];

    function createEnvelopes() {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        const daysInMonth = getDaysInMonth(month, year);

        envelopesContainer.innerHTML = '';

        const shuffledLetters = [...allLoveWords].sort(() => 0.5 - Math.random());

        for (let i = 1; i <= daysInMonth; i++) {
            const envelope = document.createElement('div');
            envelope.className = 'envelope';
            envelope.innerHTML = `
                <div class="flap"></div>
                <div class="letter">❤️</div>
            `;
            envelope.dataset.day = i;
            const letter = shuffledLetters[(i - 1) % shuffledLetters.length];
            const randomBgIndex = Math.floor(Math.random() * backgrounds.length);
            letter.bg = backgrounds[randomBgIndex];
            envelope.dataset.letter = JSON.stringify(letter);

            envelope.addEventListener('click', () => {
                if (currentOpenEnvelope && currentOpenEnvelope !== envelope) {
                    currentOpenEnvelope.classList.remove('open');
                }
                envelope.classList.toggle('open');
                currentOpenEnvelope = envelope.classList.contains('open') ? envelope : null;
                if (envelope.classList.contains('open')) {
                    const letterData = JSON.parse(envelope.dataset.letter);
                    openLetter(letterData, i);
                }
            });
            envelopesContainer.appendChild(envelope);
        }

        showTodaysLetter();
    }

    function showTodaysLetter() {
        const today = new Date().getDate();
        const todayKey = new Date().toISOString().split('T')[0];
        const storedTodayLetter = localStorage.getItem(`todayLetter_${todayKey}`);

        if (storedTodayLetter) {
            const letter = JSON.parse(storedTodayLetter);
            openLetter(letter, today);
            const todayEnvelope = document.querySelector(`.envelope[data-day="${today}"]`);
            if (todayEnvelope) {
                todayEnvelope.classList.add('open');
                currentOpenEnvelope = todayEnvelope;
            }
        } else {
            const randomIndex = Math.floor(Math.random() * allLoveWords.length);
            const selectedLetter = allLoveWords[randomIndex];
            const randomBgIndex = Math.floor(Math.random() * backgrounds.length);
            selectedLetter.bg = backgrounds[randomBgIndex];

            localStorage.setItem(`todayLetter_${todayKey}`, JSON.stringify(selectedLetter));
            openLetter(selectedLetter, today);
            const todayEnvelope = document.querySelector(`.envelope[data-day="${today}"]`);
            if (todayEnvelope) {
                todayEnvelope.classList.add('open');
                currentOpenEnvelope = todayEnvelope;
            }
        }
    }

    function openLetter(letter) {
        body.style.backgroundImage = letter.bg.url;
        letterContent.innerHTML = `
            <h2>A special message for you</h2>
            <h3>${letter.word}</h3>
            <p>${letter.message}</p>
        `;
        modal.style.display = 'flex';
    }

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = 'none';
        body.style.backgroundImage = 'linear-gradient(135deg, #fff8f8 0%, #fff0f5 100%)';
        if (currentOpenEnvelope) {
            currentOpenEnvelope.classList.remove('open');
            currentOpenEnvelope = null;
        }
    });

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
    document.getElementById('secretLetterButton').addEventListener('click', function() {
        const modal = document.getElementById('secretLetterModal');
        const textContainer = document.getElementById('secretLetterText');

        textContainer.innerHTML = '';
        textContainer.classList.remove('typewriter-container');

        modal.style.display = 'flex';

        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';

        const secretLetterContent = `
        This Page is created by Baheeddine Dahen to the one girl he loved more than anything but couldn't be with Azza Chouikh 
        in this message i want to explain the idea of this creation it's letters in envelops contains a fonction that allows 
        the number to be the same as the current month and everytime you refresh the letters changes also
        do including the special background every letter can have one of the 31 special effects randomly also there is one letter selected
        randomly everyday everytime you refresh or open the page it appears it's a daily selection.
        And for the reason i did that for because sometimes life can be hard and we can feel tired of everything and 
        when you do feel like that you can open and read some to always remember that im here with 
        you and ill do everything i could to make you smile or to prove how special you are for me 
        and because i was never good with words i want you to see this and know how much i care i about you 
        to create this for you and only you`;

        textContainer.classList.add('typewriter-container');
        textContainer.appendChild(cursor);

        let i = 0;
        const typingInterval = setInterval(function() {
            if (i < secretLetterContent.length) {
                if (secretLetterContent.charAt(i) === '\n') {
                    cursor.insertAdjacentHTML('beforebegin', '<br>');
                } else {
                    cursor.insertAdjacentHTML('beforebegin', secretLetterContent.charAt(i));
                }
                i++;
                textContainer.scrollTop = textContainer.scrollHeight;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
    });

    document.getElementById('returnButton').addEventListener('click', function() {
        document.getElementById('secretLetterModal').style.display = 'none';
    });

    createEnvelopes();
    createGalaxyAnimation();
});
