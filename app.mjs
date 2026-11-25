import {projects,categories,filterProjects,categoryFromSearch,whatsappUrl} from './data.mjs';

const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
function closeMenu(restore=false){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');if(restore)menu.focus();}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
matchMedia('(min-width:941px)').addEventListener('change',()=>closeMenu());

const filters=[...document.querySelectorAll('[data-filter]')];
if(filters.length){
 function applyFilter(category,updateUrl=false){
  for(const button of filters)button.setAttribute('aria-pressed',String(button.dataset.filter===category));
  for(const section of document.querySelectorAll('.project-category'))section.hidden=category!=='all'&&section.dataset.category!==category;
  const count=filterProjects(category).length;
  document.querySelector('#filter-status').textContent=`Showing ${count} ${category === 'all' ? 'projects' : categories[category].toLowerCase() + ' projects'}.`;
  if(updateUrl){const url=new URL(location.href);if(category==='all')url.searchParams.delete('category');else url.searchParams.set('category',category);history.pushState(null,'',url);}
 }
 for(const button of filters)button.addEventListener('click',()=>applyFilter(button.dataset.filter,true));
 window.addEventListener('popstate',()=>applyFilter(categoryFromSearch(location.search)));
 applyFilter(categoryFromSearch(location.search));
}

const dialog=document.querySelector('#project-dialog');
if(dialog){
 let trigger;
 for(const button of document.querySelectorAll('[data-project]'))button.addEventListener('click',()=>{
  const project=projects.find(p=>p.id===button.dataset.project);if(!project)return;
  trigger=button;
  document.querySelector('#dialog-title').textContent=project.name;
  document.querySelector('#dialog-location').textContent=project.location;
  document.querySelector('#dialog-category').textContent=categories[project.category];
  const media=document.querySelector('#dialog-media');media.replaceChildren();
  if(project.image){const image=document.createElement('img');image.src=project.image;image.alt=`${project.name} ${project.imageKind==='render'?'official developer render':'official building photograph'}`;media.append(image);}
  else{const placeholder=document.createElement('p');placeholder.className='dialog-placeholder';placeholder.textContent=project.id==='bangalore-one'?'Verified photo pending — exact Bangalore One centre needed.':'Verified building photo pending.';media.append(placeholder);}
  document.querySelector('#dialog-inquiry').href=whatsappUrl(`Hello Morwin Solutions, I would like to discuss a project similar to ${project.name}.`);
  const credit=document.querySelector('#dialog-credit');credit.replaceChildren();
  if(project.source){const source=document.createElement('a');source.href=project.source;source.target='_blank';source.rel='noopener';source.textContent=project.imageKind==='render'?'Official developer render · View source ↗':'Official project photograph · View source ↗';credit.append(source);}
  dialog.showModal();document.body.style.overflow='hidden';document.querySelector('.dialog-close').focus();
 });
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus();});
}
