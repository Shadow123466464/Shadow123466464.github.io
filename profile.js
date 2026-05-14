var ProfileManager = {
    profile: null,
    avatarConfig: {
        gender: 'female',
        animalType: 'cat',
        furColor: 'orange',
        outfitStyle: 'casual',
        outfitColor: 'pink',
        accessoryColor: 'pink',
        glasses: 'none',
        headAccessory: 'none',
        cheekStyle: 'none'
    },
    themeColor: '#ff6b81',

    init: function() {
        this.normalizeExistingGenderButtons();
        this.loadProfile();
        this.setupEventListeners();
        var self = this;
        setTimeout(function() {
            self.updateProfileDisplay();
        }, 200);
    },

    normalizeExistingGenderButtons: function() {
        var setupGenderButtons = document.querySelectorAll('#genderOptions .option-btn');
        for (var i = 0; i < setupGenderButtons.length; i++) {
            var val = setupGenderButtons[i].dataset.value;
            if (val === 'girl') setupGenderButtons[i].dataset.value = 'female';
            if (val === 'boy') setupGenderButtons[i].dataset.value = 'male';
        }

        var settingsGenderButtons = document.querySelectorAll('#settingsGenderOptions .option-btn');
        for (var j = 0; j < settingsGenderButtons.length; j++) {
            var val2 = settingsGenderButtons[j].dataset.value;
            if (val2 === 'girl') settingsGenderButtons[j].dataset.value = 'female';
            if (val2 === 'boy') settingsGenderButtons[j].dataset.value = 'male';
        }

        var setupAccessoryGender = document.querySelectorAll('#headAccessoryOptions [data-gender]');
        for (var k = 0; k < setupAccessoryGender.length; k++) {
            var g1 = setupAccessoryGender[k].dataset.gender;
            if (g1 === 'girl') setupAccessoryGender[k].dataset.gender = 'female';
            if (g1 === 'boy') setupAccessoryGender[k].dataset.gender = 'male';
        }

        var settingsAccessoryGender = document.querySelectorAll('#settingsAccessoryOptions [data-gender]');
        for (var l = 0; l < settingsAccessoryGender.length; l++) {
            var g2 = settingsAccessoryGender[l].dataset.gender;
            if (g2 === 'girl') settingsAccessoryGender[l].dataset.gender = 'female';
            if (g2 === 'boy') settingsAccessoryGender[l].dataset.gender = 'male';
        }
    },

    loadProfile: function() {
        var saved = localStorage.getItem('userProfile');
        if (saved) {
            this.profile = JSON.parse(saved);
            if (this.profile.avatar) {
                var savedGender = this.profile.avatar.gender || 'female';
                if (savedGender === 'girl') savedGender = 'female';
                if (savedGender === 'boy') savedGender = 'male';

                this.avatarConfig = {
                    gender: savedGender,
                    animalType: this.profile.avatar.animalType || 'cat',
                    furColor: this.profile.avatar.furColor || 'orange',
                    outfitStyle: this.profile.avatar.outfitStyle || 'casual',
                    outfitColor: this.profile.avatar.outfitColor || 'pink',
                    accessoryColor: this.profile.avatar.accessoryColor || 'pink',
                    glasses: this.profile.avatar.glasses || 'none',
                    headAccessory: this.profile.avatar.headAccessory || 'none',
                    cheekStyle: this.profile.avatar.cheekStyle || 'none'
                };
            }
            if (this.profile.themeColor) {
                this.themeColor = this.profile.themeColor;
            }
            this.applyThemeColor(this.themeColor);
            this.syncStreak();

            var justCreated = localStorage.getItem('justCreatedProfile');
            var pendingAzza = localStorage.getItem('pendingAzzaIntro');

            if (justCreated === 'true') {
                localStorage.removeItem('justCreatedProfile');
                this.hideSetupOverlay();
                this.updateProfileDisplay();

                if (pendingAzza === 'true' && checkIfAzza(this.profile.firstName, this.profile.lastName, this.avatarConfig.gender)) {
                    localStorage.removeItem('pendingAzzaIntro');
                    this.showAzzaThenWordle();
                } else {
                    var mainContent = document.getElementById('mainContent');
                    if (mainContent) mainContent.style.display = 'none';
                    if (typeof WordleGame !== 'undefined' && WordleGame && typeof WordleGame.show === 'function') {
                        WordleGame.show();
                    } else {
                        this.showMainContent();
                    }
                }
            } else {
                this.showMainContent();
            }

            this.updateProfileDisplay();
        } else {
            this.applyThemeColor(this.themeColor);
            this.showSetupOverlay();
        }
    },

    showAzzaThenWordle: function() {
        var self = this;
        var mainContent = document.getElementById('mainContent');
        if (mainContent) mainContent.style.display = 'none';

        showSpecialAzzaPage(this.avatarConfig);

        var closeBtnCheck = setInterval(function() {
            var overlay = document.getElementById('specialAzzaOverlay');
            if (!overlay || overlay.style.display === 'none' || !overlay.classList.contains('show')) {
                clearInterval(closeBtnCheck);
                if (typeof WordleGame !== 'undefined' && WordleGame && typeof WordleGame.show === 'function') {
                    WordleGame.show();
                } else {
                    self.showMainContent();
                }
            }
        }, 300);
    },

    syncStreak: function() {
        var streak = 0;
        var wordleStreak = localStorage.getItem('wordleStreak');
        if (wordleStreak) {
            streak = parseInt(wordleStreak) || 0;
        }
        if (this.profile && this.profile.stats) {
            this.profile.stats.streak = streak;
        }
        return streak;
    },

    getStreak: function() {
        return this.syncStreak();
    },

    setStreak: function(value) {
        if (this.profile && this.profile.stats) {
            this.profile.stats.streak = value;
        }
        localStorage.setItem('wordleStreak', value.toString());
        this.saveProfile();
        this.updateProfileDisplay();
    },

    saveProfile: function() {
        var profile = {
            firstName: this.profile ? this.profile.firstName || '' : '',
            lastName: this.profile ? this.profile.lastName || '' : '',
            avatar: {
                gender: this.avatarConfig.gender,
                animalType: this.avatarConfig.animalType,
                furColor: this.avatarConfig.furColor,
                outfitStyle: this.avatarConfig.outfitStyle,
                outfitColor: this.avatarConfig.outfitColor,
                accessoryColor: this.avatarConfig.accessoryColor,
                glasses: this.avatarConfig.glasses,
                headAccessory: this.avatarConfig.headAccessory,
                cheekStyle: this.avatarConfig.cheekStyle
            },
            themeColor: this.themeColor,
            stats: {
                streak: this.getStreak(),
                lettersOpened: this.profile && this.profile.stats ? this.profile.stats.lettersOpened || 0 : 0,
                wordlesPlayed: this.profile && this.profile.stats ? this.profile.stats.wordlesPlayed || 0 : 0,
                memberSince: this.profile && this.profile.stats && this.profile.stats.memberSince ? this.profile.stats.memberSince : new Date().toISOString()
            }
        };
        this.profile = profile;
        localStorage.setItem('userProfile', JSON.stringify(profile));
    },

    showSetupOverlay: function() {
        var overlay = document.getElementById('profileSetupOverlay');
        var mainContent = document.getElementById('mainContent');
        var wordleOverlay = document.getElementById('wordleOverlay');
        if (overlay) overlay.style.display = 'flex';
        if (mainContent) mainContent.style.display = 'none';
        if (wordleOverlay) wordleOverlay.classList.add('hidden');
        this.renderSetupAvatar();
        this.updateGenderOptions(this.avatarConfig.gender);
    },

    hideSetupOverlay: function() {
        var overlay = document.getElementById('profileSetupOverlay');
        if (overlay) overlay.style.display = 'none';
    },

    showMainContent: function() {
        var overlay = document.getElementById('profileSetupOverlay');
        var mainContent = document.getElementById('mainContent');
        if (overlay) overlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
    },

    renderSetupAvatar: function() {
        var ids = ['setupAvatarPreview', 'setupAvatarPreview2', 'setupAvatarPreview3', 'setupAvatarPreview4', 'setupAvatarPreviewFinal'];
        for (var i = 0; i < ids.length; i++) {
            if (document.getElementById(ids[i])) {
                renderAvatar(ids[i], this.avatarConfig, 'normal', true);
            }
        }
    },

    updateProfileDisplay: function() {
        var nameEl = document.getElementById('profileName');
        var streakEl = document.getElementById('profileStreak');
        var avatarContainer = document.getElementById('profileAvatarSmall');
        var profileDisplay = document.getElementById('profileDisplay');

        if (profileDisplay) {
            profileDisplay.style.display = 'flex';
            profileDisplay.style.alignItems = 'center';
            profileDisplay.style.cursor = 'pointer';
        }

        if (nameEl) {
            nameEl.textContent = this.profile && this.profile.firstName ? this.profile.firstName : 'User';
        }

        var currentStreak = this.getStreak();
        if (streakEl) {
            streakEl.textContent = '🔥 ' + currentStreak + ' day' + (currentStreak !== 1 ? 's' : '') + ' streak';
        }

        if (avatarContainer) {
            avatarContainer.innerHTML = '';
            avatarContainer.style.display = 'flex';
            avatarContainer.style.alignItems = 'flex-start';
            avatarContainer.style.justifyContent = 'center';
            avatarContainer.style.overflow = 'hidden';
            avatarContainer.style.position = 'relative';
            renderAvatar('profileAvatarSmall', this.avatarConfig, 'mini', true);
            var avatarEl = avatarContainer.querySelector('.animal-avatar');
            if (avatarEl) {
                avatarEl.style.transformOrigin = 'top center';
                avatarEl.style.marginTop = '-2px';
            }
        }
    },

    goToStep: function(stepNumber) {
        var steps = document.querySelectorAll('.setup-step');
        for (var i = 0; i < steps.length; i++) {
            steps[i].classList.remove('active');
        }
        var target = document.getElementById('step' + stepNumber);
        if (target) {
            target.classList.add('active');
            this.renderSetupAvatar();
        }
    },

    updateGenderOptions: function(gender) {
        this.avatarConfig.gender = gender;

        var setupAccessories = document.getElementById('headAccessoryOptions');
        if (setupAccessories) {
            var setupCards = setupAccessories.querySelectorAll('.option-card[data-gender]');
            for (var i = 0; i < setupCards.length; i++) {
                var card = setupCards[i];
                var cardGender = card.dataset.gender;
                if (cardGender === 'both' || cardGender === gender) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                    if (card.classList.contains('selected')) {
                        card.classList.remove('selected');
                        var noneOption = setupAccessories.querySelector('.option-card[data-value="none"]');
                        if (noneOption) noneOption.classList.add('selected');
                        this.avatarConfig.headAccessory = 'none';
                    }
                }
            }
        }

        var setupOutfits = document.getElementById('outfitStyleOptions');
        if (setupOutfits) {
            var outfitCards = setupOutfits.querySelectorAll('.option-card[data-gender]');
            for (var j = 0; j < outfitCards.length; j++) {
                var outfitCard = outfitCards[j];
                var outfitGender = outfitCard.dataset.gender;
                if (outfitGender === 'both' || outfitGender === gender) {
                    outfitCard.style.display = '';
                } else {
                    outfitCard.style.display = 'none';
                    if (outfitCard.classList.contains('selected')) {
                        outfitCard.classList.remove('selected');
                        var casualOption = setupOutfits.querySelector('.option-card[data-value="casual"]');
                        if (casualOption) casualOption.classList.add('selected');
                        this.avatarConfig.outfitStyle = 'casual';
                    }
                }
            }
        }

        var settingsAccessories = document.getElementById('settingsAccessoryOptions');
        if (settingsAccessories) {
            var settingsCards = settingsAccessories.querySelectorAll('.scroll-option[data-gender]');
            for (var k = 0; k < settingsCards.length; k++) {
                var option = settingsCards[k];
                var optionGender = option.dataset.gender;
                if (optionGender === 'both' || optionGender === gender) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                    if (option.classList.contains('selected')) {
                        option.classList.remove('selected');
                        var noneOption2 = settingsAccessories.querySelector('.scroll-option[data-value="none"]');
                        if (noneOption2) noneOption2.classList.add('selected');
                        this.avatarConfig.headAccessory = 'none';
                    }
                }
            }
        }

        var settingsOutfits = document.getElementById('settingsOutfitOptions');
        if (settingsOutfits) {
            var settingsOutfitCards = settingsOutfits.querySelectorAll('.scroll-option[data-gender]');
            for (var l = 0; l < settingsOutfitCards.length; l++) {
                var outfitOption = settingsOutfitCards[l];
                var outfitOptGender = outfitOption.dataset.gender;
                if (outfitOptGender === 'both' || outfitOptGender === gender) {
                    outfitOption.style.display = '';
                } else {
                    outfitOption.style.display = 'none';
                    if (outfitOption.classList.contains('selected')) {
                        outfitOption.classList.remove('selected');
                        var casualOption2 = settingsOutfits.querySelector('.scroll-option[data-value="casual"]');
                        if (casualOption2) casualOption2.classList.add('selected');
                        this.avatarConfig.outfitStyle = 'casual';
                    }
                }
            }
        }

        this.renderSetupAvatar();
        this.updateProfileDisplay();
    },

    applyThemeColor: function(color) {
        this.themeColor = color;
        document.documentElement.style.setProperty('--theme-color', color);
        this.injectThemeStyles(color);
    },

    injectThemeStyles: function(color) {
        var lighterColor = this.lightenColorMethod(color, 20);
        var styleId = 'dynamic-theme-styles';
        var existing = document.getElementById(styleId);
        if (existing) existing.remove();

        var style = document.createElement('style');
        style.id = styleId;
        style.textContent =
            ':root{--theme-color:' + color + ';}' +
            '.step-btn.next-btn,.step-btn.finish-btn,.settings-save-btn,#closeModal{background:linear-gradient(135deg,' + color + ' 0%,' + lighterColor + ' 100%) !important;}' +
            '.profile-streak{color:' + color + ' !important;}' +
            '.settings-tab.active{color:' + color + ' !important;border-bottom-color:' + color + ' !important;}' +
            '.option-btn.selected,.scroll-option.selected{border-color:' + color + ' !important;background:' + color + ' !important;color:white !important;}' +
            '.option-card.selected{border-color:' + color + ' !important;background:rgba(255,107,129,0.08) !important;}' +
            '.form-group input:focus{border-color:' + color + ' !important;box-shadow:0 0 0 3px rgba(255,107,129,0.18) !important;}' +
            '.stat-value,.settings-header h2 i,.preview-heart{color:' + color + ' !important;}' +
            '.preview-button,#secretLetterButton{background:linear-gradient(135deg,' + color + ' 0%,' + lighterColor + ' 100%) !important;}';
        document.head.appendChild(style);
    },

    lightenColorMethod: function(color, percent) {
        var num = parseInt(color.replace('#', ''), 16);
        var amt = Math.round(2.55 * percent);
        var R = (num >> 16) + amt;
        var G = (num >> 8 & 0x00FF) + amt;
        var B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
    },

    incrementLettersOpened: function() {
        if (this.profile && this.profile.stats) {
            this.profile.stats.lettersOpened = (this.profile.stats.lettersOpened || 0) + 1;
            this.saveProfile();
        }
    },

    incrementWordlesPlayed: function() {
        if (this.profile && this.profile.stats) {
            this.profile.stats.wordlesPlayed = (this.profile.stats.wordlesPlayed || 0) + 1;
            this.saveProfile();
        }
    },

    setupEventListeners: function() {
        var self = this;

        var profileDisplay = document.getElementById('profileDisplay');
        if (profileDisplay) {
            profileDisplay.addEventListener('click', function() {
                self.openSettings();
            });
        }

        var toStep2 = document.getElementById('toStep2');
        if (toStep2) {
            toStep2.addEventListener('click', function() {
                var firstName = document.getElementById('firstName').value.trim();
                var lastName = document.getElementById('lastName').value.trim();
                var errorEl = document.getElementById('step1Error');

                if (!firstName) {
                    if (errorEl) errorEl.textContent = 'Please enter your first name';
                    return;
                }

                if (errorEl) errorEl.textContent = '';

                self.profile = {
                    firstName: firstName,
                    lastName: lastName,
                    avatar: self.avatarConfig,
                    themeColor: self.themeColor,
                    stats: {
                        streak: self.getStreak(),
                        lettersOpened: 0,
                        wordlesPlayed: 0,
                        memberSince: new Date().toISOString()
                    }
                };

                self.goToStep(2);
            });
        }

        var mapButtons = [
            ['backToStep1', 1], ['toStep3', 3], ['backToStep2', 2], ['toStep4', 4],
            ['backToStep3', 3], ['toStep5', 5], ['backToStep4', 4], ['toStep6', 6], ['backToStep5', 5]
        ];

        for (var i = 0; i < mapButtons.length; i++) {
            (function(id, step) {
                var el = document.getElementById(id);
                if (el) {
                    el.addEventListener('click', function() {
                        self.goToStep(step);
                    });
                }
            })(mapButtons[i][0], mapButtons[i][1]);
        }

        var finishSetup = document.getElementById('finishSetup');
        if (finishSetup) {
            finishSetup.addEventListener('click', function() {
                localStorage.setItem('justCreatedProfile', 'true');

                if (checkIfAzza(self.profile.firstName, self.profile.lastName, self.avatarConfig.gender)) {
                    localStorage.setItem('pendingAzzaIntro', 'true');
                } else {
                    localStorage.removeItem('pendingAzzaIntro');
                }

                self.saveProfile();
                self.hideSetupOverlay();
                self.updateProfileDisplay();

                if (checkIfAzza(self.profile.firstName, self.profile.lastName, self.avatarConfig.gender)) {
                    self.showAzzaThenWordle();
                } else {
                    var mainContent = document.getElementById('mainContent');
                    if (mainContent) mainContent.style.display = 'none';
                    if (typeof WordleGame !== 'undefined' && WordleGame && typeof WordleGame.show === 'function') {
                        WordleGame.show();
                    } else {
                        self.showMainContent();
                    }
                }
            });
        }

        this.bindSetupSelection('genderOptions', '.option-btn', function(btn, container) {
            var buttons = container.querySelectorAll('.option-btn');
            for (var i = 0; i < buttons.length; i++) buttons[i].classList.remove('selected');
            btn.classList.add('selected');
            self.updateGenderOptions(btn.dataset.value);
        });

        this.bindSetupSelection('animalTypeOptions', '.option-card', function(card, container) {
            var cards = container.querySelectorAll('.option-card');
            for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
            card.classList.add('selected');
            self.avatarConfig.animalType = card.dataset.value;
            self.renderSetupAvatar();
            self.updateProfileDisplay();
        });

        this.bindSetupSelection('furColorOptions', '.color-circle', function(circle, container) {
            var circles = container.querySelectorAll('.color-circle');
            for (var i = 0; i < circles.length; i++) circles[i].classList.remove('selected');
            circle.classList.add('selected');
            self.avatarConfig.furColor = circle.dataset.value;
            self.renderSetupAvatar();
            self.updateProfileDisplay();
        });

        this.bindSetupSelection('outfitStyleOptions', '.option-card', function(card, container) {
            if (card.style.display === 'none') return;
            var cards = container.querySelectorAll('.option-card');
            for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
            card.classList.add('selected');
            self.avatarConfig.outfitStyle = card.dataset.value;
            self.renderSetupAvatar();
            self.updateProfileDisplay();
        });

        this.bindSetupSelection('outfitColorOptions', '.color-circle', function(circle, container) {
            var circles = container.querySelectorAll('.color-circle');
            for (var i = 0; i < circles.length; i++) circles[i].classList.remove('selected');
            circle.classList.add('selected');
            self.avatarConfig.outfitColor = circle.dataset.value;
            self.renderSetupAvatar();
            self.updateProfileDisplay();
        });

        this.bindSetupSelection('glassesOptions', '.option-card', function(card, container) {
            var cards = container.querySelectorAll('.option-card');
            for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
            card.classList.add('selected');
            self.avatarConfig.glasses = card.dataset.value;
            self.renderSetupAvatar();
            self.updateProfileDisplay();
        });

        this.bindSetupSelection('headAccessoryOptions', '.option-card', function(card, container) {
            if (card.style.display === 'none') return;
            var cards = container.querySelectorAll('.option-card');
            for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
            card.classList.add('selected');
            self.avatarConfig.headAccessory = card.dataset.value;
            self.renderSetupAvatar();
            self.updateProfileDisplay();
        });

        this.bindSetupSelection('accessoryColorOptions', '.color-circle', function(circle, container) {
            var circles = container.querySelectorAll('.color-circle');
            for (var i = 0; i < circles.length; i++) circles[i].classList.remove('selected');
            circle.classList.add('selected');
            self.avatarConfig.accessoryColor = circle.dataset.value;
            self.renderSetupAvatar();
            self.updateProfileDisplay();
        });

        this.bindSetupSelection('cheekStyleOptions', '.option-card', function(card, container) {
            var cards = container.querySelectorAll('.option-card');
            for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
            card.classList.add('selected');
            self.avatarConfig.cheekStyle = card.dataset.value;
            self.renderSetupAvatar();
            self.updateProfileDisplay();
        });

        this.bindSetupSelection('themeColorOptions', '.color-circle', function(circle, container) {
            var circles = container.querySelectorAll('.color-circle');
            for (var i = 0; i < circles.length; i++) circles[i].classList.remove('selected');
            circle.classList.add('selected');
            self.applyThemeColor(circle.dataset.value);
        });

        var settingsButton = document.getElementById('settingsButton');
        if (settingsButton) {
            settingsButton.addEventListener('click', function() {
                self.openSettings();
            });
        }

        var settingsClose = document.getElementById('settingsClose');
        if (settingsClose) {
            settingsClose.addEventListener('click', function() {
                self.closeSettings();
            });
        }

        var settingsOverlay = document.getElementById('settingsOverlay');
        if (settingsOverlay) {
            settingsOverlay.addEventListener('click', function(e) {
                if (e.target === settingsOverlay) self.closeSettings();
            });
        }

        var settingsTabs = document.querySelectorAll('.settings-tab');
        for (var t = 0; t < settingsTabs.length; t++) {
            settingsTabs[t].addEventListener('click', function() {
                for (var a = 0; a < settingsTabs.length; a++) settingsTabs[a].classList.remove('active');
                this.classList.add('active');

                var contents = document.querySelectorAll('.settings-tab-content');
                for (var c = 0; c < contents.length; c++) contents[c].classList.remove('active');

                var tabName = this.dataset.tab;
                var tabContent = document.getElementById(tabName + 'Tab');
                if (tabContent) tabContent.classList.add('active');

                if (tabName === 'avatar') self.renderSettingsAvatar();
                self.applyThemeColor(self.themeColor);
            });
        }

        var saveSettingsBtn = document.getElementById('saveSettingsBtn');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', function() {
                self.saveSettings();
            });
        }

        this.setupSettingsListeners();
    },

    bindSetupSelection: function(containerId, selector, handler) {
        var container = document.getElementById(containerId);
        if (!container) return;
        var items = container.querySelectorAll(selector);
        for (var i = 0; i < items.length; i++) {
            (function(item, cont, fn) {
                item.addEventListener('click', function() {
                    fn(item, cont);
                });
            })(items[i], container, handler);
        }
    },

    setupSettingsListeners: function() {
        var self = this;

        this.bindSettingsSelection('settingsGenderOptions', '.option-btn', function(btn, container) {
            var items = container.querySelectorAll('.option-btn');
            for (var i = 0; i < items.length; i++) items[i].classList.remove('selected');
            btn.classList.add('selected');
            self.avatarConfig.gender = btn.dataset.value;
            self.updateSettingsGenderOptions(btn.dataset.value);
            self.renderSettingsAvatar();
            self.updateProfileDisplay();
        });

        this.bindSettingsSelection('settingsAnimalOptions', '.scroll-option', function(option, container) {
            var items = container.querySelectorAll('.scroll-option');
            for (var i = 0; i < items.length; i++) items[i].classList.remove('selected');
            option.classList.add('selected');
            self.avatarConfig.animalType = option.dataset.value;
            self.renderSettingsAvatar();
            self.updateProfileDisplay();
        });

        this.bindSettingsSelection('settingsFurColorOptions', '.color-circle', function(circle, container) {
            var items = container.querySelectorAll('.color-circle');
            for (var i = 0; i < items.length; i++) items[i].classList.remove('selected');
            circle.classList.add('selected');
            self.avatarConfig.furColor = circle.dataset.value;
            self.renderSettingsAvatar();
            self.updateProfileDisplay();
        });

        this.bindSettingsSelection('settingsOutfitOptions', '.scroll-option', function(option, container) {
            if (option.style.display === 'none') return;
            var items = container.querySelectorAll('.scroll-option');
            for (var i = 0; i < items.length; i++) items[i].classList.remove('selected');
            option.classList.add('selected');
            self.avatarConfig.outfitStyle = option.dataset.value;
            self.renderSettingsAvatar();
            self.updateProfileDisplay();
        });

        this.bindSettingsSelection('settingsOutfitColorOptions', '.color-circle', function(circle, container) {
            var items = container.querySelectorAll('.color-circle');
            for (var i = 0; i < items.length; i++) items[i].classList.remove('selected');
            circle.classList.add('selected');
            self.avatarConfig.outfitColor = circle.dataset.value;
            self.renderSettingsAvatar();
            self.updateProfileDisplay();
        });

        this.bindSettingsSelection('settingsGlassesOptions', '.scroll-option', function(option, container) {
            var items = container.querySelectorAll('.scroll-option');
            for (var i = 0; i < items.length; i++) items[i].classList.remove('selected');
            option.classList.add('selected');
            self.avatarConfig.glasses = option.dataset.value;
            self.renderSettingsAvatar();
            self.updateProfileDisplay();
        });

        this.bindSettingsSelection('settingsAccessoryOptions', '.scroll-option', function(option, container) {
            if (option.style.display === 'none') return;
            var items = container.querySelectorAll('.scroll-option');
            for (var i = 0; i < items.length; i++) items[i].classList.remove('selected');
            option.classList.add('selected');
            self.avatarConfig.headAccessory = option.dataset.value;
            self.renderSettingsAvatar();
            self.updateProfileDisplay();
        });

        this.bindSettingsSelection('settingsAccessoryColorOptions', '.color-circle', function(circle, container) {
            var items = container.querySelectorAll('.color-circle');
            for (var i = 0; i < items.length; i++) items[i].classList.remove('selected');
            circle.classList.add('selected');
            self.avatarConfig.accessoryColor = circle.dataset.value;
            self.renderSettingsAvatar();
            self.updateProfileDisplay();
        });

        this.bindSettingsSelection('settingsCheekOptions', '.scroll-option', function(option, container) {
            var items = container.querySelectorAll('.scroll-option');
            for (var i = 0; i < items.length; i++) items[i].classList.remove('selected');
            option.classList.add('selected');
            self.avatarConfig.cheekStyle = option.dataset.value;
            self.renderSettingsAvatar();
            self.updateProfileDisplay();
        });

        this.bindSettingsSelection('settingsThemeColorOptions', '.color-circle', function(circle, container) {
            var items = container.querySelectorAll('.color-circle');
            for (var i = 0; i < items.length; i++) items[i].classList.remove('selected');
            circle.classList.add('selected');
            self.applyThemeColor(circle.dataset.value);
            self.updateThemePreview(circle.dataset.value);
        });
    },

    bindSettingsSelection: function(containerId, selector, handler) {
        var container = document.getElementById(containerId);
        if (!container) return;
        var items = container.querySelectorAll(selector);
        for (var i = 0; i < items.length; i++) {
            (function(item, cont, fn) {
                item.addEventListener('click', function() {
                    fn(item, cont);
                });
            })(items[i], container, handler);
        }
    },

    updateSettingsGenderOptions: function(gender) {
        this.avatarConfig.gender = gender;

        var settingsAccessoryOptions = document.getElementById('settingsAccessoryOptions');
        if (settingsAccessoryOptions) {
            var options = settingsAccessoryOptions.querySelectorAll('.scroll-option[data-gender]');
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                var optionGender = option.dataset.gender;
                if (optionGender === 'both' || optionGender === gender) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                    if (option.classList.contains('selected')) {
                        option.classList.remove('selected');
                        var noneOption = settingsAccessoryOptions.querySelector('.scroll-option[data-value="none"]');
                        if (noneOption) noneOption.classList.add('selected');
                        this.avatarConfig.headAccessory = 'none';
                    }
                }
            }
        }

        var settingsOutfitOptions = document.getElementById('settingsOutfitOptions');
        if (settingsOutfitOptions) {
            var outfitOptions = settingsOutfitOptions.querySelectorAll('.scroll-option[data-gender]');
            for (var j = 0; j < outfitOptions.length; j++) {
                var outfit = outfitOptions[j];
                var outfitGender = outfit.dataset.gender;
                if (outfitGender === 'both' || outfitGender === gender) {
                    outfit.style.display = '';
                } else {
                    outfit.style.display = 'none';
                    if (outfit.classList.contains('selected')) {
                        outfit.classList.remove('selected');
                        var casual = settingsOutfitOptions.querySelector('.scroll-option[data-value="casual"]');
                        if (casual) casual.classList.add('selected');
                        this.avatarConfig.outfitStyle = 'casual';
                    }
                }
            }
        }
    },

    openSettings: function() {
        var overlay = document.getElementById('settingsOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
            this.populateSettingsForm();
            this.renderSettingsAvatar();
            this.applyThemeColor(this.themeColor);
        }
    },

    closeSettings: function() {
        var overlay = document.getElementById('settingsOverlay');
        if (overlay) overlay.style.display = 'none';
    },

    populateSettingsForm: function() {
        var editFirstName = document.getElementById('editFirstName');
        var editLastName = document.getElementById('editLastName');

        if (editFirstName && this.profile) editFirstName.value = this.profile.firstName || '';
        if (editLastName && this.profile) editLastName.value = this.profile.lastName || '';

        this.selectSettingsOption('settingsGenderOptions', '.option-btn', this.avatarConfig.gender);
        this.selectSettingsOption('settingsAnimalOptions', '.scroll-option', this.avatarConfig.animalType);
        this.selectSettingsOption('settingsFurColorOptions', '.color-circle', this.avatarConfig.furColor);
        this.selectSettingsOption('settingsOutfitOptions', '.scroll-option', this.avatarConfig.outfitStyle);
        this.selectSettingsOption('settingsOutfitColorOptions', '.color-circle', this.avatarConfig.outfitColor);
        this.selectSettingsOption('settingsGlassesOptions', '.scroll-option', this.avatarConfig.glasses);
        this.selectSettingsOption('settingsAccessoryOptions', '.scroll-option', this.avatarConfig.headAccessory);
        this.selectSettingsOption('settingsAccessoryColorOptions', '.color-circle', this.avatarConfig.accessoryColor);
        this.selectSettingsOption('settingsCheekOptions', '.scroll-option', this.avatarConfig.cheekStyle);
        this.selectSettingsOption('settingsThemeColorOptions', '.color-circle', this.themeColor);

        this.updateSettingsGenderOptions(this.avatarConfig.gender);
        this.updateStatsDisplay();
        this.updateThemePreview(this.themeColor);
    },

    selectSettingsOption: function(containerId, selector, value) {
        var container = document.getElementById(containerId);
        if (!container) return;
        var elements = container.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('selected');
            if (elements[i].dataset.value === value) elements[i].classList.add('selected');
        }
    },

    renderSettingsAvatar: function() {
        if (document.getElementById('settingsAvatarPreview')) {
            renderAvatar('settingsAvatarPreview', this.avatarConfig, 'small', true);
        }
        if (document.getElementById('settingsAvatarPreview2')) {
            renderAvatar('settingsAvatarPreview2', this.avatarConfig, 'small', true);
        }
    },

    updateStatsDisplay: function() {
        var statStreak = document.getElementById('statStreak');
        var statLettersOpened = document.getElementById('statLettersOpened');
        var statWordlesPlayed = document.getElementById('statWordlesPlayed');
        var memberSince = document.getElementById('memberSince');

        if (statStreak) statStreak.textContent = this.getStreak();

        if (this.profile && this.profile.stats) {
            if (statLettersOpened) statLettersOpened.textContent = this.profile.stats.lettersOpened || 0;
            if (statWordlesPlayed) statWordlesPlayed.textContent = this.profile.stats.wordlesPlayed || 0;
            if (memberSince && this.profile.stats.memberSince) {
                var date = new Date(this.profile.stats.memberSince);
                memberSince.textContent = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }
        }
    },

    updateThemePreview: function(color) {
        var previewBox = document.getElementById('themePreviewBox');
        if (!previewBox) return;
        var previewButton = previewBox.querySelector('.preview-button');
        var previewHeart = previewBox.querySelector('.preview-heart');
        if (previewButton) previewButton.style.background = color;
        if (previewHeart) previewHeart.style.color = color;
    },

    saveSettings: function() {
        var editFirstName = document.getElementById('editFirstName');
        var editLastName = document.getElementById('editLastName');
        var errorEl = document.getElementById('settingsError');

        var newFirstName = editFirstName ? editFirstName.value.trim() : '';
        var newLastName = editLastName ? editLastName.value.trim() : '';

        if (!newFirstName) {
            if (errorEl) errorEl.textContent = 'Please enter your first name';
            return;
        }

        if (errorEl) errorEl.textContent = '';

        var oldFirstName = this.profile ? this.profile.firstName : '';
        var oldLastName = this.profile ? this.profile.lastName : '';
        var oldGender = this.profile && this.profile.avatar ? this.profile.avatar.gender : 'female';

        this.profile.firstName = newFirstName;
        this.profile.lastName = newLastName;
        this.profile.avatar = this.avatarConfig;
        this.profile.themeColor = this.themeColor;

        this.saveProfile();
        this.updateProfileDisplay();
        this.applyThemeColor(this.themeColor);
        this.closeSettings();

        if (isChangingToAzza(oldFirstName, oldLastName, oldGender, newFirstName, newLastName, this.avatarConfig.gender)) {
            showSpecialAzzaPage(this.avatarConfig);
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    ProfileManager.init();
});
