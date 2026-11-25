/* Modo independiente (Vercel u otro hosting).
   La versión dentro de Claude usa la base de datos compartida de Claude.
   Fuera de Claude, este archivo la reemplaza por un almacenamiento en el
   navegador (localStorage): los datos quedan guardados en ESTE dispositivo. */
(function () {
  if (window.claude && typeof window.claude.use === 'function') return;
  window.__cuareLocal = true;

  const PREFIX = 'cuare_';
  const SEED = {
    cats: {
      impresoras: { id: 'impresoras', nombre: 'Impresoras', inicio: 4001, orden: 1, campos: [
        { k: 'tipo', l: 'Tipo', o: ['Mono', 'Color'] },
        { k: 'consumible', l: 'Consumible', o: ['Tóner', 'Tinta'] },
        { k: 'wifi', l: 'Wifi', o: ['Sí', 'No'] },
        { k: 'multifuncional', l: 'Multifuncional', o: ['Sí', 'No'] }] },
      monitores: { id: 'monitores', nombre: 'Monitores', inicio: 801, orden: 2, campos: [
        { k: 'puerto', l: 'Puerto' },
        { k: 'pulgadas', l: 'Pulgadas' },
        { k: 'regulable', l: 'Regulable', o: ['Sí', 'No'] },
        { k: 'forma', l: 'Forma', o: ['Rectangular', 'Cuadrado'] }] },
      toner: { id: 'toner', nombre: 'Tóner y derivados', inicio: 5100, orden: 3, campos: [
        { k: 'color', l: 'Color', o: ['Negro', 'Cyan', 'Magenta', 'Amarillo'] },
        { k: 'lote', l: 'Lote' },
        { k: 'compatibles', l: 'Impresoras compatibles', t: 'largo' }] },
      cartuchos: { id: 'cartuchos', nombre: 'Cartuchos de tinta', inicio: 6001, orden: 4, campos: [
        { k: 'color', l: 'Color' },
        { k: 'vence', l: 'Vencimiento' },
        { k: 'compatibles', l: 'Impresoras compatibles', t: 'largo' }] }
    }
  };

  const clone = o => JSON.parse(JSON.stringify(o));
  const mem = {};
  const subs = {};

  function load(n) {
    if (mem[n]) return mem[n];
    let d = null;
    try { d = JSON.parse(localStorage.getItem(PREFIX + n) || 'null'); } catch (e) {}
    if (!d || typeof d !== 'object') d = SEED[n] ? clone(SEED[n]) : {};
    mem[n] = d;
    return d;
  }
  function persist(n) {
    try { localStorage.setItem(PREFIX + n, JSON.stringify(mem[n])); }
    catch (e) { const err = new Error('No se pudo guardar'); err.code = 'quota_exceeded'; throw err; }
  }
  function snap(n, q) {
    let arr = Object.entries(load(n)).map(([id, d]) => ({ id, d }));
    if (q.f) arr.sort((a, b) => {
      const x = a.d[q.f], y = b.d[q.f];
      const r = x < y ? -1 : x > y ? 1 : 0;
      return q.d === 'desc' ? -r : r;
    });
    if (q.l) arr = arr.slice(0, q.l);
    return { docs: arr.map(x => ({ id: x.id, data: () => clone(x.d) })), metadata: { fromCache: false } };
  }
  function notify(n) {
    (subs[n] || []).forEach(s => { try { s.cb(snap(n, s.q)); } catch (e) { console.error(e); } });
  }
  function change(n) { persist(n); notify(n); }

  function query(n, q) {
    return {
      orderBy(f, d) { return query(n, Object.assign({}, q, { f, d: d || 'asc' })); },
      limit(l) { return query(n, Object.assign({}, q, { l })); },
      onSnapshot(cb) {
        const s = { cb, q };
        (subs[n] = subs[n] || []).push(s);
        setTimeout(() => cb(snap(n, q)), 0);
        return () => { subs[n] = (subs[n] || []).filter(x => x !== s); };
      }
    };
  }
  function collection(n) {
    return Object.assign(query(n, {}), {
      doc(id) {
        return {
          async set(o) { load(n)[id] = clone(o); change(n); },
          async update(p) {
            const m = load(n);
            if (!m[id]) { const e = new Error('No existe'); e.code = 'not_found'; throw e; }
            Object.assign(m[id], clone(p)); change(n);
          },
          async delete() { delete load(n)[id]; change(n); }
        };
      },
      async add(o) {
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        load(n)[id] = clone(o); change(n);
        return { id };
      }
    });
  }

  // Si la app está abierta en otra pestaña del mismo navegador, se mantiene al día.
  window.addEventListener('storage', e => {
    if (e.key && e.key.startsWith(PREFIX)) { const n = e.key.slice(PREFIX.length); delete mem[n]; notify(n); }
  });

  const MIME = { xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', html: 'text/html', png: 'image/png' };
  const downloads = {
    async save({ filename, data }) {
      const ext = String(filename).split('.').pop().toLowerCase();
      const blob = data instanceof Blob ? data : new Blob([data], { type: MIME[ext] || 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }
  };

  const db = { collection };
  window.claude = { async use(k) { return k === 'db' ? db : k === 'downloads' ? downloads : null; } };
})();
