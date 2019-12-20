import EmberObject from '@ember/object';
import { computed } from '@ember/object';

import SharedStuff from '../mixins/shared-stuff';

export default EmberObject.extend(SharedStuff, {
    init(){
      this._super(...arguments);

      this.squareSize = 40;

      this.grid = [
          [2, 2, 2, 2, 2, 2, 2, 1],
          [2, 1, 2, 1, 2, 2, 2, 1],
          [2, 2, 1, 2, 2, 2, 2, 1],
          [2, 2, 2, 2, 2, 2, 2, 1],
          [2, 2, 2, 2, 2, 2, 2, 1],
          [1, 2, 2, 2, 2, 2, 2, 1],
      ];
      
      this.startingPac = {
        x: 2,
        y: 1
      };   
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
        let grid = this.get('grid');
        grid.forEach((row, rowIndex)=>{
          row.forEach((cell, columnIndex)=>{
            if(cell == 0){
              grid[rowIndex][columnIndex] = 2;
            }
          });
        });
    }
});