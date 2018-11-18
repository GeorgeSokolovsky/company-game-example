var Game = (function () {
    var TICK_TIME = 2000;
    var STOP_REASON = {
        BUDGET_ENDED: 'Your budget ended! Sorry :(',
        USER_STOP: 'You canceled game! Probably you want to start one more time?'
    };

    var intervalId;

    var renderer = new Renderer();

    function Game() {
        this.isOn = false;

        this.turn = 0;
    }

    Game.prototype.start = function (companyName, companyBudget) {
        var that = this;

        this.company = new Company(companyName, companyBudget);
        this.isOn = true;

        if (intervalId) {
            clearInterval(intervalId);
        }

        that.__tick();

        intervalId = setInterval(function () {
            that.__tick();
        }, TICK_TIME);
    };

    Game.prototype.__tick = function () {
        this.turn++;
        this.company.paySalaries();
        this.company.checkProjects();

        if (this.company.budget < 0) {
            this.__stopGame(STOP_REASON.BUDGET_ENDED);
        }

        this.__renderState();
    };

    Game.prototype.interruptGame = function () {
        this.__stopGame(STOP_REASON.USER_STOP);
    };

    Game.prototype.__stopGame = function (reason) {
        this.isOn = false;
        this.turn = 0;

        if (!intervalId) {
            return;
        }

        clearInterval(intervalId);

        this.stopReason = reason;

        renderer.updateToggleButton(true);
        renderer.updateStopReason(reason);
    };

    Game.prototype.__renderState = function () {
        renderer.renderTurn(this.turn);
        renderer.renderBudget(this.company.budget);
        renderer.renderProjects(this.company.projects);
        renderer.renderManagers(
            this.company.freeManagers,
            this.company.busyManagers,
            [{action: this.company.fireManager, ctx: this.company}]
        );
        renderer.renderDevelopers(
            this.company.freeDevelopers,
            this.company.busyDevelopers,
            [{action: this.company.fireDeveloper, ctx: this.company}]
        );
    };

    return Game;
})();