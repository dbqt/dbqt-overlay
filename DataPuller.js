class LiveData {
    constructor(data) {
        // Level
        this.InLevel = Helper.isset(data, 'InLevel', false);
        this.LevelPaused = Helper.isset(data, 'LevelPaused', false);
        this.LevelFinished = Helper.isset(data, 'LevelFinished', false);
        this.LevelFailed = Helper.isset(data, 'LevelFailed', false);
        this.LevelQuit = Helper.isset(data, 'LevelQuit', false);

        // Points
        this.Score = Helper.isset(data, 'Score', 0);
        this.FullCombo = Helper.isset(data, 'FullCombo', false);
        this.Combo = Helper.isset(data, 'Combo', 0);
        this.Misses = Helper.isset(data, 'Misses', 0);
        this.Accuracy = Helper.isset(data, 'Accuracy', 0.0);
        this.BlockHitScores = Helper.isset(data, 'BlockHitScores', []);
        this.PlayerHealth = Helper.isset(data, 'PlayerHealth', 0);

        // time
        this.TimeElapsed = Helper.isset(data, 'TimeElapsed', 0);
    }
}

class StaticData {
    constructor(data) {
        // Map
        this.SongName = Helper.isset(data, 'SongName', 'SongName');
        this.SongSubName = Helper.isset(data, 'SongSubName', 'SongSubName');
        this.SongAuthor = Helper.isset(data, 'SongAuthor', 'SongAuthor');
        this.Mapper = Helper.isset(data, 'Mapper', 'Mapper');
        this.BSRKey = Helper.isset(data, 'BSRKey', 'BSRKey');
        this.coverImage = Helper.isset(data, 'coverImage', 'img/tyGQRx5x_400x400.jpg');
        this.Length = Helper.isset(data, 'Length', 1);

        // Difficulty
        this.Difficulty = Helper.isset(data, 'Difficulty', 0);
        this.BPM = Helper.isset(data, 'BPM', 0);
        this.NJS = Helper.isset(data, 'NJS', 0.0);

        //Modifiers
        let modifiers = Helper.isset(data, 'Modifiers', {});
        this.Modifiers = {
            instantFail: Helper.isset(modifiers, 'instaFail', false),
            batteryEnergy: Helper.isset(modifiers, 'batteryEnergy', false),
            disappearingArrows: Helper.isset(modifiers, 'disappearingArrows', false),
            ghostNotes: Helper.isset(modifiers, 'ghostNotes', false),
            fasterSong: Helper.isset(modifiers, 'fasterSong', false),
            noFail: Helper.isset(modifiers, 'noFail', false),
            noObstacles: Helper.isset(modifiers, 'noObstacles', false),
            noBombs: Helper.isset(modifiers, 'noBombs', false),
            slowerSong: Helper.isset(modifiers, 'slowerSong', false),
            noArrows: Helper.isset(modifiers, 'noArrows', false),
            practiceMode: Helper.isset(data, 'PracticeMode', false)
        };
        let practiceModeModifiers = Helper.isset(data, 'PracticeModeModifiers', {});
        this.PracticeModeModifiers = {
            startSongTime: Helper.isset(practiceModeModifiers, 'startSongTime', 0.0),
            songSpeedMul: Helper.isset(practiceModeModifiers, 'songSpeedMul', 1.0),
        };

        this.PreviousRecord = Helper.isset(data, 'PreviousRecord', 0);
        this.PreviousBSR = Helper.isset(data, 'PreviousBSR', 0);

        this.PracticeModeModifiers.songSpeedMul = Math.round(this.PracticeModeModifiers.songSpeedMul * 100) / 100;
    }

    difficultyString() {
        switch (this.Difficulty) {
            case 1:
                return 'Easy';
            case 3:
                return 'Normal';
            case 5:
                return 'Hard';
            case 7:
                return 'Expert';
            case 9:
                return 'Expert+';
            default:
                return 'Difficulty: ' + this.Difficulty;
        }
    }
}

class Helper {
    static SvgNamespace = 'http://www.w3.org/2000/svg';

    static element(selector) {
        return document.querySelector('#' + selector);
    }

    static create(tag, namespace = '') {
        if (namespace === '') {
            return document.createElement(tag);
        }

        return document.createElementNS(namespace, tag);
    }

    static svg(tag) {
        return Helper.create(tag, this.SvgNamespace);
    }

