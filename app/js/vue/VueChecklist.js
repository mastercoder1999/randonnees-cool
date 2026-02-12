class VueChecklist {
  constructor() {
    this.html = document.getElementById("html-vue-checklist").innerHTML;
    this.storageKey = "randonnees_cool_checklist_v1";
    this.items = [];
    this.presetKey = "randonnees_cool_checklist_preset_v1";
    this.presetActuel = "demi";

  }

  afficher() {
    document.getElementsByTagName("body")[0].innerHTML = this.html;

    this.charger();
    this.render();

    this.chargerPreset();

    const presetSelect = document.getElementById("checklist-preset");
    const applyPresetBtn = document.getElementById("checklist-apply-preset-btn");

    if (presetSelect) presetSelect.value = this.presetActuel;

    applyPresetBtn.addEventListener("click", () => {
    const choix = presetSelect.value;
    this.appliquerPreset(choix, true); // true = remplacer la liste
    });

    const input = document.getElementById("checklist-input");
    const addBtn = document.getElementById("checklist-add-btn");
    const resetBtn = document.getElementById("checklist-reset-btn");

    addBtn.addEventListener("click", () => this.ajouterDepuisInput());
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.ajouterDepuisInput();
    });

    resetBtn.addEventListener("click", () => {
      this.items = [];
      this.sauvegarder();
      this.render();
    });
  }

  ajouterDepuisInput() {
    const input = document.getElementById("checklist-input");
    const texte = (input.value || "").trim();
    if (!texte) return;

    this.items.push({
      id: Date.now(),      // simple, suffisant
      texte: texte,
      fait: false
    });

    input.value = "";
    this.sauvegarder();
    this.render();
  }

  toggle(id) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.fait = !item.fait;
    this.sauvegarder();
    this.render();
  }

  supprimer(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.sauvegarder();
    this.render();
  }

  charger() {
    try {
        const raw = localStorage.getItem(this.storageKey);
        this.items = raw ? JSON.parse(raw) : [];
    } catch (e) {
        this.items = [];
    }

    this.chargerPreset();

    if (!this.items || this.items.length === 0) {
        this.items = this.itemsPourPreset(this.presetActuel);
        this.sauvegarder();
    }
  }


  sauvegarder() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  itemsParDefaut() {
    return [
      { id: 1, texte: "Eau", fait: false },
      { id: 2, texte: "Collation", fait: false },
      { id: 3, texte: "Vêtements adaptés", fait: false },
      { id: 4, texte: "Téléphone chargé", fait: false }
    ];
  }

  render() {
    const list = document.getElementById("checklist-list");
    if (!list) return;

    if (this.items.length === 0) {
      list.innerHTML = `<div class="empty">Aucun item. Ajoute-en un 👀</div>`;
      return;
    }

    let html = "";
    for (const item of this.items) {
      html += `
        <div class="checklist-item ${item.fait ? "done" : ""}">
          <label class="checklist-left">
            <input type="checkbox" ${item.fait ? "checked" : ""} data-id="${item.id}">
            <span class="checklist-text">${this.escapeHtml(item.texte)}</span>
          </label>
          <button class="checklist-delete" data-del="${item.id}">✕</button>
        </div>
      `;
    }
    list.innerHTML = html;

    // events
    list.querySelectorAll('input[type="checkbox"][data-id]').forEach(cb => {
      cb.addEventListener("change", (e) => {
        const id = Number(e.target.getAttribute("data-id"));
        this.toggle(id);
      });
    });

    list.querySelectorAll("button[data-del]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.currentTarget.getAttribute("data-del"));
        this.supprimer(id);
      });
    });
  }

  escapeHtml(str) {
    return str
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  chargerPreset() {
    const saved = localStorage.getItem(this.presetKey);
    if (saved) this.presetActuel = saved;
    }

    sauvegarderPreset() {
    localStorage.setItem(this.presetKey, this.presetActuel);
    }

    appliquerPreset(preset, remplacerListe) {
    this.presetActuel = preset;
    this.sauvegarderPreset();

    const itemsPreset = this.itemsPourPreset(preset);

    if (remplacerListe) {
        this.items = itemsPreset;
    } else {
        // option "merge" si tu veux plus tard
        const existants = new Set(this.items.map(i => i.texte.toLowerCase()));
        for (const it of itemsPreset) {
        if (!existants.has(it.texte.toLowerCase())) this.items.push(it);
        }
    }

    this.sauvegarder();
    this.render();
    }

    itemsPourPreset(preset) {
    // id unique simple
    const mk = (texte) => ({ id: Date.now() + Math.floor(Math.random()*100000), texte, fait: false });

    if (preset === "demi") {
        return [
        mk("Eau (1L)"),
        mk("Collation"),
        mk("Vêtements adaptés"),
        mk("Téléphone chargé"),
        mk("Petite trousse (pansements)"),
        ];
    }

    if (preset === "1j") {
        return [
        mk("Eau (2L)"),
        mk("Lunch + collations"),
        mk("Couche chaude / coupe-vent"),
        mk("Téléphone chargé + batterie externe"),
        mk("Petite trousse (pansements, désinfectant)"),
        mk("Crème solaire / lunettes"),
        mk("Lampe frontale"),
        ];
    }

    // 2 jours
    return [
        mk("Eau (ou filtre/pastilles)"),
        mk("Repas x2 + collations"),
        mk("Sac de couchage"),
        mk("Abri (tarp / tente)"),
        mk("Vêtements de rechange + couche chaude"),
        mk("Lampe frontale + piles"),
        mk("Trousse premiers soins"),
        mk("Allume-feu / briquet"),
        mk("Batterie externe"),
    ];
    }

}
