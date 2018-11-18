var Company = (function () {
    var MAX_DEVELOPERS_PER_MANAGER_COUNT = 5;

    var ERRORS = {
        PROJECT_EXISTS: 'Such project has already exist',
        NO_FREE_MANAGERS: 'There is no free managers'
    };

    function Company(name, budget) {
        this.name = name;
        this.budget = budget;

        this.projects = {};

        this.freeDevelopers = [];
        this.busyDevelopers = [];

        this.freeManagers = [];
        this.busyManagers = {};
    }

    Company.prototype.startProject = function (project) {
        if (this.projects[project.name]) {
            throw new Error(ERRORS.PROJECT_EXISTS);
        }

        if (!this.freeManagers.length) {
            throw new Error(ERRORS.NO_FREE_MANAGERS);
        }

        var manager = this.freeManagers.shift();

        manager.pickUpProject(project);

        this.busyManagers[project.name] = manager;
        this.projects[project.name] = project;

        this.__addDevelopersToProject(project.name);
    };

    Company.prototype.closeProject = function (project) {
        this.budget += project.cost;

        delete this.projects[project.name];

        var manager = this.busyManagers[project.name];

        delete this.busyManagers[project.name];

        this.freeManagers.push(manager);

        var developers = manager.developers;
        var that = this;

        developers.forEach(function (developer) {
            utils.remove(that.busyDevelopers, developer);
        });

        this.freeDevelopers = this.freeDevelopers.concat(developers);
    };

    Company.prototype.addDeveloper = function (developer) {
        this.freeDevelopers.push(developer);
    };

    Company.prototype.fireDeveloper = function (developer) {
        var manager = this.__findDeveloperManager(developer);

        if (manager) {
            utils.remove(manager.developers, developer);
        }

        utils.remove(this.freeDevelopers, developer);
        utils.remove(this.busyDevelopers, developer);
    };

    Company.prototype.addManager = function (manager) {
        this.freeManagers.push(manager);
    };

    Company.prototype.fireManager = function (manager) {
        if (manager.project) {
            return;
        }

        utils.remove(this.freeManagers, manager);
    };

    Company.prototype.paySalaries = function () {
        this.budget -= this.freeDevelopers
            .concat(this.busyDevelopers)
            .reduce(function (result, developer) { return result + developer.requestSalary() }, 0);
    };

    Company.prototype.checkProjects = function () {
        var that = this;

        Object.keys(this.projects)
            .map(function (projectName) { return that.projects[projectName]; })
            .forEach(function (project) {
                if (project.isOver) {
                    that.closeProject(project);

                    return;
                }

                if (that.busyManagers[project.name].developers.length < MAX_DEVELOPERS_PER_MANAGER_COUNT) {
                    that.__addDevelopersToProject(project.name);
                }

                that.__updateProjectsProgress();
            });
    };

    Company.prototype.__findDeveloperManager = function (developer) {
        var that = this;

        return Object.keys(this.busyManagers)
            .map(function (projectName) { return that.busyManagers[projectName] })
            .find(function (manager) { return manager.developers.some(function (dev) { return dev === developer }) });
    };

    Company.prototype.__addDevelopersToProject = function (projectName) {
        if (!this.freeDevelopers.length) {
            return;
        }

        var manager = this.busyManagers[projectName];
        var existingDevelopersCount = manager.developers.length;

        var developers = this.freeDevelopers.splice(0, MAX_DEVELOPERS_PER_MANAGER_COUNT - existingDevelopersCount)
            .filter(function (developer) { return !!developer });

        this.busyDevelopers = this.busyDevelopers.concat(developers);

        manager.updateDevelopers(developers);
    };

    Company.prototype.__updateProjectsProgress = function () {
        var that = this;

        Object.keys(this.busyManagers)
            .map(function (projectName) { return that.busyManagers[projectName] })
            .forEach(function (manager) {
                manager.updateProject();
            });
    };

    return Company;
})();