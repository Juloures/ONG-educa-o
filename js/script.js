// script.js - funcionalidades básicas: year, nav toggle, form masks and validation
document.addEventListener('DOMContentLoaded', () => {
  // current year in footer
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  const el2 = document.getElementById('year2');
  if(el) el.textContent = y;
  if(el2) el2.textContent = y;

  // nav toggle for small screens
  const navToggle = document.querySelector('.nav-toggle');
  const mainMenu = document.getElementById('main-menu');
  if(navToggle){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainMenu.style.display = expanded ? 'none' : 'flex';
    });
    // hide menu initially on small screens
    if(window.innerWidth < 700) mainMenu.style.display = 'none';
    window.addEventListener('resize', () => {
      if(window.innerWidth >= 700) mainMenu.style.display = 'flex';
      else mainMenu.style.display = 'none';
    });
  }

  // input masks
  function setCursorToEnd(el){ if(el.setSelectionRange){const len=el.value.length; el.setSelectionRange(len,len)} }
  const cpfEl = document.getElementById('cpf');
  const telEl = document.getElementById('telefone');
  const cepEl = document.getElementById('cep');

  function maskCPF(v){
    return v.replace(/\D/g,'').slice(0,11).replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  }
  function maskTel(v){
    v = v.replace(/\D/g,'').slice(0,11);
    if(v.length>10) return v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
    return v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').replace(/\s-$/,'');
  }
  function maskCEP(v){
    return v.replace(/\D/g,'').slice(0,8).replace(/(\d{5})(\d{1,3})/,'$1-$2');
  }

  if(cpfEl){
    cpfEl.addEventListener('input', e => {
      const v = e.target.value;
      e.target.value = maskCPF(v);
    });
    cpfEl.addEventListener('blur', e=>{
      if(e.target.value && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(e.target.value)){
        e.target.setCustomValidity('Formato de CPF inválido.');
      } else e.target.setCustomValidity('');
    });
  }
  if(telEl){
    telEl.addEventListener('input', e => e.target.value = maskTel(e.target.value));
    telEl.addEventListener('blur', e=>{
      if(e.target.value && !/^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(e.target.value)){
        e.target.setCustomValidity('Formato de telefone inválido.');
      } else e.target.setCustomValidity('');
    });
  }
  if(cepEl){
    cepEl.addEventListener('input', e => e.target.value = maskCEP(e.target.value));
  }

  // form submission - demo: show message and reset
  const form = document.getElementById('cadastroForm');
  const msg = document.getElementById('formMessage');
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      if(!form.reportValidity()) return;
      // simulate saving (in real app, send to server)
      const name = form.nome.value || 'Usuário';
      msg.textContent = `Obrigado, ${name}! Seu cadastro foi recebido. Em breve entraremos em contato.`;
      form.reset();
    });
  }

});
