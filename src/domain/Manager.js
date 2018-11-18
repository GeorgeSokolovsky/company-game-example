var Manager = (function () {
    function Manager(name, exp) {
        this.name = name;
        this.exp = exp;

        this.project = null;
        this.developers = [];
    }

    Manager.prototype.pickUpProject = function (project) {
        this.project = project;
    };

    Manager.prototype.updateDevelopers = function (developers) {
        this.developers = this.developers.concat(developers);
    };

    Manager.prototype.updateProject = function () {
        var lines = this.developers.reduce(function (result, developer) {
            return result + developer.produceLines();
        }, 0);

        this.project.updateProgress(lines * this.exp);

        if (this.project.isOver) {
            this.project = null;
        }
    };

    return Manager;
})();