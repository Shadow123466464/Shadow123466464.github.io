function renderAvatar(containerId, config, size, animate) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var furColors = {
        orange: '#f4a460',
        brown: '#8B4513',
        black: '#2d2d2d',
        white: '#f5f5f5',
        gray: '#808080',
        cream: '#ffe4c4',
        golden: '#daa520',
        pink: '#ffb6c1',
        blue: '#87ceeb',
        purple: '#dda0dd'
    };

    var outfitColors = {
        pink: '#ff6b81',
        blue: '#3b82f6',
        purple: '#a855f7',
        green: '#10b981',
        yellow: '#f59e0b',
        red: '#ef4444',
        black: '#1f2937',
        white: '#f3f4f6',
        orange: '#f97316',
        teal: '#14b8a6',
        indigo: '#6366f1',
        rose: '#f43f5e'
    };

    var accessoryColors = {
        pink: '#ff6b81',
        blue: '#3b82f6',
        purple: '#a855f7',
        red: '#ef4444',
        yellow: '#f59e0b',
        green: '#10b981',
        black: '#1f2937',
        white: '#f3f4f6',
        gold: '#fbbf24',
        silver: '#9ca3af'
    };

    var furColor = furColors[config.furColor] || furColors.orange;
    var outfitColor = outfitColors[config.outfitColor] || outfitColors.pink;
    var accessoryColor = accessoryColors[config.accessoryColor] || accessoryColors.pink;
    var innerEarColor = config.furColor === 'white' || config.furColor === 'cream' ? '#ffb6c1' : '#ffcccb';
    var gender = config.gender || 'female';

    var sizeClass = '';
    if (size === 'mini') sizeClass = 'mini';
    else if (size === 'small') sizeClass = 'small';

    var animalType = config.animalType || 'cat';

    var avatar = document.createElement('div');
    avatar.className = 'animal-avatar ' + sizeClass + ' ' + gender + ' ' + animalType;
    if (animate) {
        avatar.classList.add('animated');
    }

    var earsHTML = generateEars(animalType, furColor, innerEarColor, gender);
    var muzzleHTML = generateMuzzle(animalType, furColor);
    var specialFeatures = generateSpecialFeatures(animalType, furColor, gender);
    var noseClass = animalType;

    var glassesHTML = '';
    if (config.glasses && config.glasses !== 'none') {
        glassesHTML = '<div class="animal-glasses ' + config.glasses + '"><div class="glasses-bridge"></div></div>';
    }

    var accessoryHTML = generateAccessory(config.headAccessory, accessoryColor, gender);

    var cheekHTML = '';
    if (config.cheekStyle && config.cheekStyle !== 'none') {
        cheekHTML = generateCheeks(config.cheekStyle, animalType);
        if (config.cheekStyle === 'blush') {
            avatar.classList.add('blushing');
        }
    }

    var eyelashesHTML = '';
    if (gender === 'female' || gender === 'girl') {
        eyelashesHTML = '<div class="animal-eyelashes left"></div><div class="animal-eyelashes right"></div>';
    }

    var faceColor = furColor;
    if (animalType === 'panda') {
        faceColor = '#f5f5f5';
    }

    var maneHTML = '';
    if (animalType === 'lion' && (gender === 'male' || gender === 'boy')) {
        maneHTML = specialFeatures;
        specialFeatures = '';
    }

    var bodyHTML = generateBody(config.outfitStyle, outfitColor, furColor, gender);

    var faceClass = 'animal-face ' + animalType;
    var eyesContainerClass = 'animal-eyes-container ' + animalType;
    var mouthContainerClass = 'animal-mouth-container ' + animalType;

    avatar.innerHTML =
        '<div class="animal-head-container">' +
            maneHTML +
            earsHTML +
            accessoryHTML +
            '<div class="' + faceClass + '" style="background:' + faceColor + '">' +
                (animalType === 'panda' ? specialFeatures : '') +
                muzzleHTML +
                '<div class="' + eyesContainerClass + '">' +
                    '<div class="animal-eye"><div class="animal-eye-pupil"></div><div class="animal-eye-lid" style="background:' + faceColor + '"></div></div>' +
                    '<div class="animal-eye"><div class="animal-eye-pupil"></div><div class="animal-eye-lid" style="background:' + faceColor + '"></div></div>' +
                '</div>' +
                eyelashesHTML +
                '<div class="animal-heart-eyes"><span class="heart">❤️</span><span class="heart">❤️</span></div>' +
                '<div class="animal-sparkle-eyes"><span class="sparkle">✨</span><span class="sparkle">✨</span></div>' +
                '<div class="animal-nose ' + noseClass + '"></div>' +
                '<div class="' + mouthContainerClass + '"><div class="animal-mouth smile"></div></div>' +
                ((animalType === 'cat' || animalType === 'fox' || animalType === 'capybara') ? generateWhiskers(animalType) : '') +
                ((animalType !== 'cat' && animalType !== 'fox' && animalType !== 'capybara' && animalType !== 'lion') ? specialFeatures : '') +
                cheekHTML +
                glassesHTML +
            '</div>' +
        '</div>' +
        '<div class="animal-body-container ' + gender + '">' +
            '<div class="animal-neck" style="background:' + furColor + '"></div>' +
            bodyHTML +
        '</div>';

    container.innerHTML = '';
    container.appendChild(avatar);

    if (animate) {
        startAvatarAnimations(avatar);
    }
}

