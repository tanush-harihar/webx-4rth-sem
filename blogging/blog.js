const PW = { reader: "read123", writer: "write123", admin: "admin123" };
let role = null,
  user = null;
const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const lb = () => JSON.parse(localStorage.getItem("ink") || "[]");
const sb = (b) => localStorage.setItem("ink", JSON.stringify(b));
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fd = (i) =>
  new Date(i).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
let tt;
function toast(m) {
  const t = document.getElementById("toast");
  t.textContent = m;
  t.classList.add("show");
  clearTimeout(tt);
  tt = setTimeout(() => t.classList.remove("show"), 2400);
}

if (!localStorage.getItem("inkSeeded")) {
  sb([
    {
      id: uid(),
      title: "The Art of Slow Living",
      body: "In a world obsessed with speed, there is quiet rebellion in slowing down.\n\nSlow living asks us to reconsider what a good day looks like — a morning with coffee and a book, an afternoon walk with no destination.",
      tag: "Lifestyle",
      author: "writer",
      date: new Date(Date.now() - 172800000).toISOString(),
      flagged: false,
    },
    {
      id: uid(),
      title: "Why I Switched to Mechanical Keyboards",
      body: "I used to think keyboard enthusiasts were eccentric. Then I typed on a proper mechanical keyboard and never looked back.\n\nThe tactile feedback transforms typing from a chore into a craft.",
      tag: "Tech",
      author: "writer",
      date: new Date(Date.now() - 86400000).toISOString(),
      flagged: false,
    },
    {
      id: uid(),
      title: "A Weekend in Pondicherry",
      body: "Pondicherry is a city of contradictions — French boulevards next to Tamil temples, yoga ashrams beside seafood shacks.\n\nThe French Quarter with its mustard-yellow buildings felt like a different country entirely.",
      tag: "Travel",
      author: "writer",
      date: new Date().toISOString(),
      flagged: false,
    },
  ]);
  localStorage.setItem("inkSeeded", "1");
}

function go(s) {
  document
    .querySelectorAll(".screen")
    .forEach((x) => x.classList.remove("active"));
  document.getElementById("s-" + s).classList.add("active");
  if (s === "reader") renderR();
  if (s === "writer") renderMine();
  if (s === "admin") renderA();
  scrollTo(0, 0);
}

function setNav() {
  const n = document.getElementById("nav");
  if (!role) {
    n.innerHTML = "<button onclick=\"go('login')\">Login</button>";
    return;
  }
  let h = "";
  if (role !== "writer") h += "<button onclick=\"go('reader')\">Read</button>";
  if (role === "writer") h += "<button onclick=\"go('writer')\">Write</button>";
  if (role === "admin") h += "<button onclick=\"go('admin')\">Admin</button>";
  h += '<button onclick="logout()">Logout</button>';
  n.innerHTML = h;
}

function doLogin() {
  const r = document.getElementById("lr").value;
  const p = document.getElementById("lp").value;
  const e = document.getElementById("lerr");
  if (PW[r] !== p) {
    e.style.display = "block";
    return;
  }
  e.style.display = "none";
  role = r;
  user = r;
  setNav();
  go(role === "writer" ? "writer" : role === "admin" ? "admin" : "reader");
  toast("Welcome, " + role + "!");
}
function logout() {
  role = null;
  user = null;
  setNav();
  go("login");
}