    static addClass(element, className) {
        if (!element.classList.contains(className)) {
            element.classList.add(className);
        }
    }

    static removeClass(element, className) {
        let classes = element.className.split(' ').filter(v => v !== className);
        element.className = classes.filter(((value, index, array) => array.indexOf(value) === index)).join(' ');
    }

    static isset(data, val, def) {
        return (typeof data[val] !== 'undefined' && data[val] !== null) ? data[val] : def;
    }

    static clamp(input, min, max) {
        return Math.min(max, Math.max(min, input));
    }

    static visibility(element, visible) {
        element.style.visibility = visible ? 'visible' : 'hidden';
    }

    static display(element, display, isInline = false) {
        element.style.display = display ? (isInline ? 'inline-block' : 'block') : 'none';
    }

    static fromUrlColor(input) {
        if (input.substring(0, 3) === 'rgb') {
            return input;
        }

        if (input.match(/[^0-9A-Fa-f]/g) === null) {
            return '#' + input;
        }

        return '#000000';
    }

    static toUrlColor(input) {
        if (input.substring(0, 1) === '#') {
            return input.substring(1);
        }
        if (input.substring(0, 3) === 'rgb') {
            return input;
        }

        return '000000';
    }

    static toggleClass(element, value, className) {
        if (!!value) {
            Helper.addClass(element, className);
        } else {
            Helper.removeClass(element, className);
        }
    }
}

class Connection {
    constructor(url, messageCallback, openCallback, closeCallback) {
        this.url = url;

        this.callbacks = {
            message: messageCallback,
            open: openCallback,
            close: closeCallback
        }

        this.connect();
    }

    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = (message) => {
            this.onOpen(message);
        };
        this.socket.onmessage = (message) => {
            this.onMessage(message);
        }
        this.socket.onclose = () => {
            this.onClose();
        }
    }

    reconnect(url = null) {
        if (url != null) {
            this.url = url;
        }

        this.socket.close();
        this.connect();
    }

    onOpen(message) {
        this.callbacks.open(message);
    }

    onClose() {
        this.callbacks.close();
    }

    onMessage(message) {
        this.callbacks.message(message);
    }
}

class MultiConnection {
    constructor(ip, port) {
        this.connections = [];
        this.ip = ip;
        this.port = port;
    }

    addEndpoint(name, callback) {

        let log = (message) => {
            console.log('[' + name + '] ' + message);
        }

        this.connections[name] = new Connection(this.getUrl() + name, (data) => {
            data = JSON.parse(data.data);
            callback(data);
        }, () => {
            log('connected!');
        }, () => {
            log('lost connection');
            log('reconnecting in 5 seconds');
            window.setTimeout(() => {
                this.addEndpoint(name, callback);
            }, 5000);
        });
    }

    getUrl(a = false) {
        if (a) {
            return this.ip + ':' + this.port;
        }
        return 'ws:' + this.getUrl(true) + '/';
    }

    reconnect(ip = null, port = null) {
        if (ip != null) {
            this.ip = ip;
        }
        if (port != null) {
            this.port = port;
        }

        for (let e of this.connections) {
            e.reconnect(this.getUrl());
        }
    }
}

class CircleBar {
    constructor(parentElement, textCallback, size = 150, padding = 10) {
        this.parent = parentElement;
        this.callback = textCallback;

        let half = size / 2;
        let radius = half - padding;

        this.circumference = radius * Math.PI * 2;
        this.text = Helper.create('div');
        this.bar = this.getCircle(half, radius);
        this.bar.style.strokeDasharray = this.circumference + 'px , ' + this.circumference + 'px';

        let svg = Helper.svg('svg');
        svg.style.width = size + 'px';
        svg.style.height = size + 'px';

        let remaining = this.getCircle(half, radius);

        Helper.addClass(this.text, 'progressInfo');
        Helper.addClass(remaining, 'remaining');
        Helper.addClass(this.bar, 'progress');
        Helper.addClass(svg, 'roundBar');

        svg.append(remaining, this.bar);

        this.parent.append(this.text, svg);
    }

    getCircle(size, radius) {
        let c = Helper.svg('circle');

        c.cx.baseVal.value = size;
        c.cy.baseVal.value = size;
        c.r.baseVal.value = radius;

        return c;
    }

    setProgress(current, total) {
        let progress = current / total;
        this.bar.style.strokeDashoffset = this.getCircumference(progress);

        if (typeof this.callback === 'function') {
            this.setText(this.callback((Math.round(progress * 10000) / 100).toFixed(2)));
        }
    }

