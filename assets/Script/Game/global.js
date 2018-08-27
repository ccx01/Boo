module.exports = {
    distance: 0
};

Math.seed = Math.random() * 100000;
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280.0;
    return min + rnd * (max - min);
};