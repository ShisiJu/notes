// https://leetcode-cn.com/problems/string-without-aaa-or-bbb/submissions/
function strWithout3a3b(A, B) {
  let s = "";
  let atemp = 0;
  let btemp = 0;
  let temp = A + B;
  while (s.length < temp) {
    if ((A > B && atemp < 2) || (A <= B && btemp == 2)) {
      s += "a";
      A--;
      atemp++;
      btemp = 0;
    } else {
      s += "b";
      B--;
      atemp = 0;
      btemp++;
    }
  }
  return s;
}