    setText(text) {
        this.text.innerHTML = text;
    }

    getCircumference(input) {
        return Helper.clamp((1 - input) * this.circumference, 0, this.circumference) + 'px';
    }
}

class ColorInput {

    static Instance = 0;

    constructor(color, changeEvent) {

        this.instance = ColorInput.Instance;
        ColorInput.Instance++;

        this.changeEvent = changeEvent;

        let r, g, b, a, prefix;
        if (color.substring(0, 1) === '#') {
            color = color.length === 7 ? color + 'FF' : color;
            r = parseInt(color.substring(1, 3), 16);
            g = parseInt(color.substring(3, 5), 16);
            b = parseInt(color.substring(5, 7), 16);
            a = parseInt(color.substring(7, 9), 16);
        } else {
            color = color.replace(/ /g, '').split(',');
            color[color.length - 1] = color[color.length - 1].substring(0, color[color.length - 1].length - 1);

            prefix = color[0].substring(0, 4).toLowerCase();

            color[0] = color[0].substring(3);

            if (prefix === 'rgb') {
                color[0] = color[0].substring(1);
                a = 255;
            } else {
                color[0] = color[0].substring(2);
                a = Math.round(parseFloat(color[3]) * 255);
            }

            r = parseInt(color[0]);
            g = parseInt(color[1]);
            b = parseInt(color[2]);
        }

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    createInputMenu(element) {
        this.rElement = this.input(this.r, 'r');
        this.gElement = this.input(this.g, 'g');
        this.bElement = this.input(this.b, 'b');
        this.aElement = this.input(this.a, 'a');

        let change = () => {
            this.internalChange();
        };

        this.rElement.oninput = change;
        this.gElement.oninput = change;
        this.bElement.oninput = change;
        this.aElement.oninput = change;

        element.append(
            this.label('R:', this.rElement.id),
            this.rElement,
            this.label('G:', this.gElement.id),
            this.gElement,
            this.label('B:', this.bElement.id),
            this.bElement,
            this.label('A:', this.aElement.id),
            this.aElement,
        );
    }

    internalChange() {
        this.changeEvent(this.getColor());
    }

    getColor() {
        let r = parseInt(this.rElement.value);
        let g = parseInt(this.gElement.value);
        let b = parseInt(this.bElement.value);
        let a = parseInt(this.aElement.value);

        if (a === 255) {
            return '#' + this.to2digitHex(r) + this.to2digitHex(g) + this.to2digitHex(b);
        }

        return 'rgba(' + [r, g, b, (a / 255).toFixed(1)].join(', ') + ')';
    }

    to2digitHex(input) {
        input = input.toString(16);
        return input.length === 1 ? '0' + input : input;
    }

    input(value, id) {
        let i = Helper.create('input');
        i.type = 'range';
        i.min = 0;
        i.max = 255;
        i.value = value;
        i.id = this.instance + id;
        i.style.width = '80px';

        return i;
    }

    label(text, id) {
        let l = Helper.create('label');
        l.for = id;
        l.innerHTML = text;

        return l;
    }
}

class SettingLine {

    static index = 0;

