// game.js
let pets = JSON.parse(localStorage.getItem('pets')||'[]');
function save(){localStorage.setItem('pets', JSON.stringify(pets));}
function addPet(){
  pets.push({id:Date.now(),fome:100,diversao:100,limpeza:100,stage:0});
  save(); render();
}
function care(p, attr){
  p[attr] = Math.min(100, p[attr]+20);
  if(p.stage === 2 && attr==='fome') triggerStrange(p);
  save(); render();
}
function triggerStrange(p){
  alert('...' + `O bandolete parece ver algo além`);
  // ative eventos mais estranhos aqui
}
function update(){
  pets.forEach(p=>{
    p.fome-=1; p.diversao-=1; p.limpeza-=0.5;
    if(p.fome<50 && p.diversao<50 && p.limpeza<50 && p.stage<3) p.stage++;
    if(p.fome<=0||p.diversao<=0||p.limpeza<=0) alert('Um bandolete morreu...');
  });
  save(); render();
}
function render(){
  const div = document.getElementById('pets');
  div.innerHTML = pets.map(p=>{
    return `
    <div>
      <b>Pet ${p.id}</b><br>
      Fome:${p.fome|0} Diversão:${p.diversao|0} Limpeza:${p.limpeza|0}<br>
      <button onclick="care(${p.id}, 'fome')">Alimentar</button>
      <button onclick="care(${p.id}, 'diversao')">Brincar</button>
      <button onclick="care(${p.id}, 'limpeza')">Limpar</button>
    </div>`;
  }).join('');
}
setInterval(update, 1000*60); // a cada minuto
render();
