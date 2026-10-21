const API = 'https://api.sellauth.com/v1';
const isPaid = i => ['completed', 'paid', 'delivered', 'complete'].includes(String(i.status || '').toLowerCase()) || !!i.completed_at;
const price = i => Number(i.price_usd ?? i.price ?? i.total ?? i.amount ?? 0);

addEventListener('saveConfig', (resolve, reject, args) => {
  try { CapacitorKV.set('cfg', JSON.stringify(args || {})); CapacitorKV.remove('seen'); resolve(); } catch (e) { reject(e); }
});
addEventListener('markSeen', (resolve, reject, args) => {
  try { CapacitorKV.set('seen', JSON.stringify((args && args.ids) || [])); resolve(); } catch (e) { reject(e); }
});
addEventListener('checkSales', async (resolve, reject) => {
  try {
    const c = CapacitorKV.get('cfg');
    if (!c || !c.value) return resolve();
    const cfg = JSON.parse(c.value);
    if (!cfg.on || !cfg.key || !cfg.shop) return resolve();
    const r = await fetch(`${API}/shops/${cfg.shop}/invoices?page=1&per_page=30`, { headers: { Authorization: 'Bearer ' + cfg.key, Accept: 'application/json' } });
    if (!r.ok) return resolve();
    const j = await r.json();
    const paid = (Array.isArray(j) ? j : (j.data || [])).filter(isPaid);
    const s = CapacitorKV.get('seen');
    const seen = s && s.value ? JSON.parse(s.value) : null;
    CapacitorKV.set('seen', JSON.stringify(paid.map(i => i.id)));
    if (seen) {
      const nw = paid.filter(i => !seen.includes(i.id));
      if (nw.length) {
        const tot = nw.reduce((a, i) => a + price(i), 0);
        CapacitorNotifications.schedule([{
          id: Date.now() % 2147483647,
          title: nw.length > 1 ? nw.length + ' new sales' : 'New sale',
          body: cfg.amt ? tot.toFixed(2) + ' ' + (cfg.cur || '') : 'Open the app to see details',
          scheduleAt: new Date(Date.now() + 1000)
        }]);
      }
    }
    resolve();
  } catch (e) { reject(e); }
});
