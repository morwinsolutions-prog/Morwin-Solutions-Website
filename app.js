const projects = [{"id": "nambiar-district-25", "category": "residential", "name": "Nambiar District 25", "location": "Dommasandra, Off Sarjapur Road, Bengaluru", "image": null}, {"id": "nambiar-bellezea", "category": "residential", "name": "Nambiar Bellezea", "location": "Narayanaghatta / Harohalli, Bengaluru", "image": null}, {"id": "nambiar-ellegenza", "category": "residential", "name": "Nambiar Ellegenza", "location": "Gopasandra, Bengaluru", "image": null}, {"id": "nambiar-millenia", "category": "residential", "name": "Nambiar Millenia", "location": "Muthanallur, Bommasandra, Bengaluru", "image": null}, {"id": "bren-aspera", "category": "residential", "name": "Bren Aspera", "location": "Huskur, Bengaluru", "image": null}, {"id": "bren-pominus", "category": "residential", "name": "Bren Pominus", "location": "Kaikondrahalli, Bengaluru", "image": null}, {"id": "hm-scottsville", "category": "residential", "name": "HM Scottsville", "location": "Kasavanahalli, Off Sarjapur Road, Bengaluru", "image": null}, {"id": "valmark-cityville", "category": "residential", "name": "Valmark Cityville", "location": "Tejaswini Nagar / Bannerghatta Road, Bengaluru", "image": null}, {"id": "navami-chamara-heights", "category": "residential", "name": "Navami Chamara Heights", "location": "Ullal, Bengaluru", "image": null}, {"id": "hoysala-hallmark", "category": "residential", "name": "Hoysala Hallmark", "location": "Nagavara / Veerannapalya, Bengaluru", "image": null}, {"id": "arvind-bel-air", "category": "residential", "name": "Arvind Bel Air", "location": "Vidyaranyapura, Bengaluru", "image": "assets/project-bel-air.webp"}, {"id": "arvind-the-edge", "category": "residential", "name": "Arvind The Edge", "location": "Nagasandra, Bengaluru", "image": "assets/project-edge.webp"}, {"id": "bangalore-one", "category": "commercial", "name": "Bangalore One", "location": "Bengaluru, Karnataka", "image": null}, {"id": "aveksha-yelahanka", "category": "commercial", "name": "Aveksha Hospitals – Yelahanka", "location": "Yelahanka, Bengaluru", "image": null}, {"id": "aveksha-ms-palya", "category": "commercial", "name": "Aveksha Hospitals – MS Palya", "location": "MS Palya, Bengaluru", "image": null}, {"id": "nmit", "category": "education", "name": "Nitte Meenakshi Institute of Technology (NMIT)", "location": "Yelahanka, Bengaluru", "image": null}, {"id": "jain-global-campus", "category": "education", "name": "JAIN University – Global Campus", "location": "Jakkasandra, Kanakapura, Karnataka", "image": null}, {"id": "xime", "category": "education", "name": "Xavier Institute of Management & Entrepreneurship (XIME)", "location": "Electronic City, Bengaluru", "image": null}, {"id": "rvk-dharwad", "category": "education", "name": "Rashtrotthana Vidya Kendra (RVK)", "location": "Dharwad, Karnataka", "image": null}, {"id": "rvk-srinagar", "category": "education", "name": "Rashtrotthana Vidya Kendra (CBSE) – Srinagar", "location": "Srinagar 2nd Stage, Mysuru", "image": null}, {"id": "rvk-vijayanagar", "category": "education", "name": "Rashtrotthana Vidya Kendra (CBSE) – Vijayanagar", "location": "Vijayanagar, Mysuru", "image": null}, {"id": "rvk-sattur", "category": "education", "name": "Rashtrotthana Vidya Kendra (CBSE) – Sattur", "location": "Sattur, Dharwad", "image": null}, {"id": "rvk-davanagere", "category": "education", "name": "Rashtrotthana Vidya Kendra (CBSE) – Davanagere", "location": "Nittuvalli, Davanagere", "image": null}, {"id": "rvk-hagaribommanahalli", "category": "education", "name": "Rashtrotthana Vidya Kendra (CBSE) – Hagaribommanahalli", "location": "Hagaribommanahalli, Vijayanagara District", "image": null}];
const categories={all:'All projects',residential:'Residential',commercial:'Commercial',education:'Schools & colleges'};
function filterProjects(category){return Object.hasOwn(categories,category)&&category!=='all'?projects.filter(p=>p.category===category):projects;}
function categoryFromSearch(search){const value=new URLSearchParams(search).get('category');return Object.hasOwn(categories,value)?value:'all';}
function whatsappUrl(message='Hello Morwin Solutions, I would like to discuss a painting project.'){return 'https://wa.me/919180380755?text='+encodeURIComponent(message);}


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
  if(project.image){const image=document.createElement('img');image.src=project.image;image.alt=`${project.name} building reference`;media.append(image);}
  else{const placeholder=document.createElement('p');placeholder.className='dialog-placeholder';placeholder.textContent='Project photos will be added soon.';media.append(placeholder);}
  document.querySelector('#dialog-inquiry').href=whatsappUrl(`Hello Morwin Solutions, I would like to discuss a project similar to ${project.name}.`);
  dialog.showModal();document.body.style.overflow='hidden';document.querySelector('.dialog-close').focus();
 });
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus();});
}