    constructor(name, setting, isDirectCallback = false) {
        let line = Helper.create('div');
        let label = Helper.create('label');
        this.element = Helper.create('input');

        label.htmlFor = 'input_' + SettingLine.index;
        label.innerHTML = name;
        this.element.id = label.htmlFor;
        this.element.type = 'checkbox';

        if (!isDirectCallback) {
            this.element.checked = ui.options[setting];
        }

        this.element.onclick = (e) => {
            let checked = !!e.target.checked;
            if (isDirectCallback) {
                setting(checked);
            } else {
                ui.options[setting] = checked;
            }
            ui.appendNewStyles();
        }

        line.append(this.element, label);
        ui.optionsLinesElement.append(line);

        SettingLine.index++;
    }
}

class UI {
    constructor() {
        this.inactiveClass = 'inactive';

        this.defaults = {
            ip: '127.0.0.1',
            textColor: 'ffffff',
            backgroundColor: 'rgba(255,133,255,0.7)'
        }

        this.urlParamStrings = {
            ip: 'ip',
            backgroundColor: 'a',
            textColor: 'b',
            shortModifierNames: 'c',
            showPrevBsr: 'd',
            missCounter: 'e',
            showBpm: 'f',
            showNjs: 'g',
            showCombo: 'h',
            flipStatic: 'i',
            flipLive: 'j',
            flipModifiers: 'k'
        }

        this.urlParams = new URLSearchParams(location.search);

        this.options = {
            backgroundColor: Helper.fromUrlColor(this.getUrlParam(this.urlParamStrings.backgroundColor, this.defaults.backgroundColor)),
            textColor: Helper.fromUrlColor(this.getUrlParam(this.urlParamStrings.textColor, this.defaults.textColor)),
            //shortModifierNames: this.urlParams.has(this.urlParamStrings.shortModifierNames),
            //showPrevBsr: this.urlParams.has(this.urlParamStrings.showPrevBsr),
            previewMode: this.urlParams.has('options'),
            //missCounter: !this.urlParams.has(this.urlParamStrings.missCounter),
            showBpm: !this.urlParams.has(this.urlParamStrings.showBpm),
            showNjs: !this.urlParams.has(this.urlParamStrings.showNjs),
            showCombo: !this.urlParams.has(this.urlParamStrings.showCombo),
            ip: this.getUrlParam(this.urlParamStrings.ip, this.defaults.ip),
            flipLive: this.urlParams.has(this.urlParamStrings.flipLive),
            flipStatic: this.urlParams.has(this.urlParamStrings.flipStatic),
            //flipModifiers: this.urlParams.has(this.urlParamStrings.flipModifiers)
        };

        document.body.ondblclick = (e) => {

            this.options.previewMode = !this.options.previewMode;
            this.appendNewStyles();
        };

        this.levelWasPaused = false;
        this.getUiElements();

        this.health.setProgress(0, 1);
        this.accuracy.setProgress(0, 100);
        this.setTime(0, 60)

        this.uiShown = true;
        this.internalTimer = -1;
        this.internalInterval = 0;

        this.appendNewStyles();

        window.setTimeout(() => {
            this.calculateOptionPosition();
        }, 100);
    }

    buildOptionsPanel() {
        let backgroundColor = new ColorInput(this.options.backgroundColor, c => {
            this.options.backgroundColor = c;
            this.appendNewStyles();
        });

        let textColor = new ColorInput(this.options.textColor, c => {
            this.options.textColor = c;
            this.appendNewStyles();
        });

        //new SettingLine('Short Modifiers', 'shortModifierNames');
        //new SettingLine('Enable Miss Counter', 'missCounter');

        //this.optionsLinesElement.append(Helper.create('hr'));

        //new SettingLine('Show previous BSR', 'showPrevBsr');
        new SettingLine('Show BPM', 'showBpm');
        new SettingLine('Show NJS', 'showNjs');
        new SettingLine('Show Combo', 'showCombo');

        this.optionsLinesElement.append(Helper.create('hr'));

        new SettingLine('Flip SongInfo to right', 'flipStatic');
        //new SettingLine('Flip Modifiers to left', 'flipModifiers');
        //new SettingLine('Flip Counter section to top', 'flipLive');

        this.optionsLinesElement.append(Helper.create('hr'));

        new SettingLine('Test with Background Image', (checked) => {
            document.body.style.backgroundImage = checked ? 'url(img/beat-saber-5.jpg)' : 'none';
        }, true);

        backgroundColor.createInputMenu(Helper.element('bgColor'));
        textColor.createInputMenu(Helper.element('color'));
    }

    previewGameData() {
        let s = new StaticData({});
        s.BPM = 180;
        s.BSRKey = '1234';
        s.Difficulty = 9;
        s.Length = 120;
        s.NJS = 20;
        s.PreviousBSR = 'affa';
        s.SongName = "LONGSONGNAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE";
        s.SongSubName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";


        s.Modifiers.batteryEnergy = true;
        s.Modifiers.disappearingArrows = true;
        s.Modifiers.fasterSong = true;
        s.Modifiers.ghostNotes = true;
        s.Modifiers.instantFail = true;
        s.Modifiers.noArrows = true;
        s.Modifiers.noBombs = true;
        s.Modifiers.noFail = true;
        s.Modifiers.noObstacles = true;
        s.Modifiers.practiceMode = true;
        s.Modifiers.slowerSong = true;
        s.PracticeModeModifiers.songSpeedMul = 1.2;
        s.PracticeModeModifiers.startSongTime = 10;

        let l = new LiveData({});
        l.PlayerHealth = .5;
        l.TimeElapsed = 10;
        l.Accuracy = 50;
        l.Score = 1234567;
        l.Misses = 17;

        this.updateStatic(s);
        this.updateLive(l);
    }

