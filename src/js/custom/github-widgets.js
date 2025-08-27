// src/js/custom/github-widgets.js
const $$ = (sel, root=document) => root.querySelector(sel);
const fmt = iso => new Date(iso).toISOString().split('T')[0];

async function fetchJSON(url){
  const res = await fetch(url, { headers:{ 'Accept':'application/vnd.github+json' }});
  if(!res.ok) throw new Error(res.status + ' ' + url);
  return res.json();
}

/** Latest Release + Download */
async function initLatest(el){
  const owner = el.dataset.ghOwner;
  const repo  = el.dataset.ghRepo;

  try{
    // 1) releases/latest 시도
    const rel = await fetchJSON(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
    const ver = rel.tag_name || rel.name || 'latest';
    const date= rel.published_at || rel.created_at;
    // 에셋이 있으면 첫 에셋, 없으면 태그 zip
    const asset = (rel.assets && rel.assets[0]) ? rel.assets[0].browser_download_url
        : `https://github.com/${owner}/${repo}/archive/refs/tags/${ver}.zip`;

    $$('[data-role="version"]', el).textContent = ver;
    $$('[data-role="date"]', el).textContent = date ? fmt(date) : '';
    $$('[data-role="download"]', el).href = asset;
    $$('[data-role="changelog"]', el).href = rel.html_url;

  } catch(e){
    // 2) 릴리스가 없으면 main 브랜치 zip으로 폴백
    $$('[data-role="version"]', el).textContent = 'main';
    $$('[data-role="date"]', el).textContent = '';
    $$('[data-role="download"]', el).href =
        `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;
    $$('[data-role="changelog"]', el).href =
        `https://github.com/${owner}/${repo}/commits/main`;
  }
}

/** Recent Commits (5개) */
async function initCommits(el){
  const owner = el.dataset.ghOwner;
  const repo  = el.dataset.ghRepo;
  const list  = $$('[data-role="commits"]', el);
  list.innerHTML = '<li class="muted">로딩중…</li>';

  try{
    const items = await fetchJSON(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`
    );
    list.innerHTML = items.map(c=>{
      const msg = (c.commit.message || '').split('\n')[0];
      const url = c.html_url;
      const d   = fmt(c.commit.author.date);
      const sha = c.sha.slice(0,7);
      return `<li><a href="${url}" target="_blank" rel="noreferrer">${msg}</a> <span class="muted">(${d} · ${sha})</span></li>`;
    }).join('');
    $$('[data-role="repo"]', el).href = `https://github.com/${owner}/${repo}`;
  } catch(e){
    list.innerHTML = '<li class="muted">커밋 정보를 불러오지 못했습니다.</li>';
  }
}

/** boot */
document.addEventListener('DOMContentLoaded', ()=>{
  const latest = document.getElementById('pf-latest');
  const commits= document.getElementById('pf-commits');
  if(latest) initLatest(latest);
  if(commits) initCommits(commits);
});
