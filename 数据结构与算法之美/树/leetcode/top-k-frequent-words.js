// https://leetcode-cn.com/problems/top-k-frequent-words/
let {BaseHeap} = require("../base-heap")


function SmallObjHeap(){
  var compare = function(a, b){
    

  }


  return new BaseHeap(compare)
}


/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
  const map = new Map();
  words.forEach(w => {
    // 如果没有设置为1
    if(!map.has(w)){
      map.set(w, 1)
    }else{
      // 如果有 +1
      map.set(w, map.get(w) + 1)
    }
  })


  let result = []
  map.keys(k => {
  })

  map.forEach((count,word)=>{
    result.push({word, count})
  })

  result.sort((a, b)=> {
    
    if(a.count == b.count){
      if(a.word > b.word){
        return 1
      }else{
        return -1
      }
    }else{
      return  b.count - a.count
    }
  })
  

  // 之后尝试用堆
  // 小顶堆里存K个数据
  // 然后堆排序
  console.log(result);

};


let data=  ["i", "love", "leetcode", "i", "love", "coding"], k = 2




topKFrequent(data , k)