function generateWhiskers(animalType) {
    var whiskerClass = animalType === 'capybara' ? 'animal-whiskers capybara' : 'animal-whiskers';
    return '<div class="' + whiskerClass + '">' +
        '<div class="whisker-group left"><div class="whisker"></div><div class="whisker"></div><div class="whisker"></div></div>' +
        '<div class="whisker-group right"><div class="whisker"></div><div class="whisker"></div><div class="whisker"></div></div>' +
    '</div>';
}

function generateEars(animalType, furColor, innerEarColor, gender) {
    var darkFur = darkenColor(furColor, 20);
    var lightFur = lightenColor(furColor, 30);

    switch (animalType) {
        case 'cat':
            return '<div class="animal-ears cat">' +
                '<div class="ear left" style="background:' + furColor + '"><div class="ear-inner" style="background:' + innerEarColor + '"></div></div>' +
                '<div class="ear right" style="background:' + furColor + '"><div class="ear-inner" style="background:' + innerEarColor + '"></div></div>' +
            '</div>';
        case 'dog':
            return '<div class="animal-ears dog">' +
                '<div class="ear left" style="background:' + darkFur + '"></div>' +
                '<div class="ear right" style="background:' + darkFur + '"></div>' +
            '</div>';
        case 'rabbit':
            return '<div class="animal-ears rabbit">' +
                '<div class="ear left" style="background:' + furColor + '"><div class="ear-inner" style="background:' + innerEarColor + '"></div></div>' +
                '<div class="ear right" style="background:' + furColor + '"><div class="ear-inner" style="background:' + innerEarColor + '"></div></div>' +
            '</div>';
        case 'bear':
            return '<div class="animal-ears bear">' +
                '<div class="ear left" style="background:' + furColor + '"><div class="ear-inner" style="background:' + darkFur + '"></div></div>' +
                '<div class="ear right" style="background:' + furColor + '"><div class="ear-inner" style="background:' + darkFur + '"></div></div>' +
            '</div>';
        case 'fox':
            return '<div class="animal-ears fox">' +
                '<div class="ear left" style="background:' + furColor + '"><div class="ear-inner" style="background:' + lightFur + '"></div><div class="ear-tip" style="background:#2d2d2d"></div></div>' +
                '<div class="ear right" style="background:' + furColor + '"><div class="ear-inner" style="background:' + lightFur + '"></div><div class="ear-tip" style="background:#2d2d2d"></div></div>' +
            '</div>';
        case 'panda':
            return '<div class="animal-ears panda"><div class="ear left"></div><div class="ear right"></div></div>';
        case 'lion':
            return '<div class="animal-ears lion">' +
                '<div class="ear left" style="background:' + furColor + '"><div class="ear-inner" style="background:' + darkFur + '"></div></div>' +
                '<div class="ear right" style="background:' + furColor + '"><div class="ear-inner" style="background:' + darkFur + '"></div></div>' +
            '</div>';
        case 'wolf':
            return '<div class="animal-ears wolf">' +
                '<div class="ear left" style="background:' + furColor + '"><div class="ear-inner" style="background:' + darkFur + '"></div></div>' +
                '<div class="ear right" style="background:' + furColor + '"><div class="ear-inner" style="background:' + darkFur + '"></div></div>' +
            '</div>';
        case 'capybara':
            return '<div class="animal-ears capybara">' +
                '<div class="ear left" style="background:' + furColor + '"><div class="ear-inner" style="background:' + darkFur + '"></div></div>' +
                '<div class="ear right" style="background:' + furColor + '"><div class="ear-inner" style="background:' + darkFur + '"></div></div>' +
            '</div>';
        default:
            return '<div class="animal-ears cat">' +
                '<div class="ear left" style="background:' + furColor + '"><div class="ear-inner" style="background:' + innerEarColor + '"></div></div>' +
                '<div class="ear right" style="background:' + furColor + '"><div class="ear-inner" style="background:' + innerEarColor + '"></div></div>' +
            '</div>';
    }
}

