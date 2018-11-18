var Renderer = (function () {
    var SELECTORS = {
        TOGGLE_BUTTON: '.toggle-button',
        COMPANY_NAME_INPUT: '.company_name__input',
        COMPANY_BUDGET_INPUT: '.company_budget__input',
        STOP_REASON: '.stop-reason',
        ADD_PROJECT_BUTTON: '.game-project--form_add',
        PROJECT_NAME_INPUT: '.game-project--form_name__input',
        PROJECT_COST_INPUT: '.game-project--form_cost__input',
        PROJECT_LINES_INPUT: '.game-project--form_lines__input',
        ADD_MANAGER_BUTTON: '.game-managers--form_add',
        MANAGER_NAME_INPUT: '.game-managers--form_name__input',
        MANAGER_EXP_INPUT: '.game-managers--form_experience__input',
        BUDGET: '.budget-value',
        PROJECTS_CONTAINER: '.game-projects--list',
        FREE_MANAGERS_CONTAINER: '.game-managers__free',
        BUSY_MANAGERS_CONTAINER: '.game-managers__busy',
        FREE_DEVELOPERS_CONTAINER: '.game-developers__free',
        BUSY_DEVELOPERS_CONTAINER: '.game-developers__busy',
        TURN: '.turn',
        ADD_DEVELOPER_BUTTON: '.game-developers--form_add',
        DEVELOPER_NAME_INPUT: '.game-developers--form_name__input'
    };

    function Renderer() { }

    Renderer.elements = {
        TOGGLE_BUTTON: document.querySelector(SELECTORS.TOGGLE_BUTTON),
        COMPANY_NAME_INPUT: document.querySelector(SELECTORS.COMPANY_NAME_INPUT),
        COMPANY_BUDGET_INPUT: document.querySelector(SELECTORS.COMPANY_BUDGET_INPUT),
        STOP_REASON: document.querySelector(SELECTORS.STOP_REASON),
        PROJECT_NAME_INPUT: document.querySelector(SELECTORS.PROJECT_NAME_INPUT),
        PROJECT_COST_INPUT: document.querySelector(SELECTORS.PROJECT_COST_INPUT),
        PROJECT_LINES_INPUT: document.querySelector(SELECTORS.PROJECT_LINES_INPUT),
        ADD_PROJECT_BUTTON: document.querySelector(SELECTORS.ADD_PROJECT_BUTTON),
        ADD_MANAGER_BUTTON: document.querySelector(SELECTORS.ADD_MANAGER_BUTTON),
        MANAGER_NAME_INPUT: document.querySelector(SELECTORS.MANAGER_NAME_INPUT),
        MANAGER_EXP_INPUT: document.querySelector(SELECTORS.MANAGER_EXP_INPUT),
        BUDGET: document.querySelector(SELECTORS.BUDGET),
        PROJECTS_CONTAINER: document.querySelector(SELECTORS.PROJECTS_CONTAINER),
        FREE_MANAGERS_CONTAINER: document.querySelector(SELECTORS.FREE_MANAGERS_CONTAINER),
        BUSY_MANAGERS_CONTAINER: document.querySelector(SELECTORS.BUSY_MANAGERS_CONTAINER),
        FREE_DEVELOPERS_CONTAINER: document.querySelector(SELECTORS.FREE_DEVELOPERS_CONTAINER),
        BUSY_DEVELOPERS_CONTAINER: document.querySelector(SELECTORS.BUSY_DEVELOPERS_CONTAINER),
        TURN: document.querySelector(SELECTORS.TURN),
        ADD_DEVELOPER_BUTTON: document.querySelector(SELECTORS.ADD_DEVELOPER_BUTTON),
        DEVELOPER_NAME_INPUT: document.querySelector(SELECTORS.DEVELOPER_NAME_INPUT)
    };

    Renderer.prototype.addClickHandler = function (element, handler) {
        element.addEventListener('click', handler);
    };

    Renderer.prototype.getValueOf = function (element) {
        return element.value;
    };

    Renderer.prototype.updateStopReason = function (reason) {
        Renderer.elements.STOP_REASON.innerHTML = reason;
    };

    Renderer.prototype.updateToggleButton = function(isOn) {
        Renderer.elements.TOGGLE_BUTTON.innerHTML = isOn ? 'Stop' : 'Start';
    };

    Renderer.prototype.renderBudget = function (value) {
        Renderer.elements.BUDGET.innerHTML = value;
    };

    Renderer.prototype.renderProjects = function (projects) {
        Renderer.elements.PROJECTS_CONTAINER.innerHTML = null;

        Object.keys(projects)
            .map(function (name) { return projects[name]; })
            .forEach(function (project) {
            var row = utils.createRow(['span', 'span', 'span'], [project.name, project.cost, project.linesRequired]);

            Renderer.elements.PROJECTS_CONTAINER.appendChild(row);
        });
    };

    Renderer.prototype.renderManagers = function (freeManagers, busyManagers, handlers) {
        Renderer.elements.FREE_MANAGERS_CONTAINER.innerHTML = null;
        Renderer.elements.BUSY_MANAGERS_CONTAINER.innerHTML = null;

        freeManagers.forEach(function (manager) {
            var row = utils.createRow(
                ['span', 'span', 'button'],
                [
                    manager.name,
                    manager.exp,
                    {text: 'Fire', handler: handlers[0].action.bind(handlers[0].ctx, manager)}
                ]
            );

            Renderer.elements.FREE_MANAGERS_CONTAINER.appendChild(row);
        });

        Object.keys(busyManagers)
            .map(function (projectName) { return busyManagers[projectName]; })
            .forEach(function (manager) {
            var row = utils.createRow(['span', 'span'], [manager.name, manager.exp]);

            Renderer.elements.BUSY_MANAGERS_CONTAINER.appendChild(row);
        });
    };

    Renderer.prototype.renderDevelopers = function (freeDevelopers, busyDevelopers, handlers) {
        Renderer.elements.FREE_DEVELOPERS_CONTAINER.innerHTML = null;
        Renderer.elements.BUSY_DEVELOPERS_CONTAINER.innerHTML = null;

        var that = this;

        freeDevelopers.forEach(function (developer) {
            Renderer.elements.FREE_DEVELOPERS_CONTAINER.appendChild(that.__createDeveloperRow(developer, handlers));
        });

        busyDevelopers.forEach(function (developer) {
            Renderer.elements.BUSY_DEVELOPERS_CONTAINER.appendChild(that.__createDeveloperRow(developer, handlers));
        });
    };

    Renderer.prototype.__createDeveloperRow = function (developer, handlers) {
        return utils.createRow(
            ['span', 'span', 'button', 'button'],
            [
                developer.name,
                developer.getLevel(),
                {text: 'Fire', handler: handlers[0].action.bind(handlers[0].ctx, developer)},
                {text: 'Upgrade', handler: developer.upgrade.bind(developer)}
            ]
        );
    };

    Renderer.prototype.renderTurn = function (turn) {
        Renderer.elements.TURN.innerHTML = turn;
    };

    return Renderer;
})();