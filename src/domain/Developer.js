var Developer = (function () {
    var LEVELS = {
        1: 'junior',
        2: 'middle',
        3: 'senior'
    };

    var SALARIES = {
        junior: 400,
        middle: 1000,
        senior: 2000
    };

    var LINES = {
        junior: 1000,
        middle: 2500,
        senior: 5000
    };

    function Developer(name, level) {
        this.name = name;
        this._level = level;
    }

    Developer.prototype.upgrade = function () {
        if (this._level === 3) {
            return;
        }

        this._level++;
    };

    Developer.prototype.requestSalary = function () {
        return SALARIES[this.getLevel()];
    };

    Developer.prototype.produceLines = function () {
        return LINES[this.getLevel()];
    };

    Developer.prototype.getLevel = function () {
        return LEVELS[this._level];
    };

    return Developer;
})();