    getUiElements() {
        this.modifiersHolder = Helper.element('modifiers');
        this.modifiers = {
            instantFail: Helper.element('IF'),
            batteryEnergy: Helper.element('BE'),
            disappearingArrows: Helper.element('DA'),
            ghostNotes: Helper.element('GN'),
            fasterSong: Helper.element('FS'),
            noFail: Helper.element('NF'),
            noObstacles: Helper.element('NO'),
            noBombs: Helper.element('NB'),
            slowerSong: Helper.element('SS'),
            noArrows: Helper.element('NA'),
            practiceMode: Helper.element('PM'),
            songSpeed: Helper.element('songSpeed')
        };

        this.timer = new CircleBar(Helper.element('timerHolder'));

        this.health = new CircleBar(Helper.element('healthHolder'), percent => {
            return '<small>Health</small>' + parseFloat(percent).toFixed(0) + '%';
        });

        this.accuracy = new CircleBar(Helper.element('accuracyHolder'), percent => {
            return '<small>Accuracy</small>' + percent + '%';
        });

        this.songInfoHolder = Helper.element('songInfo');
        this.beatMapCover = Helper.element('beatMapCover');
        this.songInfo = {
            bsr: Helper.element('bsr'),
            //mapper: Helper.element('mapper'),
            difficulty: Helper.element('difficulty'),
            artist: Helper.element('artist'),
            songName: Helper.element('mapName'),
            mapSubName: Helper.element("mapSubName"),
            cover: Helper.element('cover')
        };

        this.dataHolder = Helper.element('downSection');
        this.data = {
            score: Helper.element('score'),
            combo: Helper.element('combo'),
            previousBSR: Helper.element('previousBSR'),
            njs: Helper.element('njs'),
            bpm: Helper.element('bpm'),
            miss: Helper.element('miss'),
            acc: Helper.element('accLabel')
        };

        this.optionsElement = Helper.element('options');
        this.optionsLinesElement = Helper.element('optionsLines');
        this.urlText = Helper.element('urlText');

        this.urlText.onclick = () => {
            this.urlText.select();
            document.execCommand('copy');
        };

        this.ipText = Helper.element('ip');
        this.changeIp = Helper.element('changeIp');
        this.changeIp.onclick = () => {
            let f = this.ipText.value.split(':');
            if (!f[1] || typeof f[1] === 'undefined') {
                f[1] = 2946;
            }
            connection.reconnect(f[0], f[1]);
        }
    }

    calculateOptionPosition() {
        let styles = window.getComputedStyle(this.optionsElement, null)
        this.optionsElement.style.marginTop = (-parseInt(styles.getPropertyValue('height')) / 2) + 'px';
        this.optionsElement.style.marginLeft = (-parseInt(styles.getPropertyValue('width')) / 2) + 'px';
    }

