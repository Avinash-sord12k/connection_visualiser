var mainMenu = $('.control-container');
var toggler = $('#toggle-control-panel');

var randomNodeGenerator = $('#random-node-generation');
var controlledNodeGenerator = $('#controlled-node-generation');

var reset = $('#reset');
var save = $('#save');

var nodeControls = $('#node-control');
var nodeCount = $('#node-count');
var connectionRange = $('#connection-range');
var nodeSize = $('#node-size');
var colorAngle = $('#color-angle');

var orbControls = $('#orb-control');
var orbSize = $('#orb-size');
var orbSpeed = $('#orb-speed');

var patternControls = $('#pattern-control');
var padding = $('#padding');
var polygonSides = $('#polygon-sides');
var interlocking = $('#interlocking');

toggler.on("click", function () {
    console.log("hello world");
    mainMenu.toggleClass("shifted");
    if (mainMenu.hasClass("shifted")) {
        toggler.text("settings");
    } else {
        toggler.text("close");
    }
});

randomNodeGenerator.on("click", function () {
    randomNodeGenerator.addClass("active");
    controlledNodeGenerator.removeClass("active");
    patternControls.addClass("collapse");
    setTimeout(function () {
        patternControls.addClass("hide");
    }, 400);
    resetPage();
    createPopulation(nodeCount.val(), connectionRange.val());
    console.log(nodes.length, energyBalls);
});

controlledNodeGenerator.on("click", function () {
    randomNodeGenerator.removeClass("active");
    controlledNodeGenerator.addClass("active");
    patternControls.removeClass("hide");
    setTimeout(function () {
        patternControls.removeClass("collapse");
    }, 400);
    resetPage();
    createHexagonalPopulation(redius = 20, sides = 6, padding = 10, interlocking = 1);
});

reset.on("click", function () {
    resetPage();
    if (randomNodeGenerator.hasClass("active")) {
        createPopulation(nodeCount.val(), connectionRange.val());
    } else {
        createHexagonalPopulation(redius = 20, sides = 6, padding = 10, interlocking = 1);
    }
});

save.on("click", function () {
    if (randomNodeGenerator.hasClass("active")) {
        nodeCountValue = nodeCount.val();
        connectionRangeValue = connectionRange.val();
        nodeSizeValue = nodeSize.val();
        colorAngleValue = colorAngle.val();

        orbSizeValue = orbSize.val();
        orbSpeedValue = orbSpeed.val();

        nodeSize = nodeSizeValue;
        colorShift = colorAngleValue;

        orbSize = orbSizeValue;
        orbSpeed = orbSpeedValue;

        orb

        createPopulation(nodeCountValue, connectionRangeValue);

    } else {
        nodeCountValue = nodeCount.val();
        nodeSizeValue = nodeSize.val();
        colorAngleValue = colorAngle.val();
        
        orbCountValue = orbCount.val();
        orbSizeValue = orbSize.val();
        orbSpeedValue = orbSpeed.val();

        paddingValue = padding.val();
        polygonSidesValue = polygonSides.val();
        interlockingValue = interlocking.val();

        nodeSize = nodeSizeValue;
        colorAngle = colorAngleValue;

        orbSize = orbSizeValue;
        orbSpeed = orbSpeedValue;

        createHexagonalPopulation(radius = 20, sides = 6, padding = paddingValue, interlocking = interlockingValue);
    }
});
