import('./app.mjs').catch(()=>{
 const panel=document.getElementById('load-state');panel.hidden=false;panel.setAttribute('role','alert');document.body.removeAttribute('aria-busy');document.getElementById('load-title').textContent='The game could not start.';document.getElementById('load-description').textContent='A required game file could not load. Check your connection and reload the garden.';
});