    appendNewStyles() {
        document.body.style.color = this.options.textColor;
        document.querySelectorAll('.roundBar circle').forEach(element => {
            element.style.stroke = this.options.textColor;
        }, this);
        document.querySelectorAll('.backGroundColor').forEach(element => {
            element.style.backgroundColor = this.options.backgroundColor;
        }, this);

        if (this.options.shortModifierNames) {
            this.modifiers.instantFail.innerHTML = 'IF';
            this.modifiers.batteryEnergy.innerHTML = 'BE';
            this.modifiers.disappearingArrows.innerHTML = 'DA';
            this.modifiers.ghostNotes.innerHTML = 'GN';
            this.modifiers.fasterSong.innerHTML = 'FS';
            this.modifiers.noFail.innerHTML = 'NF';
            this.modifiers.noObstacles.innerHTML = 'NO';
            this.modifiers.noBombs.innerHTML = 'NB';
            this.modifiers.slowerSong.innerHTML = 'SS';
            this.modifiers.noArrows.innerHTML = 'NA';
            this.modifiers.practiceMode.innerHTML = 'PM';
        } else {
            this.modifiers.instantFail.innerHTML = 'Insta Fail';
            this.modifiers.batteryEnergy.innerHTML = 'Battery Energy';
            this.modifiers.disappearingArrows.innerHTML = 'Disappearing Arrows';
            this.modifiers.ghostNotes.innerHTML = 'Ghost Notes';
            this.modifiers.fasterSong.innerHTML = 'Faster Song';
            this.modifiers.noFail.innerHTML = 'No Fail';
            this.modifiers.noObstacles.innerHTML = 'No Obstacles';
            this.modifiers.noBombs.innerHTML = 'No Bombs';
            this.modifiers.slowerSong.innerHTML = 'Slower Song';
            this.modifiers.noArrows.innerHTML = 'No Arrows';
            this.modifiers.practiceMode.innerHTML = 'Practice Mode';
        }

        Helper.visibility(this.data.previousBSR, this.options.showPrevBsr);
        Helper.visibility(this.data.combo, this.options.showCombo);
        Helper.display(this.data.bpm, this.options.showBpm, true);
        Helper.display(this.data.njs, this.options.showNjs, true);
        Helper.display(this.data.miss, this.options.missCounter, true);

        Helper.display(this.optionsElement, this.options.previewMode);
        if (this.options.previewMode) {
            this.calculateOptionPosition();
        }

        let options = [];

        let bg = Helper.toUrlColor(this.options.backgroundColor);
        if (bg !== this.defaults.backgroundColor) {
            options.push(this.urlParamStrings.backgroundColor + '=' + bg);
        }

        let tc = Helper.toUrlColor(this.options.textColor);
        if (tc !== this.defaults.textColor) {
            options.push(this.urlParamStrings.textColor + '=' + tc);
        }

        let switchRadius = (element, value) => {
            Helper.toggleClass(element, !value, 'borderRadiusTopLeft');
            Helper.toggleClass(element, !value, 'borderRadiusBottomLeft');
            Helper.toggleClass(element, value, 'borderRadiusTopRight');
            Helper.toggleClass(element, value, 'borderRadiusBottomRight');
        }

        switchRadius(this.songInfo.bsr, !this.options.flipStatic);
        //switchRadius(this.songInfo.mapper, !this.options.flipStatic);
        switchRadius(this.songInfo.difficulty, !this.options.flipStatic);
        switchRadius(this.songInfo.artist, !this.options.flipStatic);
        switchRadius(this.songInfo.songName, !this.options.flipStatic);

        Helper.toggleClass(this.beatMapCover, !this.options.flipStatic, 'borderRadiusBottomRight');
        Helper.toggleClass(this.beatMapCover, !this.options.flipStatic, 'borderRadiusBottomLeft');
        if (!this.options.flipStatic) {
            Helper.toggleClass(this.beatMapCover, !this.options.showPrevBsr, 'borderRadiusTopLeft');
        } else {
            Helper.toggleClass(this.beatMapCover, !this.options.showPrevBsr, 'borderRadiusTopRight');
        }

        Helper.toggleClass(this.songInfoHolder, !this.options.flipStatic, 'flip');
        Helper.toggleClass(this.modifiersHolder, this.options.flipModifiers, 'flip');
        Helper.toggleClass(this.dataHolder, this.options.flipLive, 'flip');

        if (this.options.ip !== this.defaults.ip) {
            options.push(this.urlParamStrings.ip + '=' + this.options.ip);
        }

        let pushData = [
            'shortModifierNames',
            'showPrevBsr',
            '!missCounter',
            '!showBpm',
            '!showNjs',
            '!showCombo',
            'flipStatic',
            'flipLive',
            'flipModifiers',
        ];

        for (let x of pushData) {
            if (x.substring(0, 1) === '!') {
                x = x.substring(1, x.length);
                if (!this.options[x]) {
                    options.push(this.urlParamStrings[x]);
                }
                continue;
            }

            if (this.options[x]) {
                options.push(this.urlParamStrings[x]);
            }
        }

        let optionsString = options.length > 0 ? '?' + options.join('&') : '';

        this.urlText.innerHTML = window.location.protocol + '//' + window.location.host + window.location.pathname + optionsString;
        this.previewGameData();
    }

    getUrlParam(key, def) {
        if (!this.urlParams.has(key)) {
            return def;
        }
        let x = this.urlParams.get(key);
        return x === null ? def : x;
    }

    setTime(current, total) {
        if (current > total) {
            // uhm?
            current = total;
        }

        //this.timer.setText('<small>Time</small>' + this.getDate(current) + '<br>' + this.getDate(total));
        //this.timer.setText(this.getDate(current) + ' /<br>' + this.getDate(total));
        this.timer.setText(this.getDate(current));
        this.timer.setProgress(current, total);
    }

