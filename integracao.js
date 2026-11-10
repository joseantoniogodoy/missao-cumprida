import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {getAuth,signInAnonymously,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {getFirestore,doc,setDoc,collection,onSnapshot,serverTimestamp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import {firebaseConfig} from './firebase-config.js';
const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app);
const params=new URLSearchParams(location.search);
const sala=(params.get('sala')||'mentoria-iv').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,64);
const isAdmin=params.get('painel')==='1';
let uid=null, ready=false, writing=false, pending=false, remoteVersion='';
const status=document.createElement('div');status.style.cssText='position:fixed;bottom:12px;right:12px;background:#09264a;color:white;padding:9px 14px;border-radius:9px;z-index:9999;font:13px Arial';status.textContent='Conectando ao Firebase...';document.body.appendChild(status);
function score(){return state.scores.reduce((n,x)=>n+(Number(x.points)||0),0)}
function snapshot(){return {ownerUid:uid,team:state.team,school:state.school,week:state.week,unlocked:state.unlocked,total:score(),updatedAt:serverTimestamp(),game:JSON.stringify(state)}}
async function upload(){if(!ready||!uid||!state.team||isAdmin)return; if(writing){pending=true;return;}writing=true;try{await setDoc(doc(db,'salas',sala,'equipes',uid),snapshot());status.textContent='Partida sincronizada';}catch(e){status.textContent='Erro ao sincronizar: '+e.message;console.error(e)}finally{writing=false;if(pending){pending=false;upload()}}}
const oldPersist=window.persist;
window.persist=function(){oldPersist();upload()};
function adminView(){document.querySelector('main').innerHTML='<section class="panel"><h1>Painel central — Missão Cumprida?</h1><p>Sala: <b id="room"></b> · Atualização automática</p><p id="summary"></p><div id="teams"></div></section>';document.getElementById('room').textContent=sala;document.querySelector('header .row')?.remove();onSnapshot(collection(db,'salas',sala,'equipes'),qs=>{const teams=qs.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>b.total-a.total);document.getElementById('summary').textContent=`${teams.length} equipe(s) conectada(s) · ${teams.filter(t=>t.unlocked>=4).length} concluída(s)`;const area=document.getElementById('teams');area.replaceChildren();teams.forEach((t,i)=>{const el=document.createElement('article');el.className='panel';el.style.margin='12px 0';const h=document.createElement('h2');h.textContent=`${i+1}º · ${t.team||'Equipe'} — ${t.total||0}/100 pontos`;const p=document.createElement('p');p.textContent=`Escola fictícia: ${t.school||'-'} | Rodadas concluídas: ${Math.min(t.unlocked||0,4)}/4 | Rodada atual: ${Math.min((t.week||0)+1,4)}`;const btn=document.createElement('button');btn.className='btn secondary';btn.textContent='Ver decisões e justificativas';const detail=document.createElement('pre');detail.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;display:none;font:13px Arial';btn.onclick=()=>{detail.style.display=detail.style.display==='none'?'block':'none'};try{const game=JSON.parse(t.game);detail.textContent=game.rounds.map((r,j)=>`Rodada ${j+1}\nPrioridades: ${r.priorities}\nJustificativa: ${r.reason}\nAdiamentos: ${r.deferred}\nVerificação: ${r.verification}`).join('\n\n')}catch(e){detail.textContent='Registro indisponível'}el.append(h,p,btn,detail);area.append(el)});status.textContent='Painel atualizado';},e=>status.textContent='Erro no painel: '+e.message)}
try {
  await signInAnonymously(auth);
  onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    uid = user.uid;
    ready = true;
    if (isAdmin) {
      adminView();
      return;
    }
    const {getDoc} = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
    try {
      const snap = await getDoc(doc(db, 'salas', sala, 'equipes', uid));
      if (snap.exists() && snap.data().game) {
        state = JSON.parse(snap.data().game);
        oldPersist();
        render();
        status.textContent = 'Partida recuperada da nuvem';
      } else {
        status.textContent = 'Conectado · Sala ' + sala;
        if (state.team) upload();
      }
    } catch (e) {
      status.textContent = 'Falha ao recuperar partida: ' + e.message;
      console.error(e);
    }
  });
} catch (e) {
  status.textContent = 'Erro Firebase: ' + e.message;
  console.error(e);
}
