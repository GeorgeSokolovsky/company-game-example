var game = new Game();
var renderer = new Renderer();

renderer.addClickHandler(Renderer.elements.TOGGLE_BUTTON, function () {
    if (game.isOn) {
        game.interruptGame();
        renderer.updateStopReason(game.stopReason);
        renderer.updateToggleButton(game.isOn);

        return;
    }

    var companyName = renderer.getValueOf(Renderer.elements.COMPANY_NAME_INPUT);
    var companyBudget = +renderer.getValueOf(Renderer.elements.COMPANY_BUDGET_INPUT);

    game.start(companyName, companyBudget);
    renderer.updateToggleButton(game.isOn);
    renderer.updateStopReason('');
});

renderer.addClickHandler(Renderer.elements.ADD_PROJECT_BUTTON, function () {
    var projectName = renderer.getValueOf(Renderer.elements.PROJECT_NAME_INPUT);
    var projectCost = +renderer.getValueOf(Renderer.elements.PROJECT_COST_INPUT);
    var projectLines = +renderer.getValueOf(Renderer.elements.PROJECT_LINES_INPUT);

    var project = new Project(projectName, projectCost, projectLines);

    try {
        game.company.startProject(project);
    } catch (e) {
        renderer.updateStopReason(e);
    }
});

renderer.addClickHandler(Renderer.elements.ADD_MANAGER_BUTTON, function () {
    var name = renderer.getValueOf(Renderer.elements.MANAGER_NAME_INPUT);
    var exp = renderer.getValueOf(Renderer.elements.MANAGER_EXP_INPUT);

    var manager = new Manager(name, exp);

    game.company.addManager(manager);
});

renderer.addClickHandler(Renderer.elements.ADD_DEVELOPER_BUTTON, function () {
    var name = renderer.getValueOf(Renderer.elements.DEVELOPER_NAME_INPUT);

    var developer = new Developer(name, 1);

    game.company.addDeveloper(developer);
});