    getDate(input) {
        let seconds = input % 60;
        let minutes = Math.floor(input / 60);

        seconds = seconds < 10 ? '0' + seconds : seconds;

        return minutes < 0 ? seconds : minutes + ':' + seconds;
    }

    getTimeElapsed() {
        return Math.round(this.liveData.TimeElapsed / this.staticData.PracticeModeModifiers.songSpeedMul);
    }

    updateLive(liveData) {
        this.liveData = liveData;
        // toggle ui
        if (this.options.previewMode || this.liveData.InLevel && !this.uiShown) {

            Helper.removeClass(this.songInfoHolder, this.inactiveClass);
            Helper.removeClass(this.dataHolder, this.inactiveClass);
            Helper.removeClass(this.modifiersHolder, this.inactiveClass);

            this.uiShown = true;
            this.timerAdjusted = false;
            this.internalTimer = this.getTimeElapsed();

            if (this.options.previewMode) {
                this.setTime(this.mapLength / 2, this.mapLength)
            } else {
                this.internalInterval = window.setInterval(() => {
                    if (this.liveData.LevelPaused) {
                        this.levelWasPaused = true;
                    } else if (!this.liveData.LevelPaused && !this.liveData.LevelFailed && !this.liveData.LevelFailed && !this.liveData.LevelQuit) {
                        if (this.levelWasPaused) {
                            this.levelWasPaused = false;
                            this.internalTimer = this.getTimeElapsed();
                        }
                        if (!this.timerAdjusted && this.getTimeElapsed() !== this.internalTimer) {
                            this.internalTimer = this.getTimeElapsed();
                            this.timerAdjusted = true;
                        } else {
                            this.internalTimer++;
                        }
                    }
                    this.setTime(this.internalTimer, this.mapLength);
                }, 1000);
            }
        } else if (!this.liveData.InLevel && this.uiShown) {
            Helper.addClass(this.songInfoHolder, this.inactiveClass);
            Helper.addClass(this.dataHolder, this.inactiveClass);
            Helper.addClass(this.modifiersHolder, this.inactiveClass);
            this.uiShown = false;
            this.levelWasPaused = false;

            window.clearInterval(this.internalInterval);
        }

        // down section
        this.accuracy.setProgress(this.liveData.Accuracy.toFixed(2), 100)

        this.data.combo.innerHTML = this.liveData.Combo + ' <small>COMBO</small>';
        this.data.miss.innerHTML = this.liveData.Misses + '<small>MISS</small>';
        this.data.score.innerHTML = new Intl.NumberFormat('en-US').format(this.liveData.Score).replace(/,/g, ' ');
        this.data.acc.innerHTML = '(' + this.liveData.Accuracy.toFixed(2) + '%)';

        //this.health.setProgress(this.staticData.Modifiers.practiceMode ? 100 : this.liveData.PlayerHealth.toFixed(0), 100);
        this.health.setProgress(this.staticData.Modifiers.noFail ? 100 : this.liveData.PlayerHealth.toFixed(0), 100);

        // block hit scores?
        // full combo?
    }

