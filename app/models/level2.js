import Level from './level';

export default Level.extend({
    init(){
        this._super(...arguments);

        this.grid = [
            [2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 1, 1, 2, 1, 2, 1, 1, 2],
            [2, 1, 2, 2, 2, 2, 2, 1, 2],
            [2, 2, 2, 1, 1, 1, 2, 2, 2],
            [2, 1, 2, 2, 2, 2, 2, 1, 2],
            [2, 1, 1, 2, 1, 2, 1, 1, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2],
        ];

        this.startingPac = {
            x: 0,
            y: 3
        };
    }
})