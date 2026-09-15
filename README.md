# Portofolio Ali Alhafidz — Latihan Supabase + GitHub + Vercel

## 1. Buat tabel di Supabase
Buka **SQL Editor** di dashboard Supabase, lalu jalankan:

```sql
create table messages (
  id bigint generated always as identity primary key,
  name text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

alter table messages enable row level security;

create policy "Semua bisa baca"
  on messages for select
  using (true);

create policy "Semua bisa kirim"
  on messages for insert
  with check (true);
```

## 2. Isi kredensial di script.js
Buka `script.js`, ganti:
- `SUPABASE_URL` → dari Project Settings > API > Project URL
- `SUPABASE_ANON_KEY` → dari Project Settings > API > anon public key

## 3. Push ke GitHub
```bash
git init
git add .
git commit -m "Portofolio pertama"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

## 4. Deploy ke Vercel
1. Buka vercel.com, login dengan akun GitHub.
2. Klik "Add New Project", pilih repo GitHub kamu.
3. Framework preset: pilih "Other" (karena ini HTML/CSS/JS statis).
4. Klik "Deploy".

Selesai — website akan online di URL `namaproyek.vercel.app`.