    updateStatic(staticData) {
        this.staticData = staticData;

        // calculate map length
        this.mapLength = this.staticData.Length;
        if (this.staticData.Modifiers.practiceMode) {
            this.mapLength = Math.trunc(this.staticData.Length / this.staticData.PracticeModeModifiers.songSpeedMul);
        } else if (this.staticData.Modifiers.fasterSong || this.staticData.Modifiers.slowerSong) {
            this.mapLength = Math.trunc(this.staticData.Length * (this.staticData.Modifiers.fasterSong ? .8 : 1.15));
        }

        // modifiers panel
        let allModifiersOff = true;
        for (let modifier in this.staticData.Modifiers) {

            // noinspection JSUnfilteredForInLoop
            if (this.staticData.Modifiers[modifier]) {
                allModifiersOff = false;
            }

            // noinspection JSUnfilteredForInLoop
            Helper.display(this.modifiers[modifier], this.staticData.Modifiers[modifier]);
        }

        Helper.display(this.modifiers.practiceMode, this.staticData.Modifiers.practiceMode);

        // practice
        if (this.staticData.Modifiers.practiceMode) {
            allModifiersOff = false;

            Helper.display(this.modifiers.fasterSong, this.staticData.PracticeModeModifiers.songSpeedMul > 1);
            Helper.display(this.modifiers.slowerSong, this.staticData.PracticeModeModifiers.songSpeedMul < 1);

            let readableSpeed = (this.staticData.PracticeModeModifiers.songSpeedMul * 100 - 100).toFixed();
            let identifier = readableSpeed > 0 ? '+' : '';

            if (readableSpeed === 100) {
                Helper.display(this.modifiers.songSpeed, false);
            } else {
                Helper.display(this.modifiers.songSpeed, true);
                this.modifiers.songSpeed.innerHTML = (this.options.shortModifierNames ? '' : 'Speed: ') + identifier + readableSpeed + '%';
            }
            Helper.display(this.modifiers.songSpeed, this.staticData.Modifiers.songSpeedMul !== 1);
        } else {
            Helper.display(this.modifiers.songSpeed, false);
        }

        Helper.visibility(this.modifiersHolder, !allModifiersOff);

        // generic song info
        Helper.toggleClass(this.beatMapCover, this.staticData.BSRKey.length === 0 || this.staticData.BSRKey === 'BSRKey', this.options.flipStatic ? 'borderRadiusTopLeft' : 'borderRadiusTopRight');

        this.data.previousBSR.innerHTML = this.staticData.PreviousBSR.length > 0 ? 'Prev-BSR: ' + this.staticData.PreviousBSR : '';

        this.songInfo.songName.classList.remove("cssmarquee");
        this.songInfo.artist.classList.remove("cssmarquee");
        this.songInfo.mapSubName.classList.remove("cssmarquee");

        this.hideSetting(this.songInfo.bsr, this.staticData.BSRKey === 'BSRKey' ? '' : this.staticData.BSRKey, '[BSR ', ']');
        //this.hideSetting(this.songInfo.mapper, this.staticData.Mapper);
        this.hideSetting(this.songInfo.artist, this.staticData.SongAuthor, '', ' | ' + this.staticData.Mapper);
        this.hideSetting(this.songInfo.songName, this.staticData.SongName);

        Helper.toggleClass(this.songInfo.songName, !this.options.flipLive && this.staticData.SongName.length > 26, 'small');

        this.songInfo.difficulty.innerHTML = this.staticData.difficultyString();

        //if (this.staticData.SongSubName.length > 0) {
            this.songInfo.mapSubName.innerHTML = this.staticData.SongSubName;
        //}


        if (this.isElementOverflowing(this.songInfo.songName)) {
            this.songInfo.songName.classList.add("cssmarquee");
            this.songInfo.songName.width = 300;
        }

        if (this.isElementOverflowing(this.songInfo.artist)) {
            this.songInfo.artist.classList.add("cssmarquee");
        }

        if (this.isElementOverflowing(this.songInfo.mapSubName)) {
            this.songInfo.mapSubName.classList.add("cssmarquee");
        }

        this.songInfo.cover.style.backgroundImage = 'url(\'' + this.staticData.coverImage + '\')';

        this.data.bpm.innerHTML = '<span>| BPM </span> ' + this.staticData.BPM;
        this.data.njs.innerHTML = '<span>| NJS </span> ' + this.staticData.NJS.toFixed(1);

        // previous record?
    }

    hideSetting(element, value, prefix = '', suffix = '') {
        if (value.length > 0) {
            Helper.visibility(element, true);
            element.innerHTML = prefix + value + suffix;
            return
        }

        Helper.visibility(element, false);
    }

    isElementOverflowing(element) {    
        return element.scrollWidth > 300;
    }

    init() {
        if (this.options.previewMode) {
            this.previewGameData();
        } else {
            let g = new LiveData({});
            g.InLevel = false;
            this.updateLive(g);
        }
    }
}

let connection;
let ui;

window.onload = () => {
    console.log('If you don\'t have the BSDataPuller mod then download the latest release from here and place it in your BS mods folder: https://github.com/kOFReadie/DataPuller/releases/latest');

    ui = new UI();
    ui.init();
    ui.buildOptionsPanel();

    connection = new MultiConnection(ui.options.ip, 2946);
    connection.addEndpoint('BSDataPuller/LiveData', (data) => {
        data = new LiveData(data);
        ui.updateLive(data);
    });
    connection.addEndpoint('BSDataPuller/StaticData', (data) => {
        data = new StaticData(data);
        ui.updateStatic(data);
    });

    ui.ipText.value = connection.getUrl(true);
}