function generateMuzzle(animalType, furColor) {
    var lightFur = lightenColor(furColor, 40);
    var muzzleClass = '';
    if (animalType === 'rabbit' || animalType === 'bear' || animalType === 'panda' || animalType === 'lion' || animalType === 'capybara') {
        muzzleClass = ' ' + animalType;
    }
    var muzzleColor = animalType === 'panda' ? '#f5f5f5' : lightFur;
    if (animalType === 'capybara') {
        muzzleColor = lightenColor(furColor, 25);
    }
    return '<div class="face-muzzle' + muzzleClass + '" style="background:' + muzzleColor + '"></div>';
}

function generateSpecialFeatures(animalType, furColor, gender) {
    var darkFur = darkenColor(furColor, 20);

    switch (animalType) {
        case 'panda':
            return '<div class="panda-eye-patches"><div class="eye-patch left"></div><div class="eye-patch right"></div></div>';
        case 'lion':
            if (gender === 'male' || gender === 'boy') {
                return '<div class="lion-mane" style="--mane-color:' + darkFur + ';--mane-dark:' + darkenColor(furColor, 35) + ';--mane-light:' + lightenColor(furColor, 12) + '"></div>';
            }
            return '';
        default:
            return '';
    }
}

function generateCheeks(cheekStyle, animalType) {
    switch (cheekStyle) {
        case 'blush':
            return '<div class="animal-blush-left"></div><div class="animal-blush-right"></div>';
        case 'freckles':
            return '<div class="animal-freckles"></div>';
        case 'whiskers':
            if (animalType !== 'cat' && animalType !== 'fox' && animalType !== 'capybara') {
                return '<div class="animal-whiskers">' +
                    '<div class="whisker-group left"><div class="whisker"></div><div class="whisker"></div><div class="whisker"></div></div>' +
                    '<div class="whisker-group right"><div class="whisker"></div><div class="whisker"></div><div class="whisker"></div></div>' +
                '</div>';
            }
            return '';
        default:
            return '';
    }
}

function generateAccessory(accessory, color, gender) {
    if (!accessory || accessory === 'none') return '';

    switch (accessory) {
        case 'bow':
            return '<div class="animal-head-accessory bow" style="--accessory-color:' + color + '"></div>';
        case 'flower':
            return '<div class="animal-head-accessory flower" style="--accessory-color:' + color + '"></div>';
        case 'crown':
            return '<div class="animal-head-accessory crown"></div>';
        case 'tiara':
            return '<div class="animal-head-accessory tiara"></div>';
        case 'hat':
            return '<div class="animal-head-accessory hat" style="--accessory-color:' + color + '"></div>';
        case 'cap':
            return '<div class="animal-head-accessory cap" style="--accessory-color:' + color + '"></div>';
        case 'beanie':
            return '<div class="animal-head-accessory beanie" style="--accessory-color:' + color + '"></div>';
        case 'headband':
            return '<div class="animal-head-accessory headband" style="--accessory-color:' + color + '"></div>';
        case 'bunny-ears':
            return '<div class="animal-head-accessory bunny-ears" style="--accessory-color:' + color + '"></div>';
        case 'cat-ears':
            return '<div class="animal-head-accessory cat-ears" style="--accessory-color:' + color + '"></div>';
        case 'horns':
            return '<div class="animal-head-accessory horns"></div>';
        case 'halo':
            return '<div class="animal-head-accessory halo"></div>';
        case 'helmet':
            return '<div class="animal-head-accessory helmet"></div>';
        case 'witch-hat':
            return '<div class="animal-head-accessory witch-hat"></div>';
        case 'wizard-hat':
            return '<div class="animal-head-accessory wizard-hat"></div>';
        case 'santa-hat':
            return '<div class="animal-head-accessory santa-hat"></div>';
        case 'party-hat':
            return '<div class="animal-head-accessory party-hat" style="--accessory-color:' + color + '"></div>';
        default:
            return '';
    }
}

