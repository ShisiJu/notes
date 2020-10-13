/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  let total = 0;
  let result = [];
  let columns = new Array(n);
  const is_ok = function(row) {
      for(let i = 0; i < row; i++) {
          if(columns[row] === columns[i] || Math.abs(columns[row] - columns[i]) === Math.abs(row - i)) {
              return false;
          }
      }
      return true;
  }

  const queen = function(row) {
      if(row === n) {
          total++;
          result.push(normalize(columns));
      } else {
          for(let i = 0; i < n; i++) {
              columns[row] = i;
              if(is_ok(row)) {
                  queen(row+1);
              }
          }
      }
  }

  var normalize = function(columns) {
      let temp = new Array(n);

      for(let i = 0; i < n; i++) {
          var str = '';
          for(let j = 0; j < n; j++) {
              if(j !== columns[i]) {
                  str += '.';
              } else {
                  str += 'Q';
              }
          }
          temp[i] = str;
      }
      return temp;
  }

  queen(0);
  
  return result;
};