function renderR() {
  const blogs = lb().filter((b) => !b.flagged);
  const q = document.getElementById("q").value.toLowerCase();
  const tag = document.getElementById("ft").value;
  const tags = [...new Set(blogs.map((b) => b.tag).filter(Boolean))];
  const sel = document.getElementById("ft");
  const cv = sel.value;
  sel.innerHTML =
    '<option value="">All categories</option>' +
    tags
      .map((t) => `<option${t === cv ? " selected" : ""}>${t}</option>`)
      .join("");
  const f = blogs
    .filter(
      (b) =>
        (!q ||
          b.title.toLowerCase().includes(q) ||
          b.body.toLowerCase().includes(q)) &&
        (!tag || b.tag === tag),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const el = document.getElementById("blist");
  el.innerHTML = f.length
    ? f
        .map(
          (b) =>
            `<div class="card"><h3>${esc(b.title)}</h3><div class="meta">${fd(b.date)} · ${b.author} ${b.tag ? `<span class="tag">${esc(b.tag)}</span>` : ""}</div><p style="color:var(--muted);font-size:.88rem;margin-bottom:.7rem">${esc(b.body).slice(0, 130)}…</p><button class="btn g" onclick="openPost('${b.id}')">Read more →</button></div>`,
        )
        .join("")
    : '<p class="empty">No blogs found.</p>';
}

function openPost(id) {
  const b = lb().find((x) => x.id === id);
  if (!b) return;
  document.getElementById("pbody").innerHTML =
    `<h1 style="font-size:1.75rem;margin-bottom:.4rem">${esc(b.title)}</h1><div class="meta" style="margin-bottom:1rem">${fd(b.date)} · ${b.author} ${b.tag ? `<span class="tag">${esc(b.tag)}</span>` : ""}</div><hr><div style="margin-top:1rem">${esc(b.body).replace(/\n\n/g, '</p><p style="margin-bottom:.9rem">').replace(/\n/g, "<br>").replace(/^/, '<p style="margin-bottom:.9rem">').replace(/$/, "</p>")}</div>`;
  go("post");
}

function pub() {
  const t = document.getElementById("wt").value.trim();
  const b = document.getElementById("wb").value.trim();
  const g = document.getElementById("wg").value.trim();
  if (!t || !b) {
    toast("Title and content required.");
    return;
  }
  const blogs = lb();
  blogs.unshift({
    id: uid(),
    title: t,
    body: b,
    tag: g,
    author: user,
    date: new Date().toISOString(),
    flagged: false,
  });
  sb(blogs);
  clr();
  renderMine();
  toast("Blog published!");
}
function clr() {
  ["wt", "wb", "wg"].forEach((id) => (document.getElementById(id).value = ""));
}

function renderMine() {
  const mine = lb().filter((b) => b.author === user);
  const el = document.getElementById("myposts");
  el.innerHTML = mine.length
    ? mine
        .map(
          (b) =>
            `<div class="card"><div class="row" style="justify-content:space-between"><div><h3>${esc(b.title)}</h3><div class="meta">${fd(b.date)} ${b.tag ? `<span class="tag">${esc(b.tag)}</span>` : ""} ${b.flagged ? '<span style="color:var(--danger);font-size:.75rem">⚑ Flagged</span>' : ""}</div></div><button class="btn d" style="font-size:.8rem;padding:.3rem .7rem" onclick="del('${b.id}','w')">Delete</button></div></div>`,
        )
        .join("")
    : '<p class="empty">Nothing published yet.</p>';
}

function renderA() {
  const blogs = lb().sort((a, b) => new Date(b.date) - new Date(a.date));
  const el = document.getElementById("alist");
  el.innerHTML = blogs.length
    ? blogs
        .map(
          (b) =>
            `<div class="card" style="${b.flagged ? "border-left:3px solid var(--danger)" : ""}">
          <div class="row" style="justify-content:space-between;align-items:flex-start">
          <div style="flex:1;min-width:0"><h3 style="word-break:break-word">${esc(b.title)}</h3>
          <div class="meta">${fd(b.date)} · ${b.author} ${b.tag ? `<span class="tag">${esc(b.tag)}</span>` : ""}</div>
          <p style="font-size:.83rem;color:var(--muted)">${esc(b.body).slice(0, 100)}…</p></div>
          <div class="row" style="flex-shrink:0"><button class="btn g" 
          style="font-size:.8rem;padding:.3rem .7rem" onclick="flag('${b.id}')">${b.flagged ? "Unflag" : "Flag"}
          </button><button class="btn d" style="font-size:.8rem;padding:.3rem .7rem" onclick="del('${b.id}','a')">
          Delete</button></div></div></div>`,
        )
        .join("")
    : '<p class="empty">No posts.</p>';
}

function flag(id) {
  const blogs = lb();
  const b = blogs.find((x) => x.id === id);
  if (b) b.flagged = !b.flagged;
  sb(blogs);
  renderA();
  toast(b.flagged ? "Post flagged — hidden from readers." : "Post unflagged.");
}
function del(id, from) {
  if (!confirm("Delete this post?")) return;
  sb(lb().filter((b) => b.id !== id));
  toast("Deleted.");
  from === "a" ? renderA() : renderMine();
}