function isMale(gender) {
    return gender === 'male' || gender === 'boy';
}

function isFemale(gender) {
    return gender === 'female' || gender === 'girl';
}

function generateBody(outfitStyle, outfitColor, furColor, gender) {
    var lighterColor = lightenColor(outfitColor, 15);
    var darkerColor = darkenColor(outfitColor, 15);
    var genderClass = isMale(gender) ? 'male' : 'female';
    var isMaleGender = isMale(gender);

    switch (outfitStyle) {
        case 'casual':
            return '<div class="animal-body casual ' + genderClass + '" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)"></div>';

        case 'formal':
            if (isMaleGender) {
                return '<div class="animal-body formal male" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                    '<div class="formal-collar"></div>' +
                    '<div class="formal-tie" style="background:' + darkerColor + '"></div>' +
                '</div>';
            } else {
                return '<div class="animal-body formal female" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                    '<div class="formal-neckline"></div>' +
                '</div>';
            }

        case 'sporty':
            if (isMaleGender) {
                return '<div class="animal-body sporty male" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                    '<div class="sporty-stripe"></div>' +
                    '<div class="sporty-number">23</div>' +
                '</div>';
            } else {
                return '<div class="animal-body sporty female" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                    '<div class="sporty-stripe"></div>' +
                '</div>';
            }

        case 'cozy':
            return '<div class="animal-body cozy ' + genderClass + '" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                '<div class="cozy-collar" style="background:' + darkerColor + '"></div>' +
            '</div>';

        case 'hoodie':
            return '<div class="animal-body hoodie ' + genderClass + '" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                '<div class="hoodie-pocket" style="background:' + darkerColor + '"></div>' +
                '<div class="hoodie-strings"></div>' +
            '</div>';

        case 'sweater':
            return '<div class="animal-body sweater ' + genderClass + '" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                '<div class="sweater-pattern"></div>' +
            '</div>';

        case 'dress':
            return '<div class="animal-body dress female" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                '<div class="dress-bodice" style="background:' + lighterColor + '"></div>' +
                '<div class="dress-ribbon" style="background:' + darkerColor + '"></div>' +
            '</div>';

        case 'suit':
            if (isMaleGender) {
                return '<div class="animal-body suit male" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                    '<div class="suit-lapel"></div>' +
                    '<div class="suit-tie"></div>' +
                '</div>';
            } else {
                return '<div class="animal-body suit female" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                    '<div class="suit-female-lapel"></div>' +
                    '<div class="suit-female-buttons"></div>' +
                '</div>';
            }

        case 'summer':
            return '<div class="animal-body summer ' + genderClass + '" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                '<div class="summer-pattern"></div>' +
            '</div>';

        case 'winter':
            return '<div class="animal-body winter ' + genderClass + '" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                '<div class="winter-scarf"></div>' +
                '<div class="winter-buttons"></div>' +
            '</div>';

        case 'sailor':
            return '<div class="animal-body sailor ' + genderClass + '">' +
                '<div class="sailor-collar"></div>' +
                '<div class="sailor-tie"></div>' +
                '<div class="sailor-stripes"></div>' +
            '</div>';

        case 'overalls':
            return '<div class="animal-body overalls ' + genderClass + '" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)">' +
                '<div class="overalls-bib" style="background:' + darkerColor + '"></div>' +
                '<div class="overalls-straps" style="background:' + darkerColor + '"></div>' +
                '<div class="overalls-pocket" style="background:' + darkerColor + '"></div>' +
                '<div class="overalls-buttons"></div>' +
            '</div>';

        case 'chef':
            return '<div class="animal-body chef ' + genderClass + '" style="background:linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)">' +
                '<div class="chef-jacket"></div>' +
                '<div class="chef-collar"></div>' +
                '<div class="chef-scarf"></div>' +
                '<div class="chef-buttons"></div>' +
                '<div class="chef-pocket"></div>' +
            '</div>';

        case 'knight':
            return '<div class="animal-body knight ' + genderClass + '">' +
                '<div class="knight-sword"><div class="knight-sword-handle"></div></div>' +
                '<div class="knight-shoulders"></div>' +
                '<div class="knight-chainmail"></div>' +
                '<div class="knight-armor"></div>' +
                '<div class="knight-chest-plate"></div>' +
                '<div class="knight-crest"></div>' +
                '<div class="knight-belt"></div>' +
                '<div class="knight-skirt"></div>' +
            '</div>';

        case 'princess':
            return '<div class="animal-body princess female">' +
                '<div class="princess-gown"></div>' +
                '<div class="princess-bodice"></div>' +
                '<div class="princess-gems"></div>' +
                '<div class="princess-sash"></div>' +
            '</div>';

        case 'prince':
            return '<div class="animal-body prince male">' +
                '<div class="prince-cape"></div>' +
                '<div class="prince-collar"></div>' +
                '<div class="prince-tunic"></div>' +
                '<div class="prince-sash"></div>' +
                '<div class="prince-belt"></div>' +
            '</div>';

        case 'pirate':
            return '<div class="animal-body pirate ' + genderClass + '">' +
                '<div class="pirate-coat"></div>' +
                '<div class="pirate-shoulders"></div>' +
                '<div class="pirate-vest"></div>' +
                '<div class="pirate-sash"></div>' +
                '<div class="pirate-belt"></div>' +
                '<div class="pirate-buckle"></div>' +
            '</div>';

        case 'wizard':
            return '<div class="animal-body wizard ' + genderClass + '">' +
                '<div class="wizard-robe"></div>' +
                '<div class="wizard-collar"></div>' +
                '<div class="wizard-moon"></div>' +
                '<div class="wizard-stars"></div>' +
                '<div class="wizard-belt"></div>' +
            '</div>';

        case 'fairy':
            return '<div class="animal-body fairy female">' +
                '<div class="fairy-dress"></div>' +
                '<div class="fairy-wings"></div>' +
                '<div class="fairy-petals"></div>' +
                '<div class="fairy-sparkles"></div>' +
                '<div class="fairy-wand"></div>' +
            '</div>';

        case 'elf':
            return '<div class="animal-body elf male">' +
                '<div class="elf-tunic"></div>' +
                '<div class="elf-collar"></div>' +
                '<div class="elf-belt"></div>' +
            '</div>';

        case 'santa':
            return '<div class="animal-body santa ' + genderClass + '">' +
                '<div class="santa-coat"></div>' +
                '<div class="santa-fur-trim"></div>' +
                '<div class="santa-center-trim"></div>' +
                '<div class="santa-buttons"></div>' +
                '<div class="santa-belt"></div>' +
                '<div class="santa-buckle"></div>' +
            '</div>';

        case 'vampire':
            return '<div class="animal-body vampire ' + genderClass + '">' +
                '<div class="vampire-cape"></div>' +
                '<div class="vampire-suit"></div>' +
                '<div class="vampire-collar"></div>' +
                '<div class="vampire-shirt"></div>' +
                '<div class="vampire-cravat"></div>' +
                '<div class="vampire-vest"></div>' +
                '<div class="vampire-buttons"></div>' +
            '</div>';

        case 'maid':
            return '<div class="animal-body maid female">' +
                '<div class="maid-dress"></div>' +
                '<div class="maid-apron"></div>' +
                '<div class="maid-collar"></div>' +
                '<div class="maid-ribbon"></div>' +
                '<div class="maid-frill"></div>' +
            '</div>';

        case 'butler':
            return '<div class="animal-body butler ' + genderClass + '">' +
                '<div class="butler-tails"></div>' +
                '<div class="butler-coat"></div>' +
                '<div class="butler-vest"></div>' +
                '<div class="butler-shirt"></div>' +
                '<div class="butler-bowtie"></div>' +
                '<div class="butler-buttons"></div>' +
            '</div>';

        case 'astronaut':
            return '<div class="animal-body astronaut ' + genderClass + '">' +
                '<div class="astronaut-backpack"></div>' +
                '<div class="astronaut-helmet"></div>' +
                '<div class="astronaut-shoulders"></div>' +
                '<div class="astronaut-suit"></div>' +
                '<div class="astronaut-chest-rib"></div>' +
                '<div class="astronaut-panel"></div>' +
                '<div class="astronaut-hose left"></div>' +
                '<div class="astronaut-hose right"></div>' +
                '<div class="astronaut-badge"></div>' +
                '<div class="astronaut-belt"></div>' +
                '<div class="astronaut-cuffs"></div>' +
            '</div>';

        case 'king':
            return '<div class="animal-body king male">' +
                '<div class="king-cape"></div>' +
                '<div class="king-ermine"></div>' +
                '<div class="king-robe"></div>' +
                '<div class="king-sash"></div>' +
                '<div class="king-medal"></div>' +
                '<div class="king-belt"></div>' +
            '</div>';

        case 'queen':
            return '<div class="animal-body queen female">' +
                '<div class="queen-cape"></div>' +
                '<div class="queen-ermine"></div>' +
                '<div class="queen-gown"></div>' +
                '<div class="queen-bodice"></div>' +
                '<div class="queen-gems"></div>' +
                '<div class="queen-sash"></div>' +
            '</div>';

        default:
            return '<div class="animal-body casual ' + genderClass + '" style="background:linear-gradient(135deg,' + outfitColor + ' 0%,' + lighterColor + ' 100%)"></div>';
    }
}

