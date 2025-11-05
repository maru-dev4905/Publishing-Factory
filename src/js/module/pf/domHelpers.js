export const Dom = {
  q: (sel, ctx = document) => ctx.querySelector(sel),
  qq: (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel)),
};

export function setDomHelpers({q, qq} = {}) {
  if(q) Dom.q = q;
  if(qq) Dom.qq = qq;
}