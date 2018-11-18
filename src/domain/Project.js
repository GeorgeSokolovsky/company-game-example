var Project = (function () {
    function Project(name, cost, linesRequired) {
        this.name = name;
        this.cost = cost;
        this.linesRequired = linesRequired;

        this.isOver = false;
        this.__progress__ = 0;
    }

    Project.prototype.updateProgress = function (lines) {
        this.__progress__  += lines;

        if (this.__progress__ >= this.linesRequired) {
            this.isOver = true;
        }
    };

    return Project;
})();