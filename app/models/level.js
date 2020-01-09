import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { copy } from '@ember/object/internals';

import SharedStuff from '../mixins/shared-stuff';

export default EmberObject.extend(SharedStuff, {
    init(){
      this._super(...arguments);

      this.squareSize = 60;

      this.layout = [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
          [1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1],
          [1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
          [1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1],
          [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2],
          [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
          [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 1],
          [1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1],
          [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ];

      this.ghostRetreat = {
        x: 8,
        y: 4
      };
      
      this.startingPac = {
        x: 8,
        y: 6
      };
      
      this.startingGhosts = [{
        x: 1,
        y: 1
      }, {
          x: 15,
          y: 1
      }];

      this.teleport = false;
    },
 
    width: computed(function(){
        return this.get('grid.firstObject.length');
    }),

    height: computed(function(){
        return this.get('grid.length');
    }),
      
    pixelWidth: computed(function(){
        return this.get('width') * this.get('squareSize');
    }),

    pixelHeight: computed(function(){
        return this.get('height') * this.get('squareSize');
    }),

    isComplete(){
        let hasPelletLeft = false;
        let grid = this.get('grid');
    
        grid.forEach((row)=>{
          row.forEach((cell)=>{
            if(cell == 2){
              hasPelletLeft = true;
            }
          })
        })
        return !hasPelletLeft;
    },

    restart(){
        let newGrid = copy(this.get('layout'), true);
        this.set('grid', newGrid);
    }
});