// ======================================================
// KONFIGURASI SUPABASE
// Ganti dua nilai di bawah ini dengan milikmu sendiri.
// Dapatkan dari: Supabase Dashboard > Project Settings > API
// ======================================================
const SUPABASE_URL = "https://ljssqvrewfgjbqrfrcgr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dODPCVYztcaBAE-YPnTIVA_RTozZTRV";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("guestbook-form");
const nameInput = document.getElementById("name-input");
const messageInput = document.getElementById("message-input");
const statusEl = document.getElementById("form-status");
const messagesList = document.getElementById("messages-list");

// Ambil dan tampilkan pesan dari tabel "messages"
async function loadMessages() {
  const { data, error } = await supabaseClient
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    messagesList.innerHTML = `<p class="muted">Belum terhubung ke Supabase, atau tabel "messages" belum dibuat.</p>`;
    console.error(error);
    return;
  }

  messagesList.innerHTML = data
    .map(
      (m) => `
      <div class="message-item">
        <strong>${escapeHtml(m.name)}</strong>
        <p>${escapeHtml(m.message)}</p>
      </div>`
    )
    .join("");
}

// Kirim pesan baru ke Supabase
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Mengirim...";

  const { error } = await supabaseClient.from("messages").insert({
    name: nameInput.value,
    message: messageInput.value,
  });

  if (error) {
    statusEl.textContent = "Gagal mengirim. Cek koneksi Supabase kamu.";
    console.error(error);
    return;
  }

  statusEl.textContent = "Pesan terkirim!";
  form.reset();
  loadMessages();
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

loadMessages();
