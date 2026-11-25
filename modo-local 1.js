/* Modo independiente (Vercel u otro hosting).
   La versión dentro de Claude usa la base de datos compartida de Claude.
   Fuera de Claude, este archivo la reemplaza por un almacenamiento en el
   navegador (localStorage): los datos quedan guardados en ESTE dispositivo. */
(function () {
  if (window.claude && typeof window.claude.use === 'function') return;
  window.__cuareLocal = true;

  const PREFIX = 'cuare_';
  // Inventario inicial (copiado de la versión de Claude el 24-11-2026).
  // Se carga solo la primera vez que se abre la app en un dispositivo.
  const SEED_ITEMS = {"4001": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono", "wifi": "Sí"}, "cant": 12, "cat": "impresoras", "code": "4001", "cond": "Buena", "marca": "HP", "modelo": "LaserJet M404", "obs": "Verificar cantidad (hoja dice 12)", "precio": 90000, "revisar": true, "ubic": "", "ts": 1795500000000}, "4002": {"a": {"consumible": "Tóner", "tipo": "Mono", "wifi": "No"}, "cant": 2, "cat": "impresoras", "code": "4002", "cond": "Buena", "marca": "HP", "modelo": "LaserJet E52645", "obs": "", "precio": 280000, "revisar": false, "ubic": "A", "ts": 1795500000000}, "4003": {"a": {"consumible": "Tóner", "multifuncional": "Sí", "tipo": "Color", "wifi": "No"}, "cant": 2, "cat": "impresoras", "code": "4003", "cond": "Con detalles", "marca": "Lexmark", "modelo": "CS622", "obs": "Hoja dice “falta tóner…”; verificar", "precio": 0, "revisar": true, "ubic": "A", "ts": 1795500000000}, "4004": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono", "wifi": "No"}, "cant": 3, "cat": "impresoras", "code": "4004", "cond": "Buena", "marca": "Canon", "modelo": "MF113W", "obs": "", "precio": 0, "revisar": false, "ubic": "A", "ts": 1795500000000}, "4005": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono", "wifi": "No"}, "cant": 1, "cat": "impresoras", "code": "4005", "cond": "Con detalles", "marca": "HP", "modelo": "LaserJet P1606dn", "obs": "Con poco tóner", "precio": 60000, "revisar": false, "ubic": "B", "ts": 1795500000000}, "4006": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono"}, "cant": 1, "cat": "impresoras", "code": "4006", "cond": "Con falla", "marca": "Brother", "modelo": "HL-5340D", "obs": "En bodega, con problemas (nota poco legible)", "precio": 0, "revisar": true, "ubic": "B", "ts": 1795500000000}, "4008": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono", "wifi": "Sí"}, "cant": 1, "cat": "impresoras", "code": "4008", "cond": "Buena", "marca": "HP", "modelo": "LaserJet M404", "obs": "Código asignado al transcribir (sin código en la hoja)", "precio": 80000, "revisar": true, "ubic": "", "ts": 1795500000000}, "4009": {"a": {"consumible": "Tóner", "multifuncional": "Sí", "tipo": "Mono", "wifi": "Sí"}, "cant": 1, "cat": "impresoras", "code": "4009", "cond": "Buena", "marca": "HP", "modelo": "LaserJet M402", "obs": "Código asignado al transcribir; verificar precio y cantidad", "precio": 180000, "revisar": true, "ubic": "", "ts": 1795500000000}, "4010": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono", "wifi": "No"}, "cant": 1, "cat": "impresoras", "code": "4010", "cond": "Buena", "marca": "Brother", "modelo": "HL-L2320D", "obs": "Código asignado al transcribir", "precio": 40000, "revisar": true, "ubic": "B", "ts": 1795500000000}, "4011": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono", "wifi": "No"}, "cant": 1, "cat": "impresoras", "code": "4011", "cond": "Buena", "marca": "Brother", "modelo": "HL-2270DW", "obs": "Código asignado al transcribir", "precio": 40000, "revisar": true, "ubic": "B", "ts": 1795500000000}, "4100": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono", "wifi": "No"}, "cant": 1, "cat": "impresoras", "code": "4100", "cond": "Con falla", "marca": "HP", "modelo": "LaserJet P1600", "obs": "Sin tapa, sin tóner", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "4101": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono", "wifi": "Sí"}, "cant": 1, "cat": "impresoras", "code": "4101", "cond": "Con falla", "marca": "HP", "modelo": "LaserJet M201dw", "obs": "Sin tapas", "precio": 0, "revisar": false, "ubic": "A", "ts": 1795500000000}, "4102": {"a": {"consumible": "Tóner", "tipo": "Mono"}, "cant": 1, "cat": "impresoras", "code": "4102", "cond": "Con falla", "marca": "HP", "modelo": "LaserJet 1600", "obs": "Sin tapa; verificar modelo", "precio": 0, "revisar": true, "ubic": "A", "ts": 1795500000000}, "4103": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Color", "wifi": "No"}, "cant": 1, "cat": "impresoras", "code": "4103", "cond": "Con falla", "marca": "HP", "modelo": "Color LaserJet Enterprise M553", "obs": "Sin fusor (B5L35A). Tóner 508A: falta negro y magenta", "precio": 0, "revisar": false, "ubic": "C", "ts": 1795500000000}, "4104": {"a": {"consumible": "Tinta", "multifuncional": "Sí", "tipo": "Color", "wifi": "Sí"}, "cant": 1, "cat": "impresoras", "code": "4104", "cond": "Con falla", "marca": "Epson", "modelo": "TX560WD", "obs": "Sin cartuchos", "precio": 0, "revisar": false, "ubic": "C", "ts": 1795500000000}, "4105": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono", "wifi": "Sí"}, "cant": 1, "cat": "impresoras", "code": "4105", "cond": "Con falla", "marca": "HP", "modelo": "LaserJet M201dw", "obs": "Falla motor/papel, sin tapas, con tóner (verificar)", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "4106": {"a": {"consumible": "Tóner", "tipo": "Color", "wifi": "Sí"}, "cant": 1, "cat": "impresoras", "code": "4106", "cond": "Con falla", "marca": "HP", "modelo": "Color LaserJet Enterprise M553", "obs": "Sin fusor, sin tóner", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "4107": {"a": {"consumible": "Tóner", "multifuncional": "Sí", "tipo": "Mono", "wifi": "Sí"}, "cant": 1, "cat": "impresoras", "code": "4107", "cond": "Con falla", "marca": "HP", "modelo": "LaserJet M527", "obs": "Sin tóner", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "4108": {"a": {"consumible": "Tóner", "multifuncional": "Sí", "tipo": "Mono", "wifi": "Sí"}, "cant": 1, "cat": "impresoras", "code": "4108", "cond": "Con falla", "marca": "HP", "modelo": "LaserJet MFP E52645", "obs": "Sin tóner", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "4109": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Mono", "wifi": "Sí"}, "cant": 1, "cat": "impresoras", "code": "4109", "cond": "Con falla", "marca": "HP", "modelo": "LaserJet M608", "obs": "Sin tóner, sin bandeja", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "4110": {"a": {"consumible": "Tóner", "multifuncional": "No", "tipo": "Color", "wifi": "No"}, "cant": 1, "cat": "impresoras", "code": "4110", "cond": "Con falla", "marca": "Lexmark", "modelo": "CS622", "obs": "Problema con tapa, sin tóner (códigos 78C0Z… poco legibles)", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "4111": {"a": {"consumible": "Tóner", "multifuncional": "Sí", "tipo": "Mono", "wifi": "Sí"}, "cant": 1, "cat": "impresoras", "code": "4111", "cond": "Con falla", "marca": "HP", "modelo": "LaserJet E52645", "obs": "Sin fusor, sin tóner. En la hoja también tenía el código 4108 (repetido)", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "5100": {"a": {"color": "Amarillo", "compatibles": "HP LaserJet CM2320fxi / CM2320n / CM2320nf, CP2020 / CP2024dn / CP2025; Pro 300 color M351a; Pro 400 color M451dn / M451dw / M451nw; MFP M375nw; M475dn / M475dw"}, "cant": 3, "cat": "toner", "code": "5100", "cond": "Buena", "marca": "Pacific Color", "modelo": "PTNHCC532 / CE412", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "5101": {"a": {"color": "Magenta", "compatibles": "Las mismas del 5100, más HP Color LaserJet Pro M476dn / M475dw"}, "cant": 1, "cat": "toner", "code": "5101", "cond": "Buena", "marca": "Pacific Color", "modelo": "PTNHCE413M / PTNHCF383M", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "5102": {"a": {"color": "Cyan", "compatibles": "HP Color LaserJet CM2320fxi / CM2320n / CM2320nf, CP2020 / CP2025 / CP2025dn / CP2025x; LaserJet Pro 300 color M351a, MFP M375nw, M475dn / M475dw; LaserJet Pro 400 color M451nw / M451dn / M451dw; LaserJet Pro M476dn / dw / nw"}, "cant": 2, "cat": "toner", "code": "5102", "cond": "Buena", "marca": "Pacific Color", "modelo": "PTNHCB533C / PTNHCE411C / PTNHCF381C", "obs": "Verificar color", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "5103": {"a": {"color": "Negro", "compatibles": "HP LaserJet P3010 / P3015 / P3015d / P3015dn / P3015x / Pro M521 series"}, "cant": 2, "cat": "toner", "code": "5103", "cond": "Buena", "marca": "Pacific Color", "modelo": "PTNHCE255A", "obs": "Verificar cantidad", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "5104": {"a": {"color": "Cyan", "compatibles": "Las mismas del 5102"}, "cant": 1, "cat": "toner", "code": "5104", "cond": "Buena", "marca": "Pacific Color", "modelo": "PTNHCB531C / PTNHCE411C / PTNHCF381C", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6001": {"a": {"color": "Tricolor", "compatibles": "PIXMA iP1200 / iP1300 / iP1600 / iP1700 / iP1800 / iP1900 / iP2200 / iP2500 / iP2600 / iP6210D / iP6220D / iP6310D, MP140 / MP150 / MP160 / MP170 / MP180 / MP190 / MP210 / MP220 / MP450 / MP460 / MP470, MX300 / MX310"}, "cant": 9, "cat": "cartuchos", "code": "6001", "cond": "Buena", "marca": "Canon", "modelo": "PIXMA CL-41", "obs": "Verificar cantidad", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "6002": {"a": {"color": "Negro"}, "cant": 2, "cat": "cartuchos", "code": "6002", "cond": "Buena", "marca": "HP", "modelo": "88", "obs": "Verificar cantidad", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "6003": {"a": {"color": "Magenta"}, "cant": 3, "cat": "cartuchos", "code": "6003", "cond": "Buena", "marca": "HP", "modelo": "88", "obs": "Verificar cantidad", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "6004": {"a": {"color": "Cyan"}, "cant": 1, "cat": "cartuchos", "code": "6004", "cond": "Buena", "marca": "HP", "modelo": "88", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6005": {"a": {"color": "Amarillo"}, "cant": 1, "cat": "cartuchos", "code": "6005", "cond": "Buena", "marca": "HP", "modelo": "88", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6006": {"a": {"color": "Amarillo", "vence": "2014"}, "cant": 3, "cat": "cartuchos", "code": "6006", "cond": "Buena", "marca": "Canon", "modelo": "103", "obs": "", "precio": 10690, "revisar": false, "ubic": "", "ts": 1795500000000}, "6007": {"a": {"color": "Cyan", "vence": "02/2013"}, "cant": 4, "cat": "cartuchos", "code": "6007", "cond": "Buena", "marca": "Canon", "modelo": "103", "obs": "", "precio": 10690, "revisar": false, "ubic": "", "ts": 1795500000000}, "6008": {"a": {"color": "Negro", "vence": "11/2016"}, "cant": 1, "cat": "cartuchos", "code": "6008", "cond": "Buena", "marca": "Epson", "modelo": "117", "obs": "Marca y modelo poco legibles", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "6009": {"a": {"color": "Cyan", "vence": "12/2016"}, "cant": 1, "cat": "cartuchos", "code": "6009", "cond": "Buena", "marca": "HP", "modelo": "935", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6010": {"a": {"color": "Amarillo", "vence": "12/2016"}, "cant": 1, "cat": "cartuchos", "code": "6010", "cond": "Buena", "marca": "HP", "modelo": "935", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6011": {"a": {"color": "Magenta", "vence": "12/2016"}, "cant": 1, "cat": "cartuchos", "code": "6011", "cond": "Buena", "marca": "HP", "modelo": "935", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6012": {"a": {"color": "Negro", "vence": "12/2016"}, "cant": 1, "cat": "cartuchos", "code": "6012", "cond": "Buena", "marca": "HP", "modelo": "934", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6013": {"a": {"color": "Amarillo"}, "cant": 1, "cat": "cartuchos", "code": "6013", "cond": "Buena", "marca": "Epson", "modelo": "196", "obs": "En la hoja dice 296-I", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "6014": {"a": {"color": "Amarillo"}, "cant": 1, "cat": "cartuchos", "code": "6014", "cond": "Buena", "marca": "Epson", "modelo": "195", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6015": {"a": {"color": "Cyan"}, "cant": 1, "cat": "cartuchos", "code": "6015", "cond": "Buena", "marca": "Epson", "modelo": "196", "obs": "En la hoja dice 291-I", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "6016": {"a": {"color": "Negro"}, "cant": 1, "cat": "cartuchos", "code": "6016", "cond": "Buena", "marca": "Epson", "modelo": "197", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6017": {"a": {"color": "Magenta"}, "cant": 1, "cat": "cartuchos", "code": "6017", "cond": "Buena", "marca": "Epson", "modelo": "195", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6018": {"a": {"color": "Varios"}, "cant": 3, "cat": "cartuchos", "code": "6018", "cond": "Buena", "marca": "Epson", "modelo": "T0481 – T0486", "obs": "Verificar cantidad", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "6019": {"a": {"color": "Negro, cyan, magenta, amarillo"}, "cant": 4, "cat": "cartuchos", "code": "6019", "cond": "Buena", "marca": "Epson", "modelo": "T0461 / T0462 / T0463 / T0464", "obs": "", "precio": 0, "revisar": false, "ubic": "", "ts": 1795500000000}, "6020": {"a": {"color": "Varios"}, "cant": 1, "cat": "cartuchos", "code": "6020", "cond": "Buena", "marca": "Epson", "modelo": "T0483 – T0486 / T0484", "obs": "Nota de la hoja poco legible", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "801": {"a": {"forma": "Rectangular", "puerto": "HDMI / VGA", "pulgadas": "22", "regulable": "Sí"}, "cant": 1, "cat": "monitores", "code": "801", "cond": "Buena", "marca": "LG", "modelo": "22M38A", "obs": "Modelo poco legible", "precio": 40000, "revisar": true, "ubic": "A", "ts": 1795500000000}, "802": {"a": {"forma": "Rectangular", "puerto": "HDMI / VGA", "pulgadas": "20", "regulable": "Sí"}, "cant": 1, "cat": "monitores", "code": "802", "cond": "Buena", "marca": "LG", "modelo": "E2042C", "obs": "", "precio": 25000, "revisar": false, "ubic": "A", "ts": 1795500000000}, "803": {"a": {"forma": "Rectangular", "puerto": "VGA", "pulgadas": "20", "regulable": "Sí"}, "cant": 1, "cat": "monitores", "code": "803", "cond": "Buena", "marca": "LG", "modelo": "20M38A", "obs": "", "precio": 25000, "revisar": false, "ubic": "A", "ts": 1795500000000}, "804": {"a": {"forma": "Rectangular", "puerto": "VGA", "pulgadas": "22", "regulable": "Sí"}, "cant": 1, "cat": "monitores", "code": "804", "cond": "Buena", "marca": "LG", "modelo": "22EN33", "obs": "", "precio": 25000, "revisar": false, "ubic": "A", "ts": 1795500000000}, "805": {"a": {"forma": "Rectangular", "puerto": "VGA", "pulgadas": "19", "regulable": "Sí"}, "cant": 17, "cat": "monitores", "code": "805", "cond": "Buena", "marca": "LG", "modelo": "W1943C", "obs": "Verificar cantidad (junto al código aparece 17)", "precio": 20000, "revisar": true, "ubic": "", "ts": 1795500000000}, "806": {"a": {"forma": "Rectangular", "puerto": "VGA", "pulgadas": "17", "regulable": "No"}, "cant": 0, "cat": "monitores", "code": "806", "cond": "Buena", "marca": "AOC", "modelo": "917Sw", "obs": "Tachado en la hoja (¿vendido?)", "precio": 0, "revisar": true, "ubic": "", "ts": 1795500000000}, "807": {"a": {"forma": "Rectangular", "puerto": "VGA", "pulgadas": "19", "regulable": "Sí"}, "cant": 1, "cat": "monitores", "code": "807", "cond": "Buena", "marca": "LG", "modelo": "W1943SE", "obs": "", "precio": 20000, "revisar": false, "ubic": "", "ts": 1795500000000}, "808": {"a": {"forma": "Rectangular", "puerto": "VGA", "pulgadas": "19", "regulable": "Sí"}, "cant": 1, "cat": "monitores", "code": "808", "cond": "Buena", "marca": "LG", "modelo": "E1942C", "obs": "", "precio": 20000, "revisar": false, "ubic": "", "ts": 1795500000000}, "809": {"a": {"forma": "Rectangular", "puerto": "VGA", "pulgadas": "16", "regulable": "No"}, "cant": 1, "cat": "monitores", "code": "809", "cond": "Buena", "marca": "ViewSonic", "modelo": "VA1616w", "obs": "", "precio": 15000, "revisar": false, "ubic": "", "ts": 1795500000000}, "810": {"a": {"forma": "Cuadrado", "puerto": "VGA", "pulgadas": "17", "regulable": "No"}, "cant": 1, "cat": "monitores", "code": "810", "cond": "Buena", "marca": "ViewSonic", "modelo": "VA1703", "obs": "", "precio": 15000, "revisar": false, "ubic": "", "ts": 1795500000000}};

  const SEED = {
    items: SEED_ITEMS,
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