function startAvatarAnimations(avatar) {
    function blink() {
        if (Math.random() > 0.5) {
            avatar.classList.add('blinking');
            setTimeout(function() {
                avatar.classList.remove('blinking');
            }, 150);
        }
        setTimeout(blink, 2000 + Math.random() * 2000);
    }

    function wiggleEars() {
        if (Math.random() > 0.6) {
            avatar.classList.add('ear-wiggle');
            setTimeout(function() {
                avatar.classList.remove('ear-wiggle');
            }, 500);
        }
        setTimeout(wiggleEars, 3000 + Math.random() * 3000);
    }

    setTimeout(blink, 1000);
    setTimeout(wiggleEars, 2000);
}

function lightenColor(color, percent) {
    if (color && color.startsWith('#')) {
        var num = parseInt(color.replace('#', ''), 16);
        var amt = Math.round(2.55 * percent);
        var R = Math.min(255, (num >> 16) + amt);
        var G = Math.min(255, (num >> 8 & 0x00FF) + amt);
        var B = Math.min(255, (num & 0x0000FF) + amt);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
    return color;
}

function darkenColor(color, percent) {
    if (color && color.startsWith('#')) {
        var num = parseInt(color.replace('#', ''), 16);
        var amt = Math.round(2.55 * percent);
        var R = Math.max(0, (num >> 16) - amt);
        var G = Math.max(0, (num >> 8 & 0x00FF) - amt);
        var B = Math.max(0, (num & 0x0000FF) - amt);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
    return color;
}

function checkIfAzza(firstName, lastName, gender) {
    var first = (firstName || '').toLowerCase().trim();
    var last = (lastName || '').toLowerCase().trim();
    var isFemaleGender = gender === 'female';
    var isAzzaName = (first === 'azza' && last === 'chouikh') || (first === 'chouikh' && last === 'azza');
    return isAzzaName && isFemaleGender;
}

function isChangingToAzza(oldFirst, oldLast, oldGender, newFirst, newLast, newGender) {
    var wasAzza = checkIfAzza(oldFirst, oldLast, oldGender);
    var isAzzaNow = checkIfAzza(newFirst, newLast, newGender);
    return !wasAzza && isAzzaNow;
}

function showSpecialAzzaPage(avatarConfig, onClose) {
    var overlay = document.getElementById('specialAzzaOverlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'specialAzzaOverlay';
        overlay.className = 'special-azza-overlay';

        overlay.innerHTML =
            '<div class="sparkles-bg" id="sparklesBg"></div>' +
            '<div class="flowers-container" id="flowersContainer"></div>' +
            '<div class="special-azza-content">' +
                '<div class="special-azza-avatar" id="azzaAvatarContainer"></div>' +
                '<h1 class="special-azza-title">Welcome, Azza! 💕</h1>' +
                '<div class="special-azza-hearts">' +
                    '<span class="heart">💖</span><span class="heart">💕</span><span class="heart">💗</span><span class="heart">💕</span><span class="heart">💖</span>' +
                '</div>' +
                '<div class="special-azza-message">' +
                    '<p>This entire page was created just for you. Every letter, every word, every animation - it\'s all a testament to how special you are.</p>' +
                    '<p>You deserve all the love and happiness in the world. Never forget how amazing you are! ✨</p>' +
                '</div>' +
                '<button class="special-azza-close" id="closeAzzaPage">Enter Your Special Space 💕</button>' +
            '</div>';

        document.body.appendChild(overlay);

        document.getElementById('closeAzzaPage').addEventListener('click', function() {
            var afterClose = overlay.azzaOnClose;
            overlay.azzaOnClose = null;
            overlay.classList.add('hiding');
            setTimeout(function() {
                overlay.classList.remove('show', 'hiding');
                overlay.style.display = 'none';
                if (typeof afterClose === 'function') {
                    afterClose();
                }
            }, 500);
        });
    }

    overlay.azzaOnClose = typeof onClose === 'function' ? onClose : null;
    overlay.style.display = 'flex';
    overlay.classList.add('show');

    setTimeout(function() {
        renderAvatar('azzaAvatarContainer', avatarConfig, 'normal', true);
        createFlowers(document.getElementById('flowersContainer'));
        createSparkles(document.getElementById('sparklesBg'));
    }, 100);
}

function createFlowers(container) {
    if (!container) return;
    container.innerHTML = '';
    var flowers = ['🌸', '🌺', '🌷', '💐', '🌹', '🏵️', '💮'];
    for (var i = 0; i < 30; i++) {
        var flower = document.createElement('div');
        flower.className = 'flower';
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
        flower.style.animationDuration = (Math.random() * 5 + 5) + 's';
        flower.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(flower);
    }
}

function createSparkles(container) {
    if (!container) return;
    container.innerHTML = '';
    for (var i = 0; i < 50; i++) {
        var sparkle = document.createElement('div');
        sparkle.className = 'sparkle-star';
        sparkle.textContent = '✨';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = (Math.random() * 15 + 10) + 'px';
        sparkle.style.animationDelay = (Math.random() * 3) + 's';
        container.appendChild(sparkle);
    }
}

function getOutfitsForGender(gender) {
    var isMaleGender = gender === 'male' || gender === 'boy';
    
    var allOutfits = [
        { value: 'casual', label: 'Casual', gender: 'both' },
        { value: 'formal', label: 'Formal', gender: 'both' },
        { value: 'sporty', label: 'Sporty', gender: 'both' },
        { value: 'cozy', label: 'Cozy', gender: 'both' },
        { value: 'hoodie', label: 'Hoodie', gender: 'both' },
        { value: 'sweater', label: 'Sweater', gender: 'both' },
        { value: 'dress', label: 'Dress', gender: 'female' },
        { value: 'suit', label: 'Suit', gender: 'both' },
        { value: 'summer', label: 'Summer', gender: 'both' },
        { value: 'winter', label: 'Winter', gender: 'both' },
        { value: 'sailor', label: 'Sailor', gender: 'both' },
        { value: 'overalls', label: 'Overalls', gender: 'both' },
        { value: 'chef', label: 'Chef', gender: 'both' },
        { value: 'knight', label: 'Knight', gender: 'both' },
        { value: 'princess', label: 'Princess', gender: 'female' },
        { value: 'prince', label: 'Prince', gender: 'male' },
        { value: 'pirate', label: 'Pirate', gender: 'both' },
        { value: 'wizard', label: 'Wizard', gender: 'both' },
        { value: 'fairy', label: 'Fairy', gender: 'female' },
        { value: 'elf', label: 'Elf', gender: 'male' },
        { value: 'santa', label: 'Santa', gender: 'both' },
        { value: 'vampire', label: 'Vampire', gender: 'both' },
        { value: 'maid', label: 'Maid', gender: 'female' },
        { value: 'butler', label: 'Butler', gender: 'both' },
        { value: 'astronaut', label: 'Astronaut', gender: 'both' },
        { value: 'king', label: 'King', gender: 'male' },
        { value: 'queen', label: 'Queen', gender: 'female' }
    ];

    return allOutfits.filter(function(outfit) {
        if (outfit.gender === 'both') return true;
        if (isMaleGender && outfit.gender === 'male') return true;
        if (!isMaleGender && outfit.gender === 'female') return true;
        return false;
    });
}
